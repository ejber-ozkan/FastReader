import React from 'react';
import styles from './HistoryList.module.css'; // Reuse container styles for consistency

interface MoreMenuProps {
    onClose: () => void;
}

export const MoreMenu: React.FC<MoreMenuProps> = ({ onClose }) => {
    const details = [
        { label: "Location", value: window.location.href },
        { label: "Host", value: window.location.hostname },
        { label: "Browser", value: navigator.userAgent },
        { label: "Platform", value: navigator.platform },
        { label: "Screen", value: `${window.screen.width}x${window.screen.height}` },
        { label: "Pixel Ratio", value: window.devicePixelRatio },
        { label: "Cores", value: navigator.hardwareConcurrency },
        { label: "Memory (approx)", value: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : 'Unknown' },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>System Details</h2>
                <button className={styles.closeBtn} onClick={onClose}>Close</button>
            </div>

            <div className={styles.list} style={{ padding: '0 1rem' }}>
                <p style={{ color: 'var(--color-text-dim)', marginBottom: '1rem' }}>
                    If you are running this locally, you can access this reader from other devices on your network using the <strong>Host</strong> IP address displayed below (if it's not localhost).
                </p>

                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--color-text)' }}>
                    <tbody>
                        {details.map((item, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: '0.75rem 0', fontWeight: 'bold', width: '30%', color: 'var(--color-text-dim)' }}>{item.label}</td>
                                <td style={{ padding: '0.75rem 0', wordBreak: 'break-all', fontSize: '0.9rem' }}>{item.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
