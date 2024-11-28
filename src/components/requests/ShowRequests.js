import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ShowRequests.module.css';
import Button from '../ui/Button';

const ShowRequests = () => {
    const [requests, setRequests] = useState([]);
    const [statusFilter, setStatusFilter] = useState('pending');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            setError(null);

            try {
                const storedData = JSON.parse(localStorage.getItem('user'));
                const user = storedData?.user;
                const token = storedData?.token;

                if (!user || !token) {
                    throw new Error('No valid user data or token found in localStorage.');
                }

                const userId = user._id;

                const response = await axios.get(
                    `http://localhost:8080/get/requests/${statusFilter}?userId=${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, 
                        },
                    }
                );

                console.log(response.data.bamRequests);
                

                setRequests(response.data.bamRequests || []);
            } catch (err) {
                console.error('Error fetching requests:', err.message);
                setError('שגיאה בהצגת הבקשות. נסה שנית מאוחר יותר.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [statusFilter]);

    const handleStatusChange = (status) => {
        setStatusFilter(status);
    };

    const statusTitles = {
        pending: 'ממתין',
        approved: 'מאושר',
        disapproved: 'נדחה',
    };

    return (
        <div>
            <h2>בקשות</h2>
            <div className={styles.requestsContainer}>
                <div className={styles.statusFilter}>
                    {Object.entries(statusTitles).map(([key, title]) => (
                        <Button
                            key={key}
                            onClick={() => handleStatusChange(key)}
                            className={statusFilter === key ? styles.active : ''}
                        >
                            {title}
                        </Button>
                    ))}
                </div>

                {loading ? (
                    <p>טוען....</p>
                ) : error ? (
                    <p className={styles.error}>{error}</p>
                ) : requests.length === 0 ? (
                    <p>לא נמצאו בקשות</p>
                ) : (
                    <table className={styles.requestsTable}>
                        <thead>
                            <tr>
                                <th>סוג בקשה</th>
                                <th>הסבר</th>
                                <th>סטטוס</th>
                                <th>תאריך</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request._id}>
                                    <td>{request.requestType || 'No Type'}</td>
                                    <td>{request.description || 'No description available'}</td>
                                    <td>
                                    <span
                                        className={`${styles.status} ${styles[request.status?.toLowerCase()]}`}
                                        title={statusTitles[request.status?.toLowerCase()] || 'Unknown Status'}
                                    >
                                        {statusTitles[request.status?.toLowerCase()] || request.status}
                                    </span>
                                    </td>
                                    <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ShowRequests;
