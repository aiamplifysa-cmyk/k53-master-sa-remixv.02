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
  ["R105", "Proceed straight only", "You must go straight ahead.", "up"],
  ["R106", "Proceed left only", "You must turn left ahead.", "left"],
  ["R107", "Proceed right only", "You must turn right ahead.", "right"],
  ["R108", "Turn left ahead", "You must turn left at the junction ahead.", "left"],
  ["R109", "Turn right ahead", "You must turn right at the junction ahead.", "right"],
  ["R110", "Proceed straight or left", "You may only go straight or turn left.", "upleft"],
  ["R111", "Proceed straight or right", "You may only go straight or turn right.", "upright"],
  ["R112", "Proceed left or right", "You may only turn left or right.", "leftright"],
  ["R113", "Keep left or right", "Pass the obstruction on either side.", "leftright"],
  ["R114", "Roundabout / turn left at circle", "Go around the circle in the direction shown.", "circle"],
  ["R115", "Pedal cyclists only", "Only pedal cycles may use this lane or road.", "bicycle"],
  ["R116", "Pedestrians only", "Only pedestrians may use this path.", "person"],
  ["R117", "Pedestrians and cyclists only", "A shared path for walkers and cyclists only.", "person"],
  ["R118", "Minibuses (taxis) only", "Only minibuses may use this lane or road.", "t:TAXI"],
  ["R119", "Midibuses only", "Only midibuses may use this lane or road.", "bus"],
  ["R120", "Buses and minibuses only", "Only buses and minibuses may use this lane.", "bus"],
  ["R121", "Buses only", "Only buses may use this lane or road.", "bus"],
  ["R122", "Motor cars only", "Only motor cars may use this lane or road.", "car"],
  ["R123", "Goods vehicles only", "Only goods vehicles (trucks) may use this lane.", "truck"],
  ["R124", "Delivery vehicles only", "Only delivery vehicles may use this lane or area.", "truck"],
  ["R125", "Motorcycles only", "Only motorcycles may use this lane.", "motorcycle"],
  ["R126", "Animal-drawn vehicles only", "Only animal-drawn vehicles may use this lane.", "cow"],
  ["R127", "Horse riders only", "Only horse riders may use this path.", "horse"],
  ["R128", "Rickshaws only", "Only rickshaws may use this lane.", "t:R"],
  ["R129", "Tour buses only", "Only tour buses may use this lane.", "bus"],
  ["R130", "Emergency vehicles only", "Only emergency vehicles may use this lane or area.", "t:SOS"],
  ["R131", "High-occupancy vehicles only", "Only vehicles carrying the number of people shown may use this lane.", "t:2+"],
  ["R132", "Toll route", "This road is a toll road; you will pay a toll.", "t:TOLL"],
  ["R133", "Headlamps on", "Switch on your headlamps (dipped beam) from this sign.", "lamp"],
  ["R134", "Wheel chains / snow tyres", "Vehicles must use snow chains on this road.", "t:❄"],
  ["R135", "Animal-drawn vehicles", "Lane for animal-drawn vehicles.", "cow"],
  ["R136", "Pedestrians keep left", "Pedestrians must keep to the left.", "person"],
  ["R137", "Traffic circle", "Drive clockwise around the traffic circle and yield to traffic already in it.", "circle"],
  ["R138", "Compulsory stop for inspection", "Heavy vehicles must stop for inspection (e.g. weighbridge).", "t:STOP"],
  ["R139", "Compulsory stop for customs", "All vehicles must stop at the border/customs post.", "t:STOP"],
  ["R140", "Compulsory stop for police", "All vehicles must stop at the police roadblock.", "t:STOP"],
];

