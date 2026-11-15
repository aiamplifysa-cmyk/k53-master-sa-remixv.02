// Road traffic signs (SARTSM / RTSigns charts sheets 1–5, catalogue pages 2–49).
// Each master sign: [code, name, meaning, icon?]. Icons are drawn by SignGraphic.

export type SignGroup =
  | "control"
  | "command"
  | "prohibition"
  | "reservation"
  | "comprehensive"
  | "selective"
  | "warning-layout"
  | "warning-direction"
  | "warning-symbolic"
  | "hazard"
  | "information"
  | "guidance"
  | "tourism"
  | "marking-regulatory"
  | "marking-warning"
  | "marking-guidance"
  | "signal"
  | "temporary";

export interface Sign {
  code: string;
  name: string;
  meaning: string;
  group: SignGroup;
  icon?: string | undefined;
  variants: string[];
}

export const GROUP_INFO: Record<SignGroup, { label: string; family: string; blurb: string }> = {
  control: { label: "Control signs", family: "Regulatory", blurb: "Control who goes first at junctions: stop, yield, no entry, one-way." },
  command: { label: "Command signs", family: "Regulatory", blurb: "Round blue signs that tell you what you MUST do." },
  prohibition: { label: "Prohibition signs", family: "Regulatory", blurb: "Round signs with a red ring that tell you what you may NOT do." },
  reservation: { label: "Reservation signs", family: "Regulatory", blurb: "Reserve a lane, road or parking area for certain road users only." },
  comprehensive: { label: "Comprehensive signs", family: "Regulatory", blurb: "Mark where special rules start or end, such as freeways and urban limits." },
  selective: { label: "Selective restriction & de-restriction", family: "Regulatory", blurb: "Plates that limit a sign to certain times, vehicles or actions, or end a restriction." },
  "warning-layout": { label: "Road layout warnings", family: "Warning", blurb: "Warn about the shape of the road or junction ahead." },
  "warning-direction": { label: "Direction of movement warnings", family: "Warning", blurb: "Warn about bends, lane changes and how traffic will move." },
  "warning-symbolic": { label: "Symbolic warnings", family: "Warning", blurb: "Warn about hazards such as people, animals, crossings and road conditions." },
  hazard: { label: "Hazard markers", family: "Warning", blurb: "Chevron and striped plates that mark sharp bends and obstructions." },
  information: { label: "Information signs", family: "Information", blurb: "Blue signs with useful information for road users." },
  guidance: { label: "Guidance signs", family: "Guidance", blurb: "Location, direction and route marker signs." },
  tourism: { label: "Tourism & service signs", family: "Guidance", blurb: "Brown tourism and blue service symbols." },
  "marking-regulatory": { label: "Regulatory road markings", family: "Road markings", blurb: "Painted lines you must obey, the same as a regulatory sign." },
  "marking-warning": { label: "Warning road markings", family: "Road markings", blurb: "Painted lines that warn about what is coming." },
  "marking-guidance": { label: "Guidance road markings", family: "Road markings", blurb: "Painted lines that guide you into lanes and edges." },
  signal: { label: "Traffic signals & officers", family: "Signals", blurb: "Traffic lights (robots) and signals from traffic officers." },
  temporary: { label: "Temporary / roadworks", family: "Temporary", blurb: "Yellow signs used at roadworks. They override permanent signs." },
};

type Row = [string, string, string, string?];

const control: Row[] = [
  ["R1", "Stop", "Stop completely behind the stop line, then go only when it is safe. Give way to all traffic.", "stop"],
  ["R1.1", "Stop (minor road)", "Stop at the line. Traffic on the crossing road has right of way.", "stop"],
  ["R1.2", "Stop / Yield", "Stop and then yield to traffic as shown on the plate.", "stop"],
  ["R1.3", "3-way stop", "All three approaches must stop. First to stop is first to go.", "stop"],
  ["R1.4", "4-way stop", "All four approaches must stop. First to stop is first to go; if unsure, yield to the right.", "stop"],
  ["R1.5", "Stop/Go (flagman)", "Held by a road worker: stop when STOP shows, go slowly when GO shows.", "stop"],
  ["R2", "Yield", "Slow down and give way to traffic on the road you are entering. Stop if needed.", "yield"],
  ["R2.1", "Yield to pedestrians", "Give way to pedestrians crossing the road.", "yield"],
  ["R2.2", "Yield at mini-circle", "Give way to traffic already in the mini traffic circle (from your right).", "yield"],
  ["R3", "No entry", "You may not enter this road from this side.", "noentry"],
  ["R4.1", "One-way roadway", "Traffic may travel only in the direction of the arrow.", "oneway"],
  ["R5", "Pedestrian priority", "Pedestrians have right of way in this area; drive at walking pace.", "person"],
  ["R6", "Yield to oncoming traffic", "On a narrow section, give way to vehicles coming toward you.", "oncoming"],
];

