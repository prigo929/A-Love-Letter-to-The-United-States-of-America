import type { StaticImageData } from "next/image";

import asset000 from "@/IMAGES/Cities/Atlanta Downtown at Sunset View.jpg";
import asset001 from "@/IMAGES/Cities/Austin Texas Capitol between trees.jpg";
import asset002 from "@/IMAGES/Cities/Austin Texas.jpg";
import asset003 from "@/IMAGES/Cities/Chicago Downtown portrait.jpg";
import asset004 from "@/IMAGES/Cities/Chicago Skyline and Grid at Sunset.jpg";
import asset005 from "@/IMAGES/Cities/Crystal Falls, MI Downtown Elevated View of Steep Valley Forest and Highway.jpg";
import asset006 from "@/IMAGES/Cities/Dallas with the interstate and downtown.jpg";
import asset007 from "@/IMAGES/Cities/Des Moines, IA Downtown Elevated View of Townhomes River and Arch Bridge.jpg";
import asset008 from "@/IMAGES/Cities/Girl walking Seattle Bloosoming japanese pink trees.jpg";
import asset009 from "@/IMAGES/Cities/Golden Gate Bridge.jpg";
import asset010 from "@/IMAGES/Cities/Greenpoint, New York view of the street.jpg";
import asset011 from "@/IMAGES/Cities/Manhattan One World Trade Center Close-up.jpg";
import asset012 from "@/IMAGES/Cities/Manhattan.jpg";
import asset013 from "@/IMAGES/Cities/New York City Central Park.jpg";
import asset014 from "@/IMAGES/Cities/New York Skyline at sunset.jpg";
import asset015 from "@/IMAGES/Cities/Nice Building in Savannah GA with GA Flag.jpg";
import asset016 from "@/IMAGES/Cities/Seattle Skyline Day.jpg";
import asset017 from "@/IMAGES/Cities/Seattle Skyline at Night.jpg";
import asset018 from "@/IMAGES/Cities/Universal Studios Holywood Entrance.jpg";
import asset019 from "@/IMAGES/Cities/home-nyc-skyline.jpg";
import asset020 from "@/IMAGES/Constitution/Huntington town meeting.jpg";
import asset021 from "@/IMAGES/Constitution/National Archives Bill of Rights.jpg";
import asset022 from "@/IMAGES/Constitution/We The People Wooden Background.jpg";
import asset023 from "@/IMAGES/Constitution/brain photo.jpg";
import asset024 from "@/IMAGES/Constitution/the-new-york-public-library-L3D6oyQO6Do-unsplash.jpg";
import asset025 from "@/IMAGES/Constitution/usa-independence-day-composition-with-declaration.jpg";
import asset026 from "@/IMAGES/Constitution/usa-independence-day-concept-with-declaration-independence.jpg";
import asset027 from "@/IMAGES/Constitution/virginia-commonwealth-university-libraries-A4GofghogeQ-unsplash.jpg";
import asset028 from "@/IMAGES/Culture/American Burger.jpg";
import asset029 from "@/IMAGES/Culture/Cinderella Castle at Disney World Orlando.jpg";
import asset030 from "@/IMAGES/Culture/Police K9 on top of Police Car.jpg";
import asset031 from "@/IMAGES/Culture/Statue Of Liberty.jpg";
import asset032 from "@/IMAGES/Economy/100 dollar bill.jpg";
import asset033 from "@/IMAGES/Economy/New York Stock Exchange.jpg";
import asset034 from "@/IMAGES/Economy/adam-nir-wTO6MWpMrJk-unsplash.jpg";
import asset035 from "@/IMAGES/Economy/economy-dollar.jpg";
import asset036 from "@/IMAGES/Economy/economy-growth.jpg";
import asset037 from "@/IMAGES/Economy/economy-nyse-upside-down.jpg";
import asset038 from "@/IMAGES/Economy/economy-port.jpg";
import asset039 from "@/IMAGES/Economy/economy-trade-skyline.jpg";
import asset040 from "@/IMAGES/Economy/paul-alain-hunt-_QhDyjKpQQI-unsplash.jpg";
import asset041 from "@/IMAGES/Education/Columbia University.jpg";
import asset042 from "@/IMAGES/Education/harvard-campus.jpg";
import asset043 from "@/IMAGES/Housing/Florida Suburban Houses.jpg";
import asset044 from "@/IMAGES/Housing/Suburb in Indiana Autumn 2.jpeg";
import asset045 from "@/IMAGES/Housing/Suburb in Indiana Autumn 3.jpeg";
import asset046 from "@/IMAGES/Housing/Suburb in Indiana Autumn 4.jpeg";
import asset047 from "@/IMAGES/Housing/Suburb in Indiana Autumn 5.jpeg";
import asset048 from "@/IMAGES/Housing/Suburb in Indiana Autumn 6.jpeg";
import asset049 from "@/IMAGES/Housing/Suburb in Indiana Autumn.jpeg";
import asset050 from "@/IMAGES/Housing/US Suburb from air.jpg";
import asset051 from "@/IMAGES/Housing/USA Suburb house.jpg";
import asset052 from "@/IMAGES/Housing/USA Suburb sunset.jpg";
import asset053 from "@/IMAGES/Housing/nature in suburb spring.jpeg";
import asset054 from "@/IMAGES/Housing/nature in suburb winter.jpeg";
import asset055 from "@/IMAGES/Housing/nature in suburb.jpeg";
import asset056 from "@/IMAGES/Housing/quality-of-life-house.jpg";
import asset057 from "@/IMAGES/Infrastructure/Flordia Keys Highway.jpg";
import asset058 from "@/IMAGES/Infrastructure/I-110 and I-115 Interchange Los Angeles.jpg";
import asset059 from "@/IMAGES/Landscapes/Blue Ridge Mountains, Western North Carolina.jpg";
import asset060 from "@/IMAGES/Landscapes/Chattanooga, TN Moccasin Bend Elevated View of River Bend Forest and Highway.jpg";
import asset061 from "@/IMAGES/Landscapes/Glacier National Park.jpg";
import asset062 from "@/IMAGES/Landscapes/Grand Canyon National Park Cave.jpg";
import asset063 from "@/IMAGES/Landscapes/Grand Canyon National Park.jpg";
import asset064 from "@/IMAGES/Landscapes/Grand Teton National Park.jpg";
import asset065 from "@/IMAGES/Landscapes/Mississippi River running through Minneapolis .jpg";
import asset066 from "@/IMAGES/Landscapes/Mount Denali National Park.jpg";
import asset067 from "@/IMAGES/Landscapes/Saguaro National Park, United States Desert.jpg";
import asset068 from "@/IMAGES/Landscapes/Sequoia National Park.jpg";
import asset069 from "@/IMAGES/Landscapes/Theodore Roosevelt National Park, North Dakota.jpg";
import asset070 from "@/IMAGES/Landscapes/Tunnel View Yosemite National Park.jpg";
import asset071 from "@/IMAGES/Landscapes/Yellowstone National Park.jpg";
import asset072 from "@/IMAGES/Landscapes/Yosemite National Park Road.jpg";
import asset073 from "@/IMAGES/Landscapes/Yosemite National Park.jpg";
import asset074 from "@/IMAGES/Landscapes/Zion National Park.jpg";
import asset075 from "@/IMAGES/Landscapes/colorado-river-in-the-grand-canyon.jpg";
import asset076 from "@/IMAGES/Landscapes/the-great-lakes-with-chicago.jpg";
import asset077 from "@/IMAGES/Leadership/global-leadership.jpg";
import asset078 from "@/IMAGES/Military/Air Force/B-1B Lancer Flying.jpg";
import asset079 from "@/IMAGES/Military/Air Force/B-2 Spirit Bomber.jpg";
import asset080 from "@/IMAGES/Military/Air Force/B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing.jpg";
import asset081 from "@/IMAGES/Military/Air Force/Bell X-1 in flight.jpg";
import asset082 from "@/IMAGES/Military/Air Force/Boeing C-17 Globemaster III_aircraft_over_over_the_Blue_Ridge_Mountains_2005.jpg";
import asset083 from "@/IMAGES/Military/Air Force/F-117 Nighthawk strikes Baghdad.jpg";
import asset084 from "@/IMAGES/Military/Air Force/F-15EX Eagle II.jpg";
import asset085 from "@/IMAGES/Military/Air Force/F-16 Fighting Falcon.jpg";
import asset086 from "@/IMAGES/Military/Air Force/F-86 vs MiG 15.jpg";
import asset087 from "@/IMAGES/Military/Air Force/KC-135R Stratotanker refuels an F-15C Eagle.jpg";
import asset088 from "@/IMAGES/Military/Air Force/KC-46 Pegasus.jpg";
import asset089 from "@/IMAGES/Military/Air Force/Lockheed Martin C-130 Hercules.jpg";
import asset090 from "@/IMAGES/Military/Air Force/US Air Force B-21.jpg";
import asset091 from "@/IMAGES/Military/Air Force/Wright Brothers First Flight at Kitty Hawk.jpg";
import asset092 from "@/IMAGES/Military/Air Force/desert-storm-iraqi-tank-burning-oil-wells.jpg";
import asset093 from "@/IMAGES/Military/Air Force/us-air-force-ac130-flares.jpg";
import asset094 from "@/IMAGES/Military/Air Force/us-air-force-ac130j-ghostrider-flight.jpg";
import asset095 from "@/IMAGES/Military/Air Force/us-air-force-b21-raider-flight.jpg";
import asset096 from "@/IMAGES/Military/Air Force/us-air-force-c130-hercules-dirt-takeoff.jpg";
import asset097 from "@/IMAGES/Military/Air Force/us-air-force-c17-globemaster-nose.jpg";
import asset098 from "@/IMAGES/Military/Air Force/us-air-force-cyber-ops.jpg";
import asset099 from "@/IMAGES/Military/Air Force/us-air-force-desert-storm.jpg";
import asset100 from "@/IMAGES/Military/Air Force/us-air-force-f22-raptor-close.jpg";
import asset101 from "@/IMAGES/Military/Air Force/us-air-force-f22-raptor-formation.jpg";
import asset102 from "@/IMAGES/Military/Air Force/us-air-force-f22-raptor-sonic-boom.jpg";
import asset103 from "@/IMAGES/Military/Air Force/us-air-force-f22-raptors-flight-view.jpg";
import asset104 from "@/IMAGES/Military/Air Force/us-air-force-f35-lightning.jpg";
import asset105 from "@/IMAGES/Military/Air Force/us-air-force-minuteman-iii-launch.jpg";
import asset106 from "@/IMAGES/Military/Air Force/us-air-force-personnel-c17-globemaster.jpg";
import asset107 from "@/IMAGES/Military/Air Force/us-air-force-pilot-cockpit-selfie.jpg";
import asset108 from "@/IMAGES/Military/Air Force/us-air-force-yfq42a-drone-runway.jpg";
import asset109 from "@/IMAGES/Military/Air Force/us-military-kc130j-super-hercules.jpg";
import asset110 from "@/IMAGES/Military/Army/us-army-abrams-tank-desert.jpg";
import asset111 from "@/IMAGES/Military/Army/us-army-soldier-closeup.jpg";
import asset112 from "@/IMAGES/Military/Army/us-army-soldier-m4-carbine.jpeg";
import asset113 from "@/IMAGES/Military/Army/us-army-soldiers-flag.jpg";
import asset114 from "@/IMAGES/Military/Army/us-army-soldiers-saluting.jpg";
import asset115 from "@/IMAGES/Military/Coast Guard/US Coast Guard.jpg";
import asset116 from "@/IMAGES/Military/Global Bases/Al Dhafra Air Base.jpeg";
import asset117 from "@/IMAGES/Military/Global Bases/Al_Udeid_Air_Base.jpg";
import asset118 from "@/IMAGES/Military/Global Bases/Ali Al Salem Air Base.jpg";
import asset119 from "@/IMAGES/Military/Global Bases/Andersen Air Force Base.jpg";
import asset120 from "@/IMAGES/Military/Global Bases/Camp Humphreys Base.jpg";
import asset121 from "@/IMAGES/Military/Global Bases/Camp Lemonnier.jpg";
import asset122 from "@/IMAGES/Military/Global Bases/Clear Space Force Station.jpg";
import asset123 from "@/IMAGES/Military/Global Bases/Diego Garcia Base.jpeg";
import asset124 from "@/IMAGES/Military/Global Bases/Eielson Air Force Base.jpg";
import asset125 from "@/IMAGES/Military/Global Bases/Eloy Alfaro Air Base Manta, Ecuador Base.jpg";
import asset126 from "@/IMAGES/Military/Global Bases/Fort_Bragg : Liberty.jpg";
import asset127 from "@/IMAGES/Military/Global Bases/Kadena_Air_Base_Aerial_photograph_1977.jpg";
import asset128 from "@/IMAGES/Military/Global Bases/Naval Air Station Sigonella.jpg";
import asset129 from "@/IMAGES/Military/Global Bases/Naval Station Guantanamo Bay.jpg";
import asset130 from "@/IMAGES/Military/Global Bases/Naval Station Norfolk.jpg";
import asset131 from "@/IMAGES/Military/Global Bases/Naval Support Activity Bahrain Base.jpg";
import asset132 from "@/IMAGES/Military/Global Bases/Thule : Pituffik Space Base.jpg";
import asset133 from "@/IMAGES/Military/Global Bases/Yokosuka Naval Base.jpeg";
import asset134 from "@/IMAGES/Military/Global Bases/arabian_gulf_nsa_bahrain.jpg";
import asset135 from "@/IMAGES/Military/Global Bases/atlantic_naval_station_norfolk.jpg";
import asset136 from "@/IMAGES/Military/Global Bases/aviano_air_base.jpg";
import asset137 from "@/IMAGES/Military/Global Bases/indo_pacific_joint_base_pearl_harbor_hickam.jpg";
import asset138 from "@/IMAGES/Military/Global Bases/mediterranean_naval_station_rota.jpg";
import asset139 from "@/IMAGES/Military/Global Bases/naval_station_rota.jpg";
import asset140 from "@/IMAGES/Military/Global Bases/pacific_naval_base_san_diego.jpg";
import asset141 from "@/IMAGES/Military/Global Bases/raf_lakenheath.jpeg";
import asset142 from "@/IMAGES/Military/Global Bases/ramstein_air_base.jpg";
import asset143 from "@/IMAGES/Military/Global Bases/spangdahlem_air_base.jpg";
import asset144 from "@/IMAGES/Military/Global Bases/western_pacific_fleet_activities_yokosuka.jpg";
import asset145 from "@/IMAGES/Military/Marines/us-marines-amphibious-assault.jpg";
import asset146 from "@/IMAGES/Military/Navy/Abraham-Lincoln-battlegroup.jpg";
import asset147 from "@/IMAGES/Military/Navy/Battle_of_Midway,_June_1942_(23902373581).jpg";
import asset148 from "@/IMAGES/Military/Navy/ContinentalNavyShipColumbus.jpg";
import asset149 from "@/IMAGES/Military/Navy/FA-18 Super Hornet.jpg";
import asset150 from "@/IMAGES/Military/Navy/Great_White_Fleet_return2.jpg";
import asset151 from "@/IMAGES/Military/Navy/Missouri.missile02.jpg";
import asset152 from "@/IMAGES/Military/Navy/P-3A_VP-44_over_USS_Barry_(DD-933)_and_Metallurg_Anosov_during_Cuban_Missile_Crisis_1962.jpg";
import asset153 from "@/IMAGES/Military/Navy/USS_Constitution_fires_a_17-gun_salute.jpg";
import asset154 from "@/IMAGES/Military/Navy/arleigh_burke_flight_iii_uss_jack_h_lucas.jpeg";
import asset155 from "@/IMAGES/Military/Navy/f_35c_lightning_ii_carrier_stealth_fighter.jpg";
import asset156 from "@/IMAGES/Military/Navy/hio_class_ssbn_uss_kentucky.jpg";
import asset157 from "@/IMAGES/Military/Navy/us-navy-aircraft-carrier-flight-deck.jpg";
import asset158 from "@/IMAGES/Military/Navy/us-navy-carrier-strike-group-formation.jpg";
import asset159 from "@/IMAGES/Military/Navy/us-navy-dual-carrier-strike-group.jpg";
import asset160 from "@/IMAGES/Military/Navy/us-navy-fa18f-super-hornet-landing.jpg";
import asset161 from "@/IMAGES/Military/Navy/us-navy-gerald-ford-carrier.jpg";
import asset162 from "@/IMAGES/Military/Navy/us-navy-ohio-class-submarine.jpg";
import asset163 from "@/IMAGES/Military/Navy/us-navy-ticonderoga-cruiser-san-diego.jpg";
import asset164 from "@/IMAGES/Military/Navy/uss_gerald_r_ford_ford_class_cvn.jpg";
import asset165 from "@/IMAGES/Military/Navy/uss_zumwalt_ddg_1000.jpg";
import asset166 from "@/IMAGES/Military/Navy/virginia_class_ssn_uss_minnesota.jpg";
import asset167 from "@/IMAGES/Military/Rockets/Mk 48 Torpedo.jpg";
import asset168 from "@/IMAGES/Military/Rockets/Phalanx CIWS.jpg";
import asset169 from "@/IMAGES/Military/Rockets/Tomahawk_Block_IV_cruise_missile_-crop.jpg";
import asset170 from "@/IMAGES/Military/Rockets/USS_John_Paul_Jones_(DDG-53)_launches_RIM-174_June_2014. Standard Missile 6 (SM-6).jpg";
import asset171 from "@/IMAGES/Military/SOCOM/us-army-socom-operators.jpg";
import asset172 from "@/IMAGES/Military/Space Force/Air Force Space Command Logo.jpg";
import asset173 from "@/IMAGES/Military/Space Force/GPS - Earth and Sattelite.jpg";
import asset174 from "@/IMAGES/Military/Space Force/Sputnik.jpg";
import asset175 from "@/IMAGES/Military/Space Force/US Space Force Guardians poster.jpg";
import asset176 from "@/IMAGES/Military/Space Force/US Space Force Launch poster.jpg";
import asset177 from "@/IMAGES/Military/Space Force/us-space-force-falcon9-launch.jpg";
import asset178 from "@/IMAGES/Science/A garden like arrangement of beautiful glowing soft corals in a dark tank.jpg";
import asset179 from "@/IMAGES/Science/DNA 3D.jpg";
import asset180 from "@/IMAGES/Science/SpaceX launch from Florida Cape Cod.jpeg";
import asset181 from "@/IMAGES/Science/SpaceX launch.jpg";
import asset182 from "@/IMAGES/Science/Wernher von Braun at his office with rocket replicas behind him.jpg";
import asset183 from "@/IMAGES/Science/ball of electricity on dark background.jpg";
import asset184 from "@/IMAGES/Science/science-lab.jpg";
import asset185 from "@/IMAGES/Science/spacex--p-KCm6xB9I-unsplash.jpg";
import asset186 from "@/IMAGES/Technology/Apple Headquarters.jpg";
import asset187 from "@/IMAGES/Technology/Apple Products.jpg";
import asset188 from "@/IMAGES/Technology/Fiber Optic Cable.jpg";
import asset189 from "@/IMAGES/Technology/MacBook Pro.jpg";
import asset190 from "@/IMAGES/Technology/PCB circuit board of electronic device.jpg";
import asset191 from "@/IMAGES/Technology/home-silicon-valley.jpg";
import asset192 from "@/IMAGES/Technology/iPhone saying Hello on dark background.jpg";
import asset193 from "@/IMAGES/Technology/iPhone saying Hello on wooden background.jpg";
import asset194 from "@/IMAGES/Technology/macro of a silicon wafer.jpg";
import asset195 from "@/IMAGES/Technology/silicon-valley-office.jpg";
import asset196 from "@/IMAGES/US Buildings/US Capitol Presidential Inauguration.jpg";
import asset197 from "@/IMAGES/US Buildings/US Capitol from 45 degree angle.jpg";
import asset198 from "@/IMAGES/US Buildings/US Capitol.jpg";
import asset199 from "@/IMAGES/US Flags/A soft Red White and Blue Light beam angled at 45 degrees on a Black Background.jpg";
import asset200 from "@/IMAGES/US Flags/USA Flag on pole modern.jpg";
import asset201 from "@/IMAGES/US Flags/brandon-mowinkel-H2b1a5WNSW0-unsplash.jpg";
import asset202 from "@/IMAGES/US Flags/dave-sherrill-48elRjHbXRY-unsplash.jpg";
import asset203 from "@/IMAGES/US Flags/jon-sailer-sHebYIu6XQ4-unsplash.jpg";
import asset204 from "@/IMAGES/US Flags/kevin-lanceplaine-WHtCDy2CGYU-unsplash.jpg";
import asset205 from "@/IMAGES/US Flags/luke-michael-Tdwu35bCUj0-unsplash.jpg";
import asset206 from "@/IMAGES/US Flags/michael-schofield-Cqncpa8nRRw-unsplash.jpg";
import asset207 from "@/IMAGES/US Flags/nelson-ndongala-gDRHfyeOq58-unsplash.jpg";
import asset208 from "@/IMAGES/USA from Space/Planet Earth.jpg";
import asset209 from "@/IMAGES/USA from Space/USA at night from Space.jpg";