const prohibition: Row[] = [
  ["R201", "Speed limit", "You may not drive faster than the speed shown in km/h.", "t:60"],
  ["R202", "Mass limit", "Vehicles heavier than the mass shown may not proceed.", "t:5t"],
  ["R203", "Axle mass limit", "Vehicles with an axle heavier than the mass shown may not proceed.", "t:2t"],
  ["R204", "Height limit", "Vehicles higher than the height shown may not proceed.", "height"],
  ["R205", "Length limit", "Vehicles longer than the length shown may not proceed.", "length"],
  ["R206", "No hooting", "Do not use your hooter (horn).", "horn"],
  ["R207", "No entry for vehicles over indicated length", "Long vehicles may not enter.", "length"],
  ["R208", "No overtaking", "Do not overtake any motor vehicle except motorcycles.", "overtake"],
  ["R209", "No left turn", "You may not turn left.", "left"],
  ["R210", "No right turn", "You may not turn right.", "right"],
  ["R211", "No U-turn left", "You may not make a U-turn.", "uturn"],
  ["R212", "No turns", "No left or right turns ahead.", "leftright"],
  ["R213", "No U-turn", "You may not make a U-turn.", "uturn"],
  ["R214", "No goods vehicles overtaking", "Goods vehicles may not overtake.", "truck"],
  ["R215", "No parking for indicated vehicle", "The vehicle shown may not park here.", "t:P"],
  ["R216", "No parking", "You may not park here. You may stop briefly to load or let passengers in/out.", "noparking"],
  ["R217", "No stopping", "You may not stop at all, not even to pick up or drop off passengers.", "nostopping"],
  ["R218", "No pedestrians", "Pedestrians are not allowed beyond this sign.", "person"],
  ["R219", "No pedal cycles", "Pedal cycles are not allowed beyond this sign.", "bicycle"],
  ["R220", "No motorcycles", "Motorcycles are not allowed beyond this sign.", "motorcycle"],
  ["R222", "No motor cars", "Motor cars are not allowed beyond this sign.", "car"],
  ["R223", "No minibuses", "Minibuses are not allowed beyond this sign.", "t:TAXI"],
  ["R224", "No midibuses and buses", "Buses are not allowed beyond this sign.", "bus"],
  ["R225", "No minibuses and buses", "Minibuses and buses are not allowed.", "bus"],
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
  ["R302", "Midibus reservation", "Reserved for midibuses.", "bus"],
  ["R303", "Bus and midibus reservation", "Reserved for buses and midibuses.", "bus"],
  ["R304", "Minibus (taxi) reservation", "Reserved for minibus taxis.", "t:TAXI"],
  ["R305", "Bus and minibus reservation", "Reserved for buses and minibuses.", "bus"],
  ["R306", "Midibus and minibus reservation", "Reserved for midibuses and minibuses.", "bus"],
  ["R307", "Pedal cycle reservation", "Reserved for pedal cycles.", "bicycle"],
  ["R308", "Motorcycle reservation", "Reserved for motorcycles.", "motorcycle"],
  ["R309", "Taxi (metered) reservation", "Reserved for metered taxis.", "t:TAXI"],
  ["R310", "Motor car reservation", "Reserved for motor cars.", "car"],
  ["R311", "Goods vehicle reservation", "Reserved for goods vehicles.", "truck"],
  ["R312", "Delivery vehicle reservation", "Reserved for delivery vehicles.", "truck"],
  ["R313", "Rickshaw reservation", "Reserved for rickshaws.", "t:R"],
  ["R314", "Tour bus reservation", "Reserved for tour buses.", "bus"],
  ["R315", "Construction vehicle reservation", "Reserved for construction vehicles.", "truck"],
  ["R316", "Persons with disabilities reservation", "Reserved for vehicles of persons with disabilities.", "wheelchair"],
  ["R317", "Loading zone reservation", "Reserved for vehicles loading or off-loading.", "t:LOAD"],
  ["R318", "Ambulance reservation", "Reserved for ambulances.", "t:+"],
  ["R319", "Fire vehicle reservation", "Reserved for fire engines.", "t:FIRE"],
  ["R320", "Police vehicle reservation", "Reserved for police vehicles.", "t:POL"],
  ["R321", "Emergency vehicle reservation", "Reserved for emergency vehicles.", "t:SOS"],
  ["R322", "Defence force reservation", "Reserved for defence force vehicles.", "t:SANDF"],
  ["R323", "Diplomatic vehicle reservation", "Reserved for diplomatic vehicles.", "t:CD"],
  ["R324", "Authorised vehicle reservation", "Reserved for authorised vehicles only.", "t:AUTH"],
  ["R325", "Pedestrian reservation", "Reserved for pedestrians.", "person"],
  ["R326", "Pedestrian and cyclist reservation", "Reserved for pedestrians and cyclists.", "person"],
  ["R327", "Animal-drawn vehicle reservation", "Reserved for animal-drawn vehicles.", "cow"],
  ["R328", "Horses and riders reservation", "Reserved for horse riders.", "horse"],
  ["R329", "Bus lane", "A lane reserved for buses.", "bus"],
  ["R330", "Bus and minibus lane", "A lane reserved for buses and minibuses.", "bus"],
  ["R331", "Bus lane begins", "A bus-only lane starts here.", "bus"],
  ["R332", "Minibus lane", "A lane reserved for minibuses.", "t:TAXI"],
  ["R333", "Bus, midibus & minibus reservation", "Reserved for buses, midibuses and minibuses.", "bus"],
  ["R334", "Cycle lane", "A lane reserved for pedal cycles.", "bicycle"],
  ["R335", "Cycle lane begins", "A cycle lane starts here.", "bicycle"],
  ["R336", "High-occupancy vehicle lane", "Lane for vehicles carrying at least the number of people shown.", "t:2+"],
  ["R337", "HOV lane begins", "A high-occupancy lane starts here.", "t:2+"],
  ["R338", "Tram reservation", "Reserved for trams.", "tram"],
  ["R339", "Tram lane", "A lane reserved for trams.", "tram"],
  ["R340", "Tram lane begins", "A tram lane starts here.", "tram"],
  ["R341", "Tram stop reservation", "Reserved for trams at a tram stop.", "tram"],
  ["R342", "Bus & tram reservation", "Reserved for buses and trams.", "tram"],
  ["R343", "Bus & tram lane", "A lane reserved for buses and trams.", "tram"],
  ["R344", "Bus & tram lane begins", "A bus and tram lane starts here.", "tram"],
  ["R345", "Bus, minibus & tram reservation", "Reserved for buses, minibuses and trams.", "tram"],
  ["R346", "Bus, minibus & tram lane", "A lane for buses, minibuses and trams.", "tram"],
  ["R347", "Bus, minibus & tram lane begins", "A lane for buses, minibuses and trams starts here.", "tram"],
  ["R348", "Bus lane (right)", "The right lane is reserved for buses.", "bus"],
  ["R349", "Bus & minibus lane (right)", "The right lane is reserved for buses and minibuses.", "bus"],
  ["R350", "Bus & tram lane (right)", "The right lane is reserved for buses and trams.", "tram"],
  ["R351", "Bus, minibus & tram lane (right)", "The right lane is reserved for buses, minibuses and trams.", "tram"],
  ["R352", "HOV lane (right)", "The right lane is for high-occupancy vehicles.", "t:2+"],
  ["R353", "Authorised passenger transport lane", "A lane for authorised public transport vehicles.", "bus"],
  ["R354", "Authorised passenger transport lane (right)", "The right lane is for authorised public transport vehicles.", "bus"],
];