const command: Row[] = [
  ["R101", "Minimum speed", "You must drive at least the speed shown (unless unsafe).", "t:60"],
  ["R102", "Vehicles over indicated mass only", "Only vehicles heavier than the mass shown may use this road or lane.", "t:t"],
  ["R103", "Keep left", "Pass the obstruction on the left side.", "keepleft"],
  ["R104", "Keep right", "Pass the obstruction on the right side.", "keepright"],
  ["R105", "Proceed left only", "You must proceed to the left.", "left"],
  ["R106", "Proceed right only", "You must proceed to the right.", "right"],
  ["R107", "Proceed straight only", "You must proceed straight ahead.", "up"],
  ["R108", "Turn left ahead", "You must turn left at the junction ahead.", "left"],
  ["R109", "Turn right ahead", "You must turn right at the junction ahead.", "right"],
  ["R110", "Pedestrians only", "Only pedestrians may use this route or path.", "person"],
  ["R111", "Pedal cycles only", "Only pedal cycles may use this route or lane.", "bicycle"],
  ["R112", "Pedal cycles and pedestrians only", "Only pedal cycles and pedestrians may use this route or path.", "person"],
  ["R113", "Pedal cycles and pedestrians only", "Only pedal cycles and pedestrians may use this route or path.", "person"],
  ["R114", "Pedal cycles and pedestrians only", "Only pedal cycles and pedestrians may use this route or path.", "person"],
  ["R115", "Pedal cycles and pedestrians only", "Only pedal cycles and pedestrians may use this route or path.", "person"],
  ["R116", "Motor cycles only", "Only motorcycles may use this route or lane.", "motorcycle"],
  ["R117", "Motor cars only", "Only motor cars may use this route or lane.", "car"],
  ["R118", "Taxis only", "Only taxis may use this route or lane.", "t:TAXI"],
  ["R119", "Minibuses only", "Only minibuses may use this route or lane.", "bus"],
  ["R120", "Midibuses only", "Only midibuses may use this route or lane.", "bus"],
  ["R121", "Buses only", "Only buses may use this lane or road.", "bus"],
  ["R122", "Delivery vehicles only", "Only delivery vehicles may use this route or lane.", "truck"],
  ["R123", "Goods vehicles only", "Only goods vehicles (trucks) may use this lane.", "truck"],
  ["R124", "Goods vehicles over indicated GVM only", "Only goods vehicles exceeding the indicated gross vehicle mass may use this route.", "truck"],
  ["R125", "Construction vehicles only", "Only construction vehicles may use this route or lane.", "truck"],
  ["R126", "Vehicles conveying dangerous goods only", "Only vehicles conveying dangerous goods may use this route.", "t:☢"],
  ["R127", "Abnormal vehicles only", "Only authorized abnormal vehicles may use this route.", "truck"],
  ["R128", "Rickshaws only", "Only rickshaws may use this lane.", "t:R"],
  ["R129", "Tour buses only", "Only tour buses may use this lane.", "bus"],
  ["R130", "Agricultural vehicles only", "Only agricultural vehicles may use this route or lane.", "tractor"],
  ["R131", "Animal-drawn vehicles only", "Only animal-drawn vehicles may use this route or lane.", "cow"],
  ["R132", "Pay toll", "A toll is payable to use the road or route.", "t:TOLL"],
  ["R133", "Headlamps on", "Switch on your headlamps (dipped beam) from this sign.", "lamp"],
  ["R134", "Buses and minibuses only", "Only buses and minibuses may use this route or lane.", "bus"],
  ["R135", "Buses and midibuses only", "Only buses and midibuses may use this route or lane.", "bus"],
  ["R136", "Buses, midibuses and minibuses only", "Only buses, midibuses and minibuses may use this route or lane.", "bus"],
  ["R137", "Roundabout", "Follow the direction shown around the roundabout.", "circle"],
  ["R138", "Trams only", "Only trams may use this route or lane.", "tram"],
  ["R139", "Buses and trams only", "Only buses and trams may use this route or lane.", "tram"],
  ["R140", "Buses, trams and minibuses only", "Only buses, trams and minibuses may use this route or lane.", "tram"],
];

const prohibition: Row[] = [
  ["R201", "Speed limit", "You may not drive faster than the speed shown in km/h.", "t:60"],
  ["R202", "Mass limit", "Vehicles heavier than the mass shown may not proceed.", "t:5t"],
  ["R203", "Axle mass limit", "Vehicles with an axle heavier than the mass shown may not proceed.", "t:2t"],
  ["R204", "Height limit", "Vehicles higher than the height shown may not proceed.", "height"],
  ["R205", "Length limit", "Vehicles longer than the length shown may not proceed.", "length"],
  ["R206", "Excessive noise prohibited", "Do not make excessive noise, including by hooting.", "horn"],
  ["R207", "Hitch-hiking prohibited", "Hitch-hiking is prohibited beyond this sign.", "person"],
  ["R208", "Unauthorized vehicles prohibited", "Vehicles not authorized to use the road may not proceed.", "car"],
  ["R209", "Left turn ahead prohibited", "Do not turn left at the junction ahead.", "left"],
  ["R210", "Right turn ahead prohibited", "Do not turn right at the junction ahead.", "right"],
  ["R211", "Left turn prohibited", "Do not turn left.", "left"],
  ["R212", "Right turn prohibited", "Do not turn right.", "right"],
  ["R213", "U-turn prohibited", "Do not make a U-turn.", "uturn"],
  ["R214", "Overtaking prohibited", "Do not overtake where this restriction applies.", "overtake"],
  ["R215", "Overtaking by goods vehicles prohibited", "Goods vehicles may not overtake where this restriction applies.", "truck"],
  ["R216", "No parking", "You may not park here. You may stop briefly to load or let passengers in/out.", "noparking"],
  ["R217", "No stopping", "You may not stop at all, not even to pick up or drop off passengers.", "nostopping"],
  ["R218", "No pedestrians", "Pedestrians are not allowed beyond this sign.", "person"],
  ["R219", "No pedal cycles", "Pedal cycles are not allowed beyond this sign.", "bicycle"],
  ["R220", "Pedal cycles and pedestrians prohibited", "Pedal cycles and pedestrians may not proceed beyond this sign.", "bicycle"],
  ["R222", "Motor cycles prohibited", "Motorcycles may not proceed beyond this sign.", "motorcycle"],
  ["R223", "Motor cars prohibited", "Motor cars may not proceed beyond this sign.", "car"],
  ["R224", "Taxis prohibited", "Taxis may not proceed beyond this sign.", "t:TAXI"],
  ["R225", "Minibuses prohibited", "Minibuses may not proceed beyond this sign.", "bus"],
  ["R226", "No midibuses", "Midibuses are not allowed beyond this sign.", "bus"],
  ["R227", "No buses", "Buses are not allowed beyond this sign.", "bus"],
  ["R228", "No delivery vehicles", "Delivery vehicles are not allowed beyond this sign.", "truck"],
  ["R229", "No goods vehicles", "Goods vehicles are not allowed beyond this sign.", "truck"],
  ["R230", "No goods vehicles over indicated GVM", "Goods vehicles heavier than the GVM shown may not proceed.", "truck"],
  ["R231", "No construction vehicles", "Construction vehicles are not allowed.", "truck"],
  ["R232", "No vehicles carrying dangerous goods", "Vehicles carrying dangerous goods (hazchem) may not proceed.", "t:☢"],
  ["R233", "No abnormal vehicles", "Abnormal (oversized) vehicles may not proceed.", "truck"],
  ["R234", "No rickshaws", "Rickshaws are not allowed.", "t:R"],
  ["R235", "No tour buses", "Tour buses are not allowed.", "bus"],
  ["R236", "No agricultural vehicles", "Tractors and farm vehicles are not allowed.", "tractor"],
  ["R237", "No animal-drawn vehicles", "Animal-drawn vehicles are not allowed.", "cow"],
  ["R238", "No horses and riders", "Horses and riders are not allowed.", "horse"],
  ["R239", "Width limit", "Vehicles wider than the width shown may not proceed.", "width"],
  ["R240", "No towed vehicles", "Vehicles towing trailers or other vehicles may not proceed.", "trailer"],
  ["R241", "No hawkers", "Hawking (selling) is not allowed in this area.", "person"],
];

