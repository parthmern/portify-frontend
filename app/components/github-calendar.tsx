"use client";

import React from "react";
import GitHubCalendar from "react-github-calendar";

import { motion } from "framer-motion";

export function GithubContributions() {
  
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const theme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  if (!mounted) {
    return (
      <div className="w-full h-[160px] rounded-xl bg-muted animate-pulse" />
    );
  }

  return (
    <motion.div
      className="w-full bg-black overflow-hidden rounded-xl bg-card hover:shadow-lg transition-shadow duration-300 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-1">
        <GitHubCalendar
          username="parthmern"
          colorScheme= {"dark"}
          fontSize={12}
          theme={theme}
          blockSize={7}
          blockMargin={4}
        />
      </div>
    </motion.div>
  );
}