const comprehensive: Row[] = [
  ["R401", "Dual-carriageway freeway begins", "Freeway rules start: no pedestrians, cyclists, animals or slow vehicles; no stopping except in emergencies. 120 km/h general limit.", "freeway"],
  ["R402", "Single-carriageway freeway begins", "Freeway rules start on a road with traffic in both directions.", "freeway"],
  ["R403", "Urban limit (speed limit area)", "You are entering a built-up area: the general speed limit of 60 km/h applies.", "t:60"],
];

const selective: Row[] = [
  ["R501", "Time restriction plate", "The sign above applies only during the times shown.", "t:07-09"],
  ["R511", "Day restriction plate", "The sign above applies only on the days shown.", "t:MON-FRI"],
  ["R520", "Action restriction plate", "The sign applies only to the action shown (e.g. loading).", "t:LOAD"],
  ["R530", "Text message plate", "Extra wording that limits the sign above.", "t:EXCEPT"],
  ["R560", "Vehicle class symbol plate", "The sign above applies only to the vehicle type shown.", "truck"],
  ["R600", "De-restriction", "The restriction shown with a grey diagonal bar has ended.", "t:END"],
];

const warnLayout: Row[] = [
  ["W101", "Crossroad", "A crossroad junction is ahead. Slow down and watch for crossing traffic.", "cross"],
  ["W102", "Crossroad (side road dominant)", "A crossroad ahead where the side road carries more traffic.", "cross"],
  ["W103", "T-junction", "The road ends at a T-junction ahead; you must turn left or right.", "tjunction"],
  ["W104", "Staggered junction", "Side roads join from both sides, one after the other.", "stagger"],
  ["W105", "Side road left", "A side road joins from the left ahead.", "sideleft"],
  ["W106", "Side road right", "A side road joins from the right ahead.", "sideright"],
  ["W107", "Y-junction", "The road splits into two ahead.", "yjunction"],
  ["W108", "Skew side road left", "A side road joins at an angle from the left.", "sideleft"],
  ["W109", "Skew side road right", "A side road joins at an angle from the right.", "sideright"],
  ["W110", "Junction with dual carriageway", "You are approaching a dual-carriageway junction.", "cross"],
  ["W111", "Road narrows both sides", "The road gets narrower on both sides.", "narrow"],
  ["W112", "Road narrows left", "The road gets narrower on the left side.", "narrow"],
  ["W113", "Road narrows right", "The road gets narrower on the right side.", "narrow"],
  ["W114", "Dual carriageway begins", "A dual carriageway (with a median) starts ahead.", "dual"],
  ["W115", "Dual carriageway ends", "The dual carriageway ends; two-way traffic follows.", "dual"],
  ["W116", "Freeway ends", "The freeway ends ahead.", "freeway"],
  ["W117", "Bridge / narrow bridge", "A narrow bridge is ahead.", "narrow"],
  ["W118", "Merge from left", "Traffic merges from the left ahead.", "merge"],
  ["W119", "Merge from right", "Traffic merges from the right ahead.", "merge"],
];

