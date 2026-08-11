"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Cloud,
  fetchSimpleIcons,
  type ICloud,
  renderSimpleIcon,
  type SimpleIcon,
} from "react-icon-cloud"

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
  },
  options: {
    reverse: true,
    depth: 0.75,
    wheelZoom: false,
    imageScale: 2.2,
    activeCursor: "pointer",
    tooltip: "native",
    initial: [0.05, -0.05],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.02,
    minSpeed: 0.008,
  },
}

export const renderCustomIcon = (icon: SimpleIcon) => {
  return renderSimpleIcon({
    icon,
    bgHex: "#ffffff",
    fallbackHex: "#111111",
    minContrastRatio: 1.2,
    size: 44,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  })
}

export type DynamicCloudProps = {
  iconSlugs: string[]
}

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>

export function IconCloud({ iconSlugs }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null)

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs })
      .then(setData)
      .catch((err) => console.error("IconCloud error loading icons:", err))
  }, [iconSlugs])

  const renderedIcons = useMemo(() => {
    if (!data || !data.simpleIcons) return null

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon),
    )
  }, [data])

  if (!renderedIcons) {
    return (
      <div className="w-full h-full flex items-center justify-center text-black/30 text-xs font-mono uppercase tracking-widest">
        LOADING TECH STACK...
      </div>
    )
  }

  return (
    // @ts-ignore
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  )
}
