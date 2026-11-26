

import Image from "next/image"
import Link from "next/link"

export default function BrandLogo({ logo, logoAlt, linkTo } : { linkTo: string, logo: string, logoAlt: string }) {

    return (
        <Link
            href={linkTo}
            className="flex shrink-0 items-center rounded-md"
        >
            <Image
                src={logo ||""}
                alt={logoAlt || ""}
                width={570}
                height={190}
                sizes="(min-width: 640px) 190px, 155px"
                className="h-auto w-[155px] object-contain sm:w-[190px]"
            />
        </Link>
    )
}