const warnDirection: Row[] = [
  ["W201", "Traffic circle ahead", "A traffic circle is ahead. Slow down and give way to traffic in the circle.", "circle"],
  ["W202", "Sharp curve left", "A sharp bend to the left ahead.", "curveleft"],
  ["W203", "Sharp curve right", "A sharp bend to the right ahead.", "curveright"],
  ["W204", "Gentle curve left", "A gentle bend to the left ahead.", "curveleft"],
  ["W205", "Gentle curve right", "A gentle bend to the right ahead.", "curveright"],
  ["W206", "Hairpin bend", "A very sharp U-shaped bend ahead.", "uturn"],
  ["W207", "Winding road", "A series of bends ahead, the first one to the left.", "winding"],
  ["W208", "Winding road (right first)", "A series of bends ahead, the first one to the right.", "winding"],
  ["W209", "Reverse curve left", "Two bends close together, first to the left.", "winding"],
  ["W210", "Reverse curve right", "Two bends close together, first to the right.", "winding"],
  ["W211", "Two-way traffic crossing", "Two-way traffic crosses ahead.", "twoway"],
  ["W212", "Two-way traffic ahead", "The one-way road ends; traffic will come toward you.", "twoway"],
  ["W213", "Lane ends left", "The left lane ends; merge right when safe.", "merge"],
  ["W214", "Lane ends right", "The right lane ends; merge left when safe.", "merge"],
  ["W215", "Lanes reduce", "The number of lanes is reduced ahead.", "narrow"],
  ["W216", "Added lane", "An extra lane joins ahead.", "merge"],
  ["W217", "Lane change", "Traffic must shift lanes ahead.", "merge"],
  ["W218", "Contra-flow", "Traffic in some lanes flows the opposite way ahead.", "twoway"],
];

