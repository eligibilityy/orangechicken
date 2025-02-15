"use client";

import { useEffect, useRef } from "react";
import { useLanyardWS } from "use-lanyard";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SmallSkeleton } from "./Skeleton";
import { FaDiscord, FaSpotify, FaGamepad, FaKeyboard } from "react-icons/fa";
import gsap from "gsap";

const DISCORD_ID = "997063531763617803";

const Discord = () => {
  const discordRef = useRef(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const lanyard = useLanyardWS(DISCORD_ID);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      gsap.from(discordRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2 // Slight delay after weather widget
      });

      // Add hover effect
      const card = cardRef.current;
      const handleMouseMove = (e: MouseEvent) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        gsap.to(card, {
          rotateX,
          rotateY,
          duration: 0.5,
          ease: "power2.out",
          transformPerspective: 1000
        });

        // Animate avatar
        gsap.to(".discord-avatar", {
          x: (x - centerX) / 15,
          y: (y - centerY) / 15,
          duration: 0.5,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        if (!card) return;
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out"
        });
        gsap.to(".discord-avatar", {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      };

      if (card) {
        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        if (card) {
          card.removeEventListener("mousemove", handleMouseMove);
          card.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    });

    return () => ctx.revert();
  }, []);

  if (!lanyard) return <SmallSkeleton />;

  const status = lanyard.discord_status ?? "offline";
  const getStatusColor = (status: string) => {
    const colors = {
      online: "bg-green-500",
      idle: "bg-yellow-500",
      dnd: "bg-red-500",
      offline: "bg-gray-500"
    } as const;
    return colors[status as keyof typeof colors] || colors.offline;
  };

  const getStatusText = (status: string) => {
    const texts = {
      online: "Online",
      idle: "Idle",
      dnd: "Do Not Disturb",
      offline: "Offline"
    } as const;
    return texts[status as keyof typeof texts] || "Offline";
  };

  const getActivityIcon = (activity: any) => {
    if (activity.type === 2 && activity.name === "Spotify") return FaSpotify;
    if (activity.type === 0) return FaGamepad; // Playing Game
    return FaKeyboard; // Default/Custom Activity
  };

  const getActivityContent = () => {
    if (!lanyard.activities?.length) return null;
    
    return (
      <div className="mt-4 space-y-4">
        <div className="space-y-3">
          {lanyard.activities.map((activity, index) => {
            const IconComponent = getActivityIcon(activity);
            
            if (activity.type === 2 && activity.name === "Spotify") {
              return (
                <div key={index} className="group relative overflow-hidden rounded-lg bg-background/50 p-4 transition-all hover:bg-background/80">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="flex items-center gap-4">
                    {activity.assets?.large_image ? (
                      <img
                        src={activity.assets.large_image.replace("spotify:", "https://i.scdn.co/image/")}
                        alt="Album Art"
                        className="h-16 w-16 rounded-md shadow-md transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted">
                        <FaSpotify className="h-8 w-8 text-green-500" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <FaSpotify className="h-4 w-4 text-green-500" />
                        <p className="text-xs font-medium text-muted-foreground">Spotify</p>
                      </div>
                      <p className="mt-1 font-medium truncate">{activity.details}</p>
                      <p className="text-sm text-muted-foreground truncate">by {activity.state}</p>
                      <p className="text-xs text-muted-foreground truncate">on {activity.assets?.large_text}</p>
                    </div>
                  </div>
                </div>
              );
            }

            return activity.name && (
              <div key={index} className="group relative overflow-hidden rounded-lg bg-background/50 p-4 transition-all hover:bg-background/80">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{activity.name}</p>
                    {(activity.details || activity.state) && (
                      <div className="mt-1 flex flex-col gap-1">
                        {activity.details && (
                          <p className="text-sm text-muted-foreground truncate">{activity.details}</p>
                        )}
                        {activity.state && (
                          <p className="text-sm text-muted-foreground truncate">{activity.state}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div ref={discordRef}>
      <Card
        ref={cardRef}
        className="overflow-hidden backdrop-blur-sm bg-gradient-to-br from-background/50 to-muted/50 border-muted/20"
      >
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative discord-avatar">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={`https://cdn.discordapp.com/avatars/${DISCORD_ID}/${lanyard.discord_user.avatar}`}
                  alt="Discord Avatar"
                />
                <AvatarFallback>
                  <FaDiscord className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-background ${getStatusColor(
                  status
                )}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{lanyard.discord_user.username}</p>
              <p className="text-sm text-muted-foreground truncate">
                {getStatusText(status)}
              </p>
            </div>
          </div>
          {getActivityContent()}
        </div>
      </Card>
    </div>
  );
};

export default Discord;
