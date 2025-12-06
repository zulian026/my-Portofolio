// FunFactsSection.jsx
import { motion } from "framer-motion";

export default function FunFactsSection({ funFacts = [] }) {
  if (!funFacts.length) return null;

  return (
    <motion.div
      className="mt-14 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold text-gray-900">Fun Facts</h2>

      <div className="flex flex-wrap gap-3">
        {funFacts.map((f) => (
          <motion.span
            key={f.id}
            className="px-3 py-1.5 bg-white border border-gray-200 shadow-sm text-gray-700 rounded-full text-sm"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            {f.text}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
