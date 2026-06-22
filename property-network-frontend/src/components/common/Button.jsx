import styles from './Button.module.css';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const btnClass = `${styles.button} ${styles[variant]} ${className}`;
  return (
    <button className={btnClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