const reservation: Row[] = [
  ["R301", "Bus reservation", "This lane, road or area is reserved for buses.", "bus"],
  ["R302", "Bus lane reservation", "This lane is reserved for buses.", "bus"],
  ["R303", "Bus lane reservation begins", "The bus-reserved lane begins here.", "bus"],
  ["R304", "Pedal cycle lane reservation", "This lane is reserved for pedal cycles.", "bicycle"],
  ["R305-P", "Parking reservation", "Parking is reserved as shown on the sign.", "t:P"],
  ["R306-P", "Limited parking reservation", "Parking is reserved subject to the limit shown on the sign.", "t:P"],
  ["R307", "Motor cycle reservation", "This lane, road or area is reserved for motorcycles.", "motorcycle"],
  ["R308", "Motor car reservation", "This lane, road or area is reserved for motor cars.", "car"],
  ["R309", "Taxi reservation", "This lane, road or area is reserved for taxis.", "t:TAXI"],
  ["R310", "Minibus reservation", "This lane, road or area is reserved for minibuses.", "bus"],
  ["R311", "Midibus reservation", "This lane, road or area is reserved for midibuses.", "bus"],
  ["R312", "Delivery vehicle reservation", "This lane, road or area is reserved for delivery vehicles.", "truck"],
  ["R313", "Goods vehicle reservation", "This lane, road or area is reserved for goods vehicles.", "truck"],
  ["R314", "Goods vehicle over indicated GVM reservation", "This lane, road or area is reserved for goods vehicles exceeding the indicated GVM.", "truck"],
  ["R315", "Construction vehicle reservation", "This lane, road or area is reserved for construction vehicles.", "truck"],
  ["R316", "Vehicle conveying dangerous goods reservation", "This lane, road or area is reserved for vehicles conveying dangerous goods.", "t:☢"],
  ["R317", "Abnormal vehicle reservation", "This lane, road or area is reserved for authorized abnormal vehicles.", "truck"],
  ["R318", "Rickshaw reservation", "This lane, road or area is reserved for rickshaws.", "t:R"],
  ["R319", "Tour bus reservation", "This lane, road or area is reserved for tour buses.", "bus"],
  ["R320", "High-occupancy vehicle reservation", "This lane, road or area is reserved for vehicles meeting the occupancy shown.", "t:2+"],
  ["R321", "Emergency vehicle reservation", "This lane, road or area is reserved for emergency vehicles.", "t:SOS"],
  ["R322", "Police vehicle reservation", "This lane, road or area is reserved for police vehicles.", "t:POL"],
  ["R323", "Disabled persons vehicle reservation", "This lane, road or area is reserved for vehicles of disabled persons.", "wheelchair"],
  ["R324", "Authorized vehicle reservation", "This lane, road or area is reserved for authorized vehicles.", "t:AUTH"],
  ["R325", "Bus stop reservation", "This area is reserved as a bus stop.", "bus"],
  ["R326", "Minibus stop reservation", "This area is reserved as a minibus stop.", "t:TAXI"],
  ["R327", "Bus and minibus reservation", "This lane, road or area is reserved for buses and minibuses.", "bus"],
  ["R328", "Bus and minibus lane reservation", "This lane is reserved for buses and minibuses.", "bus"],
  ["R329", "Bus and minibus lane reservation begins", "The bus-and-minibus-reserved lane begins here.", "bus"],
  ["R330", "Bus and midibus reservation", "This lane, road or area is reserved for buses and midibuses.", "bus"],
  ["R331", "Bus and midibus lane reservation", "This lane is reserved for buses and midibuses.", "bus"],
  ["R332", "Bus and midibus lane reservation begins", "The bus-and-midibus-reserved lane begins here.", "bus"],
  ["R333", "Bus, midibus and minibus reservation", "This lane, road or area is reserved for buses, midibuses and minibuses.", "bus"],
  ["R334", "Bus, midibus and minibus lane reservation", "This lane is reserved for buses, midibuses and minibuses.", "bus"],
  ["R335", "Bus, midibus and minibus lane reservation begins", "The reserved lane for buses, midibuses and minibuses begins here.", "bus"],
  ["R336", "High-occupancy vehicle lane reservation", "This lane is reserved for vehicles meeting the occupancy shown.", "t:2+"],
  ["R337", "High-occupancy vehicle lane reservation begins", "The high-occupancy-vehicle lane begins here.", "t:2+"],
  ["R338", "Tram reservation", "This lane, road or area is reserved for trams.", "tram"],
  ["R339", "Tram lane reservation", "This lane is reserved for trams.", "tram"],
  ["R340", "Tram lane reservation begins", "The tram-reserved lane begins here.", "tram"],
  ["R341", "Tram stop reservation", "This area is reserved as a tram stop.", "tram"],
  ["R342", "Bus and tram reservation", "This lane, road or area is reserved for buses and trams.", "tram"],
  ["R343", "Bus and tram lane reservation", "This lane is reserved for buses and trams.", "tram"],
  ["R344", "Bus and tram lane reservation begins", "The bus-and-tram-reserved lane begins here.", "tram"],
  ["R345", "Bus, minibus and tram reservation", "This lane, road or area is reserved for buses, minibuses and trams.", "tram"],
  ["R346", "Bus, minibus and tram lane reservation", "This lane is reserved for buses, minibuses and trams.", "tram"],
  ["R347", "Bus, minibus and tram lane reservation begins", "The reserved lane for buses, minibuses and trams begins here.", "tram"],
  ["R348", "Bus lane right reservation", "The right lane is reserved for buses.", "bus"],
  ["R349", "Bus and minibus lane right reservation", "The right lane is reserved for buses and minibuses.", "bus"],
  ["R350", "Bus and tram lane right reservation", "The right lane is reserved for buses and trams.", "tram"],
  ["R351", "Bus, minibus and tram lane right reservation", "The right lane is reserved for buses, minibuses and trams.", "tram"],
  ["R352", "High-occupancy vehicle lane right reservation", "The right lane is reserved for vehicles meeting the occupancy shown.", "t:2+"],
  ["R353", "Authorized passenger transport vehicle lane reservation", "This lane is reserved for authorized passenger transport vehicles.", "bus"],
  ["R354", "Authorized passenger transport vehicle lane right reservation", "The right lane is reserved for authorized passenger transport vehicles.", "bus"],
];

