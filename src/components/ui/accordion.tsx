import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

// ── Context ──────────────────────────────────────────────────────────────────
type AccordionContextValue = {
  value: string | string[]
  type: "single" | "multiple"
  onValueChange: (val: string) => void
  collapsible: boolean
}

const AccordionContext = React.createContext<AccordionContextValue>({
  value: "",
  type: "single",
  onValueChange: () => {},
  collapsible: false,
})

const AccordionItemContext = React.createContext<{ value: string; isOpen: boolean }>({
  value: "",
  isOpen: false,
})

// ── Types ────────────────────────────────────────────────────────────────────
type AccordionSingleProps = {
  type: "single"
  collapsible?: boolean
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
  children: React.ReactNode
}

type AccordionMultipleProps = {
  type: "multiple"
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  className?: string
  children: React.ReactNode
}

type AccordionProps = AccordionSingleProps | AccordionMultipleProps

// ── Components ───────────────────────────────────────────────────────────────
function Accordion(props: AccordionProps) {
  const [internalValue, setInternalValue] = React.useState<string | string[]>(
    (props as any).defaultValue ?? (props.type === "multiple" ? [] : "")
  )

  const value = (props as any).value !== undefined ? (props as any).value : internalValue

  const handleChange = (val: string) => {
    if (props.type === "multiple") {
      const arr = Array.isArray(value) ? value : []
      const newVal = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]
      setInternalValue(newVal)
      ;(props as AccordionMultipleProps).onValueChange?.(newVal)
    } else {
      const collapsible = (props as AccordionSingleProps).collapsible ?? false
      const newVal = collapsible && value === val ? "" : val
      setInternalValue(newVal)
      ;(props as AccordionSingleProps).onValueChange?.(newVal as string)
    }
  }

  return (
    <AccordionContext.Provider
      value={{
        value,
        type: props.type,
        onValueChange: handleChange,
        collapsible: (props as any).collapsible ?? false,
      }}
    >
      <div className={props.className}>{props.children}</div>
    </AccordionContext.Provider>
  )
}

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ value, className, children, ...props }, ref) => {
  const ctx = React.useContext(AccordionContext)
  const isOpen = Array.isArray(ctx.value)
    ? ctx.value.includes(value)
    : ctx.value === value

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div ref={ref} className={cn("border-b", className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
})
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const ctx = React.useContext(AccordionContext)
  const { value, isOpen } = React.useContext(AccordionItemContext)

  return (
    <div className="flex">
      <button
        ref={ref}
        type="button"
        aria-expanded={isOpen}
        onClick={() => ctx.onValueChange(value)}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
    </div>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { isOpen } = React.useContext(AccordionItemContext)

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden text-sm transition-all duration-200 ease-in-out",
        isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0" // max-h-[2000px] is intentional for smooth accordion animation
      )}
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </div>
  )
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
