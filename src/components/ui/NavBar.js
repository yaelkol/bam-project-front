import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('user');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                setUser(parsedData.user);
            } catch (err) {
                console.error('Failed to parse user data:', err);
            }
        }
    }, []);

    const getInitials = (name) => {
        if (!name) return 'AB';
        const names = name.split(' ');
        return (names[0][0] + (names[1] ? names[1][0] : '')).toUpperCase();
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.left}>
                <Link to="/requests" className={styles.logo}>
                    ביטחון מידע
                </Link>
            </div>

            <div className={styles.right}>
                <div className={styles.profile}>
                    <Link to="/personal-space" className={styles.profileImageLink}>
                        <div
                            className={styles.profileImage}
                        >
                            {user && user.name ? getInitials(user.name) : 'AB'}
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