const comprehensive: Row[] = [
  ["R401", "Dual-carriageway freeway begins", "Freeway rules start: no pedestrians, cyclists, animals or slow vehicles; no stopping except in emergencies. 120 km/h general limit.", "freeway"],
  ["R402", "Single-carriageway freeway begins", "Freeway rules start on a road with traffic in both directions.", "freeway"],
  ["R403", "Woonerf", "Marks a woonerf, a shared street used by pedestrians and vehicles.", "person"],
];

const selective: Row[] = [
  ["R501", "One-period time limit", "The time limit shown applies during one specified period.", "t:07-09"],
  ["R511", "Day condition", "The condition shown applies on the specified day or days.", "t:MON-FRI"],
  ["R520", "Reserved movement left by vehicle class", "The movement to the left is reserved for the vehicle class shown.", "t:LOAD"],
  ["R530", "Operator identity (logo)", "Shows the operator identity using a logo.", "t:INFO"],
  ["R560", "Buses", "The plate identifies buses as the vehicle class to which the sign applies.", "bus"],
  ["R600", "De-restriction", "The restriction shown with a grey diagonal bar has ended.", "t:END"],
];

const warnLayout: Row[] = [
  ["W101", "Crossroad", "A crossroad junction is ahead. Slow down and watch for crossing traffic.", "cross"],
  ["W102", "Priority crossroad", "A priority crossroad is ahead.", "cross"],
  ["W103", "Secondary crossroad", "A secondary crossroad is ahead.", "cross"],
  ["W104", "T- and skew T-junction", "A T-junction or skew T-junction is ahead.", "tjunction"],
  ["W105", "T- and skew T-junction", "A T-junction or skew T-junction is ahead.", "tjunction"],
  ["W106", "T- and skew T-junction", "A T-junction or skew T-junction is ahead.", "tjunction"],
  ["W107", "Side road junction", "A side road junction is ahead.", "sideleft"],
  ["W108", "Side road junction", "A side road junction is ahead.", "sideright"],
  ["W109", "Staggered junction", "A staggered junction is ahead.", "stagger"],
  ["W110", "Staggered junction", "A staggered junction is ahead.", "stagger"],
  ["W111", "Sharp junction", "A sharp junction is ahead.", "cross"],
  ["W112", "Sharp junction", "A sharp junction is ahead.", "cross"],
  ["W113", "Sharp junction", "A sharp junction is ahead.", "cross"],
  ["W114", "Sharp junction", "A sharp junction is ahead.", "cross"],
  ["W115", "Y-junction", "A Y-junction is ahead.", "yjunction"],
  ["W116", "End of dual roadway", "The dual roadway ends ahead.", "dual"],
  ["W117", "End of dual roadway", "The dual roadway ends ahead.", "dual"],
  ["W118", "Beginning of dual roadway", "A dual roadway begins ahead.", "dual"],
  ["W119", "Beginning of dual roadway", "A dual roadway begins ahead.", "dual"],
];

const warnDirection: Row[] = [
  ["W201", "Traffic circle ahead", "A traffic circle is ahead. Slow down and give way to traffic in the circle.", "circle"],
  ["W202", "Gentle curve", "A gentle curve is ahead.", "curveleft"],
  ["W203", "Gentle curve", "A gentle curve is ahead.", "curveright"],
  ["W204", "Sharp curve", "A sharp curve is ahead.", "curveleft"],
  ["W205", "Sharp curve", "A sharp curve is ahead.", "curveright"],
  ["W206", "Hairpin bend", "A hairpin bend is ahead.", "uturn"],
  ["W207", "Hairpin bend", "A hairpin bend is ahead.", "uturn"],
  ["W208", "Winding road", "A winding road is ahead.", "winding"],
  ["W209", "Winding road", "A winding road is ahead.", "winding"],
  ["W210", "Combined curves", "A combination of curves is ahead.", "winding"],
  ["W211", "Combined curves", "A combination of curves is ahead.", "winding"],
  ["W212", "Two-way traffic", "Two-way traffic is ahead.", "twoway"],
  ["W213", "Two-way traffic crossroad", "A crossroad with two-way traffic is ahead.", "twoway"],
  ["W214", "Lane ends", "A lane ends ahead; merge when safe.", "merge"],
  ["W215", "Lane ends", "A lane ends ahead; merge when safe.", "merge"],
  ["W216", "Concealed driveway", "A concealed driveway is ahead.", "cross"],
  ["W217", "Concealed driveway", "A concealed driveway is ahead.", "cross"],
  ["W218", "Concealed driveway", "A concealed driveway is ahead.", "cross"],
];

