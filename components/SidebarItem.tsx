import Link from "next/link"
import { twMerge } from 'tailwind-merge'
import { IconType } from "react-icons"

interface SidebarItemProps {
  icon: IconType
  active?: boolean
  href: string
  label: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  active,
  href,
  icon: Icon,
  label
}) => {
  return (
    <Link href={href} className={twMerge(`
    flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white
    transition text-neutral-400 py-1`, active && "text-white")}>
      <Icon size={32} />
      <p className="truncate w-full">{label}</p>
    </Link>
  )
}

export default SidebarItem