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

const borderlessCard: React.CSSProperties = { border: "none", padding: 0, backgroundColor: "transparent" };

export function Services() {
  const topRow = services.slice(0, 3);
  const bottomRow = services.slice(3, 5);

  return (
    <section id="services" className="border-t border-neutral-900 px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[13px] tracking-[0.15em] text-neutral-500">Services</p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-6">
          {topRow.map((service, i) => {
            const Icon = icons[i];
            return (
              <div key={service.title} className="col-span-full sm:col-span-3 lg:col-span-2">
                <IconHover3D
                  heading={service.title}
                  text={service.description}
                  icon={<Icon />}
                  vertical
                  centered
                  ringed
                  iconSize={90}
                  className="min-h-[280px]"
                />
              </div>
            );
          })}

          {bottomRow.map((service, i) => {
            const Icon = icons[i + 3];
            return (
              <div
                key={service.title}
                className="col-span-full overflow-hidden rounded-xl border border-neutral-800 lg:col-span-3"
              >
                <div className="grid sm:grid-cols-2">
                  <div className="p-6">
                    <IconHover3D
                      heading={service.title}
                      text={service.description}
                      icon={<Icon />}
                      vertical
                      style={borderlessCard}
                    />
                  </div>
                  <div className="flex min-h-[180px] items-center justify-center border-t border-neutral-800 p-6 sm:border-l sm:border-t-0">
                    <IconHover3D icon={<Icon />} iconSize={140} style={borderlessCard} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
