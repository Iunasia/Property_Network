import styles from './Input.module.css';

const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <input 
        className={`${styles.input} ${error ? styles.errorInput : ''}`} 
        {...props} 
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Input;
