import { services } from "@/lib/content";
import { IconHover3D } from "@/components/ui/icon-hover-3d";

const iconProps = {
  width: "100%",
  height: "100%",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function PenNibIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 2 L20 10 L12 22 L4 10 Z" />
      <path d="M12 2 L12 22" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3 8 H8 L9.5 5.5 H14.5 L16 8 H21 V19 H3 Z" />
      <circle cx="12" cy="13.2" r="3.8" />
    </svg>
  );
}

function BrowserIcon() {
  return (
    <svg {...iconProps}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" />
      <path d="M2.5 8.5 L21.5 8.5" />
      <path d="M9.5 13 L7 15.2 L9.5 17.4" />
      <path d="M14.5 13 L17 15.2 L14.5 17.4" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 2.5 L21 7.5 V16.5 L12 21.5 L3 16.5 V7.5 Z" />
      <path d="M3 7.5 L12 12.5 L21 7.5" />
      <path d="M12 12.5 L12 21.5" />
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3 10 V14 H6 L15 19 V5 L6 10 Z" />
      <path d="M15 5 L21 3 V21 L15 19" />
      <path d="M6 14 L7.5 19.5" />
    </svg>
  );
}

const icons = [PenNibIcon, CameraIcon, BrowserIcon, PackageIcon, MegaphoneIcon];

export function Services() {
  return (
    <section id="services" className="border-t border-neutral-900 px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[13px] tracking-[0.15em] text-neutral-500">Services</p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = icons[i % icons.length];
            const isLastOdd = i === services.length - 1 && services.length % 2 === 1;
            return (
              <div
                key={service.title}
                className={isLastOdd ? "md:col-span-2 md:flex md:justify-center" : undefined}
              >
                <IconHover3D
                  heading={service.title}
                  text={service.description}
                  icon={<Icon />}
                  width={isLastOdd ? 560 : "100%"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
