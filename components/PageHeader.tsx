import Image from "next/image"
import AirshyreLogoWhite from "../images/airshyre_white.svg"
import { AiOutlineLine } from "react-icons/ai"
import React from "react"
import Link from "next/link"
import { SocialIcons } from "./SocialIcons"
import { useScrollHeight } from "../hooks/useScrollHeight"
import { BurgerButton } from "./BurgerButton"
import {
  createNumberClamper,
  createNumberRangeTransform,
  capitalize,
} from "../utils/index"
import * as F from "fp-ts"
import { darken, rgba } from "polished"
import { useMenu } from "../stores/useMenu"
import { PostsOrPages } from "@tryghost/content-api"

type Props = { isDynamic?: boolean; pages?: PostsOrPages }

const useStyles = (props: Props) => {
  const scrollHeight = useScrollHeight()
  const scrollCompletionRatio = F.function.pipe(
    scrollHeight,
    createNumberRangeTransform([0, 100], [0, 1]),
    createNumberClamper([0, 1])
  )
  const isScrollComplete = scrollCompletionRatio === 1
  const headerMargin = F.function.pipe(
    scrollHeight,
    createNumberRangeTransform([0, 50], [1.5, 0]),
    (val: number) => Math.exp(val),
    createNumberClamper([0, 1.5])
  )

  const wrapperClassName = React.useMemo(() => {
    let baseStyle =
      "duration-150 px-4 sm:mt-0 sm:px-8 flex lg:mb-16 justify-center items-end w-full fixed z-50"
    if ((props.isDynamic && isScrollComplete) || !props.isDynamic) {
      baseStyle += "border-b border-gray-200 shadow"
    }
    if (props.isDynamic) {
      baseStyle += "-mt-6"
    }
    return baseStyle
  }, [isScrollComplete, props.isDynamic])

  const wrapperStyle = React.useMemo(() => {
    return {
      paddingTop: props.isDynamic ? `${headerMargin}rem` : 0,
      backgroundColor: rgba(
        255,
        255,
        255,
        props.isDynamic ? scrollCompletionRatio : 1
      ),
      color: darken(props.isDynamic ? scrollCompletionRatio : 1, "#fff"),
    }
  }, [headerMargin, props.isDynamic, scrollCompletionRatio])

  return { wrapper: { className: wrapperClassName, style: wrapperStyle } }
}

export const PageHeader = (props: Props) => {
  const toggleMenuIsOpen = useMenu((s) => s.toggleIsOpen)
  const styles = useStyles(props)
  return (
    <div>
      <div style={styles.wrapper.style} className={styles.wrapper.className}>
        <div
          className="w-full flex items-center justify-between h-16"
          style={{ maxWidth: "56rem", width: "56rem" }}
        >
          <Link href="/" passHref={true}>
            <div
              className={`transition cursor-pointer select-none sm:w-auto mt-2 ${
                (props.isDynamic && isScrollComplete) || !props.isDynamic
                  ? "invert"
                  : ""
              }`}
            >
              <Image
                src={AirshyreLogoWhite}
                alt="Airshyre Logo"
                height={20}
                width={170}
              />
            </div>
          </Link>
          <div className="block md:hidden">
            <BurgerButton isOpen={false} onClick={toggleMenuIsOpen} />
          </div>
          <div className="md:flex hidden">
            <div className="flex items-center space-x-6">
              {[
                { title: "home", href: "/" },
                { title: "music", href: "/music" },
                { title: "videos", href: "/videos" },
                { title: "bio", href: "/bio" },
                { title: "contact", href: "/contact" },
              ].map((page) => {
                return (
                  <Link href={page.href} passHref={true} key={page.title}>
                    <span
                      className={`${
                        isScrollComplete
                          ? "hover:text-gray-400"
                          : "hover:text-gray-300"
                      } inherit hover:cursor-pointer`}
                    >
                      {capitalize(page.title)}
                    </span>
                  </Link>
                )
              })}
            </div>
            <AiOutlineLine className="transform rotate-90 w-8 h-8 mx-4 opacity-50" />
            <SocialIcons />
          </div>
        </div>
      </div>
      {props.isDynamic ? null : <div className="h-16"></div>}{" "}
      {/* Spacer Element */}
    </div>
  )
}

export default PageHeader