const warnSymbolic: Row[] = [
  ["W301", "Traffic signal ahead", "Traffic lights (a robot) are ahead. Be ready to stop.", "signal"],
  ["W302", "Stop sign ahead", "A stop sign is ahead. Prepare to stop.", "stop"],
  ["W303", "Yield sign ahead", "A yield sign is ahead. Prepare to give way.", "yield"],
  ["W306", "Pedestrian crossing", "A pedestrian crossing is ahead. Slow down and watch for people crossing.", "person"],
  ["W307", "Pedestrians", "Pedestrians may be walking on or next to the road.", "person"],
  ["W308", "Children", "Children may cross ahead (school area). Slow down.", "children"],
  ["W309", "Pedal cyclists", "Cyclists may be on or crossing the road ahead.", "bicycle"],
  ["W310", "Cattle", "Cattle may be on the road ahead.", "cow"],
  ["W311", "Wild animals", "Wild animals (e.g. kudu) may cross ahead.", "deer"],
  ["W312", "Horses", "Horses and riders may be on the road.", "horse"],
  ["W313", "Sheep/goats", "Sheep or goats may be on the road.", "cow"],
  ["W314", "Warthog / small animals", "Small wild animals may cross ahead.", "deer"],
  ["W315", "Low-flying aircraft", "Low-flying aircraft and sudden noise ahead.", "plane"],
  ["W316", "Falling rocks", "Rocks may fall onto the road ahead.", "rocks"],
  ["W317", "Loose stones", "Loose gravel may be thrown up by vehicles.", "rocks"],
  ["W318", "Railway crossing (no gates)", "A level crossing without boom gates ahead. Look and listen for trains.", "train"],
  ["W319", "Tunnel", "A tunnel is ahead. Switch on your headlamps.", "tunnel"],
  ["W320", "Railway crossing with gates", "A level crossing with boom gates ahead.", "train"],
  ["W321", "Tram crossing", "Trams cross the road ahead.", "tram"],
  ["W322", "Steep descent", "A steep downhill is ahead. Use a lower gear.", "descent"],
  ["W323", "Steep ascent", "A steep uphill is ahead.", "ascent"],
  ["W324", "Uneven road", "The road surface is uneven ahead.", "bumps"],
  ["W325", "Drift / dip", "A dip or drift where water may flow across the road.", "water"],
  ["W326", "Low-level bridge", "A low-level bridge that may flood.", "water"],
  ["W327", "Road liable to flooding", "The road may be under water after rain.", "water"],
  ["W328", "Gravel road ahead", "The tar ends; gravel road ahead.", "rocks"],
  ["W329", "Soft shoulder", "The road edge is soft; do not drive onto it.", "t:SOFT"],
  ["W330", "Narrow road", "The road ahead is narrow.", "narrow"],
  ["W331", "Road works", "Road works ahead.", "worker"],
  ["W332", "Speed hump", "A speed hump is ahead. Slow down.", "hump"],
  ["W333", "Slippery road", "The road may be slippery. Avoid sudden braking or steering.", "slippery"],
  ["W334", "Crosswind", "Strong side winds may push your vehicle.", "wind"],
  ["W335", "Bus stop / buses turning", "Buses may stop or turn ahead.", "bus"],
  ["W339", "Accident / incident ahead", "A crash or incident is ahead. Slow down.", "t:!"],
  ["W346", "Fog / mist", "Fog or mist may limit visibility.", "t:FOG"],
  ["W348", "Fire / smoke", "Smoke from veld fires may limit visibility.", "t:SMOKE"],
  ["W349", "Hijack hotspot", "A crime hotspot: stay alert and keep doors locked.", "t:!"],
  ["W350", "Robot not working / signals ahead", "Signals ahead may be out of order; treat as a 4-way stop.", "signal"],
  ["W351", "Mini-circle", "A mini traffic circle is ahead.", "circle"],
  ["W352", "Overhead cables / height", "Low overhead clearance ahead.", "height"],
  ["W354", "Queues likely", "Traffic may be queuing ahead.", "car"],
  ["W355", "General danger", "Take care: a hazard not covered by other signs is ahead.", "t:!"],
  ["W356", "Animal-drawn vehicles", "Animal-drawn carts may be on the road.", "cow"],
  ["W357", "Tractors / farm vehicles", "Slow farm vehicles may be on the road.", "tractor"],
  ["W358", "Cyclists crossing", "A cycle path crosses ahead.", "bicycle"],
  ["W359", "Pedestrians crossing (freeway)", "Pedestrians may cross a high-speed road.", "person"],
  ["W360", "Hippo / large animals", "Large wild animals may cross ahead.", "deer"],
  ["W361", "Disabled persons", "Persons with disabilities may be crossing.", "wheelchair"],
  ["W362", "Aged persons", "Elderly people may be crossing.", "person"],
  ["W363", "Speed camera ahead", "Speed is checked by camera ahead.", "t:CAM"],
];

const hazard: Row[] = [
  ["W401", "Sharp curve chevron (left)", "Placed on a sharp bend: follow the chevrons around to the left.", "chevleft"],
  ["W402", "Sharp curve chevron (right)", "Placed on a sharp bend: follow the chevrons around to the right.", "chevright"],
  ["W403", "Hazard marker (left)", "An obstruction: pass on the side the stripes point down to.", "stripes"],
  ["W404", "Hazard marker (right)", "An obstruction: pass on the side the stripes point down to.", "stripes"],
  ["W405", "Danger plate (left)", "Marks the left edge of a bridge or dangerous point.", "stripes"],
  ["W406", "Danger plate (right)", "Marks the right edge of a bridge or dangerous point.", "stripes"],
  ["W407", "Large chevron (left)", "A sharp curve to the left; slow right down.", "chevleft"],
  ["W408", "Large chevron (right)", "A sharp curve to the right; slow right down.", "chevright"],
  ["W409", "T-junction hazard plate", "Marks the end of the road at a T-junction.", "chevboth"],
  ["W410", "Pass either side", "Obstruction ahead: you may pass on either side.", "chevboth"],
  ["W411", "Width marker", "Marks a narrow point or bridge edge.", "stripes"],
  ["W413", "Delineator", "Shows the road edge at night.", "stripes"],
  ["W414", "Road closed barrier", "The road is closed beyond this barrier.", "stripes"],
  ["W415", "Hazard marker (median)", "Marks the start of a median island.", "chevboth"],
];

