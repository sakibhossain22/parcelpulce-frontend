import { motion } from 'framer-motion';

const Motion = ({ children }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {children}
    </motion.div>
);
export default Motion