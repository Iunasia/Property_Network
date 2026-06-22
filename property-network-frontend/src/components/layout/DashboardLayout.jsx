import { NavLink, Outlet } from 'react-router-dom';
import styles from './DashboardLayout.module.css';

const DashboardLayout = ({ role, links }) => {
  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3>{role} Portal</h3>
        </div>
        <nav className={styles.sidebarNav}>
          {links.map((link) => (
            <NavLink 
              key={link.to} 
              to={link.to}
              end={link.end}
              className={({ isActive }) => 
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