const information: Row[] = [
  ["IN1", "Parking", "A parking area is here.", "t:P"],
  ["IN2", "Hospital", "A hospital is nearby. Drive quietly.", "t:H"],
  ["IN3", "Dead end / no through road", "This road does not lead through.", "t:T"],
  ["IN4", "Pedestrian crossing", "Marks a pedestrian crossing.", "person"],
  ["IN5", "Freeway number", "Shows the freeway route you are on.", "t:N1"],
  ["IN6", "Emergency telephone", "An emergency phone is available.", "t:SOS"],
  ["IN7", "Escape road", "An escape road for vehicles with brake failure.", "t:ESC"],
  ["IN10", "Toll plaza ahead", "A toll plaza is ahead.", "t:TOLL"],
  ["IN11.1", "Distance plate", "Shows how far ahead the hazard or sign is.", "t:200m"],
  ["IN11.2", "Direction plate", "Shows the direction the sign applies.", "right"],
  ["IN11.3", "Length plate", "Shows how long the hazard or restriction lasts.", "t:2km"],
  ["IN11.4", "Text plate", "Gives extra information about the sign.", "t:INFO"],
  ["IN12", "Speed camera", "Speed is enforced by camera.", "t:CAM"],
  ["IN14", "Bus stop", "A bus stop is here.", "bus"],
  ["IN15", "Minibus stop", "A minibus taxi stop is here.", "t:TAXI"],
  ["IN19", "Radio frequency", "Tune to the radio station shown for traffic info.", "t:FM"],
];

const guidance: Row[] = [
  ["GL1", "Street name", "Shows the street name.", "t:ST"],
  ["GL2", "Suburb name", "Shows the suburb you are entering.", "t:SUB"],
  ["GL3", "Town or city name", "Shows the town or city you are entering.", "t:TOWN"],
  ["GL4", "River name", "Shows the river you are crossing.", "water"],
  ["GL5", "Provincial border", "You are crossing a provincial or national border.", "t:PROV"],
  ["GL6", "Geographical location", "Names a mountain pass or landmark.", "t:PASS"],
  ["GL7", "Route name", "Shows the name of the route.", "t:RT"],
  ["GL8", "Interchange name", "Shows the name of the freeway interchange.", "t:IC"],
  ["GE1", "National route marker", "Shows a national route number (e.g. N1).", "t:N1"],
  ["GE2", "Advance trailblazer", "Shows the route you will reach ahead.", "t:R50"],
  ["GE9", "Advance transport trailblazer", "Directs heavy vehicles to their route.", "truck"],
  ["GE18", "Tourism route marker", "Marks a tourism route.", "t:TR"],
  ["GE19", "SADC route marker", "Marks a regional (SADC) route.", "t:SADC"],
  ["GD1", "Stack-type direction sign", "Shows destinations stacked with arrows.", "up"],
  ["GD4", "Fingerboard", "Points to a destination down a side road.", "right"],
  ["GD9", "Map-type advance direction", "A map of the junction ahead.", "cross"],
  ["GD10", "Overhead advance direction", "Overhead sign showing which lane to use.", "up"],
  ["GA2", "Freeway advance direction", "Shows the freeway exit ahead.", "upright"],
  ["GA3", "Freeway exit direction", "Shows where to leave the freeway.", "upright"],
  ["GA4", "Exit number", "Shows the freeway exit number.", "t:EXIT"],
  ["GB1", "Crossroad freeway direction", "Directs you onto the freeway from a crossroad.", "freeway"],
  ["GC1", "Toll direction", "Directs you along a toll route.", "t:TOLL"],
  ["GF1", "Overhead freeway direction", "Overhead lane guidance on the freeway.", "up"],
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
  ["GFS A1", "Tourism attraction (general)", "A tourism attraction (brown sign).", "t:★"],
  ["GFS A2", "Nature reserve / park", "A nature reserve or national park.", "deer"],
  ["GFS A4", "Historical site", "A historical attraction.", "t:HIST"],
  ["GFS A5", "Sports attraction", "A sports venue or attraction.", "t:SPORT"],
  ["GFS A7", "Coastal attraction", "A beach or coastal attraction.", "water"],
  ["GFS A8", "Arts & crafts", "An arts and crafts attraction.", "t:ART"],
  ["GFS A9", "Cultural attraction", "A cultural attraction.", "t:CULT"],
  ["GFS A11", "Adventure attraction", "An adventure activity.", "t:ADV"],
  ["GFS A12", "Farming attraction", "A farm attraction (e.g. wine farm).", "tractor"],
  ["GFS B1", "Emergency services (hospital)", "Hospital or emergency services (blue service sign).", "t:H"],
  ["GFS B2", "Light vehicle services (fuel)", "Fuel and vehicle services.", "t:FUEL"],
  ["GFS B4", "Food services", "Restaurant or food.", "t:FOOD"],
  ["GFS B5", "General services", "Toilets, phone or information.", "t:i"],
  ["GFS B6", "Rest & service area", "A rest and service area.", "t:REST"],
  ["GFS C1", "Accommodation", "Hotels or accommodation.", "t:BED"],
  ["GFS D1", "Tourism information", "A tourism information office.", "t:i"],
];

