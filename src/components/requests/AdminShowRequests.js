import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ShowRequests.module.css';
import Button from '../ui/Button';

const ShowRequestsAdmin = () => {
    const [requests, setRequests] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [topAmount, setTopAmount] = useState(10);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [requestTypeFilter, setRequestTypeFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRequests = async (status = '', start = '', end = '', limit = 10, requestType = '') => {
        setLoading(true);
        setError(null);


        try {
            const params = {
                status: status.toLowerCase(),
                startDate: start, 
                endDate: end, 
                limit,
                requestType,
            };

            const storedData = JSON.parse(localStorage.getItem('user'));
            const token = storedData?.token;

            const response = await axios.get('http://localhost:8080/get/requests', {
                headers: { Authorization: `Bearer ${token}` },
                params,
            });

            console.log(response.data);
            setRequests(response.data.bamRequests || []);
        } catch (err) {
            console.error('Error fetching requests:', err.message);
            setError('שגיאה בהצגת הבקשות. נסה שנית מאוחר יותר.');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            const storedData = JSON.parse(localStorage.getItem('user'));
            const token = storedData?.token;

            await axios.patch(
                'http://localhost:8080/request/approve',
                { id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            fetchRequests(statusFilter, startDate, endDate, topAmount);
        } catch (error) {
            console.error('Error approving request:', error.message);
            setError(error.response ? error.response.data.error : 'שגיאה בהצגת הבקשות. נסה שנית מאוחר יותר.');
        }
    };

    const handleDisapprove = async (id) => {
        try {
            const storedData = JSON.parse(localStorage.getItem('user'));
            const token = storedData?.token;

            await axios.patch(
                'http://localhost:8080/request/disapprove',
                { id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            fetchRequests(statusFilter, startDate, endDate, topAmount);
        } catch (error) {
            console.error('Error disapproving request:', error.message);
            setError(error.response ? error.response.data.error : 'שגיאה בהצגת הבקשות. נסה שנית מאוחר יותר.');
        }
    };

    useEffect(() => {
        fetchRequests(statusFilter, startDate, endDate, topAmount, requestTypeFilter);
    }, [statusFilter, startDate, endDate, topAmount, requestTypeFilter]);

    const handleStatusFilter = (status) => {
        setStatusFilter(status);
    };

    const handleTopAmount = (amount) => {
        setTopAmount(amount);
    };

    const handleRequestTypeChange = (e) => {
        setRequestTypeFilter(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const statusTitles = {
        pending: 'ממתין',
        approved: 'מאושר',
        disapproved: 'נדחה',
    };

    return (
        <div className={styles.requestsContainer}>
            <h1>ניהול בקשות</h1>

            <div className={styles.filters}>
                <div className={styles.statusFilter}>
                    <Button
                        className={`${styles.statusButton} ${statusFilter === '' ? styles.active : ''}`}
                        onClick={() => handleStatusFilter('')}
                    >
                        הכל
                    </Button>
                    {Object.entries(statusTitles).map(([status, title]) => (
                        <Button
                            key={status}
                            className={`${styles.statusButton} ${(statusFilter) === status ? styles.active : ''}`}
                            onClick={() => setStatusFilter(status)}
                        >
                            {title}
                        </Button>
                    ))}

                    <div className={styles.filterAdjust}>
                        <label htmlFor="topAmount" className={styles.limitLabel}>
                            בקשות להציג:
                        </label>
                        <input
                            type="number"
                            id="topAmount"
                            min="10"
                            max="100"
                            value={topAmount}
                            onChange={(e) => handleTopAmount(parseInt(e.target.value) || 10)}
                            className={styles.filterAdjustInput}
                        />
                    </div>

                    <div className={styles.filterAdjust}>
                        <label htmlFor="requestType" className={styles.limitLabel}>
                            סוג בקשה:
                        </label>
                        <select
                            id="requestType"
                            value={requestTypeFilter}
                            onChange={handleRequestTypeChange}
                            className={styles.filterAdjustInput}
                        >
                            <option value="">הכל</option>
                            <option value="השחרה">השחרה</option>
                            <option value="כניסה רגלי / רכוב">כניסה רגלי / רכוב</option>
                            <option value="קידוד חוגר">קידוד חוגר</option>
                            <option value='חתימה על שו"ס'>חתימה על שו"ס</option>
                        </select>
                    </div>


                    <div className={styles.filterAdjust}>
                        <label htmlFor="startDate" className={styles.limitLabel}>
                            תאריך התחלה:
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={handleStartDateChange}
                            className={styles.filterAdjustInput}
                        />
                    </div>

                    <div className={styles.filterAdjust}>
                        <label htmlFor="endDate" className={styles.limitLabel}>
                            תאריך סיום:
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={handleEndDateChange}
                            className={styles.filterAdjustInput}
                        />
                    </div>
                </div>
            </div>

            {loading ? (
                <p>טוען...</p>
            ) : error ? (
                <p className={styles.error}>{error}</p>
            ) : requests.length === 0 ? (
                <p>לא נמצאו בקשות</p>
            ) : (
                <table className={styles.requestsTable}>
                    <thead>
                        <tr>
                            <th>סוג בקשה</th>
                            <th>הסבר הבקשה</th>
                            <th>משתמש</th>
                            <th>סטטוס</th>
                            <th>תאריך</th>
                            <th>אשר/דחה</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request._id}>
                                <td>{request.requestType || 'לא מוגדר'}</td>
                                <td>{request.description || 'לא מוגדר'}</td>
                                <td>{request.user?.name || 'לא ידוע'}</td>
                                <td>
                                    <span
                                        className={`${styles.status} ${styles[(request.status)]}`}
                                    >
                                        {statusTitles[(request.status)] || 'לא ידוע'}
                                    </span>
                                </td>
                                <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                                <td>
                                    {request.status === 'Pending' && (
                                        <div className={styles.actions}>
                                            <button
                                                className={styles.approveButton}
                                                onClick={() => handleApprove(request._id)}
                                            >
                                                אישור
                                            </button>
                                            <button
                                                className={styles.disapproveButton}
                                                onClick={() => handleDisapprove(request._id)}
                                            >
                                                דחייה
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ShowRequestsAdmin;