const warnSymbolic: Row[] = [
  ["W301", "Traffic signal ahead", "Traffic lights (a robot) are ahead. Be ready to stop.", "signal"],
  ["W302", "Stop sign ahead", "A stop sign is ahead. Prepare to stop.", "stop"],
  ["W303", "Yield sign ahead", "A yield sign is ahead. Prepare to give way.", "yield"],
  ["W306", "Pedestrian crossing", "A pedestrian crossing is ahead. Slow down and watch for people crossing.", "person"],
  ["W307", "Pedestrians", "Pedestrians may be walking on or next to the road.", "person"],
  ["W308", "Children", "Children may cross ahead (school area). Slow down.", "children"],
  ["W309", "Pedal cyclists", "Cyclists may be on or crossing the road ahead.", "bicycle"],
  ["W310", "Farm animals", "Farm animals may be on the road ahead.", "cow"],
  ["W311", "Farm animals", "Farm animals may be on the road ahead.", "cow"],
  ["W312", "Farm animals", "Farm animals may be on the road ahead.", "horse"],
  ["W313", "Wild animals ahead", "Wild animals may be on or crossing the road ahead.", "deer"],
  ["W314", "Gate", "A gate is ahead.", "t:!"],
  ["W315", "Motor gate", "A motorized gate is ahead.", "t:!"],
  ["W316", "Motor gate", "A motorized gate is ahead.", "t:!"],
  ["W317", "Motor gate", "A motorized gate is ahead.", "t:!"],
  ["W318", "Railway crossing (no gates)", "A level crossing without boom gates ahead. Look and listen for trains.", "train"],
  ["W319", "Tunnel", "A tunnel is ahead. Switch on your headlamps.", "tunnel"],
  ["W320", "Height restriction", "The clearance height is restricted ahead.", "height"],
  ["W321", "Length restricted", "Vehicles exceeding the indicated length are restricted ahead.", "length"],
  ["W322", "Steep descent", "A steep downhill is ahead. Use a lower gear.", "descent"],
  ["W323", "Steep ascent", "A steep uphill is ahead.", "ascent"],
  ["W324", "Slow-moving heavy vehicles", "Slow-moving heavy vehicles may be on the road ahead.", "truck"],
  ["W325", "Gravel road begins", "A gravel road begins ahead.", "rocks"],
  ["W326", "Narrow bridge", "A narrow bridge is ahead.", "narrow"],
  ["W327", "One-vehicle-width structure", "A structure ahead is only wide enough for one vehicle at a time.", "narrow"],
  ["W328", "Road narrows from both sides", "The road narrows from both sides ahead.", "narrow"],
  ["W329", "Road narrows from one side", "The road narrows from one side ahead.", "narrow"],
  ["W330", "Road narrows from one side", "The road narrows from one side ahead.", "narrow"],
  ["W331", "Uneven roadway", "The roadway is uneven ahead.", "bumps"],
  ["W332", "Speed hump", "A speed hump is ahead. Slow down.", "hump"],
  ["W333", "Slippery road", "The road may be slippery. Avoid sudden braking or steering.", "slippery"],
  ["W334", "Falling rocks", "Rocks may fall onto the road ahead.", "rocks"],
  ["W335", "Falling rocks", "Rocks may fall onto the road ahead.", "rocks"],
  ["W339", "General warning", "A hazard not covered by another specific warning sign is ahead.", "t:!"],
  ["W346", "Emergency flashing light", "An emergency flashing light may be present ahead.", "t:!"],
  ["W348", "Jetty edge or river-bank", "The road is beside a jetty edge or river bank.", "water"],
  ["W349", "Crosswinds", "Strong crosswinds may affect vehicles ahead.", "wind"],
  ["W350", "Drift", "A drift is ahead.", "water"],
  ["W351", "Low-flying aircraft", "Low-flying aircraft may be present ahead.", "plane"],
  ["W352", "Agricultural vehicle", "Agricultural vehicles may be on the road ahead.", "tractor"],
  ["W354", "Reduced visibility", "Visibility is reduced ahead.", "t:FOG"],
  ["W355", "Congestion", "Traffic congestion is likely ahead.", "car"],
  ["W356", "Horses and riders", "Horses and riders may be on the road ahead.", "horse"],
  ["W357", "Elephant", "Elephants may be on or crossing the road ahead.", "deer"],
  ["W358", "Warthog", "Warthogs may be on or crossing the road ahead.", "deer"],
  ["W359", "Hippo", "Hippos may be on or crossing the road ahead.", "deer"],
  ["W360", "Width restricted", "Vehicles exceeding the indicated width are restricted ahead.", "width"],
  ["W361", "Electrical shock", "An electrical shock hazard is ahead.", "t:!"],
  ["W362", "Tram", "Trams may cross or travel on the road ahead.", "tram"],
  ["W363", "Gravel road ends", "The gravel road ends ahead.", "rocks"],
];

const hazard: Row[] = [
  ["W401", "Danger plate", "Marks a danger point or obstruction.", "stripes"],
  ["W402", "Danger plate", "Marks a danger point or obstruction.", "stripes"],
  ["W403", "Railway crossing", "Marks a railway crossing.", "train"],
  ["W404", "Railway crossing", "Marks a railway crossing.", "train"],
  ["W405", "Sharp curve chevron", "Marks a sharp curve; follow the chevrons.", "chevleft"],
  ["W406", "Sharp curve chevron", "Marks a sharp curve; follow the chevrons.", "chevright"],
  ["W407", "Sharp curve chevron", "Marks a sharp curve; follow the chevrons.", "chevleft"],
  ["W408", "Sharp curve chevron", "Marks a sharp curve; follow the chevrons.", "chevright"],
  ["W409", "T-junction chevron", "Marks a T-junction.", "chevboth"],
  ["W410", "Dead end or road closed chevron", "Marks a dead end or road closure.", "chevboth"],
  ["W411", "Boom barricade", "A boom barricade blocks or controls the road.", "stripes"],
  ["W413", "Gore plate", "Marks a gore area where traffic lanes divide or merge.", "stripes"],
  ["W414", "Gore chevron", "Marks a gore area where traffic lanes divide or merge.", "chevboth"],
  ["W415", "Overhead danger plate", "Marks an overhead danger or obstruction.", "stripes"],
];

const information: Row[] = [
  ["IN1", "Countdown sign", "Shows a countdown to a feature or hazard ahead.", "t:200m"],
  ["IN2", "Countdown sign", "Shows a countdown to a feature or hazard ahead.", "t:200m"],
  ["IN3", "Countdown sign", "Shows a countdown to a feature or hazard ahead.", "t:200m"],
  ["IN4", "Cul-de-sac", "Marks a road with no through route.", "t:T"],
  ["IN5", "Cul-de-sac", "Marks a road with no through route.", "t:T"],
  ["IN6", "Cul-de-sac", "Marks a road with no through route.", "t:T"],
  ["IN7", "Right of way", "Indicates right of way.", "t:!"],
  ["IN10", "Park and ride", "Identifies a park-and-ride facility.", "t:P"],
  ["IN11.1", "Supplementary plate", "Provides supplementary information for another sign.", "t:200m"],
  ["IN11.2", "Supplementary plate", "Provides supplementary information for another sign.", "t:INFO"],
  ["IN11.3", "Supplementary plate", "Provides supplementary information for another sign.", "t:INFO"],
  ["IN11.4", "Supplementary plate", "Provides supplementary information for another sign.", "t:INFO"],
  ["IN12", "Information centre", "Identifies an information centre.", "t:i"],
  ["IN14", "Co-ordinated traffic signals", "Indicates coordinated traffic signals.", "signal"],
  ["IN15", "Multi-phase traffic signals", "Indicates multi-phase traffic signals.", "signal"],
  ["IN19", "Modal transfer", "Identifies a transfer point between transport modes.", "bus"],
];