const markingReg: Row[] = [
  ["RTM1", "Stop line", "A solid line at a stop sign or signal: stop with your front behind it.", "m:stopline"],
  ["RTM2", "Yield line", "A broken line (triangles) at a yield sign: give way here.", "m:yieldline"],
  ["RTM3", "Pedestrian crossing lines", "Two broken parallel lines marking a pedestrian crossing.", "m:ped"],
  ["RTM4", "Zebra crossing", "Wide white stripes: pedestrians on the crossing have right of way.", "m:zebra"],
  ["RM1", "No overtaking line (barrier line)", "A solid centre line: do not cross or drive on it, and do not overtake across it.", "m:solid"],
  ["RM2", "Lane line (no lane change)", "A solid white lane line: do not change lanes across it.", "m:solid"],
  ["RM3", "Painted island", "Diagonal lines: you may not drive or stop on it.", "m:island"],
  ["RM4.1", "Left edge line", "A yellow line marking the left edge of the road; do not drive left of it except in emergencies.", "m:yellowedge"],
  ["RM4.2", "Right edge line", "Marks the right edge of the road on a dual carriageway.", "m:yellowedge"],
  ["RM5", "Turning lane arrows", "Arrows in a lane: you must follow the direction shown.", "m:arrow"],
  ["RM6", "Dividing line on bridge", "No overtaking on the bridge.", "m:solid"],
  ["RM7", "Parking bay", "Marks where you may park.", "m:bay"],
  ["RM8", "No-stopping line", "A red line along the kerb: no stopping at any time.", "m:redline"],
  ["RM9", "No-parking line", "A yellow line along the kerb: no parking.", "m:yellowedge"],
  ["RM10", "Yellow box junction", "Do not enter the box unless your exit is clear.", "m:box"],
  ["RM11", "Bus/taxi lane marking", "A lane reserved for the vehicle written in it.", "m:bus"],
  ["RM12", "Exclusive parking bay symbol", "Parking only for the vehicle shown (e.g. ambulance, police).", "m:bay"],
  ["RM13", "Speed limit marking", "The speed limit painted on the road.", "m:speed"],
  ["RM14", "Cycle lane marking", "A lane for cyclists only.", "m:cycle"],
  ["RM15", "Disabled parking bay", "Parking only for persons with disabilities.", "m:bay"],
  ["RM16", "Loading bay", "For loading and off-loading only.", "m:bay"],
  ["RM17", "Stop/Yield word marking", "STOP or YIELD painted on the road.", "m:stopline"],
];

const markingWarn: Row[] = [
  ["WM1", "No overtaking line ahead (warning line)", "Long broken lines: a barrier line is coming, finish overtaking.", "m:warnbroken"],
  ["WM2", "Lane line warning", "Long broken lane line: a solid line is coming.", "m:warnbroken"],
  ["WM3", "Painted island approach", "Warns that a painted island is ahead.", "m:island"],
  ["WM4", "Stop ahead (word)", "STOP painted ahead of the junction.", "m:stopline"],
  ["WM5", "Yield ahead (triangle)", "A painted triangle: a yield line is ahead.", "m:yieldline"],
  ["WM6", "Pedestrian crossing ahead (diamond)", "A painted diamond: a pedestrian crossing is ahead.", "m:diamond"],
  ["WM7", "Speed hump marking", "Marks a speed hump.", "m:hump"],
  ["WM8", "Rumble strips", "Raised strips that warn you to slow down.", "m:rumble"],
  ["WM9.1", "Zig-zag lines", "Zig-zag lines near a crossing: no stopping or overtaking.", "m:zigzag"],
  ["WM10", "Obstruction ahead marking", "Lines guiding you around an obstruction.", "m:island"],
  ["WM11", "Railway crossing marking", "RX painted ahead of a railway crossing.", "m:rx"],
];

const markingGuide: Row[] = [
  ["GM1", "Centre line (broken)", "Broken centre line: you may cross it to overtake when safe.", "m:broken"],
  ["GM2", "Lane line (broken)", "Broken lane line: you may change lanes when safe.", "m:broken"],
  ["GM3", "Continuity line", "Short broken line at an exit or on-ramp lane.", "m:broken"],
  ["GM4", "Turn guide lines", "Guide you through a junction turn.", "m:broken"],
  ["GM5", "Channelising line", "Separates traffic going different ways.", "m:solid"],
  ["GM6", "Edge line (white)", "Marks the edge of the travelled road.", "m:solid"],
  ["GM7", "Directional arrows", "Show the direction of travel.", "m:arrow"],
  ["GM8", "Parking guide lines", "Guide you into parking bays.", "m:bay"],
];

