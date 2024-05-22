import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} all rights reserved to World wise
      </p>
    </footer>
  );
}

export default Footer;