const guidance: Row[] = [
  ["GL1", "Street name", "Shows the street name.", "t:ST"],
  ["GL2", "Suburb name", "Shows the suburb you are entering.", "t:SUB"],
  ["GL3", "Town or city name", "Shows the town or city you are entering.", "t:TOWN"],
  ["GL4", "River name", "Shows the river you are crossing.", "water"],
  ["GL5", "National or provincial border", "You are crossing a national or provincial border.", "t:PROV"],
  ["GL6", "Geographical location", "Names a mountain pass or landmark.", "t:PASS"],
  ["GL7", "Route name", "Shows the name of the route.", "t:RT"],
  ["GL8", "Interchange name", "Shows the name of the freeway interchange.", "t:IC"],
  ["GE2", "Advance trailblazer", "Shows the route or direction to follow ahead.", "t:R50"],
  ["GE9", "Advance transport trailblazer", "Directs heavy vehicles to their route.", "truck"],
  ["GE18.3", "Tourism route marker", "Marks a tourism route.", "t:TR"],
  ["GE19.3", "SADC route marker", "Marks a regional SADC route.", "t:SADC"],
  ["GD1/GD2", "Stack-type composite direction", "Shows destinations and directions in a stack-type composite sign.", "up"],
  ["GD4", "Fingerboard", "Points to a destination down a side road.", "right"],
  ["GD9", "Map-type advance direction", "A map of the junction ahead.", "cross"],
  ["GD10", "Overhead advance direction", "Overhead sign showing which lane to use.", "up"],
  ["GA2", "Advance exit direction", "Shows the direction of an upcoming exit.", "upright"],
  ["GA3", "Exit direction", "Shows the direction to take at the exit.", "upright"],
  ["GA4", "Gore exit direction", "Shows the exit direction at a gore.", "upright"],
  ["GB1", "Cross-road advance direction", "Shows the direction to take from a cross-road.", "freeway"],
  ["GC1", "Overhead pre-advance exit direction", "Shows exit information on an overhead sign before the exit.", "up"],
  ["GF1", "Freeway advance exit", "Shows an upcoming freeway exit.", "upright"],
  ["GDS-3", "Airport", "Route to the airport.", "plane"],
  ["GDS-1", "Railway station", "Route to the railway station.", "train"],
  ["GDS-2", "Bus terminus", "Route to the bus terminus.", "bus"],
  ["GDS-8", "City centre (CBD)", "Route to the city centre.", "t:CBD"],
  ["GDS-10", "Alternative route", "An alternative route.", "t:ALT"],
  ["GDS-20", "Parking", "Route to parking.", "t:P"],
  ["GDS-22", "Toll plaza ahead", "A toll plaza is on this route.", "t:TOLL"],
  ["GDS-23", "Border / customs post", "Route to the border post.", "t:BORDER"],
  ["VMS1", "Variable message sign", "Electronic sign with changing traffic information.", "t:VMS"],
];

const tourism: Row[] = [
  ["GFS A1", "National park", "Identifies a national park.", "deer"],
  ["GFS A2", "Provincial park", "Identifies a provincial park.", "deer"],
  ["GFS A4", "Scenic attraction", "Identifies a scenic attraction.", "t:HIST"],
  ["GFS A5-1", "Motor racing track", "Identifies a motor racing track.", "t:SPORT"],
  ["GFS A7", "Historical attraction", "Identifies a historical attraction.", "t:HIST"],
  ["GFS A8", "Coastal attraction", "Identifies a coastal attraction.", "water"],
  ["GFS A9", "Arts and crafts", "Identifies an arts and crafts attraction.", "t:ART"],
  ["GFS A11-1", "Hiking trail", "Identifies a hiking trail.", "t:ADV"],
  ["GFS A12", "Farming attraction", "Identifies a farming attraction.", "tractor"],
  ["GFS B1-3", "Hospital", "Identifies a hospital.", "t:H"],
  ["GFS B2-1", "Filling station and workshop", "Identifies a filling station and workshop.", "t:FUEL"],
  ["GFS B4-1", "Restaurant", "Identifies a restaurant.", "t:FOOD"],
  ["GFS B5-1", "Parking area (free parking)", "Identifies a free parking area.", "t:P"],
  ["GFS B6-1", "Rest area (Class 1)", "Identifies a Class 1 rest area.", "t:REST"],
  ["GFS C1-1", "Accommodation", "Identifies accommodation, including hotels and inns.", "t:BED"],
  ["GFS D1-22", "Tourist information", "Identifies tourist information.", "t:i"],
];