export type GalleryAssetRecord = {
  path: string;
  src: StaticImageData;
};

export const GALLERY_ASSETS = [
  { path: "Cities/Atlanta Downtown at Sunset View.jpg", src: asset000 },
  { path: "Cities/Austin Texas Capitol between trees.jpg", src: asset001 },
  { path: "Cities/Austin Texas.jpg", src: asset002 },
  { path: "Cities/Chicago Downtown portrait.jpg", src: asset003 },
  { path: "Cities/Chicago Skyline and Grid at Sunset.jpg", src: asset004 },
  { path: "Cities/Crystal Falls, MI Downtown Elevated View of Steep Valley Forest and Highway.jpg", src: asset005 },
  { path: "Cities/Dallas with the interstate and downtown.jpg", src: asset006 },
  { path: "Cities/Des Moines, IA Downtown Elevated View of Townhomes River and Arch Bridge.jpg", src: asset007 },
  { path: "Cities/Girl walking Seattle Bloosoming japanese pink trees.jpg", src: asset008 },
  { path: "Cities/Golden Gate Bridge.jpg", src: asset009 },
  { path: "Cities/Greenpoint, New York view of the street.jpg", src: asset010 },
  { path: "Cities/Manhattan One World Trade Center Close-up.jpg", src: asset011 },
  { path: "Cities/Manhattan.jpg", src: asset012 },
  { path: "Cities/New York City Central Park.jpg", src: asset013 },
  { path: "Cities/New York Skyline at sunset.jpg", src: asset014 },
  { path: "Cities/Nice Building in Savannah GA with GA Flag.jpg", src: asset015 },
  { path: "Cities/Seattle Skyline Day.jpg", src: asset016 },
  { path: "Cities/Seattle Skyline at Night.jpg", src: asset017 },
  { path: "Cities/Universal Studios Holywood Entrance.jpg", src: asset018 },
  { path: "Cities/home-nyc-skyline.jpg", src: asset019 },
  { path: "Constitution/Huntington town meeting.jpg", src: asset020 },
  { path: "Constitution/National Archives Bill of Rights.jpg", src: asset021 },
  { path: "Constitution/We The People Wooden Background.jpg", src: asset022 },
  { path: "Constitution/brain photo.jpg", src: asset023 },
  { path: "Constitution/the-new-york-public-library-L3D6oyQO6Do-unsplash.jpg", src: asset024 },
  { path: "Constitution/usa-independence-day-composition-with-declaration.jpg", src: asset025 },
  { path: "Constitution/usa-independence-day-concept-with-declaration-independence.jpg", src: asset026 },
  { path: "Constitution/virginia-commonwealth-university-libraries-A4GofghogeQ-unsplash.jpg", src: asset027 },
  { path: "Culture/American Burger.jpg", src: asset028 },
  { path: "Culture/Cinderella Castle at Disney World Orlando.jpg", src: asset029 },
  { path: "Culture/Police K9 on top of Police Car.jpg", src: asset030 },
  { path: "Culture/Statue Of Liberty.jpg", src: asset031 },
  { path: "Economy/100 dollar bill.jpg", src: asset032 },
  { path: "Economy/New York Stock Exchange.jpg", src: asset033 },
  { path: "Economy/adam-nir-wTO6MWpMrJk-unsplash.jpg", src: asset034 },
  { path: "Economy/economy-dollar.jpg", src: asset035 },
  { path: "Economy/economy-growth.jpg", src: asset036 },
  { path: "Economy/economy-nyse-upside-down.jpg", src: asset037 },
  { path: "Economy/economy-port.jpg", src: asset038 },
  { path: "Economy/economy-trade-skyline.jpg", src: asset039 },
  { path: "Economy/paul-alain-hunt-_QhDyjKpQQI-unsplash.jpg", src: asset040 },
  { path: "Education/Columbia University.jpg", src: asset041 },
  { path: "Education/harvard-campus.jpg", src: asset042 },
  { path: "Housing/Florida Suburban Houses.jpg", src: asset043 },
  { path: "Housing/Suburb in Indiana Autumn 2.jpeg", src: asset044 },
  { path: "Housing/Suburb in Indiana Autumn 3.jpeg", src: asset045 },
  { path: "Housing/Suburb in Indiana Autumn 4.jpeg", src: asset046 },
  { path: "Housing/Suburb in Indiana Autumn 5.jpeg", src: asset047 },
  { path: "Housing/Suburb in Indiana Autumn 6.jpeg", src: asset048 },
  { path: "Housing/Suburb in Indiana Autumn.jpeg", src: asset049 },
  { path: "Housing/US Suburb from air.jpg", src: asset050 },
  { path: "Housing/USA Suburb house.jpg", src: asset051 },
  { path: "Housing/USA Suburb sunset.jpg", src: asset052 },
  { path: "Housing/nature in suburb spring.jpeg", src: asset053 },
  { path: "Housing/nature in suburb winter.jpeg", src: asset054 },
  { path: "Housing/nature in suburb.jpeg", src: asset055 },
  { path: "Housing/quality-of-life-house.jpg", src: asset056 },
  { path: "Infrastructure/Flordia Keys Highway.jpg", src: asset057 },
  { path: "Infrastructure/I-110 and I-115 Interchange Los Angeles.jpg", src: asset058 },
  { path: "Landscapes/Blue Ridge Mountains, Western North Carolina.jpg", src: asset059 },
  { path: "Landscapes/Chattanooga, TN Moccasin Bend Elevated View of River Bend Forest and Highway.jpg", src: asset060 },
  { path: "Landscapes/Glacier National Park.jpg", src: asset061 },
  { path: "Landscapes/Grand Canyon National Park Cave.jpg", src: asset062 },
  { path: "Landscapes/Grand Canyon National Park.jpg", src: asset063 },
  { path: "Landscapes/Grand Teton National Park.jpg", src: asset064 },
  { path: "Landscapes/Mississippi River running through Minneapolis .jpg", src: asset065 },
  { path: "Landscapes/Mount Denali National Park.jpg", src: asset066 },
  { path: "Landscapes/Saguaro National Park, United States Desert.jpg", src: asset067 },
  { path: "Landscapes/Sequoia National Park.jpg", src: asset068 },
  { path: "Landscapes/Theodore Roosevelt National Park, North Dakota.jpg", src: asset069 },
  { path: "Landscapes/Tunnel View Yosemite National Park.jpg", src: asset070 },
  { path: "Landscapes/Yellowstone National Park.jpg", src: asset071 },
  { path: "Landscapes/Yosemite National Park Road.jpg", src: asset072 },
  { path: "Landscapes/Yosemite National Park.jpg", src: asset073 },
  { path: "Landscapes/Zion National Park.jpg", src: asset074 },
  { path: "Landscapes/colorado-river-in-the-grand-canyon.jpg", src: asset075 },
  { path: "Landscapes/the-great-lakes-with-chicago.jpg", src: asset076 },
  { path: "Leadership/global-leadership.jpg", src: asset077 },
  { path: "Military/Air Force/B-1B Lancer Flying.jpg", src: asset078 },
  { path: "Military/Air Force/B-2 Spirit Bomber.jpg", src: asset079 },
  { path: "Military/Air Force/B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing.jpg", src: asset080 },
  { path: "Military/Air Force/Bell X-1 in flight.jpg", src: asset081 },
  { path: "Military/Air Force/Boeing C-17 Globemaster III_aircraft_over_over_the_Blue_Ridge_Mountains_2005.jpg", src: asset082 },
  { path: "Military/Air Force/F-117 Nighthawk strikes Baghdad.jpg", src: asset083 },
  { path: "Military/Air Force/F-15EX Eagle II.jpg", src: asset084 },
  { path: "Military/Air Force/F-16 Fighting Falcon.jpg", src: asset085 },
  { path: "Military/Air Force/F-86 vs MiG 15.jpg", src: asset086 },
  { path: "Military/Air Force/KC-135R Stratotanker refuels an F-15C Eagle.jpg", src: asset087 },
  { path: "Military/Air Force/KC-46 Pegasus.jpg", src: asset088 },
  { path: "Military/Air Force/Lockheed Martin C-130 Hercules.jpg", src: asset089 },
  { path: "Military/Air Force/US Air Force B-21.jpg", src: asset090 },
  { path: "Military/Air Force/Wright Brothers First Flight at Kitty Hawk.jpg", src: asset091 },
  { path: "Military/Air Force/desert-storm-iraqi-tank-burning-oil-wells.jpg", src: asset092 },
  { path: "Military/Air Force/us-air-force-ac130-flares.jpg", src: asset093 },
  { path: "Military/Air Force/us-air-force-ac130j-ghostrider-flight.jpg", src: asset094 },
  { path: "Military/Air Force/us-air-force-b21-raider-flight.jpg", src: asset095 },
  { path: "Military/Air Force/us-air-force-c130-hercules-dirt-takeoff.jpg", src: asset096 },
  { path: "Military/Air Force/us-air-force-c17-globemaster-nose.jpg", src: asset097 },
  { path: "Military/Air Force/us-air-force-cyber-ops.jpg", src: asset098 },
  { path: "Military/Air Force/us-air-force-desert-storm.jpg", src: asset099 },
  { path: "Military/Air Force/us-air-force-f22-raptor-close.jpg", src: asset100 },
  { path: "Military/Air Force/us-air-force-f22-raptor-formation.jpg", src: asset101 },
  { path: "Military/Air Force/us-air-force-f22-raptor-sonic-boom.jpg", src: asset102 },
  { path: "Military/Air Force/us-air-force-f22-raptors-flight-view.jpg", src: asset103 },
  { path: "Military/Air Force/us-air-force-f35-lightning.jpg", src: asset104 },
  { path: "Military/Air Force/us-air-force-minuteman-iii-launch.jpg", src: asset105 },
  { path: "Military/Air Force/us-air-force-personnel-c17-globemaster.jpg", src: asset106 },
  { path: "Military/Air Force/us-air-force-pilot-cockpit-selfie.jpg", src: asset107 },
  { path: "Military/Air Force/us-air-force-yfq42a-drone-runway.jpg", src: asset108 },
  { path: "Military/Air Force/us-military-kc130j-super-hercules.jpg", src: asset109 },
  { path: "Military/Army/us-army-abrams-tank-desert.jpg", src: asset110 },
  { path: "Military/Army/us-army-soldier-closeup.jpg", src: asset111 },
  { path: "Military/Army/us-army-soldier-m4-carbine.jpeg", src: asset112 },
  { path: "Military/Army/us-army-soldiers-flag.jpg", src: asset113 },
  { path: "Military/Army/us-army-soldiers-saluting.jpg", src: asset114 },
  { path: "Military/Coast Guard/US Coast Guard.jpg", src: asset115 },
  { path: "Military/Global Bases/Al Dhafra Air Base.jpeg", src: asset116 },
  { path: "Military/Global Bases/Al_Udeid_Air_Base.jpg", src: asset117 },
  { path: "Military/Global Bases/Ali Al Salem Air Base.jpg", src: asset118 },
  { path: "Military/Global Bases/Andersen Air Force Base.jpg", src: asset119 },
  { path: "Military/Global Bases/Camp Humphreys Base.jpg", src: asset120 },
  { path: "Military/Global Bases/Camp Lemonnier.jpg", src: asset121 },
  { path: "Military/Global Bases/Clear Space Force Station.jpg", src: asset122 },
  { path: "Military/Global Bases/Diego Garcia Base.jpeg", src: asset123 },
  { path: "Military/Global Bases/Eielson Air Force Base.jpg", src: asset124 },
  { path: "Military/Global Bases/Eloy Alfaro Air Base Manta, Ecuador Base.jpg", src: asset125 },
  { path: "Military/Global Bases/Fort_Bragg : Liberty.jpg", src: asset126 },
  { path: "Military/Global Bases/Kadena_Air_Base_Aerial_photograph_1977.jpg", src: asset127 },
  { path: "Military/Global Bases/Naval Air Station Sigonella.jpg", src: asset128 },
  { path: "Military/Global Bases/Naval Station Guantanamo Bay.jpg", src: asset129 },
  { path: "Military/Global Bases/Naval Station Norfolk.jpg", src: asset130 },
  { path: "Military/Global Bases/Naval Support Activity Bahrain Base.jpg", src: asset131 },
  { path: "Military/Global Bases/Thule : Pituffik Space Base.jpg", src: asset132 },
  { path: "Military/Global Bases/Yokosuka Naval Base.jpeg", src: asset133 },
  { path: "Military/Global Bases/arabian_gulf_nsa_bahrain.jpg", src: asset134 },
  { path: "Military/Global Bases/atlantic_naval_station_norfolk.jpg", src: asset135 },
  { path: "Military/Global Bases/aviano_air_base.jpg", src: asset136 },
  { path: "Military/Global Bases/indo_pacific_joint_base_pearl_harbor_hickam.jpg", src: asset137 },
  { path: "Military/Global Bases/mediterranean_naval_station_rota.jpg", src: asset138 },
  { path: "Military/Global Bases/naval_station_rota.jpg", src: asset139 },
  { path: "Military/Global Bases/pacific_naval_base_san_diego.jpg", src: asset140 },
  { path: "Military/Global Bases/raf_lakenheath.jpeg", src: asset141 },
  { path: "Military/Global Bases/ramstein_air_base.jpg", src: asset142 },
  { path: "Military/Global Bases/spangdahlem_air_base.jpg", src: asset143 },
  { path: "Military/Global Bases/western_pacific_fleet_activities_yokosuka.jpg", src: asset144 },
  { path: "Military/Marines/us-marines-amphibious-assault.jpg", src: asset145 },
  { path: "Military/Navy/Abraham-Lincoln-battlegroup.jpg", src: asset146 },
  { path: "Military/Navy/Battle_of_Midway,_June_1942_(23902373581).jpg", src: asset147 },
  { path: "Military/Navy/ContinentalNavyShipColumbus.jpg", src: asset148 },
  { path: "Military/Navy/FA-18 Super Hornet.jpg", src: asset149 },
  { path: "Military/Navy/Great_White_Fleet_return2.jpg", src: asset150 },
  { path: "Military/Navy/Missouri.missile02.jpg", src: asset151 },
  { path: "Military/Navy/P-3A_VP-44_over_USS_Barry_(DD-933)_and_Metallurg_Anosov_during_Cuban_Missile_Crisis_1962.jpg", src: asset152 },
  { path: "Military/Navy/USS_Constitution_fires_a_17-gun_salute.jpg", src: asset153 },
  { path: "Military/Navy/arleigh_burke_flight_iii_uss_jack_h_lucas.jpeg", src: asset154 },
  { path: "Military/Navy/f_35c_lightning_ii_carrier_stealth_fighter.jpg", src: asset155 },
  { path: "Military/Navy/hio_class_ssbn_uss_kentucky.jpg", src: asset156 },
  { path: "Military/Navy/us-navy-aircraft-carrier-flight-deck.jpg", src: asset157 },
  { path: "Military/Navy/us-navy-carrier-strike-group-formation.jpg", src: asset158 },
  { path: "Military/Navy/us-navy-dual-carrier-strike-group.jpg", src: asset159 },
  { path: "Military/Navy/us-navy-fa18f-super-hornet-landing.jpg", src: asset160 },
  { path: "Military/Navy/us-navy-gerald-ford-carrier.jpg", src: asset161 },
  { path: "Military/Navy/us-navy-ohio-class-submarine.jpg", src: asset162 },
  { path: "Military/Navy/us-navy-ticonderoga-cruiser-san-diego.jpg", src: asset163 },
  { path: "Military/Navy/uss_gerald_r_ford_ford_class_cvn.jpg", src: asset164 },
  { path: "Military/Navy/uss_zumwalt_ddg_1000.jpg", src: asset165 },
  { path: "Military/Navy/virginia_class_ssn_uss_minnesota.jpg", src: asset166 },
  { path: "Military/Rockets/Mk 48 Torpedo.jpg", src: asset167 },
  { path: "Military/Rockets/Phalanx CIWS.jpg", src: asset168 },
  { path: "Military/Rockets/Tomahawk_Block_IV_cruise_missile_-crop.jpg", src: asset169 },
  { path: "Military/Rockets/USS_John_Paul_Jones_(DDG-53)_launches_RIM-174_June_2014. Standard Missile 6 (SM-6).jpg", src: asset170 },
  { path: "Military/SOCOM/us-army-socom-operators.jpg", src: asset171 },
  { path: "Military/Space Force/Air Force Space Command Logo.jpg", src: asset172 },
  { path: "Military/Space Force/GPS - Earth and Sattelite.jpg", src: asset173 },
  { path: "Military/Space Force/Sputnik.jpg", src: asset174 },
  { path: "Military/Space Force/US Space Force Guardians poster.jpg", src: asset175 },
  { path: "Military/Space Force/US Space Force Launch poster.jpg", src: asset176 },
  { path: "Military/Space Force/us-space-force-falcon9-launch.jpg", src: asset177 },
  { path: "Science/A garden like arrangement of beautiful glowing soft corals in a dark tank.jpg", src: asset178 },
  { path: "Science/DNA 3D.jpg", src: asset179 },
  { path: "Science/SpaceX launch from Florida Cape Cod.jpeg", src: asset180 },
  { path: "Science/SpaceX launch.jpg", src: asset181 },
  { path: "Science/Wernher von Braun at his office with rocket replicas behind him.jpg", src: asset182 },
  { path: "Science/ball of electricity on dark background.jpg", src: asset183 },
  { path: "Science/science-lab.jpg", src: asset184 },
  { path: "Science/spacex--p-KCm6xB9I-unsplash.jpg", src: asset185 },
  { path: "Technology/Apple Headquarters.jpg", src: asset186 },
  { path: "Technology/Apple Products.jpg", src: asset187 },
  { path: "Technology/Fiber Optic Cable.jpg", src: asset188 },
  { path: "Technology/MacBook Pro.jpg", src: asset189 },
  { path: "Technology/PCB circuit board of electronic device.jpg", src: asset190 },
  { path: "Technology/home-silicon-valley.jpg", src: asset191 },
  { path: "Technology/iPhone saying Hello on dark background.jpg", src: asset192 },
  { path: "Technology/iPhone saying Hello on wooden background.jpg", src: asset193 },
  { path: "Technology/macro of a silicon wafer.jpg", src: asset194 },
  { path: "Technology/silicon-valley-office.jpg", src: asset195 },
  { path: "US Buildings/US Capitol Presidential Inauguration.jpg", src: asset196 },
  { path: "US Buildings/US Capitol from 45 degree angle.jpg", src: asset197 },
  { path: "US Buildings/US Capitol.jpg", src: asset198 },
  { path: "US Flags/A soft Red White and Blue Light beam angled at 45 degrees on a Black Background.jpg", src: asset199 },
  { path: "US Flags/USA Flag on pole modern.jpg", src: asset200 },
  { path: "US Flags/brandon-mowinkel-H2b1a5WNSW0-unsplash.jpg", src: asset201 },
  { path: "US Flags/dave-sherrill-48elRjHbXRY-unsplash.jpg", src: asset202 },
  { path: "US Flags/jon-sailer-sHebYIu6XQ4-unsplash.jpg", src: asset203 },
  { path: "US Flags/kevin-lanceplaine-WHtCDy2CGYU-unsplash.jpg", src: asset204 },
  { path: "US Flags/luke-michael-Tdwu35bCUj0-unsplash.jpg", src: asset205 },
  { path: "US Flags/michael-schofield-Cqncpa8nRRw-unsplash.jpg", src: asset206 },
  { path: "US Flags/nelson-ndongala-gDRHfyeOq58-unsplash.jpg", src: asset207 },
  { path: "USA from Space/Planet Earth.jpg", src: asset208 },
  { path: "USA from Space/USA at night from Space.jpg", src: asset209 },
] as const satisfies readonly GalleryAssetRecord[];