const signals: Row[] = [
  ["S1", "Steady red", "Stop behind the stop line and wait until green.", "s:red"],
  ["S2", "Steady amber (yellow)", "Stop if you can do so safely; red will follow.", "s:amber"],
  ["S3", "Steady green", "Go if the junction is clear. Yield to pedestrians and turning rules.", "s:green"],
  ["S4", "Flashing red", "Treat as a stop sign (or a 4-way stop if all are flashing).", "s:flashred"],
  ["S5", "Flashing amber", "Proceed with caution; yield to pedestrians.", "s:flashamber"],
  ["S6", "Green arrow", "You may go in the direction of the arrow.", "s:arrow"],
  ["S7", "Red arrow", "You may not go in the direction of the arrow.", "s:redarrow"],
  ["S8", "Pedestrian signal (red man / green man)", "Pedestrians wait on red man, cross on green man.", "s:ped"],
  ["S9", "Pedal cycle signal", "Signal for cyclists only.", "s:green"],
  ["S10", "Bus signal", "Signal for buses only.", "s:green"],
  ["S11", "Tram signal", "Signal for trams only.", "s:green"],
  ["S13", "Lane control signal", "Green arrow: lane open. Red X: lane closed.", "s:arrow"],
  ["S16", "Railway crossing signal", "Flashing red lights: a train is coming. Stop.", "s:flashred"],
  ["S17", "Signal out of order", "When the robot is dark or broken, treat the junction as a 4-way stop.", "s:off"],
  ["SS1", "Traffic officer: stop (from front)", "An officer facing you with a raised hand: stop.", "officer"],
  ["SS2", "Traffic officer: stop (from behind)", "An officer with back to you and arm out: stop.", "officer"],
  ["SS3", "Traffic officer: proceed", "An officer waving you on: go.", "officer"],
  ["FRD", "Flag signal (roadworks)", "A flagman with a red flag: stop or slow as shown.", "officer"],
];

const temporary: Row[] = [
  ["TW331", "Roadworks ahead (temporary)", "Yellow sign: roadworks ahead. Temporary signs override permanent ones.", "worker"],
  ["TW336", "Men at work", "Workers on or near the road. Slow down.", "worker"],
  ["TW401", "Temporary chevron", "Follow the yellow chevrons through the work zone.", "chevleft"],
  ["TW405", "Temporary hazard plate", "Marks an obstruction in the work zone.", "stripes"],
  ["TR201", "Temporary speed limit", "Temporary speed limit at roadworks.", "t:60"],
  ["TR208", "Temporary no overtaking", "No overtaking through the work zone.", "overtake"],
  ["TR1.5", "Stop/Go (roadworks)", "Obey the flagman: stop on STOP, go on GO.", "stop"],
  ["TIN11.1", "Temporary distance plate", "How far ahead the roadworks are.", "t:500m"],
  ["TGD1", "Temporary detour", "Follow the detour route.", "t:DETOUR"],
];

const TEMP_CODES = new Set(
  "TR101 TR104 TR106 TR109 TR110 TR111 TR112 TR118 TR119 TR121 TR123 TR125 TR127 TR129 TR130 TR131 TR133 TR134 TR136 TR137 TR201 TR202 TR203 TR204 TR205 TR208 TR210 TR211 TR212 TR214 TR215 TR216 TR217 TR218 TR219 TR222 TR223 TR226 TR228 TR230 TR232 TR234 TR239 TR240 TR304 TR307 TR309 TR315 TR317 TR319 TR321 TR323 TR333 TR402 TW101 TW104 TW106 TW108 TW110 TW114 TW115 TW119 TW201 TW203 TW205 TW207 TW209 TW211 TW212 TW213 TW215 TW218 TW301 TW302 TW303 TW304 TW305 TW306 TW307 TW309 TW310 TW311 TW312 TW318 TW320 TW321 TW322 TW323 TW324 TW325 TW326 TW327 TW328 TW331 TW332 TW333 TW335 TW336 TW339 TW346 TW349 TW350 TW354 TW355 TW360 TW361 TW363 TW401 TW405 TW407 TW409 TW410 TW411 TW413 TW414 TW415 TIN3 TIN4".split(
    " ",
  ),
);
const PARKING = new Set("R301 R304 R305 R306 R307 R308 R309 R310 R311 R312 R313 R314 R315 R316 R317 R318 R319 R320 R321 R322 R323 R324 R327 R330 R333".split(" "));

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