const markingReg: Row[] = [
  ["RTM1", "Stop line", "A solid line at a stop sign or signal: stop with your front behind it.", "m:stopline"],
  ["RTM2", "Yield line", "A broken line (triangles) at a yield sign: give way here.", "m:yieldline"],
  ["RTM3", "Pedestrian crossing lines", "Two broken parallel lines marking a pedestrian crossing.", "m:ped"],
  ["RTM4", "Block pedestrian crossing", "Marks a block-style pedestrian crossing.", "m:zebra"],
  ["RM1", "No overtaking line (barrier line)", "A solid centre line: do not cross or drive on it, and do not overtake across it.", "m:solid"],
  ["RM2", "No crossing marking", "Do not cross this marking.", "m:solid"],
  ["RM3", "Channelizing line", "Separates or guides traffic around a channelized area.", "m:solid"],
  ["RM4.1", "Left edge line", "A yellow line marking the left edge of the road; do not drive left of it except in emergencies.", "m:yellowedge"],
  ["RM4.2", "Right edge line", "Marks the right edge of the road on a dual carriageway.", "m:yellowedge"],
  ["RM5", "Painted island", "Marks a painted island that separates or guides traffic.", "m:island"],
  ["RM6", "Parking bay", "Marks a parking bay.", "m:bay"],
  ["RM7", "Exclusive parking bay", "Marks a parking bay reserved for the vehicle or user shown.", "m:bay"],
  ["RM8", "Mandatory direction arrow", "Indicates the direction traffic must follow.", "m:arrow"],
  ["RM9", "Exclusive lane line", "Marks a lane reserved for the vehicle or user shown.", "m:solid"],
  ["RM10", "Yellow box junction", "Do not enter the box unless your exit is clear.", "m:box"],
  ["RM11", "Zig-zag zone", "Marks a zig-zag zone on the road.", "m:zigzag"],
  ["RM12", "No stopping line", "Marks a place where stopping is prohibited.", "m:redline"],
  ["RM13", "No parking line", "Marks a place where parking is prohibited.", "m:yellowedge"],
  ["RM14", "No motor cycles marking", "Indicates that motorcycles may not use the marked area.", "m:solid"],
  ["RM15", "Mini-circle", "Marks a mini-circle.", "m:circle"],
  ["RM16", "Disabled persons parking", "Marks parking reserved for disabled persons.", "m:bay"],
  ["RM17", "Exclusive use lane symbol", "Marks a lane reserved for the vehicle or user shown.", "m:bus"],
];

const markingWarn: Row[] = [
  ["WM1", "Railway crossing marking", "Marks a railway crossing.", "m:rx"],
  ["WM2", "Continuity line", "Marks a continuity line at a lane split or merge.", "m:broken"],
  ["WM3", "Dividing line", "Separates traffic moving in different directions.", "m:solid"],
  ["WM4", "Reversible lane line", "Marks a lane whose direction of travel can change.", "m:solid"],
  ["WM5", "Yield ahead (triangle)", "A painted triangle: a yield line is ahead.", "m:yieldline"],
  ["WM6", "Lane reduction arrow", "Indicates that the number of lanes reduces ahead.", "m:arrow"],
  ["WM7", "Mandatory direction arrow ahead", "Indicates the direction traffic must follow ahead.", "m:arrow"],
  ["WM8", "No overtaking or no crossing line ahead", "Warns that a no-overtaking or no-crossing line is ahead.", "m:warnbroken"],
  ["WM9.1", "Arrestor bed ahead", "Indicates an arrestor bed ahead.", "m:rumble"],
  ["WM10", "Speed hump", "Marks a speed hump.", "m:hump"],
  ["WM11", "End of exclusive use lane arrows", "Indicates the end of an exclusive-use lane.", "m:arrow"],
];

const markingGuide: Row[] = [
  ["GM1", "Lane line", "Marks a lane line on the roadway.", "m:broken"],
  ["GM2", "Guide line", "Guides traffic through a junction or lane transition.", "m:broken"],
  ["GM3", "Furcation arrow", "Indicates a split or fork in the roadway.", "m:arrow"],
  ["GM4", "Information arrow", "Provides directional information to road users.", "m:arrow"],
  ["GM5", "Bicycle crossing guidelines", "Guides cyclists through a bicycle crossing.", "m:cycle"],
  ["GM6", "Symbol road marking", "A road symbol provides the information shown by the marking.", "m:arrow"],
  ["GM7", "Word marking", "A word on the road provides the instruction shown.", "m:stopline"],
  ["GM8", "Kerbing", "Kerbing marks or defines the roadway edge or channel.", "m:solid"],
];

const signals: Row[] = [
  ["S1", "Standard traffic signal", "Shows red, yellow and green indications. Stop on red, prepare to stop on yellow, and proceed on green when safe.", "s:green"],
  ["S1B", "Bus traffic signal", "Controls bus movements. Buses must stop on red, prepare to stop on yellow, and proceed on green when permitted.", "s:green"],
  ["S1T", "Tram traffic signal", "Controls tram movements. Trams must stop on red, prepare to stop on yellow, and proceed on green when permitted.", "s:green"],
  ["S1A", "Directional arrow traffic signal", "Obey the arrow indications; proceed only in a direction permitted by the signal.", "s:arrow"],
  ["S2", "Right-arrow traffic signal", "Proceed only in the direction of the displayed arrow when the signal permits.", "s:arrow"],
  ["S3", "Left-arrow traffic signal", "Proceed only in the direction of the displayed arrow when the signal permits.", "s:arrow"],
  ["S4", "Straight-ahead arrow traffic signal", "Proceed straight only when the signal permits.", "s:arrow"],
  ["S5", "Straight-ahead and left-arrow traffic signal", "Proceed only in a direction permitted by the displayed arrow signal.", "s:arrow"],
  ["S6", "Left- and right-arrow traffic signal", "Proceed only in a direction permitted by the displayed arrow signal.", "s:arrow"],
  ["S7", "Straight-ahead and right-arrow traffic signal", "Proceed only in a direction permitted by the displayed arrow signal.", "s:arrow"],
  ["S8", "Traffic signal with directional arrow", "Obey the applicable light and arrow indications; proceed only when permitted.", "s:arrow"],
  ["S8B", "Bus signal with directional arrow", "Obey the applicable bus-signal and arrow indications; proceed only when permitted.", "s:arrow"],
  ["S8T", "Tram signal with directional arrow", "Obey the applicable tram-signal and arrow indications; proceed only when permitted.", "s:arrow"],
  ["S9", "Traffic signal with directional arrows", "Obey the applicable light and arrow indications; proceed only when permitted.", "s:arrow"],
  ["S9B", "Bus signal with directional arrows", "Obey the applicable bus-signal and arrow indications; proceed only when permitted.", "s:arrow"],
  ["S9T", "Tram signal with directional arrows", "Obey the applicable tram-signal and arrow indications; proceed only when permitted.", "s:arrow"],
  ["S10R", "Right-turn signal", "The signal controls movement to the right; obey its red and green arrow indications.", "s:arrow"],
  ["S10L", "Left-turn signal", "The signal controls movement to the left; obey its red and green arrow indications.", "s:arrow"],
  ["S11", "Pedestrian signal", "Pedestrians must wait on the red man and may cross on the green man.", "s:ped"],
  ["S12", "Two-aspect traffic signal", "Stop on red. Proceed only when the green indication is displayed and it is safe.", "s:green"],
  ["S13", "Multiple-arrow traffic signal", "Follow the applicable red, yellow and green arrow indications for your movement.", "s:arrow"],
  ["S14", "Bus multiple-arrow traffic signal", "Bus drivers must follow the applicable signal indications for their movement.", "s:arrow"],
  ["S15", "Multiple-direction traffic signal", "Follow the applicable red, yellow and green arrow indications for your movement.", "s:arrow"],
  ["S16", "Steady green lane arrow", "Vehicles may be driven in the lane over which the green arrow is displayed.", "s:arrow"],
  ["S17", "Steady red lane cross", "Vehicles must not be driven in the lane over which the red cross is displayed.", "s:redarrow"],
  ["S18", "Yellow lane-change arrow (left)", "The lane ahead is closed; leave it in the direction of the arrow when safe.", "s:arrow"],
  ["S19", "Yellow lane-change arrow (right)", "The lane ahead is closed; leave it in the direction of the arrow when safe.", "s:arrow"],
  ["S20", "Pedal-cycle signal", "A pedal cyclist must not cross on red and may cross on green when it is safe.", "s:green"],
  ["SS1", "Traffic officer hand signals", "Follow the hand signal displayed by the traffic officer.", "officer"],
  ["SS2", "Flag signals (roadworks)", "Follow the roadworker's flag signal to stop, proceed or slow down.", "officer"],
  ["SS3", "Traffic officer: proceed", "An officer waving you on: go.", "officer"],
  ["FRD", "Flashing red signal", "Stop before the signal and proceed only when it is safe.", "s:flashred"],
];

