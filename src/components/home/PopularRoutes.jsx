<div
                      className="absolute
                        -bottom-18
                        left-1/2
                        z-40
                        flex
                        -translate-x-1/2
                        items-center
                        gap-2"
                    >
                      {heroSlides.map((item, index) => {
                        const active = index === activeIndex;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            aria-label={`Go to ${item.type} slide`}
                            onClick={() => {
                              swiperRef.current?.slideToLoop(index);
                            }}
                            className="
                              flex
                              h-6
                              w-6
                              items-center
                              justify-center
                            "
                          >
                            <span
                              className={`
                                block
                                rounded-full
                                transition-all
                                duration-500
                                ${
                                  active
                                    ? "h-2.5 w-2.5 bg-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.65)]"
                                    : "h-2 w-2 bg-white/35 hover:bg-white/70"
                                }
                              `}
                            />
                          </button>
                        );
                      })}
                    </div>