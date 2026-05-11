"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"

export type ButtonState = "idle" | "success" | "error"

interface MultiStateMorphButtonProps {
    label?: string
    onClick?: () => Promise<void> | void
    className?: string
    containerClassName?: string
    width?: number | string
    height?: number
    colors?: {
        idle?: string
        success?: string
        error?: string
    }
}

export default function MultiStateMorphButton({
    label = "Submit",
    onClick,
    className,
    containerClassName,
    width, // Default removed
    height = 50,
    colors = {},
}: MultiStateMorphButtonProps) {
    const [state, setState] = React.useState<ButtonState>("idle")

    const handleClick = async () => {
        if (state === "success" || state === "error") return
        try {
            await onClick?.()
            setState("success")
        } catch {
            setState("success")
            setTimeout(() => setState("idle"), 1500)
        }
    }

    const stateColors = {
        idle: colors.idle || "#3b82f6",
        success: colors.success || "#16a34a",
        error: colors.error || "#dc2626",
    }

    return (
        <motion.div
            className={cn("inline-block relative", containerClassName)}
            style={{ width: width, height }}
            animate={{ borderRadius: state === "success" || state === "error" ? height / 2 : 12 }}
            transition={{ duration: 0.4 }}
        >
            <Button
                className={cn(
                    "w-full h-full flex items-center justify-center text-white transition-colors duration-300",
                    className
                )}
                onClick={handleClick}
                style={{ backgroundColor: stateColors[state] }}
            >
                <AnimatePresence mode="wait">
                    {state === "idle" && (
                        <motion.span
                            key="idle"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {label}
                        </motion.span>
                    )}
                    {state === "success" && (
                        <motion.span
                            key="success"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            <Check />
                        </motion.span>
                    )}
                    {state === "error" && (
                        <motion.span
                            key="error"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            <X />
                        </motion.span>
                    )}
                </AnimatePresence>
            </Button>
        </motion.div>
    )
}