const temporary: Row[] = [
  ["TW331", "Uneven roadway (temporary)", "The roadway is uneven ahead.", "bumps"],
  ["TW336", "Roadworks", "Roadworks are ahead; proceed with caution.", "worker"],
  ["TW401", "Temporary danger plate", "Marks a danger point or obstruction.", "stripes"],
  ["TW405", "Temporary sharp curve chevron", "Marks a sharp curve; follow the chevrons.", "chevright"],
  ["TR201", "Temporary speed limit", "Temporary speed limit at roadworks.", "t:60"],
  ["TR208", "Temporary no overtaking", "No overtaking through the work zone.", "overtake"],
  ["TIN11.1", "Temporary distance plate", "How far ahead the roadworks are.", "t:500m"],
  ["TGD1", "Stack-type advance direction", "Shows destinations and directions in a stack-type advance direction sign.", "up"],
];

const TEMP_CODES = new Set(
  "TR101 TR104 TR106 TR109 TR110 TR111 TR112 TR118 TR119 TR121 TR123 TR125 TR127 TR129 TR130 TR131 TR133 TR134 TR136 TR137 TR201 TR202 TR203 TR204 TR205 TR208 TR210 TR211 TR212 TR214 TR215 TR216 TR217 TR218 TR219 TR222 TR223 TR226 TR228 TR230 TR232 TR234 TR239 TR240 TR304 TR307 TR309 TR315 TR317 TR319 TR321 TR323 TR333 TR402 TW101 TW104 TW106 TW108 TW110 TW114 TW115 TW119 TW201 TW203 TW205 TW207 TW209 TW211 TW212 TW213 TW215 TW218 TW301 TW302 TW303 TW304 TW305 TW306 TW307 TW309 TW310 TW311 TW312 TW318 TW320 TW321 TW322 TW323 TW324 TW325 TW326 TW327 TW328 TW331 TW332 TW333 TW335 TW336 TW339 TW346 TW349 TW350 TW354 TW355 TW360 TW361 TW363 TW401 TW405 TW407 TW409 TW410 TW411 TW413 TW414 TW415 TIN3 TIN4".split(
    " ",
  ),
);
const PARKING = new Set("R301 R304 R307 R308 R309 R310 R311 R312 R313 R314 R315 R316 R317 R318 R319 R320 R321 R322 R323 R324 R327 R330 R333".split(" "));

function variantsFor(code: string, group: SignGroup): string[] {
  const v: string[] = [];
  if (code === "R201") v.push("R201 · 40", "R201 · 60", "R201 · 80", "R201 · 100", "R201 · 120");
  if (code === "R101") v.push("R101 · 40", "R101 · 60");
  if (code === "R4.1") v.push("R4.2", "R4.3");
  if (PARKING.has(code)) v.push(`${code}-P (parking)`);
  if (/^[RW]\d/.test(code) && TEMP_CODES.has("T" + code)) v.push(`T${code} (temporary)`);
  if (/^IN\d/.test(code) && TEMP_CODES.has("T" + code)) v.push(`T${code} (temporary)`);
  if (group === "selective") v.push(`(TR)${code.slice(1)} (temporary)`);
  return v;
}

function build(rows: Row[], group: SignGroup): Sign[] {
  return rows.map(([code, name, meaning, icon]) => ({ code, name, meaning, group, icon, variants: variantsFor(code, group) }));
}

export const SIGNS: Sign[] = [
  ...build(control, "control"),
  ...build(command, "command"),
  ...build(prohibition, "prohibition"),
  ...build(reservation, "reservation"),
  ...build(comprehensive, "comprehensive"),
  ...build(selective, "selective"),
  ...build(warnLayout, "warning-layout"),
  ...build(warnDirection, "warning-direction"),
  ...build(warnSymbolic, "warning-symbolic"),
  ...build(hazard, "hazard"),
  ...build(information, "information"),
  ...build(guidance, "guidance"),
  ...build(tourism, "tourism"),
  ...build(markingReg, "marking-regulatory"),
  ...build(markingWarn, "marking-warning"),
  ...build(markingGuide, "marking-guidance"),
  ...build(signals, "signal"),
  ...build(temporary, "temporary"),
];

export const SIGN_GROUPS = Object.keys(GROUP_INFO) as SignGroup[];
export const signByCode = (code: string) => SIGNS.find((s) => s.code === code);
export const variantCount = () => SIGNS.reduce((n, s) => n + 1 + s.variants.length, 0);

/** Which learning category a sign group belongs to (index into CATEGORIES). */
export function categoryForGroup(g: SignGroup): number {
  if (g.startsWith("marking")) return 2;
  if (g === "signal") return 3;
  if (["information", "guidance", "tourism"].includes(g)) return 0;
  return 1;
}
