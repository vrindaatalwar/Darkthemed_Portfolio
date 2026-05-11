"use client"
import { useRef, useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { SearchIcon } from 'lucide-react'

export const DynamicSearch = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchText, setSearchText] = useState('');
    const buttonVariants = {
        collapsed: {
            width: 180,
            marginLeft: 0,
        },
        expanded: {
            width: 340,
            marginLeft: 50,
        },
    }

    const iconBubbleVariants = {
        collapsed: { scale: 0, opacity: 0 },
        expanded: { scale: 1, opacity: 1 }
    }

    const TRANSITION = {
        duration: 0.5,
        type: "spring" as const,
        bounce: 0.2

    }

    useEffect(() => {
        if (isExpanded) {
            inputRef.current?.focus();
        }
        else {
            setSearchText('');
        }
    }, [isExpanded])

    return (
        <div className="relative flex items-center justify-center w-full">
            <div className="relative flex h-14 items-center justify-center w-full max-w-md">
                <motion.div
                    variants={buttonVariants}
                    initial="collapsed"
                    animate={isExpanded ? "expanded" : "collapsed"}
                    transition={TRANSITION}
                    className="h-10 flex items-center justify-center">
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="relative h-10 w-full flex items-center rounded-full bg-[#1e1e1e] border border-[#333] text-white font-medium hover:border-[#555] transition-colors">
                        {!isExpanded && <SearchIcon className="absolute left-3 w-5 h-5 text-[#a3a3a3]" strokeWidth={2} />}

                        <input ref={inputRef}
                            type="text"
                            placeholder="Search..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onBlur={(e) => { if (!e.target.value) setIsExpanded(false) }}
                            className="h-full w-full cursor-text bg-transparent placeholder:text-[#a3a3a3] rounded-full text-white pl-10 pr-4 outline-none focus:ring-1 focus:ring-white/20"></input>
                    </button>

                </motion.div>
                <motion.div
                    variants={iconBubbleVariants}
                    initial="collapsed"
                    animate={isExpanded ? "expanded" : "collapsed"}
                    className='absolute top-1/2 left-[calc(50%-170px-4px)] w-[38px] h-[38px] bg-[#1e1e1e] border border-[#333] rounded-full -translate-y-1/2 flex items-center justify-center pointer-events-none'>
                    <SearchIcon className="w-5 h-5 text-white" strokeWidth={2} />
                </motion.div>
            </div>
        </div>

    );
}
