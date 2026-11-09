
(() => {
'use strict';
let practice = null;

/* =========================================================
   Data
   ========================================================= */
const NATIONS = [   // order fixed: championships saved before clubs existed index into it
  { id:'ENG', name:'England',  kit:'#f2efe6', trim:'#c8102e', alt:'#1b2747', altTrim:'#c8102e', pace:4, power:5, handling:3, kicking:4, stamina:4, home:true },
  { id:'FRA', name:'France',   kit:'#1d3a8f', trim:'#f2efe6', alt:'#f2efe6', altTrim:'#1d3a8f', pace:5, power:5, handling:4, kicking:4, stamina:5 },
  { id:'IRE', name:'Ireland',  kit:'#109a52', trim:'#f2efe6', alt:'#f2efe6', altTrim:'#109a52', pace:4, power:4, handling:5, kicking:5, stamina:5, home:true },
  { id:'ITA', name:'Italy',    kit:'#2f7ed8', trim:'#f2efe6', alt:'#f2efe6', altTrim:'#2f7ed8', pace:4, power:3, handling:3, kicking:3, stamina:3 },
  { id:'SCO', name:'Scotland', kit:'#1a2a5e', trim:'#f2efe6', alt:'#f2efe6', altTrim:'#1a2a5e', pace:5, power:3, handling:4, kicking:3, stamina:4, home:true },
  { id:'WAL', name:'Wales',    kit:'#c8102e', trim:'#f2efe6', alt:'#1c1c1c', altTrim:'#c8102e', pace:3, power:4, handling:3, kicking:3, stamina:4, home:true },
];
/* Local clubs: kit colours are the clubs' own, ratings follow last season's results (src/ratings.js), and league, place, w, d, l, pf, pa are
   that season's line, real figures read from the list and never saved. Append only, never reorder. */
const CLUBS = [
  { id:'FAR', name:'Farnham',       kit:'#1a1a1a', trim:'#f2efe6', hoops:true, pace:4, power:3, handling:4, kicking:3, stamina:3, league:'Regional 1 South Central', place:7, w:10, d:0, l:12, pf:640, pa:646 },
  { id:'HAS', name:'Haslemere',     kit:'#2244aa', trim:'#f2efe6', hoops:true, pace:3, power:3, handling:3, kicking:2, stamina:3, league:'Counties 3 Surrey', place:9, w:4, d:0, l:16, pf:344, pa:598 },
  { id:'GUI', name:'Guildford',     kit:'#1a1e4f', trim:'#ffc014', pace:3, power:4, handling:3, kicking:3, stamina:3, league:'Regional 2 South Central', place:10, w:6, d:0, l:16, pf:442, pa:897 },
  { id:'ALD', name:'Aldershot',     kit:'#d8333a', trim:'#1b2747', pace:3, power:4, handling:2, kicking:3, stamina:4, league:'Counties 3 Hampshire', place:8, w:5, d:0, l:11, pf:335, pa:480 },
  { id:'WEY', name:'Weybridge',     kit:'#1a1a1a', trim:'#0f8040', pace:3, power:3, handling:4, kicking:3, stamina:3, league:'Counties 1 Surrey/Sussex', place:2, w:18, d:0, l:2, pf:770, pa:336 },
  { id:'HAR', name:'Twickenham',    kit:'#c8306f', trim:'#7eb0dc', pace:4, power:3, handling:4, kicking:3, stamina:3, league:'English Premiership', place:9, w:6, d:0, l:12, pf:448, pa:589 },
  { id:'COB', name:'Cobham',        kit:'#26316f', trim:'#7a2338', hoops:true, pace:3, power:3, handling:3, kicking:3, stamina:3, league:'Counties 1 Surrey/Sussex', place:1, w:20, d:0, l:0, pf:920, pa:412 },
  { id:'GDN', name:'Guildfordians', kit:'#12482a', trim:'#6b1a3a', hoops:true, pace:3, power:3, handling:3, kicking:2, stamina:2, league:'Counties 5 Surrey', place:4, w:7, d:0, l:7, pf:422, pa:313 },
  { id:'IRO', name:'Ironsides',     kit:'#1f9a55', trim:'#c8191e', pace:3, power:4, handling:2, kicking:2, stamina:4, league:'Regional 2 South East', place:6, w:12, d:0, l:10, pf:660, pa:708 },
  { id:'KIN', name:'Kingston',      kit:'#7c1431', trim:'#f2efe6', pace:3, power:4, handling:3, kicking:2, stamina:3, league:'Counties 3 Surrey', place:7, w:9, d:0, l:11, pf:565, pa:638 },
  { id:'ORU', name:'Old Ruts',      kit:'#2a3290', trim:'#f5c400', hoops:true, pace:4, power:3, handling:3, kicking:2, stamina:2, league:'Counties 1 Surrey/Sussex', place:7, w:9, d:1, l:10, pf:474, pa:585 },
  { id:'WIM', name:'Wimbledon',     kit:'#7c1956', trim:'#6cadde', hoops:true, pace:4, power:3, handling:3, kicking:3, stamina:4, league:'Regional 1 South Central', place:9, w:9, d:0, l:13, pf:661, pa:740 },
];
/* Professional sides go by their city, not the club's own name or nickname: the city is a place, the club name is a
   trademark. That goes for the Local list's one professional side too: Twickenham, code HAR so saves still find it (cleanSide). Kit colours follow the clubs' own; ratings follow last season's results (CLUB_RATED, src/ratings.js).
   Codes are unique across every list, nations included. Append only, never reorder. */
const FRANCE = [   // the Top 14
  { id:'TLS', name:'Toulouse',    kit:'#d01f2e', trim:'#1c1c1c', pace:4, power:4, handling:3, kicking:3, stamina:3, league:'Top 14', place:1, w:18, d:0, l:8, pf:981, pa:617 },
  { id:'BOR', name:'Bordeaux',    kit:'#5c1a33', trim:'#f2efe6', pace:4, power:3, handling:4, kicking:3, stamina:3, league:'Top 14', place:8, w:14, d:0, l:12, pf:822, pa:719 },
  { id:'LRO', name:'La Rochelle', kit:'#f5c400', trim:'#1c1c1c', pace:3, power:4, handling:3, kicking:3, stamina:4, league:'Top 14', place:6, w:15, d:0, l:11, pf:824, pa:634 },
  { id:'TLN', name:'Toulon',      kit:'#1c1c1c', trim:'#d01f2e', pace:3, power:4, handling:3, kicking:3, stamina:3, league:'Top 14', place:9, w:12, d:1, l:13, pf:714, pa:820 },
  { id:'NAN', name:'Nanterre',    kit:'#7eb6e0', trim:'#f2efe6', hoops:true, pace:4, power:3, handling:3, kicking:3, stamina:3, league:'Top 14', place:5, w:16, d:1, l:9, pf:828, pa:723 },
  { id:'PAR', name:'Paris',       kit:'#e2457f', trim:'#1b2747', pace:3, power:3, handling:4, kicking:3, stamina:3, league:'Top 14', place:3, w:15, d:1, l:10, pf:869, pa:664 },
  { id:'CLE', name:'Clermont',    kit:'#f5c400', trim:'#1b2747', pace:3, power:3, handling:3, kicking:3, stamina:4, league:'Top 14', place:7, w:15, d:0, l:11, pf:812, pa:708 },
  { id:'CAS', name:'Castres',     kit:'#2050b0', trim:'#f2efe6', pace:3, power:4, handling:2, kicking:3, stamina:3, league:'Top 14', place:10, w:11, d:0, l:15, pf:660, pa:751 },
  { id:'MPL', name:'Montpellier', kit:'#1b2747', trim:'#6fb7e6', pace:3, power:4, handling:3, kicking:2, stamina:3, league:'Top 14', place:2, w:17, d:1, l:8, pf:824, pa:587 },
  { id:'PAU', name:'Pau',         kit:'#0f7a3c', trim:'#f2efe6', pace:3, power:3, handling:3, kicking:3, stamina:3, league:'Top 14', place:4, w:17, d:0, l:9, pf:817, pa:665 },
  { id:'BAY', name:'Bayonne',     kit:'#6fb7e6', trim:'#f2efe6', pace:3, power:3, handling:3, kicking:3, stamina:3, league:'Top 14', place:12, w:11, d:0, l:15, pf:747, pa:869 },
  { id:'LYO', name:'Lyon',        kit:'#c8102e', trim:'#1c1c1c', hoops:true, pace:3, power:3, handling:3, kicking:3, stamina:3, league:'Top 14', place:11, w:11, d:1, l:14, pf:734, pa:774 },
  { id:'PGN', name:'Perpignan',   kit:'#f2b01e', trim:'#c8102e', pace:3, power:3, handling:2, kicking:3, stamina:3, league:'Top 14', place:13, w:6, d:0, l:20, pf:550, pa:797 },
  { id:'MTB', name:'Montauban',   kit:'#f2efe6', trim:'#2050b0', pace:3, power:3, handling:2, kicking:2, stamina:2, league:'Top 14', place:14, w:1, d:1, l:24, pf:495, pa:1349 },
];
const AUSTRALIA = [   // the Super Rugby cities, with Melbourne and Adelaide to make six
  { id:'SYD', name:'Sydney',    kit:'#6fb7e6', trim:'#1b2747', pace:4, power:3, handling:4, kicking:3, stamina:3, league:'Super Rugby Pacific', place:8, w:5, d:0, l:9, pf:353, pa:402 },
  { id:'BRI', name:'Brisbane',  kit:'#a3162f', trim:'#f2efe6', pace:4, power:4, handling:3, kicking:3, stamina:3, league:'Super Rugby Pacific', place:5, w:8, d:0, l:6, pf:364, pa:386 },
  { id:'CAN', name:'Canberra',  kit:'#1b2747', trim:'#f2b01e', pace:3, power:4, handling:4, kicking:3, stamina:3, league:'Super Rugby Pacific', place:6, w:7, d:0, l:7, pf:402, pa:373 },
  { id:'PTH', name:'Perth',     kit:'#2050b0', trim:'#f2b01e', pace:3, power:3, handling:3, kicking:3, stamina:4, league:'Super Rugby Pacific', place:7, w:7, d:0, l:7, pf:358, pa:383 },
  { id:'MEL', name:'Melbourne', kit:'#14235a', trim:'#c8102e', hoops:true, pace:3, power:3, handling:3, kicking:3, stamina:3 },
  { id:'ADL', name:'Adelaide',  kit:'#c8102e', trim:'#1b2747', pace:3, power:3, handling:3, kicking:2, stamina:3 },
];
const SOUTH_AFRICA = [   // the URC four and the Currie Cup's next three
  { id:'PRE', name:'Pretoria',     kit:'#2a5fb8', trim:'#f2efe6', pace:3, power:5, handling:3, kicking:3, stamina:3, league:'United Rugby Championship', place:4, w:12, d:0, l:6, pf:566, pa:406 },
  { id:'CPT', name:'Cape Town',    kit:'#1c1c1c', trim:'#2a5fb8', hoops:true, pace:4, power:4, handling:3, kicking:3, stamina:3, league:'United Rugby Championship', place:3, w:12, d:1, l:5, pf:504, pa:344 },
  { id:'DUR', name:'Durban',       kit:'#1c1c1c', trim:'#f2efe6', pace:4, power:4, handling:3, kicking:2, stamina:4, league:'United Rugby Championship', place:10, w:8, d:1, l:9, pf:467, pa:428 },
  { id:'JHB', name:'Johannesburg', kit:'#c8102e', trim:'#f2efe6', pace:4, power:3, handling:3, kicking:3, stamina:4, league:'United Rugby Championship', place:7, w:10, d:1, l:7, pf:532, pa:473 },
  { id:'BLM', name:'Bloemfontein', kit:'#e8731c', trim:'#f2efe6', pace:3, power:4, handling:3, kicking:2, stamina:4, league:'Currie Cup', place:2, w:5, d:0, l:2, pf:245, pa:226 },
  { id:'KIM', name:'Kimberley',    kit:'#f2efe6', trim:'#b0b4ba', pace:3, power:3, handling:3, kicking:2, stamina:3, league:'Currie Cup', place:1, w:6, d:0, l:1, pf:271, pa:143 },
  { id:'MBO', name:'Mbombela',     kit:'#d8a823', trim:'#1c1c1c', pace:3, power:4, handling:2, kicking:2, stamina:3, league:'Currie Cup', place:3, w:4, d:0, l:3, pf:201, pa:195 },
];
const ENGLAND = [   // the top flight, in last season's table order. Twickenham is the Local list's own object, so it stays one team with one code
  { id:'NTH', name:'Northampton', kit:'#0f5a32', trim:'#f2b01e', pace:4, power:3, handling:4, kicking:3, stamina:3, league:'English Premiership', place:1, w:14, d:1, l:3, pf:693, pa:536 },
  { id:'BAT', name:'Bath',        kit:'#14307a', trim:'#f2efe6', pace:3, power:4, handling:4, kicking:3, stamina:3, league:'English Premiership', place:2, w:13, d:0, l:5, pf:646, pa:424 },
  { id:'EXE', name:'Exeter',      kit:'#1c1c1c', trim:'#f2efe6', pace:3, power:5, handling:3, kicking:3, stamina:3, league:'English Premiership', place:3, w:11, d:1, l:6, pf:521, pa:367 },
  { id:'LEI', name:'Leicester',   kit:'#0f7a3c', trim:'#c8102e', hoops:true, pace:3, power:5, handling:3, kicking:4, stamina:2, league:'English Premiership', place:4, w:12, d:0, l:6, pf:583, pa:405 },
  { id:'LON', name:'London',      kit:'#1c1c1c', trim:'#c8102e', pace:3, power:4, handling:3, kicking:4, stamina:3, league:'English Premiership', place:5, w:10, d:0, l:8, pf:628, pa:449 },
  { id:'BRS', name:'Bristol',     kit:'#14235a', trim:'#6fb7e6', pace:5, power:3, handling:4, kicking:2, stamina:3, league:'English Premiership', place:6, w:11, d:0, l:7, pf:525, pa:509 },
  { id:'SAL', name:'Sale',        kit:'#1f4fa0', trim:'#f2efe6', pace:3, power:5, handling:2, kicking:3, stamina:3, league:'English Premiership', place:7, w:5, d:0, l:13, pf:524, pa:602 },
  { id:'GLO', name:'Gloucester',  kit:'#9c1b2e', trim:'#f2efe6', hoops:true, pace:3, power:4, handling:3, kicking:3, stamina:4, league:'English Premiership', place:8, w:5, d:0, l:13, pf:424, pa:576 },
  CLUBS[5],
  { id:'NEW', name:'Newcastle',   kit:'#1b2747', trim:'#d8333a', pace:3, power:3, handling:3, kicking:2, stamina:4, league:'English Premiership', place:10, w:2, d:0, l:16, pf:325, pa:860 },
];
const IRELAND = [   // the four provinces' cities, with Cork and Ballymena from the All-Ireland League to make six
  { id:'DUB', name:'Dublin',    kit:'#1565c0', trim:'#f2efe6', pace:4, power:4, handling:5, kicking:3, stamina:3, league:'United Rugby Championship', place:2, w:12, d:0, l:6, pf:515, pa:370 },
  { id:'LIM', name:'Limerick',  kit:'#c8102e', trim:'#1b2747', pace:3, power:4, handling:3, kicking:4, stamina:4, league:'United Rugby Championship', place:5, w:11, d:0, l:7, pf:396, pa:376 },
  { id:'GAL', name:'Galway',    kit:'#109a52', trim:'#1c1c1c', pace:4, power:3, handling:4, kicking:3, stamina:3, league:'United Rugby Championship', place:8, w:10, d:0, l:8, pf:442, pa:395 },
  { id:'BEL', name:'Belfast',   kit:'#f2efe6', trim:'#c8102e', pace:3, power:4, handling:4, kicking:3, stamina:3, league:'United Rugby Championship', place:9, w:9, d:1, l:8, pf:494, pa:420 },
  { id:'COR', name:'Cork',      kit:'#f2efe6', trim:'#1b2747', hoops:true, pace:3, power:3, handling:4, kicking:3, stamina:4, league:'All-Ireland League 1A', place:5, w:10, d:0, l:8, pf:430, pa:391 },
  { id:'BMA', name:'Ballymena', kit:'#1c1c1c', trim:'#f2efe6', pace:3, power:4, handling:2, kicking:3, stamina:3, league:'All-Ireland League 2A', place:7, w:9, d:0, l:9, pf:355, pa:404 },
];
/* Wales, Scotland and Italy are one list: alone they have 4, 2 and 2 sides, and a list needs 6. The eight in last season's table order, each under its place. */
const WALES_SCOTLAND_ITALY = [
  { id:'GLA', name:'Glasgow',  kit:'#1c1c1c', trim:'#6fb7e6', pace:4, power:3, handling:4, kicking:3, stamina:3, league:'United Rugby Championship', place:1, w:13, d:0, l:5, pf:479, pa:338 },
  { id:'CDF', name:'Cardiff',  kit:'#6fb7e6', trim:'#1c1c1c', pace:4, power:3, handling:3, kicking:3, stamina:3, league:'United Rugby Championship', place:6, w:11, d:0, l:7, pf:353, pa:372 },
  { id:'SWA', name:'Swansea',  kit:'#1c1c1c', trim:'#f2efe6', pace:3, power:4, handling:3, kicking:3, stamina:3, league:'United Rugby Championship', place:11, w:7, d:2, l:9, pf:376, pa:454 },
  { id:'EDI', name:'Edinburgh', kit:'#14235a', trim:'#c8102e', pace:3, power:4, handling:3, kicking:3, stamina:4, league:'United Rugby Championship', place:12, w:7, d:0, l:11, pf:362, pa:439 },
  { id:'TRE', name:'Treviso',  kit:'#0f7a3c', trim:'#f2efe6', pace:3, power:4, handling:3, kicking:2, stamina:3, league:'United Rugby Championship', place:13, w:6, d:2, l:10, pf:327, pa:493 },
  { id:'LLA', name:'Llanelli', kit:'#b5121b', trim:'#f2efe6', pace:4, power:3, handling:4, kicking:2, stamina:3, league:'United Rugby Championship', place:14, w:4, d:2, l:12, pf:361, pa:460 },
  { id:'NPT', name:'Newport',  kit:'#1c1c1c', trim:'#f2b01e', pace:3, power:4, handling:2, kicking:3, stamina:4, league:'United Rugby Championship', place:15, w:3, d:4, l:11, pf:350, pa:481 },
  { id:'PMA', name:'Parma',    kit:'#f2efe6', trim:'#1c1c1c', hoops:true, pace:3, power:3, handling:3, kicking:2, stamina:3, league:'United Rugby Championship', place:16, w:2, d:0, l:16, pf:312, pa:587 },
];
/* England's second tier, in last season's table order (regular season, before the play-offs). Thirteen of its fourteen: the side from London is left out, because London is taken by the top flight's side and it was relegated.
   No two sides here share a shirt and a trim at a glance, on a card or in a table's chip: where a club's own colours are close to another's, one wears hoops or the darker shade, and the sides whose colours could not be sourced took what was free (tools/ratings.mjs pins it). */
const ENGLAND_TWO = [
  { id:'EAL', name:'Ealing',     kit:'#0f5a32', trim:'#f2efe6', pace:4, power:4, handling:4, kicking:3, stamina:3, league:'English Championship', place:1, w:26, d:0, l:0, pf:1125, pa:435 },
  { id:'BED', name:'Bedford',    kit:'#14235a', trim:'#6fb7e6', hoops:true, pace:3, power:4, handling:3, kicking:3, stamina:3, league:'English Championship', place:2, w:18, d:1, l:7, pf:802, pa:643 },
  { id:'COV', name:'Coventry',   kit:'#14307a', trim:'#f2efe6', hoops:true, pace:4, power:3, handling:4, kicking:3, stamina:3, league:'English Championship', place:3, w:16, d:0, l:10, pf:1053, pa:723 },
  { id:'WOR', name:'Worcester',  kit:'#14235a', trim:'#f2b01e', pace:3, power:4, handling:4, kicking:3, stamina:3, league:'English Championship', place:4, w:15, d:0, l:11, pf:899, pa:652 },
  { id:'CHN', name:'Chinnor',    kit:'#f2efe6', trim:'#1c1c1c', pace:3, power:3, handling:3, kicking:3, stamina:4, league:'English Championship', place:5, w:16, d:0, l:10, pf:697, pa:635 },
  { id:'HPY', name:'Hartpury',   kit:'#c8102e', trim:'#1c1c1c', hoops:true, pace:4, power:3, handling:3, kicking:3, stamina:4, league:'English Championship', place:6, w:15, d:2, l:9, pf:772, pa:632 },
  { id:'CWL', name:'Cornwall',   kit:'#1c1c1c', trim:'#f2efe6', pace:3, power:4, handling:3, kicking:2, stamina:4, league:'English Championship', place:7, w:13, d:1, l:12, pf:770, pa:671 },
  { id:'DON', name:'Doncaster',  kit:'#2050b0', trim:'#c8102e', pace:3, power:4, handling:3, kicking:3, stamina:3, league:'English Championship', place:8, w:12, d:3, l:11, pf:729, pa:655 },
  { id:'NOT', name:'Nottingham', kit:'#109a52', trim:'#f2efe6', hoops:true, pace:3, power:3, handling:4, kicking:3, stamina:3, league:'English Championship', place:9, w:12, d:1, l:13, pf:639, pa:647 },
  { id:'AMP', name:'Ampthill',   kit:'#5e0f24', trim:'#f2b01e', hoops:true, pace:3, power:4, handling:3, kicking:3, stamina:3, league:'English Championship', place:10, w:12, d:0, l:14, pf:828, pa:890 },
  { id:'CAL', name:'Caldy',      kit:'#1c1c1c', trim:'#f5c400', hoops:true, pace:3, power:3, handling:3, kicking:3, stamina:3, league:'English Championship', place:11, w:9, d:0, l:17, pf:574, pa:814 },
  { id:'RIC', name:'Richmond',   kit:'#f2b01e', trim:'#1c1c1c', hoops:true, pace:4, power:3, handling:3, kicking:2, stamina:3, league:'English Championship', place:12, w:7, d:1, l:18, pf:525, pa:823 },
  { id:'CAM', name:'Cambridge',  kit:'#a3162f', trim:'#f2b01e', pace:3, power:3, handling:3, kicking:2, stamina:3, league:'English Championship', place:14, w:0, d:1, l:25, pf:447, pa:1190 },
];
/* The foot of the game: Counties 5 Surrey, the league Guildfordians play in, in last season's table order, with one side from Counties 3 Surrey above them. One star and two: every other list starts higher, and a side down here needs peers to meet.
   Each goes by its place. Guildfordians is the Local list's own object, as Twickenham is in England. */
const COUNTIES = [
  { id:'EFF', name:'Effingham',  kit:'#f2b01e', trim:'#0f5a32', pace:3, power:3, handling:3, kicking:3, stamina:3, league:'Counties 3 Surrey', place:2, w:16, d:0, l:4, pf:773, pa:291 },
  { id:'WAN', name:'Wandsworth', kit:'#7a1f2b', trim:'#f2b01e', pace:3, power:3, handling:3, kicking:3, stamina:3, league:'Counties 5 Surrey', place:3, w:10, d:1, l:3, pf:420, pa:335 },
  CLUBS[7],
  { id:'EGH', name:'Egham',      kit:'#109a52', trim:'#f2efe6', pace:3, power:3, handling:3, kicking:2, stamina:3, league:'Counties 5 Surrey', place:5, w:7, d:0, l:7, pf:366, pa:406 },
  { id:'MER', name:'Merton',     kit:'#1c1c1c', trim:'#f2b01e', hoops:true, pace:3, power:3, handling:2, kicking:3, stamina:3, league:'Counties 5 Surrey', place:6, w:1, d:0, l:13, pf:114, pa:678 },
  { id:'MIT', name:'Mitcham',    kit:'#2050b0', trim:'#f2efe6', pace:3, power:2, handling:3, kicking:3, stamina:3, league:'Counties 5 Surrey', place:7, w:4, d:0, l:10, pf:180, pa:281 },
  { id:'FEL', name:'Feltham',    kit:'#1b2747', trim:'#6fb7e6', pace:3, power:3, handling:3, kicking:2, stamina:2, league:'Counties 5 Surrey', place:10, w:1, d:0, l:13, pf:230, pa:409 },
];
/* The nations beyond the Six Nations, in the order they came in. Append only: a saved career's country is a code, and this
   list never reindexes NATIONS. Canberra holds CAN, so Canada is CDA. Each side's abilities below are its flavour, how it
   plays; abilitiesFor (src/ratings.js) sets them to its rating, keeping that character. */
const MORE_NATIONS = [
  { id:'NZL', name:'New Zealand',  kit:'#161616', trim:'#f2efe6', alt:'#f2efe6', altTrim:'#161616', pace:5, power:4, handling:5, kicking:4, stamina:4 },
  { id:'RSA', name:'South Africa', kit:'#0f6b3c', trim:'#f2b01e', alt:'#f2efe6', altTrim:'#0f6b3c', pace:3, power:5, handling:3, kicking:4, stamina:4 },
  { id:'AUS', name:'Australia',    kit:'#f2b01e', trim:'#0f6b3c', alt:'#0f6b3c', altTrim:'#f2b01e', pace:4, power:3, handling:5, kicking:4, stamina:3 },
  { id:'ARG', name:'Argentina',    kit:'#7eb6e0', trim:'#f2efe6', alt:'#14235a', altTrim:'#7eb6e0', hoops:true, pace:3, power:5, handling:3, kicking:4, stamina:3 },
  { id:'FIJ', name:'Fiji',         kit:'#f2efe6', trim:'#161616', alt:'#161616', altTrim:'#f2efe6', pace:5, power:3, handling:4, kicking:1, stamina:2 },
  { id:'JPN', name:'Japan',        kit:'#d01f2e', trim:'#f2efe6', alt:'#1b2747', altTrim:'#f2efe6', hoops:true, pace:4, power:2, handling:3, kicking:2, stamina:4 },
  { id:'GEO', name:'Georgia',      kit:'#8a1226', trim:'#f2efe6', alt:'#f2efe6', altTrim:'#8a1226', pace:2, power:5, handling:2, kicking:2, stamina:3 },
  { id:'POR', name:'Portugal',     kit:'#c8102e', trim:'#0f7a3c', alt:'#f2efe6', altTrim:'#c8102e', pace:3, power:2, handling:3, kicking:2, stamina:2 },
  { id:'USA', name:'USA',          kit:'#1b2f6b', trim:'#c8102e', alt:'#f2efe6', altTrim:'#1b2f6b', pace:3, power:3, handling:2, kicking:1, stamina:2 },
  { id:'ESP', name:'Spain',        kit:'#c8102e', trim:'#f2b01e', alt:'#1b2747', altTrim:'#f2b01e', pace:3, power:2, handling:2, kicking:1, stamina:2 },
  { id:'CHI', name:'Chile',        kit:'#d01f2e', trim:'#1d3a8f', alt:'#f2efe6', altTrim:'#d01f2e', pace:2, power:2, handling:3, kicking:1, stamina:2 },
  { id:'TGA', name:'Tonga',        kit:'#b5121b', trim:'#f2efe6', alt:'#f2efe6', altTrim:'#b5121b', pace:3, power:4, handling:1, kicking:1, stamina:1 },
  { id:'URU', name:'Uruguay',      kit:'#6fb7e6', trim:'#161616', alt:'#f2efe6', altTrim:'#2f7ed8', pace:2, power:3, handling:2, kicking:2, stamina:1 },
  { id:'SAM', name:'Samoa',        kit:'#1565c0', trim:'#f2efe6', alt:'#f2efe6', altTrim:'#1565c0', pace:2, power:3, handling:2, kicking:1, stamina:1 },
  { id:'CDA', name:'Canada',       kit:'#d01f2e', trim:'#161616', alt:'#f2efe6', altTrim:'#d01f2e', pace:2, power:2, handling:2, kicking:1, stamina:1 },
  { id:'ROU', name:'Romania',      kit:'#f5c400', trim:'#1d3a8f', alt:'#1d3a8f', altTrim:'#f5c400', pace:1, power:3, handling:1, kicking:1, stamina:1 },
];
const POOLS = [NATIONS, CLUBS, FRANCE, AUSTRALIA, SOUTH_AFRICA, ENGLAND, IRELAND, WALES_SCOTLAND_ITALY, ENGLAND_TWO, COUNTIES];   // saved settings index into it: append only, and the team screen's tabs put them in their own order (POOL_TABS)
const IMPORT_POOL = POOLS.length;                 // My League: not a list here, the imported league (src/import.js). It has moved twice, from 5 and from 7: cleanSettings reads saves from then
const POOL_TABS = [0, 1, 9, 5, 8, 6, 7, 2, 3, 4, IMPORT_POOL];   // International | Local | Counties | England | England 2 | Ireland | Wales Scotland Italy | France | Australia | South Africa | My League
const ALL_TEAMS = [...new Set([...POOLS.flat(), ...MORE_NATIONS])];   // Twickenham is in two lists and is one team
const allNations = () => [...NATIONS, ...MORE_NATIONS];
/* Who plays on a team. g: 0 men's or boys', 1 women's or girls', 'mixed'. A team with no g is men's and nothing ever writes a 0, so a side
   from an old save reads and saves exactly as it did. Mixed meets either: it has both in it. Men's never meets women's (sidesMeet). */
const teamSide = t => (t && (t.g === 1 || t.g === 'mixed') ? t.g : 0);
const sidesMeet = (a, b) => { const x = teamSide(a), y = teamSide(b); return x === y || x === 'mixed' || y === 'mixed'; };
/* The one lever: the oldest age group that plays mixed. The game follows England, mixed through U11 and girls-only from U12. Ireland and
   Australia run through U12, New Zealand through U13, and World Rugby's law is the end of the season a player turns 12. Wales and Scotland
   were not confirmed. The career's stages (CAREER_STAGES[].age) and an imported team's label (importSideOf) both read this. */
const MIXED_THROUGH = 11;
const DEFAULT_TEAM = CLUBS[0];           // Farnham: the team screen opens on Local with it picked
const ABILITIES = [['pace', 'Pace'], ['power', 'Power'], ['handling', 'Handling'], ['kicking', 'Kicking'], ['stamina', 'Stamina']];
const BUDGET = 12;                        // a team with no level, saved before levels: it starts at 1 in each ability with this many points to spend, any team the four-ability builder allowed (10 points) plus Stamina 3. A team with a level spends its level's budget (TEAM_LEVELS, src/ratings.js)
/* Stamina came after the other four. A team without it (a save from before it, an import, a test's side) reads as 3, the middle:
   its Sprint and On Fire last as long as they always have. Not rounded here, so a side handed in with a fractional Stamina plays as
   given; the saves keep whole pips (cleanTeam, cleanSide), so a fraction must be kept, and put back, by whatever made it. */
const staminaOf = t => { const v = t ? t.stamina : null; return typeof v === 'number' && Number.isFinite(v) ? clamp(v, 1, 5) : 3; };
const abilityOf = (t, k) => (k === 'stamina' ? staminaOf(t) : +t[k] || 0);   // a team's ability as the cards, the ratings and the saves read it
const MAX_CUSTOM = 4;
const KIT_COLOURS = [
  ['White', '#f2efe6'], ['Black', '#1c1c1c'], ['Navy', '#1b2747'], ['Royal Blue', '#2050b0'], ['Sky Blue', '#6fb7e6'], ['Red', '#c8102e'],
  ['Maroon', '#7a1f2b'], ['Green', '#109a52'], ['Bottle Green', '#0f5a32'], ['Gold', '#f2b01e'], ['Orange', '#e8731c'], ['Purple', '#5b2d8e'],
];
const DIFF = [
  { scrumCpu:0.60, lineSigma:0.19, lineContest:0.55, cpuSpeed:0.97, cpuTackle:0.56, myTackle:0.58, cpuIntercept:0.10, turnover:-0.03 },
  { scrumCpu:0.72, lineSigma:0.12, lineContest:0.65, cpuSpeed:1.00, cpuTackle:0.64, myTackle:0.48, cpuIntercept:0.17, turnover:0.00 },
  { scrumCpu:0.80, lineSigma:0.07, lineContest:0.75, cpuSpeed:1.04, cpuTackle:0.72, myTackle:0.42, cpuIntercept:0.25, turnover:0.03 },
];
/* The first EARLY.games one-player matches on Normal only. A player who has not learned to turn and chase leaves one
   defender running the wrong way, so two levers move and nothing else: the other side runs at Easy's pace, and your
   teammates tackle a little more surely than on Easy (one of them is still being pulled out of the tackle). Easy and
   Hard are left as set. Duels, scrums, your own tackle and sprint, and every later match stay on the chosen level. */
const EARLY = { games:2, gap:3, nudge:{ cpuSpeed:-0.03, myTackle:0.14 } };   // gap: the rating points, Stamina left out, that make a Stronger Side
const rateOf = t => ABILITIES.reduce((a, [k]) => a + abilityOf(t, k), 0);
/* The overall rating on a team card: the five abilities (5 to 25) on a 40 to 99 scale. South Africa is 96. */
const overallOf = t => { const n = ABILITIES.length; return Math.round(40 + (clamp(rateOf(t), n, 5*n) - n)*59/(4*n)); };
/* Stronger Side compares the four abilities other than Stamina, EARLY.gap apart, so it marks the pairs it marked before Stamina
   and no others (tools/teams.mjs pins pairs within a pool). The badge and the championship's running order count all five. */
const outmatched = (us, them) => !!us && !!them && rateOf(them) - staminaOf(them) >= rateOf(us) - staminaOf(us) + EARLY.gap;
/* Goal kicks. Every lever is here: GKTUNE='{"band":[0.15,0.13,0.10]}' node tools/goalkicks.mjs --rates tries values without an edit. */
const KICK = {
  g:9.81, kd:0.10, kw:0.32, v0:26.5, vK:1.0, vLo:0.35,
  elev:{ set:34, drop:38 }, h0:0.20,
  fill:[1.25,1.05,0.92], dropFill:[0.95,0.80,0.70], fillD:0.006,
  band:[0.155,0.13,0.10], bandD:0.002, bandA:0.07, bandK:0.02, bandMin:0.055, minK:0.006, bandMax:0.24, dropBand:1.3,
  lift:0.03, liftW:0.15, floor:0.40, ceil:0.97, clear:0.3, range:0.95,
  hook:4.0, push:2.0, curlK:0.12,
  R:0.18, bar:3.0, upL:32.2, upR:37.8, upH:11,
  tap:0.12, runup:0.42, dropT:0.25, hold:0.20, hitStop:0.07, aimRate:18, keyRate:12, aimMax:30, penMin:10,
  reach:2.4, block:1.0, lat:0.9, rushAcc:6, rushMul:[0.84,1.0,1.10], rushR:15, shoulder:4, cpuReact:0.30,
  cpuSig:[0.072,0.060,0.056], cpuAim:[0.9,0.15], cpuAimSd:0.6,
  wind:{ mix:[[0.30,0,3],[0.45,4,11],[0.25,11,18]], gust:0.18, swing:10, max:22, calm:2 },
};
const CAM = { b0:8, bK:0.2, h:2.2, ballY:0.80, topY:0.15, topPx:58, Fmin:0.8, Fmax:2.4, near:0.3, fadeZ:2, fadeW:2, figH:0.6 };   // a charger fades in from fadeZ to fadeZ + fadeW metres in front of the lens, and no charger stands taller than figH of the screen
// GKTUNE
const D2R = Math.PI/180, MPH = 0.44704;
const HALF_SECONDS = [120, 240, 360];
const STEP = 1/60;
/* How fast a match you see runs against real time: the one lever. The frame loop (boot.js) feeds the sim and the drawing dt times this, so a step is still 1/60 of a simulated second and update() never knows: seeded results per simulated second, the bots and the headless tools are as they were. Every window a person has to hit widens by 1/pace in real time, and a half takes that much longer. Two Player and the menu demo run at match; only M.kids reads kids; the Training Ground has its own (DRILL_PACE). */
const MATCH_PACE = { match:0.88, kids:0.75 };

const $ = id => document.getElementById(id);
const clamp = (v,a,b) => v < a ? a : v > b ? b : v;
const rnd = Math.random;
const hyp = Math.hypot;
const gauss = () => { let u = 0, v = 0; while (!u) u = rnd(); while (!v) v = rnd(); return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v); };
const dist = (a,b) => hyp(a.x-b.x, a.y-b.y);
const shuffle = a => { for (let i = a.length-1; i > 0; i--) { const j = Math.floor(rnd()*(i+1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };   // a sort with a random comparator is far from fair in Safari

/* =========================================================
   Ratings: what each side's overall is, and how it becomes abilities.

   - RATINGS_BUNDLED is the nations' table, from the world rankings and recent results, with its date. tools/ratings/update.mjs
     reads this line as JSON, so it stays one line of strict JSON.
   - CLUB_RATED is the clubs' table, from last season's results in each league's band. Melbourne and Adelaide have no current side and are set by hand.
   - starsOfOverall and TEAM_LEVELS are the star scale and the levels a team you make can be set at.
   - abilitiesFor turns a side's flavour (how it plays: the abilities written in its list) and a target sum into whole abilities.
   - Players' devices only ever ask the game's own site: a same-origin ratings.json, read once at boot (online, or offline through
     the service worker's copy), checked strictly here, and used for picks made afterwards. Saved championships and careers keep the sides they were saved with.
   ========================================================= */
const RATINGS_BUNDLED = {"date":"2026-11-07","men":{"RSA":96,"NZL":93,"IRE":87,"FRA":87,"SCO":84,"ENG":84,"AUS":81,"ARG":78,"ITA":70,"WAL":70,"FIJ":70,"JPN":70,"GEO":67,"POR":61,"USA":58,"ESP":55,"CHI":55,"TGA":55,"URU":55,"SAM":52,"CDA":49,"ROU":46},"women":{"NZL":96,"ENG":96,"CDA":93,"FRA":84,"USA":72,"IRE":72,"AUS":70,"RSA":64,"ITA":64,"SCO":61,"WAL":58,"FIJ":58,"JPN":52,"ESP":49,"SAM":43}};
/* Each league has its own band, so a step between leagues is a step in the rating: Counties 5 is 40, Counties 3 is 43, Counties 1 is 46 to 49, Regional 2 is 49 to 52, Regional 1 is 55 to 58, the English second tier
   61 to 64, a top flight 64 to 72. Overalls come in 21 values (overallOf), so a band can't be finer than about 3 points. CLUB_CAP is the top flights' ceiling: 75, and only their national champions reach it.
   Bordeaux, the European champion, is the one named exception, at 90: five stars, with the top nations. */
const CLUB_CAP = 75, CLUB_OVER_CAP = { BOR:90 };
const CLUB_RATED = {
  FAR:58, WIM:55, IRO:52, GUI:49, COB:49, WEY:49, ORU:46, KIN:43, HAS:43, ALD:43, GDN:40,                                               // Local
  EFF:43, WAN:40, EGH:40, MER:40, MIT:40, FEL:40,                                                                                       // Counties: Counties 3 is 43 and Counties 5 is 40, as in Local
  NTH:75, BAT:72, EXE:72, LEI:72, LON:70, BRS:70, SAL:67, GLO:67, HAR:67, NEW:64,                                                       // England, with Twickenham above, and Northampton the champion
  DUB:75, LIM:72, GAL:70, BEL:70, COR:58, BMA:49,                                                                                       // Ireland, with Dublin the United Rugby Championship's champion
  TLS:75, MPL:72, PAR:72, PAU:72, NAN:72, LRO:70, CLE:70, TLN:70, CAS:70, LYO:67, BAY:67, PGN:67, MTB:64, ...CLUB_OVER_CAP,             // France, with Toulouse the champion
  BRI:70, CAN:70, PTH:70, SYD:67, MEL:61, ADL:61,                                                                                       // Australia
  CPT:72, PRE:72, JHB:70, DUR:70, KIM:61, BLM:61, MBO:61,                                                                               // South Africa
  GLA:72, CDF:70, SWA:70, EDI:67, TRE:67, LLA:67, NPT:67, PMA:64,                                                                       // Wales, Scotland and Italy
  EAL:64, BED:64, COV:64, WOR:64, CHN:64, HPY:64, CWL:64, DON:64, NOT:61, AMP:61, CAL:61, RIC:61, CAM:61,                               // England's second tier: a winning record last season is 64
};
const sumOfOverall = ov => { const n = ABILITIES.length; return n + Math.round((ov - 40)*4*n/59); };   // overallOf, the other way
/* The one star scale, for every side: 40 is 1 star, the minimum; 43 to 46 is 2; 49 to 52 is 2.5; 55 to 58 is 3; 61 to 67 is 3.5; 70 to 72 is 4; 75 to 87 is 4.5; 90 and up is 5, which is rare.
   Whole numbers between those (a career player's rating can be any) take the stars of the value below. */
function starsOfOverall(ov) { return ov >= 90 ? 5 : ov >= 75 ? 4.5 : ov >= 70 ? 4 : ov >= 61 ? 3.5 : ov >= 55 ? 3 : ov >= 49 ? 2.5 : ov >= 43 ? 2 : 1; }
const starsOf = t => starsOfOverall(overallOf(t));
const starsWords = n => n + (n === 1 ? ' Star' : ' Stars');   // the text alternative, and the words on a level
/* A team you make or import is set at a level, which gives it a fixed amount of ability: the one table of level, overall and stars. budget: the points to spend above 1 in each ability.
   The id is what a save holds, so it never changes. A saved team with no level keeps BUDGET, so an old save reads as it did: teamBudget. */
const TEAM_LEVELS = [['c5', 'Counties 5', 40], ['c3', 'Counties 3', 43], ['c1', 'Counties 1', 49], ['r2', 'Regional 2', 52], ['r1', 'Regional 1', 58], ['nat', 'National League', 61], ['top', 'Top Flight', 72], ['champ', 'National Champions', 75], ['euro', 'European Champions', 90]]
  .map(([id, name, overall]) => ({ id, name, overall, stars:starsOfOverall(overall), budget:sumOfOverall(overall) - ABILITIES.length }));
const teamLevelOf = t => (t && TEAM_LEVELS.find(l => l.id === t.level)) || null;
const teamBudget = t => { const l = teamLevelOf(t); return l ? l.budget : BUDGET; };
/* Whole abilities 1 to 5 adding up to sum, from a side's flavour. Short of it, a point goes to where the side is already
   strong; over it, a point comes off where it is weakest. Each ability takes its turn, strongest (or weakest) first, so
   an ability that started ahead of another is never behind it after. Pace and Power count one point up for that order: in play
   they matter most, so two sides with one overall should not differ only in having spent it there. Ties go by ABILITIES order, the
   other way round when taking off, so the same flavour always gives the same side. */
function abilitiesFor(flavour, sum) {
  const keys = ABILITIES.map(([k]) => k), n = keys.length, out = {};
  let left = clamp(Math.round(sum), n, 5*n);
  for (const k of keys) { out[k] = clamp(Math.round(abilityOf(flavour, k)) || 1, 1, 5); left -= out[k]; }
  const add = left > 0, step = add ? 1 : -1;
  const worth = k => out[k] + (k === 'pace' || k === 'power' ? 1 : 0);
  const turn = keys.slice().sort((a, b) => step*(worth(b) - worth(a)) || step*(keys.indexOf(a) - keys.indexOf(b)));
  for (let i = 0; left; i++) { const k = turn[i % n]; if (add ? out[k] < 5 : out[k] > 1) { out[k] += step; left -= step; } }
  return out;
}
const TEAM_FLAVOUR = new Map(ALL_TEAMS.map(t => [t.id, Object.fromEntries(ABILITIES.map(([k]) => [k, t[k]]))]));   // from the lists, before any rating is set, so a new rating starts from how the side plays and not from its last rating
function rateTeam(t, overall) { Object.assign(t, abilitiesFor(TEAM_FLAVOUR.get(t.id), sumOfOverall(overall))); }
function rateNations(men) { for (const t of allNations()) rateTeam(t, men[t.id]); }
for (const t of ALL_TEAMS) if (CLUB_RATED[t.id] != null) rateTeam(t, CLUB_RATED[t.id]);
rateNations(RATINGS_BUNDLED.men);
/* The women's nations: their own team objects, sharing the men's kits and how each side plays, at the women's ratings. In the table's order,
   so level sides keep it. A nation not in the table has no women's side here: too little data, or unranked. */
const WOMEN_NATIONS = Object.keys(RATINGS_BUNDLED.women).map(id => ({ ...allNations().find(t => t.id === id), g:1 }));
function rateWomen(women) { for (const t of WOMEN_NATIONS) rateTeam(t, women[t.id]); }
rateWomen(RATINGS_BUNDLED.women);
const womenSix = () => WOMEN_NATIONS.filter(t => NATIONS.some(n => n.id === t.id));
/* A club's women's side: the same club and rating with women's bodies. No real women's club results have been gathered. No league line: those figures are the men's. */
const WOMEN_CLUBS = new Map();
function womenClub(t) { let w = WOMEN_CLUBS.get(t); if (!w) WOMEN_CLUBS.set(t, w = { ...champSide(t), g:1 }); return w; }
/* A team you made or imported has a key and keeps its own side; a listed side is whichever of the two the pick wants. Null when it has none
   here: a nation with no women's side, or a team of yours that is the other side. */
function sideVersion(t, g) {
  if (!t) return null;
  if (t.key) { const s = teamSide(t); return s === 'mixed' || s === g ? t : null; }
  const base = ALL_TEAMS.find(o => o.id === t.id);
  if (!base) return t;
  if (!g) return base;
  return allNations().includes(base) ? WOMEN_NATIONS.find(o => o.id === t.id) || null : womenClub(base);
}
const nationsRanked = (g = 0) => (g ? WOMEN_NATIONS.slice() : allNations()).sort((a, b) => rateOf(b) - rateOf(a));   // strongest first; a stable sort, so level sides stay in list order
/* The five nations nearest in rating to t, not t, from the men's or the women's list: the nearer first, then the stronger, then list order. */
function nationsNearest(t, g = teamSide(t) === 1 ? 1 : 0) {
  const me = rateOf(t), all = g ? WOMEN_NATIONS : allNations();
  return all.filter(o => o !== t).sort((a, b) => Math.abs(rateOf(a) - me) - Math.abs(rateOf(b) - me) || rateOf(b) - rateOf(a) || all.indexOf(a) - all.indexOf(b)).slice(0, 5);
}

/* ---------- ratings.json ---------- */
let ratingsNow = RATINGS_BUNDLED, ratingsWaiting = null;   // waiting: checked and fetched, not yet used, so no pick under way changes under anyone
const RATINGS_SLACK = 2*864e5;                     // a date this far ahead of the device's clock could be its clock; further is a broken file
function ratingsTable(v, known) {                  // exactly the sides in known, each a whole overall that some ability sum gives
  if (!v || typeof v !== 'object' || Array.isArray(v)) return null;
  const ids = Object.keys(v);
  if (ids.length !== known.length) return null;
  const out = {};
  for (const id of known) {
    const ov = Object.prototype.hasOwnProperty.call(v, id) ? v[id] : null;
    if (!Number.isInteger(ov) || ov < 40 || ov > 99 || overallOf(abilitiesFor({}, sumOfOverall(ov))) !== ov) return null;
    out[id] = ov;
  }
  return out;
}
function ratingsClean(v, now = Date.now()) {       // null on anything wrong: the bundled table stands
  if (!v || typeof v !== 'object' || Array.isArray(v) || typeof v.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(v.date)) return null;
  const when = Date.parse(v.date + 'T00:00:00Z');
  if (!Number.isFinite(when) || new Date(when).toISOString().slice(0, 10) !== v.date || when > now + RATINGS_SLACK || v.date < RATINGS_BUNDLED.date) return null;
  const men = ratingsTable(v.men, Object.keys(RATINGS_BUNDLED.men)), women = ratingsTable(v.women, Object.keys(RATINGS_BUNDLED.women));
  return men && women ? { date:v.date, men, women } : null;
}
function ratingsSync() {                           // on the way to a pick, never during one
  if (!ratingsWaiting) return false;
  ratingsNow = ratingsWaiting; ratingsWaiting = null;
  rateNations(ratingsNow.men); rateWomen(ratingsNow.women);
  return true;
}
const RATINGS_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ratingsDate = d => { const [y, m, day] = d.split('-'); return +day + ' ' + RATINGS_MONTHS[+m - 1] + ' ' + y; };
const ratingsLine = () => 'Ratings from World Rankings and Recent Results · Updated ' + ratingsDate(ratingsNow.date);
async function ratingsFetch(get) {                 // resolves true when a good file is waiting; never throws, never retries
  try {
    const res = await get('ratings.json', { cache:'no-cache', credentials:'same-origin' });
    const good = res && res.ok && ratingsClean(await res.json());
    if (!good) return false;
    ratingsWaiting = good;
    return true;
  } catch (e) { return false; }
}
/* At boot, on the web: the file sits beside the page, so a relative address is the game's own site and nothing else. Node has no
   location, so the test harness never gets here; a page opened from a file or a native wrapper's own scheme doesn't either. Offline it
   asks only when a service worker controls the page, because the worker holds the last good copy; with no worker there is nothing to ask. */
function ratingsBoot() {
  if (typeof location === 'undefined' || !/^https?:$/.test(location.protocol) || typeof fetch !== 'function') return false;
  if (typeof navigator !== 'undefined' && navigator.onLine === false && !(navigator.serviceWorker && navigator.serviceWorker.controller)) return false;
  ratingsFetch((u, o) => fetch(u, o));
  return true;
}
/* =========================================================
   Persistence. One browser key holds the settings, the teams
   you make, and the championship: its six sides, the fixtures,
   the results and the round. A match in progress is not stored.
   Leaving it, or reloading, comes back to that round to play
   again. Duels are always on, including a save from when the
   switch could turn them off. Anything missing or broken is
   ignored, and the rest of the save is kept.
   ========================================================= */
const STORE = 'tryline.v1';
/* hints: the card in the top corner naming each close-up's control (one player); twoHints: the same per player in two player, stored
   by keyboard half like twoDiff. tut: the tutorial moments this device has seen (TUT_IDS), each shown once; Replay Tutorial empties it.
   It replaces the old duelSeen and kickSeen flags: the first-duel window aid and the first-kick path aid key off it too.
   coach: Coach Tips on the home row, on for a new game. tips: the coach lines this device has already heard (COACH_IDS), each once. */
const TUT_IDS = ['past', 'pass', 'tackle', 'block', 'scrum', 'lineout', 'goal', 'drop'];
const DRILL_IDS = ['egg', 'circle', 'cones', 'tackle', 'kick', 'scrum', 'defend', 'pass', 'tag', 'back'];   // drillSeen: the drills whose Watch How has played on this device, each opened with it once (drill-demo.js)
const COACH_IDS = ['offload', 'step', 'tackle', 'duel', 'kick', 'pass', 'sprint'];   // fleeting moments first, then the ones that stay available
const COACH_LINE = {
  offload: 'Tap Pass \u2014 offload!',
  step: 'Flick across \u2014 side step',
  tackle: 'Tap Tackle \u2014 they\u2019re in reach',
  duel: 'Wait for gold, then go',
  kick: 'Hold it, let go in the gold',
  pass: 'Tap Pass to move it',
  sprint: 'Hold Sprint for a burst',
};
let settings = { half:0, diff:1, sound:true, duels:true, hints:true, twoHints:[true, true], tut:[], coach:true, tips:[], pool:0, twoDiff:[1, 1], played:0, kids:false, drillSeen:[], camPick:false, poolV:3, myTeam:DEFAULT_TEAM.id, womens:0, finished:0 };   // finished: one-player matches played to full time, for the Your Ball sign under the clock (ui-match.js); twoDiff: each player's Difficulty in two player; played: one-player matches started, for the gentler start; kids: the Kids level, a flag on Easy (kids.js); camPick: the camera button has been used (cleanSettings); poolV: what pool's numbers mean (cleanSettings); myTeam: Your Team on the home screen, the key of a side, read through myTeamOf; womens: 1 when the team screen is on Women's
let champ = null, custom = [], champHistory = [], seasonSerial = 0;
let career = null;   // the player career (src/career.js): its own seasons, never the championship's
let importLeague = null;   // an imported league's other sides, { teams }, cleaned by cleanImportLeague (src/import.js)
const SEASON_LIMIT = 10;
/* Only the user's full-time card is retained. Optional broken detail never invalidates a result. */
function cleanSeasonStats(s) {
  if (!s || typeof s !== 'object' || Array.isArray(s)) return null;
  const out = {};
  for (const key of ['conv', 'pen', 'dg', 'tk', 'duelN']) {
    const v = s[key], made = key === 'duelN' ? 'won' : 'made';
    if (!v || !Number.isInteger(v.att) || v.att < 0 || v.att > 100000 || !Number.isInteger(v[made]) || v[made] < 0 || v[made] > v.att) return null;
    out[key] = { att:v.att, [made]:v[made] };
  }
  if (typeof s.gain !== 'number' || !Number.isFinite(s.gain) || Math.abs(s.gain) > 1000000) return null;
  out.gain = Math.round(s.gain);
  return out;
}
/* The legacy fingerprint uses only validated season data, never the simulation RNG. */
function legacySeasonId(c) {
  const text = JSON.stringify([c.user, c.teams, c.fixtures, c.results.map(rd => rd.map(({h,a,hs,as,ht,at}) => ({h,a,hs,as,ht,at})))]);
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return 'legacy-' + (h >>> 0).toString(36);
}
const HEX = /^#[0-9a-f]{6}$/i;
/* A team someone made, or one read back from storage: anything off is put right, never trusted. */
function cleanTeam(t, i) {
  if (!t || typeof t !== 'object') return null;
  const name = String(t.name || '').replace(/\s+/g, ' ').trim().slice(0, 16) || 'My Team';
  const team = { key:String(t.key || 'my' + i).slice(0, 24), id:codeFor(t.id, name), name, custom:true,
    kit:HEX.test(t.kit) ? t.kit : '#2050b0', trim:HEX.test(t.trim) ? t.trim : '#f2efe6', hoops:!!t.hoops };
  // spent in ABILITIES order, so an overspent team loses from the last; a team without Stamina (saved before it, or an import) has its 3
  // set aside first, so a cut falls on the other four. A team saved before Stamina spent at most 10, so nothing of it is cut.
  // The budget is the team's own level's; a team with no level (saved before levels) keeps BUDGET, and is cut as it always was.
  const keys = ABILITIES.map(([k]) => k), hasStamina = !keys.includes('stamina') || (typeof t.stamina === 'number' && Number.isFinite(t.stamina));
  const got = {};
  let left = teamBudget(t);
  for (const k of hasStamina ? keys : ['stamina', ...keys.filter(x => x !== 'stamina')]) { const v = clamp(Math.round(abilityOf(t, k) || 1), 1, 5); const spend = Math.min(v - 1, left); got[k] = 1 + spend; left -= spend; }
  for (const k of keys) team[k] = got[k];
  if (teamSide(t)) team.g = teamSide(t);                     // men's is no field at all
  if (teamLevelOf(t)) team.level = t.level;                      // no level is no field, so an old team reads and saves as it did
  return team;
}
/* The short name filled in for you skips codes already on the scoreboard elsewhere: Farnham Minis is FAN, not FAR. */
function autoCode(name, own) {
  const L = String(name || '').toUpperCase().replace(/[^A-Z]/g, '') || 'MYTEAM';
  const used = new Set([...ALL_TEAMS, ...custom.filter(t => t.key !== own)].map(t => t.id));
  for (let j = 1; j < L.length; j++) for (let k = j + 1; k < L.length; k++) { const c = L[0] + L[j] + L[k]; if (!used.has(c)) return c; }
  return codeFor('', L);
}
function codeFor(s, name) { const l = v => String(v || '').toUpperCase().replace(/[^A-Z]/g, ''); return (l(s) + l(name) + 'XXX').slice(0, 3); }
function idx6(n) { return Number.isInteger(n) && n >= 0 && n <= 5; }
const PTS_MAX = 999;   // far past any real score: a level 90 side on Easy with long halves has passed 260, and a real result must never cost a saved season
function ptsOf(n) {
  if (typeof n !== 'number' || !Number.isFinite(n) || n < 0 || n > PTS_MAX) return null;
  return Math.round(n);
}
/* A side inside a saved championship. A built-in side keeps its home-nation flag and its change kit. */
function cleanSide(t) {
  if (!t || typeof t !== 'object') return null;
  let name = String(t.name || '').replace(/\s+/g, ' ').trim().slice(0, 24);
  if (!name) return null;
  const id = /^[A-Z]{3}$/.test(t.id) ? t.id : codeFor(t.id, name);
  if (id === 'HAR' && !t.key && !t.custom) name = CLUBS[5].name;   // a save from before this side went by its place; a team you made or imported keeps the name you gave it
  const team = { id, name, kit:HEX.test(t.kit) ? t.kit : '#2050b0', trim:HEX.test(t.trim) ? t.trim : '#f2efe6', hoops:!!t.hoops };
  if (t.home) team.home = true;
  if (t.custom) team.custom = true;
  if (t.key) team.key = String(t.key).slice(0, 24);
  if (HEX.test(t.alt)) team.alt = t.alt;
  if (HEX.test(t.altTrim)) team.altTrim = t.altTrim;
  if (teamSide(t)) team.g = teamSide(t);                     // men's is no field, so an old season's fingerprint (legacySeasonId) stays as it was
  for (const [k] of ABILITIES) team[k] = clamp(Math.round(abilityOf(t, k) || 1), 1, 5);   // a side saved before Stamina gets 3
  return team;
}
/* null means the championship cannot be shown or played, so it is dropped instead of crashing the table. */
function cleanChamp(c) {
  if (!c || typeof c !== 'object' || Array.isArray(c) || !idx6(c.user)) return null;
  if (!Number.isInteger(c.round) || c.round < 0 || c.round > 5) return null;
  let teams;
  if (!Array.isArray(c.teams)) teams = NATIONS.map(n => ({ ...n }));   // saved before clubs existed: indexes into NATIONS, in that order
  else {
    if (c.teams.length !== 6) return null;
    teams = c.teams.map(cleanSide);
    if (teams.some(t => !t)) return null;
  }
  if (teams.some(t => !sidesMeet(teams[c.user], t))) return null;   // your side could never play this one: no normal play makes it, only a damaged save
  if (!Array.isArray(c.fixtures) || c.fixtures.length !== 5 || !Array.isArray(c.results) || c.results.length !== c.round) return null;
  const fixtures = [], results = [];
  for (const rd of c.fixtures) {
    if (!Array.isArray(rd) || rd.length !== 3) return null;
    const seen = new Set(), pairs = [];
    for (const p of rd) {
      if (!Array.isArray(p) || p.length !== 2 || !idx6(p[0]) || !idx6(p[1]) || p[0] === p[1] || seen.has(p[0]) || seen.has(p[1])) return null;
      seen.add(p[0]); seen.add(p[1]);
      pairs.push([p[0], p[1]]);
    }
    if (seen.size !== 6) return null;
    fixtures.push(pairs);
  }
  for (const rd of c.results) {
    if (!Array.isArray(rd) || rd.length !== 3) return null;
    const seen = new Set(), out = [];
    for (const m of rd) {
      if (!m || typeof m !== 'object' || !idx6(m.h) || !idx6(m.a) || m.h === m.a || seen.has(m.h) || seen.has(m.a)) return null;
      const hs = ptsOf(m.hs), as = ptsOf(m.as), ht = ptsOf(m.ht), at = ptsOf(m.at);
      if (hs == null || as == null || ht == null || at == null) return null;
      seen.add(m.h); seen.add(m.a);
      const result = { h:m.h, a:m.a, hs, as, ht, at };
      const detail = cleanSeasonStats(m.stats);
      if ((m.h === c.user || m.a === c.user) && detail) result.stats = detail;
      out.push(result);
    }
    if (seen.size !== 6) return null;
    results.push(out);
  }
  const out = { user:c.user, teams, round:c.round, fixtures, results };
  out.id = typeof c.id === 'string' && /^[a-zA-Z0-9-]{1,80}$/.test(c.id) ? c.id : legacySeasonId(out);
  return out;
}
function cleanSettings(g) {
  if (!g || typeof g !== 'object' || Array.isArray(g)) return;
  if (g.half === 0 || g.half === 1 || g.half === 2) settings.half = g.half;
  if (g.diff === 0 || g.diff === 1 || g.diff === 2) settings.diff = g.diff;
  if (typeof g.sound === 'boolean') settings.sound = g.sound;
  if (typeof g.hints === 'boolean') settings.hints = g.hints;
  if (Array.isArray(g.twoHints) && g.twoHints.length === 2 && g.twoHints.every(v => typeof v === 'boolean')) settings.twoHints = [g.twoHints[0], g.twoHints[1]];
  if (Array.isArray(g.tut)) settings.tut = TUT_IDS.filter(id => g.tut.includes(id));   // only moments the game knows, each once, in the game's order
  if (typeof g.coach === 'boolean') settings.coach = g.coach;
  if (Array.isArray(g.tips)) settings.tips = COACH_IDS.filter(id => g.tips.includes(id));   // coach lines already heard, in the game's order, unknown ones dropped
  /* What a save's pool number means. poolV 3: POOLS now. poolV 2, before Wales, Scotland and Italy and England 2: 7 was My League, and the rest are as they are now. No poolV, before England and Ireland: 5 was My League. */
  if ('pool' in g) { const my = POOLS.length, n = g.pool; settings.pool = !Number.isInteger(n) || n < 0 ? 0 : g.poolV === 3 ? (n <= my ? n : 0) : g.poolV === 2 ? (n === 7 ? my : n < 7 ? n : 0) : n === 5 ? my : n < 5 && POOLS[n] ? n : 0; }
  if (typeof g.myTeam === 'string' && /^[A-Za-z0-9-]{1,24}$/.test(g.myTeam)) settings.myTeam = g.myTeam;   // a key that names no side now (a deleted team) reads as the default: myTeamOf
  if (Array.isArray(g.twoDiff) && g.twoDiff.length === 2 && g.twoDiff.every(v => v === 0 || v === 1 || v === 2)) settings.twoDiff = [g.twoDiff[0], g.twoDiff[1]];
  if (Number.isInteger(g.played) && g.played >= 0 && g.played <= 99) settings.played = g.played;
  if (Number.isInteger(g.finished) && g.finished >= 0 && g.finished <= 99) settings.finished = g.finished;   // a save from before it has none, so an old player gets the sign for a few matches too: it is new to them
  if (typeof g.kids === 'boolean') settings.kids = g.kids;
  if (g.womens === 0 || g.womens === 1) settings.womens = g.womens;
  if (Array.isArray(g.drillSeen)) settings.drillSeen = DRILL_IDS.filter(id => g.drillSeen.includes(id));   // only drills the game knows, each once; a save from before Watch How has none, so each plays once
  if (typeof g.camPick === 'boolean') settings.camPick = g.camPick;
  if (g.cam === 1 || g.cam === 2 || g.cam === 3 || (g.cam === 0 && g.camPick === true)) settings.cam = g.cam;   // a save with no cam starts on the default, Mid (render-behind.js). So does a Top nobody chose: one build wrote cam 0 into every save as its default, so a 0 counts only with camPick, set by the camera button
}
function restore(s) {
  if (!s || typeof s !== 'object' || Array.isArray(s)) return;
  const hadPlayed = !!(s.settings && Number.isInteger(s.settings.played) && s.settings.played >= 0 && s.settings.played <= 99);
  cleanSettings(s.settings);
  settings.duels = true;
  if (Array.isArray(s.custom)) custom = s.custom.map(cleanTeam).filter(Boolean).slice(0, MAX_CUSTOM);
  if (Number.isSafeInteger(s.seasonSerial) && s.seasonSerial >= 0) seasonSerial = s.seasonSerial;
  if ('champHistory' in s) {
    champHistory = [];
    if (Array.isArray(s.champHistory)) for (const raw of s.champHistory.slice(-100)) {
      const c = cleanChamp(raw);
      if (c && c.round === 5 && !champHistory.some(old => old.id === c.id)) champHistory.push(c);
    }
    champHistory = champHistory.slice(-SEASON_LIMIT);
  }
  if ('champ' in s) champ = s.champ == null ? null : cleanChamp(s.champ);
  if ('career' in s) career = s.career == null || typeof cleanCareer !== 'function' ? null : cleanCareer(s.career);
  if ('importLeague' in s) importLeague = s.importLeague == null ? null : cleanImportLeague(s.importLeague);
  if (settings.pool === POOLS.length && !importLeague) settings.pool = 0;   // My League, with no league
  retainCompletedSeason(champ);
  if (!hadPlayed && (settings.tut.length > 0 || champ)) settings.played = EARLY.games;   // a save from before the gentler start has already been played
}
function load() {
  try {
    const raw = localStorage.getItem(STORE);
    if (raw) restore(JSON.parse(raw));
  } catch (e) { /* missing, blocked, or not JSON: keep a fresh game */ }
  settings.duels = true;
}
function saveWith(s) { try { localStorage.setItem(STORE, JSON.stringify({ settings:s, champ, custom, champHistory, seasonSerial, career, importLeague })); } catch (e) { /* private mode, or full */ } }
function save() {
  if (practice) return; // practice never writes settings, tutorial progress or a championship
  settings.duels = true;
  retainCompletedSeason(champ);
  saveWith(settings);
}
const tutSeen = id => settings.tut.includes(id);           // has this device had the moment's tutorial (or its first time with Hints off)?
function tutMark(id) { if (!tutSeen(id)) { settings.tut.push(id); save(); } }
function tutReset() { settings.tut = []; save(); }
const tipSeen = id => settings.tips.includes(id);          // has this device already heard this coach line?
function coachMark(id) { if (!tipSeen(id)) { settings.tips.push(id); save(); } }

/* =========================================================
   Match engine. World units are metres.
   x: 0..120 (dead-ball to dead-ball), try lines at 10 and 110.
   y: 0..70 touchline to touchline. Team 0 (you) attacks +x.
   ========================================================= */
let M = null;
let stepGap = 1/60;                                         // real seconds since the last step. The frame loop sets it below pace 1; a plain update(STEP) always sees 1/60
const matchPace = () => (!M || practice ? 1 : M.kids ? MATCH_PACE.kids : MATCH_PACE.match);   // real time to match time, for the frame loop and the banner's timer. A drill is 1 here: it scales its own steps (drillRate)
const dirOf = t => t === 0 ? 1 : -1;
const oppLine = t => t === 0 ? 110 : 10;
const ownLine = t => t === 0 ? 10 : 110;
const SETGAP = { ruck:1.6, scrum:5, lineout:10, penalty:10, tap:10 };
/* The sides table. Each team has an entry in M.side: whether a human plays it, which input seat that human sits in, the man
   under their ring, their Difficulty, their kick charge and their Pass press. Engine code reads these, never `team === 0`,
   `input` or `M.di`, so one player, one player as the away side (humans:[false, true]) and two player all run one path. */
const sideOf = t => M.side[t];
const isHuman = t => M.side[t].human;
const inputOf = t => (M.side[t].human ? inputs[M.side[t].seat] : null);
const ctrlOf = t => (M.side[t].human ? M.side[t].ctrl : null);
const setCtrl = (t, q) => { if (M.side[t].human && q) M.side[t].ctrl = q; };
const levelOf = t => M.side[t].level;
const seatOfTeam = t => (M.side[t].human ? M.side[t].seat : null);   // which seat a team's human sits in, for the rumble and the ring's colour
const anyCharging = () => M.side[0].charging || M.side[1].charging;
const clearCharge = () => { for (const s of M.side) { s.charging = false; s.charge = 0; } };
const humanSlots = () => M.side.filter(s => s.human).map(s => inputs[s.seat]);   // every human's input slot
/* Balance terms are keyed by role, not by team number: a side plays the human terms or the CPU terms (cpuSpeed, cpuTackle, the
   intercept and turnover edges, the scrum and lineout rules, the CPU's kick accuracy), each at its own level (a CPU side's level is
   the human's it plays against). AI v AI and the menu demo are fair: both sides play the CPU terms (team 0 used to keep the human
   ones, because `team === 1` was the test for the CPU). */
const cpuSide = t => M.role[t] === 'cpu';
let earlyDiff = null;   // Normal's levers with EARLY.nudge, or null. Set for a match, never left over into the next.
const diffOf = t => (M && M.kids ? KIDS.diff : M && M.early && earlyDiff && levelOf(t) === M.di ? earlyDiff : DIFF[levelOf(t)]);   // a Kids match (kids.js) plays both sides' terms from KIDS.diff
const CALM = { x:0, y:0, mph:0 };

function hexRgb(h) { const n = parseInt(h.slice(1), 16); return [n>>16&255, n>>8&255, n&255]; }
function colorDist(a,b) { const x = hexRgb(a), y = hexRgb(b); return hyp(x[0]-y[0], x[1]-y[1], x[2]-y[2]); }
/* A team's colour for marks on the dark scoreboard and plates: the shirt, or the trim if the shirt is near black, or chalk. */
function showCol(team) { const k = M.kit[team]; return colorDist(k.fill, '#0f1a12') >= 60 ? k.fill : colorDist(k.trim, '#0f1a12') >= 60 ? k.trim : '#f1eee4'; }

/* The away side changes when the shirts are too alike: its change kit, then its colours swapped, then white or black. */
function awayKit(n0, n1) {
  const h = !!n1.hoops;
  const opts = [[n1.kit, n1.trim, h], [n1.alt, n1.altTrim, false], [n1.trim, n1.kit, h], ['#f2efe6', n1.kit, false], ['#1c1c1c', n1.kit, false]].filter(o => o[0] && o[1]);
  let best = opts[0], bd = -1;
  for (const o of opts) {
    const d = colorDist(n0.kit, o[0]);
    if (d >= 140) return { fill:o[0], trim:o[1], hoops:o[2] };
    if (d > bd) { bd = d; best = o; }
  }
  return { fill:best[0], trim:best[1], hoops:best[2] };
}
const teamOf = t => typeof t === 'number' ? NATIONS[t] : t;
function newMatch(u, c, opts) {
  const n0 = teamOf(u);
  let n1 = teamOf(c);
  if (n1.id === n0.id) n1 = { ...n1, id:n1.id.slice(0, 2) + '2' };   // e.g. a team you called Farnham Minis against Farnham: this match only
  // who plays each side: [human, cpu] in one player, [false, false] for AI v AI and the demo, [true, true] in two player; tests may pass humans directly
  const humans = opts.humans || ((opts.auto || opts.demo) ? [false, false] : [true, false]);
  const auto = !humans[0] && !humans[1], two = humans[0] && humans[1], di = opts.diff == null ? 1 : opts.diff;   // M.di and M.diff: the match's one level, kept for the tools; the engine reads levelOf(t)
  const ease = !!(opts.early && di === 1 && !two && !auto && !opts.demo);   // the gentler start: asked for, Normal, one player, never the demo or AI v AI
  earlyDiff = null;
  if (ease) { const d = DIFF[di], o = { ...d }; for (const k in EARLY.nudge) o[k] = d[k] + EARLY.nudge[k]; earlyDiff = o; }
  M = {
    nat:[n0,n1], kit:[{ fill:n0.kit, trim:n0.trim, hoops:!!n0.hoops }, awayKit(n0, n1)],
    players:[], ball:{ x:60, y:35, z:0, vx:0, vy:0, vz:0, state:'dead', carrier:null, f:null, last:0, kickInfo:null },
    score:[0,0], tries:[0,0], half:1, clock:0, halfLen:opts.halfLen, diff:DIFF[di],
    hooter:false, phase:'set', set:null, goal:null, phaseCount:0, poss:0,
    firstKick: rnd() < 0.5 ? 0 : 1, auto, two, demo:!!opts.demo, champ:!!opts.champ, headless:!!opts.headless, early:ease,
    paused:false, over:false, cam:{ x:60, y:35 }, cut:null, surge:null,
    di, duels:auto ? 'off' : (opts.duels || 'off'), duelPending:null, dclock:0,
    duelLog:{ last:-99, lastKind:null, lastOwner:null, half:[0, 0], bonus:[false, false], fails:0 },
    stats:{ tackles:0, broken:0, passes:0, kicks:0, rucks:0, turnovers:0, pens:0, knocks:0, intercepts:0, drops:0, duels:0, duelsWon:0, duelsPerfect:0, gk:{ att:[0, 0], made:[0, 0] }, dg:{ att:[0, 0], made:[0, 0], charged:[0, 0] },
      conv:{ att:[0, 0], made:[0, 0] }, pen:{ att:[0, 0], made:[0, 0] },   // conversions and penalty goals, kept apart; drop goals stay on dg
      tk:{ att:[0, 0], made:[0, 0] }, duelN:{ att:[0, 0], won:[0, 0] }, gain:[0, 0] },   // the full-time card: tackles by the tackler's side, duels by the owner, metres gained carrying
    dropOn:[false, false], dropArmed:[false, false],   // the drop-goal label, per side: what it read on the last frame, and what it promised at the B press
    dropSeen:[null, null], dropSet:[null, null],       // the chargers the label last saw (as the hold would leave them), and the ones the press committed the cut to
    contact:null,                                      // the bind under way: { c, q, q2, mode, tier, t, T, ... }
    spr:[0, 1].map(() => ({ m:1, p:null, spent:false, cue:0, tick:-9, think:0 })),   // one Sprint meter a side: its level 0..1, who is sprinting on it, and whether a hold ran it dry
    stepN:0,                                           // every update counts one, close-ups included (gestureStep reads it)
    tags:[], fx:[], stop:0, shake:0, shakeT:0.12, rt:0, // render only: on-pitch tags, impact rings, the Big Hit's hit-stop, its shake and the shake's length, the render clock
    arcade:!!opts.arcade && !auto && !opts.demo,       // On Fire, the louder Big Hit and the Golden Try: a match you play, never AI v AI, the demo or practice
    fire:[0, 1].map(() => ({ heat:0, t:0 })), golden:false,   // each side's run towards On Fire and its seconds alight; extra time
    kids:!!opts.kids && di === 0 && !auto && !two && !opts.demo,   // the Kids level's levers (kids.js): asked for, on Easy, one player only; never AI v AI, the demo or two player
  };
  // the sides: a human's seat is the next free slot (the lone human of an away-side match sits in seat 0). A CPU side's level is the
  // level it is played at: its human opponent's, or the match's in AI v AI
  let seat = 0;
  M.side = [0, 1].map(t => ({ team:t, human:humans[t], seat:humans[t] ? seat++ : null, ctrl:null, ctrlPrev:null, ctrlT:0,
    charging:false, charge:0, holdN:0,                 // the kick charge: B held with the ball
    pass:null,                                         // a Pass press in hand: { mode:'tap'|'hold', to, t } so a hold can charge and an early tap is not dropped
    level:opts.levels ? opts.levels[t] : di,           // this player's Difficulty (the one level in one player)
    duel:{ half:[0, 0], lastKind:null, fails:0, first:true },   // two player: this owner's quota, his last kind, his failures in a row and his first-duel aid
    kickFirst:true }));                                // two player: this player's first goal kick of the match gets the path
  for (const t of [0, 1]) if (!humans[t] && humans[1 - t] && opts.levels) M.side[t].level = M.side[1 - t].level;
  M.role = [0, 1].map(t => (humans[t] ? 'human' : 'cpu'));
  { const m = M; for (const k of ['ctrl', 'ctrlPrev', 'ctrlT', 'charging', 'charge', 'holdN', 'pass']) Object.defineProperty(m, k, { get:() => m.side[0][k], set:v => { m.side[0][k] = v; }, enumerable:false, configurable:true }); }   // side 0's fields on M, for the tools and the console
  M.wind = makeWind();
  for (let t = 0; t < 2; t++) for (let i = 0; i < 7; i++) {
    M.players.push({ team:t, n:i+1, x:60, y:35, vx:0, vy:0, fx:dirOf(t), fy:0, down:0, tcd:0, side:0, hold:0, think:0, quick:false, fromKick:false, hx:60, hy:35, boost:0, boostMul:1, autoDir:0, drop:null,
      bind:null, bindOff:null, offside:0, sprint:0, sprinting:false, stumble:0, stumbleMul:1, wf:0, drawFrom:null, fend:0, fendA:0, bite:0, biteTo:null, dumAt:-9 });   // contact: the bind he is in, how long he is retiring, his sprint, a stumble, wrong-footed; then render-only smoothing and the fend; a Dummy he bought (bite: seconds left running at biteTo) and, for a CPU carrier, when he last sold one
  }
  M.side[0].ctrl = M.players[3]; if (humans[1]) M.side[1].ctrl = M.players[10];
  for (const inp of inputs) inp.gest = null;               // the open-play gesture history starts clean
  M.tut = null; hintReset(); coachUntil = 0;               // the hints cards start hidden, the open-play hints unshown, and a coach line from the last match does not hold the next one
  kickoff(M.firstKick);
}

function maxSpeed(p) {
  let s = 7.6 + (M.career ? careerNatOf(p) : M.nat[p.team]).pace*0.25;   // a career match: your player's own pace
  if (cpuSide(p.team)) s *= diffOf(p.team).cpuSpeed;
  let f = 1;
  if (p.boost > 0) f *= 1 + ((p.boostMul || 1) - 1)*Math.min(1, p.boost/0.6);
  if (M.surge && M.surge.team === p.team) f *= 1.08;
  if (onFire(p.team)) f *= ARCADE.fire.speed;
  f *= staminaPace(p.team);                                  // tired legs late in a half (1 outside matches you play)
  const sp = sprintLevel(p);                                 // the bigger of the sprint and the duel's burst applies, never both
  if (sp > 0) f = Math.max(f, 1 + ((M.ball.carrier === p ? SPRINT.mulBall : SPRINT.mul)[levelOf(p.team)] - 1)*sp);
  if (p.stumble > 0) f *= p.stumbleMul || CONTACT.stumble[1];
  if (p.wf > 0) f *= RUCK.wf.mul;
  if (M.career) f *= careerFade(p);                         // a career match: your player's stamina, late in the half
  return s*f;
}
function nearestOf(arr, x, y) { let best = null, bd = 1e9; for (const p of arr) { const d = hyp(p.x-x, p.y-y); if (d < bd) { bd = d; best = p; } } return best; }
function nearestFree(team, x, y) { return nearestOf(M.players.filter(p => p.team === team && p.down <= 0 && !p.bind), x, y); }
function pressure(p) { let m = 99; for (const q of M.players) if (q.team !== p.team && q.down <= 0) m = Math.min(m, dist(p,q)); return m; }
function ourBall(t) {                                      // side t has it: held by its man, or its pass in the air
  const b = M.ball;
  return (b.state === 'held' && b.carrier.team === t) || (b.state === 'air' && b.f.kind === 'pass' && b.f.team === t);
}
function userActive(t) { return !!ctrlOf(t) && (M.phase === 'play' || (M.phase === 'set' && M.set.kind === 'ruck')); }   // the stick stays live through a ruck, on the man who will pick the ball up

function steer(p, tvx, tvy, acc, dt) {
  const dx = tvx-p.vx, dy = tvy-p.vy, m = hyp(dx,dy), a = acc*dt;
  if (m <= a) { p.vx = tvx; p.vy = tvy; } else { p.vx += dx/m*a; p.vy += dy/m*a; }
}
function seek(p, tx, ty, speed, acc, dt, pursue) {
  const dx = tx-p.x, dy = ty-p.y, d = hyp(dx,dy);
  if (d < 0.05) { steer(p, 0, 0, acc, dt); return; }
  const sp = pursue ? speed : Math.min(speed, d*2.2);
  steer(p, dx/d*sp, dy/d*sp, acc, dt);
}

function placeBall(x, y) {
  const b = M.ball;
  b.state = 'dead'; b.carrier = null; b.f = null; b.x = x; b.y = y; b.z = 0; b.vx = b.vy = b.vz = 0;
}
function playFrom(team, x, y, kind) {                      // the mark the ball is played from: a ruck 1.6m behind, a scrum 1.2, a lineout 1.5 and out to the side
  const d = dirOf(team);
  const off = kind === 'ruck' ? 1.6 : kind === 'scrum' ? 1.2 : kind === 'lineout' ? 1.5 : 0.6;
  const sy = kind === 'lineout' ? (y < 35 ? y + 4 : y - 4) : y;
  return { x:x - d*off, y:sy };
}
function startSet(o) {
  M.phase = 'set'; M.set = o;
  if (o.label) say(o.label);
  if (o.kind === 'ruck') {
    // the ring leaves the tackled man for the teammate who will pick the ball up, so the stick can place him while the ruck is still down. A CPU side is left alone
    if (isHuman(o.team)) {
      const m = playFrom(o.team, o.x, o.y, 'ruck'), p = nearestFree(o.team, m.x, m.y);
      if (p) { o.picker = p; setCtrl(o.team, p); }
    }
    return;
  }
  if (o.kind !== 'try' && o.kind !== 'score') for (const t of [0, 1]) {
    if (!isHuman(t)) continue;
    const q = nearestFree(t, o.x, o.y); if (q) setCtrl(t, q);
  }
}
function deadBall(fn) { if (M.hooter && !M.demo) endHalf(); else fn(); }

/* ---------- restarts ---------- */
function kickoffFormation(kTeam, kx) {
  const d = dirOf(kTeam);
  const KY = [6,16,26,35,44,54,64];
  const RX = [12,12,12,22,24,24,38], RY = [15,35,55,8,28,48,35];
  let i = 0, j = 0;
  for (const p of M.players) {
    if (p.team === kTeam) { p.x = kx - d*(i === 3 ? 2.5 : 1.2); p.y = KY[i]; i++; p.fx = d; }
    else { p.x = clamp(kx + d*RX[j], 2, 118); p.y = RY[j]; j++; p.fx = -d; }
    p.fy = 0; p.vx = p.vy = 0; p.down = 0; p.tcd = 0; p.side = 0; p.boost = 0; p.hx = p.x; p.hy = p.y;
    p.bind = null; p.offside = 0; p.sprint = 0; p.sprinting = false; p.stumble = 0; p.wf = 0; p.drawFrom = null; p.fend = 0;
  }
  M.contact = null;
  for (const S of M.spr) { S.p = null; S.spent = false; }
}
function kickoff(team) {
  kickoffFormation(team, 60);
  placeBall(60, 35);
  M.phaseCount = 0; M.poss = team;
  startSet({ kind:'kickoff', team, x:60, y:35, t:1.4, then:() => restartKick(team, 60, 35, 'kickoff') });
  if (!M.two && outmatched(M.nat[0], M.nat[1])) say('Stronger Side', 'small');   // say itself is quiet in the demo and headless
  if (M.career) careerKickoff();                           // a career match: the ring starts on your player
}
function dropOut(team) {
  const kx = team === 0 ? 32 : 88;
  kickoffFormation(team, kx);
  placeBall(kx, 35);
  M.phaseCount = 0; M.poss = team;
  startSet({ kind:'dropout', team, x:kx, y:35, t:1.5, label:'22 Drop-Out', then:s => restartKick(s.team, s.x, 35, 'dropout') });
}
function restartKick(team, x, y, kind) {
  const d = dirOf(team);
  const len = kind === 'kickoff' ? 13 + rnd()*9 : 30 + rnd()*10;
  const ty = clamp(y + (rnd()-0.5)*44, 10, 60);
  kickBall(team, x, y, x + d*len, ty, kind === 'kickoff' ? 2.2 : 2.5, kind === 'kickoff' ? 11 : 13, 'restart');
  sfx('kick');
}
function scrum(team, x, y, reason) {
  M.stats.scrums = (M.stats.scrums||0) + 1;
  placeBall(clamp(x,15,105), clamp(y,15,55));
  startSet({ kind:'scrum', team, x:clamp(x,15,105), y:clamp(y,15,55), t:interactive() ? 1.1 : 1.8, snap:true,
    label:(reason ? reason + ' · ' : '') + 'Scrum ' + M.nat[team].id, then:s => interactive() ? startScrum(s) : autoScrum(s) });
}
function lineout(team, x, y, reason) {
  const ly = y < 35 ? 8 : 62;
  placeBall(clamp(x,15,105), ly);
  startSet({ kind:'lineout', team, x:clamp(x,15,105), y:ly, t:interactive() ? 1.1 : 1.8, snap:true,
    label:(reason ? reason + ' · ' : '') + 'Lineout ' + M.nat[team].id, then:s => interactive() ? startLineout(s) : autoLineout(s) });
}
function releaseTo(team, x, y, kind, who) {
  const d = dirOf(team);
  const m = playFrom(team, x, y, kind);
  const pinned = kind === 'ruck' && who && who.team === team && onFeet(who) ? who : null;   // the man the stick was placing picks it up, wherever he was put; a turnover never asks for him
  const p = pinned || nearestFree(team, m.x, m.y) || M.players.find(q => q.team === team);
  if (kind === 'scrum' || kind === 'lineout') {   // the scrum-half or catcher takes it at the mark, whoever won it
    p.x = clamp(m.x, 1, 119); p.y = clamp(m.y, 2, 68); p.vx = p.vy = 0; p.fx = d; p.fy = 0;
  }
  M.phase = 'play';
  setCarrier(p);
  p.quick = kind === 'ruck' || kind === 'scrum' || kind === 'lineout';
  if (kind === 'ruck' && team === M.poss) { /* phase count already advanced at the tackle */ }
}

/* ---------- possession ---------- */
function setCarrier(p) {
  const b = M.ball;
  if (M.poss !== p.team) M.phaseCount = 0;
  b.state = 'held'; b.carrier = p; b.f = null; b.last = p.team; b.kickInfo = null;
  p.hold = 0; p.think = 0.1; p.quick = false; p.drop = null;
  M.poss = p.team;
  clearCharge();
  for (const t of [0, 1]) {                                // the carrier's side takes him; any other human side re-picks when its man is down or far off
    if (!isHuman(t)) continue;
    if (p.team === t) setCtrl(t, p);
    else { const cur = ctrlOf(t); if (!cur || cur.down > 0 || dist(cur, p) > 8) { const q = nearestFree(t, p.x, p.y); if (q) setCtrl(t, q); } }
  }
}
function catchBall(p, kind) {
  const n = M.career ? careerNatOf(p) : M.nat[p.team], f = M.ball.f;   // a career match: your player's own handling
  let k = 0.015 + (5-n.handling)*0.01 + (kind === 'kick' ? 0.05 : 0) + (kind === 'intercept' ? 0.2 : 0);
  if (pressure(p) < 1.8) k += 0.04;
  if (kind === 'pass' && f && f.long) k += LONG.knock;   // a floater is a little harder to take
  if (onFire(p.team)) k *= ARCADE.fire.hands;            // On Fire: surer hands
  if (M.kids && isHuman(p.team)) k *= KIDS.hands;         // Kids: your side hardly ever knocks on
  if (rnd() < k) { knockOn(p); return; }
  setCarrier(p); sfx('catch');
  p.fromKick = kind === 'kick';
  if (kind === 'pass' && isHuman(p.team)) p.grace = M.kids ? PASS_FLIGHT.graceKids : PASS_FLIGHT.grace[levelOf(p.team)];   // a moment to see the catch before an AI man can commit
  if (kind === 'intercept') { M.stats.intercepts++; say('Intercepted', 'small'); heat(p.team, 'turnover'); }
}
function knockOn(p, why) {                                 // why: 'catch' (the default), 'contact' (jolted loose) or 'offload'
  M.stats.knocks++; st('ko_' + (why || 'catch'));
  placeBall(p.x, p.y);
  sfx('fumble'); sfx('whistle');
  deadBall(() => scrum(1-p.team, p.x, p.y, 'Knock-On'));
}
function pickUp(p) {
  const b = M.ball;
  if (b.x < 10 || b.x > 110) {
    const defTeam = b.x < 10 ? 0 : 1;
    if (p.team !== defTeam) { scoreTry(p); return; }
    placeBall(b.x, b.y); sfx('whistle');
    deadBall(() => dropOut(defTeam));
    return;
  }
  const turn = p.team !== b.last && !b.kickInfo;
  setCarrier(p); sfx('catch');
  if (turn) { M.stats.turnovers++; say('Turnover', 'small'); heat(p.team, 'turnover'); }
}

/* ---------- passing and kicking ---------- */
const LONG = { arm:0.18, auto:0.6, gate:0.12, range:32, knock:0.03 };   // hold past arm to skip a man; the ball leaves on release, or on its own at auto
/* The pass leads the receiver (2026-10-17). A pass used to be thrown at where the receiver stood, and while it was in the air he braked
   for it (arrive-style seek), so a completed pass lost about 5m and he took it standing still. Now the ball goes where he will be
   running on upfield, he runs onto it at pace whatever the stick says (the stick takes over at the catch), and the line keeps running
   while the ball is in the air. Every lever is here: a: his pick-up (m/s²) from his upfield speed now to top speed × pace; cpu: the
   CPU receiver's pace (a human's is 1; this is the one-player balance lever: 0.6 gives about 87 / 47 on Normal / Hard, 0.7 about
   81 / 42 at the old ball pace; PASS_FLIGHT left it at 0.65: paired runs could not tell 0.65 from 0.68, so don't read a small Hard move as this lever's); keep: how much of his sideways drift the aim keeps; back: the landing spot is capped this far behind the passer at
   release, and never forward after the handling error (the law); line: the support slots' upfield lead while a pass is in the air,
   in seconds of the receiver's top speed; kpBack: how far behind the carrier the Key Pass runner may be (6 before the lead). */
const RUNON = { a:18, cpu:0.65, keep:0.5, back:0.4, line:0.45, kpBack:7.5 };
/* One runner on the open shoulder (2026-10-31). lat / back: where he starts, wide of the ball and behind it. clear: he slides
   while a defender is closer than this. mark: the pass ring tints when a defender is closer than this to the man it is on.
   latMax / backMax keep him inside the Key Pass box (4–12m wide, inside kpBack). tint: the marked colour, the alert chalk. */
const SUPPORT = { lat:5, back:2.6, clear:5, mark:5, latMax:11.2, backMax:6.4, tint:'#ff8466' };
/* How long a pass hangs in the air (2026-11-08, from the owner's phone playtest: passing in a match is a little hectic). The ball's speed is
   divided by this, so the flight lasts longer and the lead, the Block lane and the sure pass all aim for the slower ball. It is the one lever to
   retune after the kid test: 1 is the old pace. match: every match but Kids, Two Player and Training included (your passes hang 13% longer on the
   bot's mix). kids: a Kids match, both sides' passes (yours 30% longer). A long pass stays off it: it hangs already. A short pass capped by the law
   stays near the old pace too (capSpeed), or he brakes for it.
   grace: a slower ball alone left your catcher tackled in the next 0.3s far more often (Kids 22% to 34%, Normal 32% to 38%, Hard 36% to 45%), and
   easing the defence or the receiver in the air did not bring that back. So your catcher has this long after a catch, by level, before an AI man can
   commit: Kids, then Easy, Normal, Hard. It costs the bot's Hard balance: 53% at the old pace, about 61% if Hard had 0.25, 57% at its 0.15, and it leaves Hard's rate 4 points up.
   PASS_FLIGHT='{"match":1.25}' node tools/bot.mjs tries a value without an edit. */
const PASS_FLIGHT = { match:1.2, kids:1.4, grace:[0.25, 0.25, 0.15], graceKids:0.35 };
const passFlight = () => (M && M.kids ? PASS_FLIGHT.kids : PASS_FLIGHT.match);
const passSpeedOld = (n, long) => (15 + n.handling*1.1) * (long ? 0.88 : 1);   // the ball before the lever: a long pass hangs a little, so the loop reads
const passSpeed = (n, long) => passSpeedOld(n, long) / (long ? 1 : passFlight());   // a long pass keeps its pace: it hangs already, and the lever on top held one up to 2.9s with the stick doing nothing
const passPace = team => (isHuman(team) ? 1 : RUNON.cpu);   // how hard a side's receiver runs onto the ball, by role
function runOn(r, d, t, pace) {                             // how far upfield r gets in t seconds running on from his upfield speed now, picking up at RUNON.a to top speed × pace
  const vm = maxSpeed(r)*pace, v0 = clamp(r.vx*d, 0, vm), ta = Math.min(t, (vm - v0)/RUNON.a);
  return v0*ta + 0.5*RUNON.a*ta*ta + vm*(t - ta);
}
function capSpeed(to, d, need, far, fast, slow, pace) {      // the law fixes the landing spot, so a longer flight only makes him brake for it: the ball's speed, between the old pace and the lever's, that lets him reach the spot at his run
  const t = v => far/v + 0.06;
  if (need <= runOn(to, d, t(fast), pace)) return fast;
  if (need >= runOn(to, d, t(slow), pace)) return slow;
  for (let i = 0; i < 8; i++) { const v = (fast + slow)/2; if (runOn(to, d, t(v), pace) < need) fast = v; else slow = v; }
  return slow;
}
function leadPass(from, to, o) {                            // the aim: where the ball lands if he runs onto it, before the handling error. blockSpec reads the same point, so the Block close-up shows the line the ball takes
  o = o || {};
  const d = dirOf(from.team), n = M.nat[from.team], pace = passPace(from.team);
  let spd = passSpeed(n, o.long), tx = to.x, ty = to.y, T = 0.2;
  for (let i = 0; i < 4; i++) { T = hyp(tx-from.x, ty-from.y)/spd + 0.06; tx = to.x + d*runOn(to, d, T, pace); ty = to.y + to.vy*RUNON.keep*T; }
  if ((tx-from.x)*d > -RUNON.back) {
    tx = from.x - d*RUNON.back;
    spd = capSpeed(to, d, (tx-to.x)*d, hyp(tx-from.x, ty-from.y), passSpeedOld(n, o.long), spd, pace);
  }
  return { x:tx, y:ty, T, spd };
}
function runOnTarget(r, f, pace) {                          // the receiver while the pass is in the air: onto the landing spot as the ball gets there, at pace, never braking for it
  const rem = Math.max(STEP, f.T - f.t), dd = hyp(f.x1 - r.x, f.y1 - r.y);
  return { x:f.x1, y:f.y1, s:Math.min(maxSpeed(r)*pace, dd/rem), a:RUNON.a, pursue:true };
}
function passOk(c, q, maxR) {
  if (!q || q === c || q.team !== c.team || q.down > 0 || q.bind) return false;
  if ((q.x - c.x)*dirOf(c.team) > 0.5) return false;
  const dd = dist(c, q);
  return dd >= 1.5 && dd <= maxR;
}
function pickReceiver(c, pref, maxR = 22) {                 // maxR: an offload reaches only CONTACT.off.range
  const d = dirOf(c.team); let best = null, bs = 1e9;
  for (const q of M.players) {
    if (q.team !== c.team || q === c || q.down > 0 || q.bind) continue;
    const dx = (q.x-c.x)*d; if (dx > 0.5) continue;
    const dy = q.y-c.y, dd = hyp(dx,dy);
    if (dd > maxR || dd < 1.5) continue;
    let s = dd;
    if (pref < -0.3 && dy > 0) s += 30;
    if (pref > 0.3 && dy < 0) s += 30;
    if (s < bs) { bs = s; best = q; }
  }
  return best;
}
function pickLong(c, pref, skip) {                          // the next man out, on the stick's side or the side with more support, within LONG.range and not forward
  if (!skip) return null;                                  // with nobody to skip, a hold stays a normal pass
  const all = [];
  for (const q of M.players) {
    if (!passOk(c, q, LONG.range) || q === skip) continue;
    const dy = q.y - c.y, dd = dist(c, q);
    if (dd < dist(c, skip) + 0.5) continue;                // out means further than the man this pass skips
    all.push({ q, dy, dd });
  }
  if (!all.length) return null;
  let side = pref < -0.3 ? -1 : pref > 0.3 ? 1 : 0;
  if (!side) {
    let neg = 0, pos = 0;
    for (const q of M.players) {
      if (!passOk(c, q, LONG.range)) continue;
      const dy = q.y - c.y;
      if (dy < -0.4) neg++; else if (dy > 0.4) pos++;
    }
    if (pos > neg) side = 1; else if (neg > pos) side = -1;
  }
  let pool = all;
  if (side) {
    pool = all.filter(o => side > 0 ? o.dy > 0.3 : o.dy < -0.3);
    if (!pool.length) return null;                         // nobody further on that side: the press stays a normal pass
  }
  pool.sort((a, b) => a.dd - b.dd);
  return pool[0].q;
}
function passAim(c, pref) { const near = pickReceiver(c, pref); return { near, far:pickLong(c, pref, near) }; }
function shownPass(c) {                                   // the ring and the pass read this together, so the ball goes to the man the ring is on
  const inp = inputOf(c.team), pref = inp ? inp.world().y : 0, aim = passAim(c, pref), p = sideOf(c.team).pass;
  const charge = p && p.mode === 'hold' ? Math.min(1, p.t/LONG.auto) : 0;
  const out = p && p.mode === 'tap' ? { to:passOk(c, p.to, 22) ? p.to : aim.near, skip:null, gold:false, charge:0 }
    : p && p.mode === 'hold' && p.t >= LONG.arm && aim.far ? { to:aim.far, skip:aim.near, gold:true, charge }
    : { to:aim.near, skip:null, gold:false, charge };      // a short hold still tracks the ring
  out.marked = !!(out.to && pressure(out.to) < SUPPORT.mark);   // white when he is free, tinted when a defender is on him
  return out;
}
function bestReceiver(p) {
  const d = dirOf(p.team); let best = null, bs = -1e9;
  for (const q of M.players) {
    if (q.team !== p.team || q === p || q.down > 0 || q.bind) continue;
    const dx = (q.x-p.x)*d; if (dx > 0.3) continue;
    const dd = dist(p,q); if (dd < 2 || dd > 20) continue;
    const sp = pressure(q), s = sp - dd*0.12;
    if (s > bs) { bs = s; best = { q, space:sp }; }
  }
  return best;
}
function doPass(from, to, o) {
  o = o || {};
  const b = M.ball, n = M.nat[from.team], d = dirOf(from.team);
  const spd = passSpeed(n, o.long);
  let tx, ty, T, v = spd;
  if (o.sure) {                                            // a won Key Pass: thrown at where the runner is going, as it always was, and never caught in touch
    tx = to.x; ty = to.y; T = 0.2;
    for (let i = 0; i < 3; i++) { T = hyp(tx-from.x, ty-from.y)/spd + 0.06; tx = to.x + to.vx*T; ty = to.y + to.vy*T; }
    if ((tx-from.x)*d > 0) tx = from.x;
    ty = clamp(ty, 3, 67);
  } else {                                                 // led: where he will be running on, then the handling error, and never forward of the passer (the law)
    const a = leadPass(from, to, o); tx = a.x; ty = a.y; v = a.spd;
    const err = ((5-n.handling)*0.08 * (o.long ? 1.7 : 1) + (o.long ? 0.4 : 0))*(M.kids && isHuman(from.team) ? KIDS.passErr : 1); tx += gauss()*err; ty += gauss()*err;   // Kids: your passes stray less
    if ((tx-from.x)*d > 0) tx = from.x;
  }
  T = hyp(tx-b.x, ty-b.y)/v + 0.06;
  const dist = hyp(tx-b.x, ty-b.y);
  const H = o.long ? Math.min(6.4, 1.5 + dist*0.11) : 0.5;   // higher with the distance, so it sails over the skipped man's defender
  b.state = 'air'; b.carrier = null; b.last = from.team;
  b.f = { kind:'pass', team:from.team, x0:b.x, y0:b.y, x1:tx, y1:ty, t:0, T, H, z0:1.1, z1:1.1, rolled:new Set(o.skip || []), onside:null, target:to,
    sure:!!o.sure, boost:o.boost || null, long:!!o.long };
  from.hold = 0; from.quick = false;
  M.stats.passes++;
  if (o.long) { st('long'); st('long' + from.team); }
  if (isHuman(from.team)) setCtrl(from.team, to);
  sfx('pass');
}
function kickBall(team, x0, y0, x1, y1, T, H, kind) {
  const b = M.ball, d = dirOf(team);
  const onside = new Set();
  for (const p of M.players) if (p.team === team && (kind === 'restart' || (p.x-x0)*d <= 0.5)) onside.add(p);
  b.state = 'air'; b.carrier = null; b.last = team;
  b.f = { kind, team, x0, y0, x1, y1, t:0, T, H, z0:0.4, z1:0, rolled:new Set(), onside, target:null };
  b.x = x0; b.y = y0; b.z = 0.4;
  b.kickInfo = kind === 'kick' ? { team, ownHalf:(x0-60)*d < 0 } : null;
  M.phase = 'play';
  clearCharge();
  for (const t of [0, 1]) if (isHuman(t)) { const q = nearestFree(t, x1, y1); if (q) setCtrl(t, q); }
}
function chargeDown(c) {                                   // a tactical kick's roll: a defender on top of the kicker gets a 30% charge-down
  let q = null, bd = 1.7;
  for (const o of M.players) if (o.team !== c.team && o.down <= 0) { const d = dist(o,c); if (d < bd) { bd = d; q = o; } }
  if (!q || rnd() > 0.3) return false;
  chargeDownBy(c, q);
  return true;
}
function chargeDownBy(c, q, quiet, at) {                   // q blocks c's kick and the ball bounces back loose. at: where he lands, 1.2m from the kicker on the side he came from (a drop's charger ran there; a tactical kick's roll leaves him where he stood)
  const b = M.ball, d = dirOf(c.team);
  if (at) { put(q, at); q.vx = q.vy = 0; }
  b.state = 'loose'; b.carrier = null; b.f = null; b.last = q.team; b.kickInfo = { team:c.team, ownHalf:false };   // a kicked ball: whoever gathers it, that is no turnover
  if (at) {                                                // off the charger's hands, away from him: a man from behind knocks it on, one from in front back
    const m = hyp(c.x - at.x, c.y - at.y) || 1, ux = (c.x - at.x)/m, uy = (c.y - at.y)/m, sp = 3 + rnd()*4, side = (rnd()-0.5)*5;
    b.x = c.x + ux*0.6; b.y = c.y + uy*0.6; b.z = 1; b.vx = ux*sp - uy*side; b.vy = uy*sp + ux*side; b.vz = 2;
  } else { b.x = c.x + d*0.6; b.y = c.y; b.z = 1; b.vx = -d*(3+rnd()*4); b.vy = (rnd()-0.5)*5; b.vz = 2; }
  c.hold = 0;
  M.phase = 'play'; clearCharge();
  if (!quiet) { say('Charged Down', 'small'); sfx('tackle'); }
}
function doKick(c, power, lat) {
  if (chargeDown(c)) return;
  const n = M.career ? careerNatOf(c) : M.nat[c.team], d = dirOf(c.team);   // a career match: your player's own kicking
  const len = 10 + power*(36 + n.kicking*3);
  const ang = clamp(lat, -1.2, 1.2)*0.75 + gauss()*(0.13 - n.kicking*0.015);
  const tx = c.x + d*len*Math.cos(ang), ty = c.y + len*Math.sin(ang);
  c.hold = 0;
  M.stats.kicks++;
  kickBall(c.team, c.x, c.y, tx, ty, 0.8 + len/28, 2.5 + len*0.26, 'kick');
  sfx('kick');
}
function aiKick(p, type) {
  const d = dirOf(p.team), n = M.nat[p.team];
  if (type === 'clear') doKick(p, 0.8 + rnd()*0.2, p.y < 35 ? -0.75 : 0.75);
  else if (type === 'territory') doKick(p, 0.7 + rnd()*0.3, (rnd()-0.5)*0.8);
  else cpuDrop(p);
}

/* ---------- tackling ----------
   Contact is a commit, then a bind. A defender who comes within reach commits to the carrier: the roll is drawn at the commit
   and then played out. A made tackle binds the two men for CONTACT.bind seconds as a Big Hit, a Wrap or a Soft tackle, a second
   defender can join, and it ends in a ruck with the tackler rolling away and retiring. A broken tackle slides the tackler off the
   carrier's hip, never into his path. Duels and the drop-goal smother call tackle() with no tier and keep the old body, so no new
   random draw reaches them. New code reads the two-player shims (isHuman, ctrlOf, levelOf), never team 0 or M.ctrl. */
const ringed = q => q === ctrlOf(q.team);                   // the man under a human's ring
const onFeet = p => p.down <= 0 && !p.bind;
const st = (k, n) => { M.stats[k] = (M.stats[k] || 0) + (n == null ? 1 : n); };
const countTk = (team, made) => { const tk = M.stats.tk; tk.att[team]++; if (made) tk.made[team]++; };   // a tackle attempt by that side: made is a completed tackle, missed is a broken one
const cpuEdge = (q, c, arr) => (!isHuman(q.team) && isHuman(c.team)) ? arr[levelOf(c.team)] : 0;   // a CPU edge over a human, by the level that human plays
const slide = (p, x, y, T, spin) => { T = Math.max(T, hyp(x - p.x, y - p.y)/9); p.drawFrom = { x:p.x, y:p.y, t:T, T, spin:spin || 0 }; p.x = x; p.y = y; };   // a teleport in the logic, smoothed in the drawing at no more than 9 m/s
const matchMild = () => !!(M && (M.kids || (M.career && career && career.stage === 0)));   // a Kids match, or a career's Minis
function tag(text, x, y) { if (M.auto) return; st('tag_' + text); M.tags.push({ text, x, y, t:0 }); while (M.tags.length > 2) M.tags.shift(); }
function impact(x, y) { M.fx.push({ x, y, t:0 }); }
function hitStop(ms, shake) { if (!interactive()) return; M.stop = ms/1000; if (!RM) M.shake = M.shakeT = shake || 0.12; }   // shake: its length, which also sets its size
function commitTackle(q, c, mode) {                        // mode: 'ai' (an AI defender's reach), 'contact' (your ringed man's automatic tackle), 'dive' (a Tackle press), 'ankle' (a dive from behind)
  const d = dirOf(c.team), rx = q.x - c.x, ry = q.y - c.y, rm = hyp(rx, ry) || 1;
  const cv = hyp(c.vx, c.vy), cosF = cv > 0.5 ? (rx*c.vx + ry*c.vy)/(rm*cv) : rx*d/rm;
  const behind = (q.x - c.x)*d < -0.3, sideOn = !behind && Math.abs(cosF) < 0.5;
  let p = mode === 'ankle' ? CONTACT.ankle : tackleChance(q, c, mode);
  if (sideOn && mode !== 'ankle') p = Math.min(0.95, p*CONTACT.side);
  q.tcd = 1.0;
  st('ta' + c.team);
  const qs = !!q.sprinting, cs = !!c.sprinting, dp = M.career ? careerAbility(q, 'power') - careerAbility(c, 'power') : powerOf(q.team) - powerOf(c.team);   // both read the hold itself, not an ease-out: a tap buys no Big Hit bonus and no Fend. A career match: your player's own power, faded as his side's
  const r = rnd();
  let tier = 'broken';
  if (r < p) {
    const closing = ((c.vx - q.vx)*rx + (c.vy - q.vy)*ry)/rm;   // how fast the two are coming together along the line between them
    let dom = CONTACT.dom.base + dp*CONTACT.dom.pow + (cosF > 0.5 && closing > 6 ? CONTACT.dom.front : 0) + (mode === 'dive' && rm < 1.7 ? CONTACT.dom.dive : 0) + (qs ? CONTACT.dom.sprint : 0) + cpuEdge(q, c, CONTACT.dom.cpu);
    let soft = CONTACT.soft.base + (behind ? CONTACT.soft.behind : 0) + (cv > 7 ? CONTACT.soft.fast : 0) - dp*CONTACT.soft.pow;
    if (mode === 'ankle') { dom = 0; soft = 1; }             // an ankle tap is always soft
    else { dom = clamp(dom, 0.03, 0.5); soft = clamp(soft, 0.05, 1 - dom); }
    const r2 = rnd();
    tier = r2 < dom ? 'dom' : r2 < dom + soft ? 'soft' : 'wrap';
    st('ts' + c.team);
  }
  st('tier_' + tier);
  countTk(q.team, tier !== 'broken');
  if (mode === 'ankle') { st('ankleTry'); if (tier !== 'broken') st('ankle' + q.team); }
  const k = { c, q, q2:null, mode, tier, t:0, T:tier === 'broken' ? 0 : CONTACT.bind, v0:{ x:c.vx, y:c.vy }, front:cosF > 0.3, aiOff:null, offloaded:false, margin:r - p, dp, cSprint:cs };
  endSprint(q);                                            // the sprint ends when he commits
  if (tier === 'broken') { resolveContact(k); return k; }
  endSprint(c);
  q.bind = k; c.bind = k; q.bindOff = { x:rx/rm*0.7, y:ry/rm*0.7 };
  M.contact = k; st('binds');
  sfx('tackle'); if (ringed(q) || ringed(c)) buzz(30);
  if (!isHuman(c.team) && tier !== 'dom' && rnd() < CONTACT.off.cpu*(0.6 + 0.2*(M.nat[c.team].handling - 3))) k.aiOff = 0.10 + rnd()*0.15;   // the AI carrier tries an offload
  return k;
}
function releaseBind(k) { for (const p of [k.c, k.q, k.q2]) if (p) p.bind = null; if (M.contact === k) M.contact = null; }
function contactGuard() { const k = M.contact; if (!k) return; const b = M.ball; if (!(M.phase === 'play' && b.state === 'held' && b.carrier === k.c)) releaseBind(k); }
function bindMove(p, dt) {                                 // velocities through the bind: the carrier runs down (or is driven back), the tackler is pulled onto his hip
  const k = p.bind;
  if (p === k.c) {
    const u = clamp(k.t/k.T, 0, 1);
    const f = k.tier === 'soft' ? 1 - 0.6*u : k.tier === 'wrap' ? 1 - u : (u < 0.4 ? 1 - u/0.4 : -0.35*(u - 0.4)/0.6);
    p.vx = k.v0.x*f; p.vy = k.v0.y*f;
  } else {
    const tx = k.c.x + p.bindOff.x, ty = k.c.y + p.bindOff.y;
    let px = (tx - p.x)*12, py = (ty - p.y)*12; const pm = hyp(px, py);
    if (pm > 8) { px *= 8/pm; py *= 8/pm; }                   // the pull onto the hip: 12/s of the gap, capped so a lunge from 2.8m reads as a lunge, not a blink
    p.vx = k.c.vx + px; p.vy = k.c.vy + py;
  }
}
function contactStep(c, dt) {                              // runs in place of the duel and tackle checks while a bind is on
  const k = M.contact;
  if (k.c !== c) { releaseBind(k); return; }
  if (carrierChecks(c)) { releaseBind(k); return; }        // a bound carrier who crosses the line still scores; touch is still touch
  k.t += dt;
  if (k.aiOff != null && k.t >= k.aiOff) { k.aiOff = null; if (offload(k, false)) return; }
  if (!k.q2) for (const o of M.players) {
    if (o.team === c.team || o === k.q || !onFeet(o) || o.tcd > 0 || o.offside > 0) continue;
    if (dist(o, c) < CONTACT.second.r) { joinTackle(k, o); break; }
  }
  if (k.t >= k.T) resolveContact(k);
}
function joinTackle(k, o) { const c = k.c, m = dist(o, c) || 1; k.q2 = o; o.bind = k; o.bindOff = { x:(o.x - c.x)/m*0.7, y:(o.y - c.y)/m*0.7 }; endSprint(o); st('second'); }
function supportFor(c) {                                   // the AI carrier's offload target: a team-mate level or behind within range, in some space
  const d = dirOf(c.team); let best = null, bd = CONTACT.off.range;
  for (const q of M.players) { if (q.team !== c.team || q === c || !onFeet(q) || (q.x - c.x)*d > 0.3) continue; const dd = dist(q, c); if (dd > 1.5 && dd < bd && pressure(q) > 2) { bd = dd; best = q; } }
  return best;
}
function offloadTarget(k) {                                // the one receiver the Offload label, the press and the pass-target ring all agree on: the stick's side within range, else the nearest within range
  if (k.offloaded || k.tier === 'dom' || k.tier === 'broken') return null;
  const c = k.c, inp = inputOf(c.team);
  return inp ? pickReceiver(c, inp.world().y, CONTACT.off.range) : supportFor(c);
}
function canOffload(k) { return !!offloadTarget(k); }
function looseInContact(c) {                               // the ball comes loose behind him, for anyone
  const b = M.ball, d = dirOf(c.team);
  tag('Loose Ball', c.x, c.y); sfx('fumble');
  b.state = 'loose'; b.carrier = null; b.f = null; b.last = c.team; b.kickInfo = null;
  b.x = c.x - d*0.4; b.y = c.y; b.z = 0.6; b.vx = -d*(2 + rnd()*3); b.vy = (rnd() - 0.5)*4; b.vz = 1.5;
  c.hold = 0;
}
function offload(k, user) {                                // user: the carrier's own Pass press while held; otherwise the AI's try
  const c = k.c;
  if (k.offloaded || k.tier === 'dom' || k.tier === 'broken') return false;
  const r = user ? offloadTarget(k) : supportFor(c);        // the press takes the man the label was lit for
  if (!r) return false;
  const pOk = M.kids && user ? KIDS.offload : CONTACT.off[k.tier]*(1 + (M.nat[c.team].handling - 3)*0.05);   // Kids: an offload you press gets away
  st('offAtt'); k.offloaded = true;
  const q = k.q, q2 = k.q2;
  releaseBind(k);
  c.down = 0.9; q.down = 0.6; q.tcd = 1.0; if (q2) q2.tcd = 0.4;
  if (rnd() < pOk) { st('offloads'); st('off' + c.team); if (ringed(c)) tag('Offload', c.x, c.y); doPass(c, r, { skip:[q, q2].filter(Boolean) }); return true; }
  st('offFail');
  if (rnd() < CONTACT.off.hold) { st('offHeld'); c.down = 0; q.down = 0; q.tcd = 0; tackle(c, q, { tier:k.tier, q2 }); return true; }   // he couldn't get it away: an ordinary ruck
  if (rnd() < CONTACT.off.knock) { st('offKnock'); knockOn(c, 'offload'); } else { st('offLoose'); looseInContact(c); }
  return true;
}
function resolveContact(k) {                               // the end of the bind, or a broken tackle at the commit
  const c = k.c, q = k.q, q2 = k.q2;
  let tier = k.tier;
  if (q2) {
    if (tier === 'wrap' && rnd() < CONTACT.second.toDom) tier = 'dom';
    else if (tier === 'soft' && rnd() < CONTACT.second.softToWrap) tier = 'wrap';
    if (tier !== k.tier) st('secondChanged');
  }
  releaseBind(k);
  if (tier === 'broken') {
    let ux = c.vx, uy = c.vy, cv = hyp(ux, uy);              // the carrier's line: his run, or his facing when he is standing still, or the line from the tackler; never nothing, so the tackler never lands on top of him
    if (cv < 0.5) { ux = c.fx; uy = c.fy; cv = hyp(ux, uy); }
    if (cv < 0.5) { ux = c.x - q.x; uy = c.y - q.y; cv = hyp(ux, uy); }
    if (cv < 1e-6) { ux = dirOf(c.team); uy = 0; cv = 1; }
    ux /= cv; uy /= cv;
    const s = (q.x - c.x)*uy - (q.y - c.y)*ux >= 0 ? 1 : -1;
    slide(q, c.x - ux*CONTACT.slide[0] + uy*CONTACT.slide[1]*s, c.y - uy*CONTACT.slide[0] - ux*CONTACT.slide[1]*s, 0.12, s);   // off the hip: beside and behind, out of his path
    q.down = (k.mode === 'dive' || k.mode === 'ankle') ? CONTACT.diveDown : CONTACT.brokenDown; q.tcd = 1.0; q.vx = q.vy = 0;
    const fend = k.cSprint || (Math.round(-k.dp) >= CONTACT.fend.pow && k.margin >= CONTACT.fend.margin);   // beaten by a clear margin with the power edge, or at a sprint: he keeps his speed. The edge to the nearest point, so the Stamina fade moves it only once the two sides have faded half a point apart
    c.fend = 0.2; c.fendA = Math.atan2(q.y - c.y, q.x - c.x);
    let tripped = false;
    if (k.mode === 'ankle' && rnd() < CONTACT.trip.p) { c.stumble = CONTACT.trip.t; c.stumbleMul = CONTACT.trip.mul; st('trip'); tripped = true; }
    else if (!fend) { c.stumble = CONTACT.stumble[0]; c.stumbleMul = CONTACT.stumble[1]; }
    if (fend) { st('fends'); st('fend' + c.team); if (ringed(c)) tag('Fend', c.x, c.y); }
    if (tripped) { sfx('trip'); if (ringed(q)) { tag('Tripped', c.x, c.y); buzz(20, q.team); } } else sfx('whiff');
    st('broken' + c.team); M.stats.broken++; heat(c.team, 'break');
    return;
  }
  if (tier === 'dom') {
    st('dom' + q.team);
    if (matchMild()) {                                       // the youngest: a plain word, no freeze, no shake and no praise for hitting hard. It draws no random number, so the match plays the same
      sfx('tackle'); buzz(20); if (M.arcade) heat(q.team, 'hit');
      if (ringed(q)) tag('Stopped', c.x, c.y);
    } else { impact(c.x, c.y); sfx('hit'); buzz(45);
    if (M.arcade) {                                          // arcade: the whole screen knows. Yours freezes and shakes hard; one on your carrier shakes too
      heat(q.team, 'hit');
      if (ringed(q)) { say('Big Hit', 'big hit', q.team); hitStop(ARCADE.hit.stop, ARCADE.hit.shake); }
      else if (ringed(c) && !RM && interactive()) M.shake = M.shakeT = ARCADE.hit.hitShake;
    } else if (ringed(q)) { tag('Big Hit', c.x, c.y); hitStop(70); } }
  }
  const jolt = (CONTACT.jolt[tier] || 0)*(1 + (3 - M.nat[c.team].handling)*0.15) + (tier === 'dom' && M.arcade ? ARCADE.hit.jolt : 0);   // the ball jolted loose in the tackle; an arcade Big Hit spills it more
  if (practice && practiceTackle(c, q)) return;            // a drill takes a made tackle before the ball can jolt loose
  if (rnd() < jolt*(M.kids && isHuman(c.team) ? KIDS.jolt : 1)) {   // Kids: your carrier keeps hold of it
    st('jolts');
    c.down = 1.0; q.down = 0.6; q.tcd = 1.0;
    if (rnd() < CONTACT.jolt.fwd) { st('joltKnock'); knockOn(c, 'contact'); } else { st('joltLoose'); looseInContact(c); }
    return;
  }
  if (k.mode === 'ankle') { sfx('trip'); if (ringed(q)) { tag('Ankle Tap', c.x, c.y); buzz(20, q.team); } }
  tackle(c, q, { tier, q2 });
}
function tackle(c, q, o) {
  if (practice && practiceTackle(c, q)) return;
  o = o || {};
  M.stats.tackles++;
  if (M.career) careerDeed('tackles', q);                  // a career match: a tackle by your player
  const team = c.team, d = dirOf(team);
  if (o.tier == null) {                                      // the duels' tackles and Big Hit, and the drop-goal smother: the old body, with no new random draw
    c.down = 1.25; c.vx *= 0.2; c.vy *= 0.2; c.drop = null;
    q.down = 1.0; q.tcd = 1.0;
    sfx('tackle'); buzz(30);
    if ((c.x-ownLine(team))*d < 0) {
      placeBall(c.x, c.y);
      deadBall(() => scrum(1-team, c.x, c.y, 'Held in Goal'));
      return;
    }
    placeBall(clamp(c.x,1,119), clamp(c.y,1,69));
    M.phaseCount++; M.stats.rucks++;
    startSet({ kind:'ruck', team, x:clamp(c.x,1,119), y:clamp(c.y,1,69), t:o.dom ? DOM_RUCK : 1.05, dom:!!o.dom, domP:o.domP, then:resolveRuck });
    return;
  }
  c.vx *= 0.2; c.vy *= 0.2; c.drop = null;
  if ((c.x-ownLine(team))*d < 0) {
    c.down = 1.25; q.down = 1.0; q.tcd = 1.0;
    placeBall(c.x, c.y);
    deadBall(() => scrum(1-team, c.x, c.y, 'Held in Goal'));
    return;
  }
  const bx = clamp(c.x - d*0.4, 1, 119), by = clamp(c.y, 1, 69), ball = { x:bx, y:by };   // the ball goes behind the tackled man
  placeBall(bx, by);
  M.phaseCount++; M.stats.rucks++;
  const tier = o.tier, sy = q.y >= by ? 1 : -1;
  c.x = clamp(bx + d*0.45, 0.5, 119.5); c.y = by;
  // the race to the ball sets the ruck's length: the attack's first support against the defence's first man other than the tackler
  let tA = 99;
  for (const p of M.players) if (p.team === team && p !== c && onFeet(p)) tA = Math.min(tA, dist(p, ball)/(0.85*maxSpeed(p)) + 0.15 - RUCK.attHead);
  tA = Math.max(0.1, tA);
  const q2 = o.q2 && o.q2.down <= 0 ? o.q2 : null;
  let tD = q2 ? 0.15 : 99;
  for (const p of M.players) if (p.team !== team && p !== q && p !== q2 && onFeet(p) && !(p.offside > 0) && dist(p, ball) <= RUCK.gate && (p.x - bx)*d >= -0.5) tD = Math.min(tD, dist(p, ball)/(0.85*maxSpeed(p)) + 0.15);
  const t = tier === 'dom' ? RUCK.t.slow : (tA + RUCK.quickLead < tD ? RUCK.t.quick : RUCK.t.normal);
  st(t <= RUCK.t.quick ? 'ruck_quick' : t >= RUCK.t.slow ? 'ruck_slow' : 'ruck_normal');
  c.down = t + 0.15;
  slide(q, clamp(bx + d*1.0, 0.5, 119.5), clamp(by + sy*1.1, 1, 69), 0.15);   // the tackler rolls away, then retires: no tackle and no chasing until he is back
  q.vx = q.vy = 0; q.down = t + 0.25; q.tcd = q.offside = t + 0.25 + RUCK.retire;
  if (q2) { q2.offside = t + 0.25 + RUCK.retire; q2.tcd = Math.max(q2.tcd, q2.offside); }   // the man who joined is in the ruck too, and retires for as long as the tackler
  startSet({ kind:'ruck', team, x:bx, y:by, t, tier, tA, tD, tackler:q, then:resolveRuck });
}
function wrongFoot(team, x, y) {                           // the side that lost the ball, near it, is caught on the wrong side: slow and unable to tackle for a moment
  for (const p of M.players) if (p.team !== team && hyp(p.x - x, p.y - y) < RUCK.wf.r) { p.tcd = Math.max(p.tcd, RUCK.wf.t); p.wf = RUCK.wf.t; st('wfMen'); }
}
function resolveRuck(s) {                                  // the ruck is automatic: a flat penalty roll, then a flat turnover roll
  const att = s.team, def = 1-att;
  if (rnd() < RUCK.pen) { penalty(rnd() < 0.55 ? def : att, s.x, s.y); return; }
  const pT = s.dom ? s.domP : RUCK.flatBase + (powerOf(def) - powerOf(att))*0.02 + (cpuSide(def) ? diffOf(def).turnover : -diffOf(def).turnover);   // the level's turnover edge for a CPU defence, against a human one
  if (rnd() < clamp(pT, 0.03, s.dom ? 0.40 : 0.18)) {
    M.stats.turnovers++; st('toRuck'); say('Turnover', 'small'); heat(def, 'turnover');
    releaseTo(def, s.x, s.y, 'turnover');
    if (s.tier) wrongFoot(def, s.x, s.y);
    if (s.dom) surge(def, LINE_SPEED);                     // Line Speed for the side that made the Big Hit
    return;
  }
  releaseTo(att, s.x, s.y, 'ruck', s.picker);
  if (s.dom) surge(def, LINE_SPEED);
}
// a Drop Goal press: the 0.20s to the close-up is the kicker's, and a man close enough to stop it is judged as a charger in the cut
const dropHolding = c => !!c && !!M.dropArmed[c.team] && !!sideOf(c.team).charging && M.ball.carrier === c;
function tackleChecks(c) {
  if (dropHolding(c) || c.grace > 0) return false;
  if (practice && practice.tagOnly) return drillTagCheck(c);   // the youngest play these drills with tags: no man here ever commits to a tackle
  for (const q of M.players) {
    if (q.team === c.team || q.down > 0 || q.tcd > 0 || q.offside > 0 || q.bind) continue;
    const user = ringed(q);
    if (dist(q,c) < (user ? 1.35 : 1.5)) { commitTackle(q, c, user ? 'contact' : 'ai'); return true; }   // the first man to commit takes him; nobody else rolls while he is bound
  }
  return false;
}
function collide() {                                       // standing men push apart; a man on the ground, or one bound in a tackle, is stepped round; team-mates stop jostling
  const P = M.players, R = 1.25, RD = CONTACT.downR;
  for (let i = 0; i < P.length; i++) {
    const a = P[i];
    for (let j = i+1; j < P.length; j++) {
      const c = P[j];
      if (a.bind && a.bind === c.bind) continue;             // the men in one bind hold each other: bindMove owns them
      const ad = a.down > 0 || !!a.bind, cd = c.down > 0 || !!c.bind;   // a bound man stays put like a man on the ground, and everyone else steps round him
      if (ad && cd) continue;
      const dx = c.x-a.x, dy = c.y-a.y, d2 = dx*dx + dy*dy, r = (ad || cd) ? RD : R;
      if (d2 >= r*r) continue;
      const d = Math.sqrt(d2), o = Math.min(r - d, (ad || cd) ? 0.2 : 0.4), nx = d > 1e-3 ? dx/d : 1, ny = d > 1e-3 ? dy/d : 0;   // eased out by at most 0.2m a step round a man on the ground or bound (one getting up inside a crowd is not shoved), 0.4m between standing men so they never sink into each other; an exact overlap is parted along the touchline axis rather than left
      if (ad) { c.x += nx*o; c.y += ny*o; }
      else if (cd) { a.x -= nx*o; a.y -= ny*o; }
      else {
        a.x -= nx*o/2; a.y -= ny*o/2; c.x += nx*o/2; c.y += ny*o/2;
        const rv = (c.vx - a.vx)*nx + (c.vy - a.vy)*ny;
        if (rv < 0 && a.team === c.team) { a.vx += nx*rv/2; a.vy += ny*rv/2; c.vx -= nx*rv/2; c.vy -= ny*rv/2; }   // opponents are not damped: a shadowing defender must not become a wall
      }
    }
  }
}

/* ---------- Sprint ----------
   One meter a side, M.spr[t]. Holding Sprint lifts the controlled man's top speed and drains the meter over SPRINT.secs; letting
   go refills it over SPRINT.refill[level]. A sprint needs SPRINT.floor to start, and a hold that runs the meter dry must be let go
   before the next. The AI side runs the same meter, as often as its level's policy says, for a chaser or its carrier. */
const sprintLevel = p => p.sprint > 0 ? Math.min(1, p.sprint/SPRINT.fade) : 0;   // p.sprint is the burst in seconds of SPRINT.fade: full while held, easing out over SPRINT.fade after a release, climbing back from where it is if he is held again inside that
function sprintable(p) { return !!p && M.phase === 'play' && onFeet(p) && !(p.offside > 0); }
function stopSprint(S) { const p = S.p; if (!p) return; p.sprinting = false; S.p = null; }   // the ease-out runs on from his level now, and sprintTick charges it to the meter
function endSprint(p) { const S = M.spr[p.team]; if (S.p === p) stopSprint(S); p.sprint = 0; }   // a commit or a bind ends the sprint outright: no ease-out to pay for
function startSprint(S, p) {
  const fresh = !(p.sprint > 0);                           // inside his own ease-out the burst climbs back at the fade's rate: a re-press never snaps to full speed
  S.p = p; p.sprinting = true; if (fresh) p.sprint = SPRINT.fade;
  st(isHuman(p.team) ? 'sprints' : 'cpuSprints');
  if (isHuman(p.team) && fresh) { sfx('whoosh'); buzz(15, p.team); }
}
function bestChaser(team) {                                // the nearest man of this side on his feet to the other side's carrier
  const b = M.ball, c = b.state === 'held' ? b.carrier : null; if (!c || c.team === team) return null;
  let best = null, bd = 1e9;
  for (const p of M.players) if (p.team === team && onFeet(p) && !(p.offside > 0)) { const d = dist(p, c); if (d < bd) { bd = d; best = p; } }
  return best;
}
function sprintPick(t) {                                   // the man a Sprint press would move the ring to: the best chaser when yours is down or another is over SPRINT.pick nearer their carrier; null to stay put
  if (practice && practice.id === 'defend' && ctrlOf(t) !== practice.initialCtrl) return null;   // Defend a Breakaway: once you have switched into cover, Sprint never hands the ring back to the beaten man
  const b = M.ball, p = ctrlOf(t), c = b.state === 'held' && b.carrier.team !== t ? b.carrier : null, best = c ? bestChaser(t) : null;
  return c && best && best !== p && (!p || !onFeet(p) || dist(p, c) - dist(best, c) > SPRINT.pick) ? best : null;
}
function sprintOn(t) {                                     // would a Sprint press act now: the meter over the floor (or a sprint running), not latched, and the man it would go to able to sprint
  const S = M.spr[t];
  return M.phase === 'play' && !S.spent && (!!S.p || S.m >= SPRINT.floor) && sprintable(sprintPick(t) || ctrlOf(t));
}
function sprintPress(t) {                                  // the press edge: a dim button does nothing, not even a switch; otherwise the ring moves to the man who can chase and the hold will act
  if (!isHuman(t) || !sprintOn(t)) return false;
  const best = sprintPick(t);
  if (best) { setCtrl(t, best); st('sprintPick'); }
  return true;
}
function gapAhead(c) { const d = dirOf(c.team); let m = 99; for (const q of M.players) if (q.team !== c.team && onFeet(q) && (q.x - c.x)*d > -1) m = Math.min(m, dist(q, c)); return m; }
function ahead(c, t) { const d = dirOf(c.team); let n = 0; for (const q of M.players) if (q.team === t && q.down <= 0 && (q.x - c.x)*d > 0 && Math.abs(q.y - c.y) < SPRINT.cpu.lane) n++; return n; }   // defenders of side t still ahead of the carrier, in his lane
function cleanThrough(c, t) { return ahead(c, t) === 0; }
function cpuSprintWant(t, S, dt) {                         // the AI side's policy: who should be sprinting on its meter this step, if anyone
  if (S.spent) { S.spent = false; return null; }
  const b = M.ball; if (b.state !== 'held') return null;
  const c = b.carrier, d = dirOf(c.team), P = SPRINT.cpu, lv = levelOf(t);
  const think = p => { S.think -= dt; if (S.think > 0) return false; S.think = P.think; return rnd() < p; };
  if (c.team === t) {                                      // carrying: a burst into a clean break, kept while the space lasts
    if (c.drop) return null;
    const gap = gapAhead(c);
    if (S.p === c) return gap > P.keep ? c : null;
    if (!P.carry[lv] || gap < P.space || ahead(c, 1 - t) > P.carryLast[lv]) return null;
    return think(P.carry[lv]) ? c : null;
  }
  if (S.p) { const q = S.p, dd = dist(q, c); return (q.team === t && dd > 1.5 && dd < P.max + 3 && (q.x - c.x)*d <= 1.5) ? q : null; }
  const q = bestChaser(t); if (!q) return null;
  const dd = dist(q, c);
  if (dd < P.min || dd > P.max || (q.x - c.x)*d > 1) return null;   // chasing from level or behind
  if (ahead(c, t) > P.chaseLast[lv]) return null;          // only a runner who is through (or past all but the last man, on Hard): the sprint is the last line, not every chase
  return think(P.chase[lv]) ? q : null;
}
function sprintWant(t, dt) {
  const S = M.spr[t];
  if (isHuman(t) && !inputOf(t).cDown) S.spent = false;   // letting go clears the spent latch whatever the phase: a release during a ruck counts
  if (M.phase !== 'play') return null;
  if (!isHuman(t)) return cpuSprintWant(t, S, dt);
  return S.spent || !inputOf(t).cDown ? null : ctrlOf(t);
}
function sprintTick(dt) {                                  // after the close-up return in update(), so the meters freeze in scrums, lineouts, duels and goal kicks
  for (let t = 0; t < 2; t++) {
    const S = M.spr[t], want = sprintWant(t, dt), c = M.ball.carrier;
    if (S.p && (S.p !== want || !sprintable(S.p))) stopSprint(S);
    if (want && !S.p && S.m >= SPRINT.floor && sprintable(want)) startSprint(S, want);
    let drain = 0;                                         // the hold and every ease-out on this side are charged by their level, x1.5 with the ball: a tap buys no more than a hold, and nothing refills while a burst is easing out
    for (const p of M.players) if (p.team === t && p.sprint > 0) {
      if (!onFeet(p)) { p.sprint = 0; continue; }           // down or bound: the sprint is over, and nothing is charged for an ease-out that can't move him
      drain += sprintLevel(p)*(c === p ? SPRINT.ballDrain : 1)*(M.career ? careerSprintDrain(p) : 1);   // a career match: your player's stamina
    }
    if (drain > 0) {
      S.m -= dt/(SPRINT.secs*staminaLasts(t))*drain; if (S.p) st(isHuman(t) ? 'sprintSecs' : 'cpuSprintSecs', dt);
      if (S.m <= 0) { S.m = 0; if (S.p) { S.spent = true; stopSprint(S); } for (const p of M.players) if (p.team === t) p.sprint = 0; }   // dry: the burst and any ease-out end at once
    }
    else if (S.m < 1) { S.m = Math.min(1, S.m + dt/SPRINT.refill[levelOf(t)]); if (S.m >= 1) { S.cue = 0.5; if (isHuman(t) && M.dclock - S.tick > 3) { S.tick = M.dclock; sfx('tick'); } } }
    if (S.cue > 0) S.cue -= dt;
  }
}
function carrierChecks(c) {
  const d = dirOf(c.team);
  if (c.y < 0 || c.y > 70) {
    placeBall(c.x, clamp(c.y,0,70)); sfx('whistle');
    deadBall(() => lineout(1-c.team, c.x, c.y, 'Into Touch'));
    return true;
  }
  if ((c.x-oppLine(c.team))*d >= 0.3) { scoreTry(c); return true; }
  if (c.team === 0 ? c.x < 0 : c.x > 120) {
    placeBall(c.x, c.y);
    deadBall(() => scrum(1-c.team, c.x, c.y, 'Dead Ball'));
    return true;
  }
  return false;
}

/* ---------- penalties and goal kicks ---------- */
function penalty(team, x, y) {
  M.stats.pens++;
  sfx('whistle');
  placeBall(x, y);
  M.poss = team;
  startSet({ kind:'penalty', team, x, y, t:1.1, snap:true, label:'Penalty ' + M.nat[team].id, then:s => {
    const dP = hyp(oppLine(s.team)-s.x, s.y-35);
    if (isHuman(s.team)) openPenalty(s.team, s.x, s.y, dP);
    else cpuPenalty(s.team, s.x, s.y, dP);
  }});
}
const penSpot = (team, x) => team === 0 ? Math.min(x, 110 - KICK.penMin) : Math.max(x, 10 + KICK.penMin);   // a kick at goal is taken at least 10m out
function cpuPenalty(team, x, y, dP) {
  if (dP < 40 && Math.abs(y-35) < 28) {
    const g = makeGoal(team, penSpot(team, x), y, 'penalty', null);
    if (g.mClear <= KICK.range) return penChoice(team, x, y, 'goal', g);   // the g checked is the g kicked
  }
  const fromOwn = (x-ownLine(team))*dirOf(team);
  if (fromOwn < 75 || rnd() < 0.6) return penChoice(team, x, y, 'touch');
  return penChoice(team, x, y, 'tap');
}
function penChoice(team, x, y, c, g) {
  M.phase = 'play';
  if (c === 'goal') goalKick(team, penSpot(team, x), y, 'penalty', g);
  else if (c === 'touch') {
    const nx = clamp(x + dirOf(team)*(20 + M.nat[team].kicking*3), 15, 105);
    sfx('kick');
    lineout(team, nx, y, 'Kick to Touch');   // after the hooter too: the kicking side gets its lineout
  } else startSet({ kind:'tap', team, x, y, t:0.8, snap:true, label:'Tap and Go', then:s => releaseTo(s.team, s.x, s.y, 'tap') });
}
function scoreTry(p) {
  if (practice) { practiceTry(p); return; }
  const team = p.team;
  M.score[team] += 5; M.tries[team]++;
  if (M.career) careerDeed('tries', p);                    // a career match: a try by your player
  heat(team, 'try'); fireOut(1 - team);                    // a try lights the scorers and puts the other side out
  goldenScored();
  placeBall(clamp(p.x,0,120), clamp(p.y,0,70));
  p.vx *= 0.3; p.vy *= 0.3;
  say(M.golden ? 'Golden Try' : 'Try', 'big', team); sfx('whistle'); sfx('roar'); buzz(60);
  startSet({ kind:'try', team, x:p.x, y:clamp(p.y,1,69), t:1.9, then:s => M.golden ? endHalf() : conversion(s.team, s.y) });   // a Golden Try needs no conversion
}
function conversion(team, y) {
  const yy = clamp(y, 4, 66);
  goalKick(team, oppLine(team) - dirOf(team)*(11 + Math.abs(yy-35)*0.2), yy, 'conversion');
}
function goalKick(team, x, y, kind, g0) {
  placeBall(x, y);
  const d = dirOf(team);
  const k = (M.career && careerKicker(team)) || nearestFree(team, x, y) || M.players.find(p => p.team === team);   // a career match: your player takes your side's goal kicks
  k.x = x - d*2.2; k.y = y; k.vx = k.vy = 0; k.fx = d; k.fy = 0;
  for (const p of M.players) if (p !== k && hyp(p.x-x, p.y-y) < 5) { p.x -= d*6; }
  const g = g0 || makeGoal(team, x, y, kind, k);
  g.kicker = k;
  M.goal = g; M.stats.gk.att[team]++;
  if (kind === 'conversion') M.stats.conv.att[team]++; else if (kind === 'penalty') M.stats.pen.att[team]++;
  if (isHuman(team)) { g.inp = inputOf(team); startGoalCut(g); return; }
  strikeGoal(g, g.cpu.m, g.cpu.aim);                 // fixed now, so skipping the close-up can't change it
  if (interactive()) { g.watch = true; g.stage = 'settle'; startGoalCut(g); return; }
  M.phase = 'goal'; g.stage = 'fly'; g.t = 0;
  sfx('kick');
}
/* The instant flight: headless, AI v AI and the menu demo. The top-down ball follows the same closed form. */
function updateGoal(dt) {
  const g = M.goal, b = M.ball, X = g.X;
  g.t += dt;
  const end = X.land ? X.t : X.t + 0.4;
  const tt = !g.judged && g.t >= X.t ? X.t : Math.min(g.t, end);
  const p = posAt(g.L, tt), w = toWorld(g.team, p.x, p.y), v = frameVec(g.team, velAt(g.L, tt));
  b.x = w.x; b.y = w.y; b.z = Math.max(0, p.h); b.vx = v.x; b.vy = v.y;
  if (!g.judged && g.t >= X.t) scoreGoal(g);
  else if (g.t >= end) settleGoal(g);
}

/* ---------- the kick frame ----------
   Every kick at goal is computed as if the kicker attacks +x at posts on
   x = 110, uprights at y = 32.2 and 37.8. Team 1 is mirrored into it, so the
   CPU shares the code path, and left and right are always the kicker's. */
const toFrame = (team, x, y) => team ? { x:120 - x, y:70 - y } : { x, y };
const toWorld = toFrame;                                   // its own inverse
const frameVec = (team, v) => team ? { x:-v.x, y:-v.y } : v;
function makeWind() {
  const w = KICK.wind, r = rnd();
  let acc = 0, i = 0;
  while (i < w.mix.length - 1 && r >= (acc += w.mix[i][0])) i++;
  const [, lo, hi] = w.mix[i];
  const mph = lo + rnd()*(hi - lo);
  return { a:rnd()*2*Math.PI, mph };                       // a: the world direction it blows toward
}
function kickWind(team) {                                  // drawn once per kick: what you read is what the ball gets
  const w = KICK.wind, mw = M.wind;
  const mph = clamp(mw.mph*(1 + w.gust*gauss()), 0, w.max), a = mw.a + w.swing*D2R*gauss();
  if (mph < w.calm) return { x:0, y:0, mph:0 };
  const v = frameVec(team, { x:mph*MPH*Math.cos(a), y:mph*MPH*Math.sin(a) });
  return { x:v.x, y:v.y, mph };
}
function windNow(team) {                                   // the match wind as it stands, ungusted and in the frame: what the drop label and the CPU's trigger read, with no random draw
  const mw = M.wind;
  if (mw.mph < KICK.wind.calm) return CALM;
  const v = frameVec(team, { x:mw.mph*MPH*Math.cos(mw.a), y:mw.mph*MPH*Math.sin(mw.a) });
  return { x:v.x, y:v.y, mph:mw.mph };
}
function goalOf(team, wx, wy, kind, kicker, W) {          // a kick's geometry and band in the given wind, drawing nothing random
  const f = toFrame(team, wx, wy);
  const g = { team, kind, type:kind === 'drop' ? 'drop' : 'set', wx, wy, x:f.x, y:f.y, beta:Math.atan2(35 - f.y, 110 - f.x), dist:hyp(110 - f.x, 35 - f.y), ang:Math.abs(f.y - 35)/35,
    kicking:(M.career ? careerGoalNat(team, kicker, kind) : M.nat[team]).kicking, di:isHuman(team) ? levelOf(team) : 1, kicker, W:{ x:W.x, y:W.y, mph:W.mph },
    mClear:0, lo:0, hi:0, w:0, ctr:0, fill:1, aid:'line', watch:false, cpu:null, inp:null,   // inp: the kicker's input slot, for a human's kick
    stage:'aim', st:0, aim:0, m:0, pt:0, drain:0, mRel:null, L:null, X:null, res:null, ok:false, grade:null, curl:0,
    tStrike:0, judged:false, skipped:false, t:0, cam:null, pathKey:null, pathPts:null, bot:null,
    rush:null, out:null, outQ:null, started:false, tRel:0, hitT:0, tauStop:0 };   // drop goals: the chargers, and how one ended
  return bandOf(g);
}
function makeGoal(team, wx, wy, kind, kicker) {
  const g = goalOf(team, wx, wy, kind, kicker, kickWind(team));
  if (!isHuman(team)) g.cpu = cpuKickInputs(g);
  else {
    g.aid = (levelOf(team) === 0 || (M.two ? sideOf(team).kickFirst : !tutSeen(kind === 'drop' ? 'drop' : 'goal'))) ? 'path' : 'line';   // the first kick ever (the tutorial's goal or drop moment unseen) gets the Easy aids; in two player each player's first kick of the match does
    if (g.aid === 'path') { g.aim = aimFor(g, g.ctr); bandOf(g, g.aim); g.aim = aimFor(g, g.ctr); }   // a wide kick aimed off is a longer kick
  }
  return g;
}
/* dv/dt = A - kd v integrates exactly: no integrator, no frame-rate dependence. */
function posAt(L, t) {
  const k = KICK.kd, e = Math.exp(-k*t), f = (1 - e)/k, A = L.A, v = L.v0, p = L.p0;
  return { x:p.x + A.x/k*t + (v.x - A.x/k)*f, y:p.y + A.y/k*t + (v.y - A.y/k)*f, h:p.h + A.h/k*t + (v.h - A.h/k)*f };
}
function velAt(L, t) {
  const k = KICK.kd, e = Math.exp(-k*t), A = L.A, v = L.v0;
  return { x:A.x/k + (v.x - A.x/k)*e, y:A.y/k + (v.y - A.y/k)*e, h:A.h/k + (v.h - A.h/k)*e };
}
function launchOf(g, m, aim, curl) {
  const k = KICK, V = (k.v0 + k.vK*g.kicking)*(k.vLo + (1 - k.vLo)*m), th = k.elev[g.type]*D2R;
  const psi = clamp(g.beta + clamp(aim, -k.aimMax*D2R, k.aimMax*D2R), -85*D2R, 85*D2R);
  const c = curl == null ? curlOf(g, m) : curl, rx = -Math.sin(psi), ry = Math.cos(psi);
  return { p0:{ x:g.x, y:g.y, h:k.h0 }, v0:{ x:V*Math.cos(th)*Math.cos(psi), y:V*Math.cos(th)*Math.sin(psi), h:V*Math.sin(th) },
    A:{ x:k.kw*g.W.x + c*rx, y:k.kw*g.W.y + c*ry, h:-k.g } };
}
function bisectT(L, a, b, hit) { for (let i = 0; i < 30; i++) { const m = (a + b)/2; if (hit(posAt(L, m))) b = m; else a = m; } return b; }
const hitLine = p => p.x >= 110, hitGround = p => p.h <= 0;
function crossOf(L) {                                      // where the ball crosses the goal line, or lands first
  const dt = 0.02;
  let t0 = 0;
  for (let t = dt; t < 8; t += dt) {
    const p = posAt(L, t), tx = p.x >= 110 ? bisectT(L, t0, t, hitLine) : 9, tl = p.h <= 0 ? bisectT(L, t0, t, hitGround) : 9;
    if (tx < 9 || tl < 9) { const land = tl <= tx, tc = land ? tl : tx, q = posAt(L, tc); return { t:tc, x:q.x, y:q.y, h:Math.max(0, q.h), land }; }
    t0 = t;
  }
  const q = posAt(L, 8); return { t:8, x:q.x, y:q.y, h:0, land:true };
}
/* From the kicker's view. R is the ball's allowance around each upright. */
function judgeCross(X) {
  const { R, bar, upL, upR, upH } = KICK, y = X.y, h = X.h;
  if (X.land) return 'short';
  if (h > upH) return (y > upL && y < upR) ? 'goal' : (y <= upL ? 'wideL' : 'wideR');
  if (Math.abs(y - upL) <= R || Math.abs(y - upR) <= R) return (h >= bar && y > upL && y < upR) ? 'postIn' : 'post';   // a hit below the bar can't score
  if (y < upL) return 'wideL';
  if (y > upR) return 'wideR';
  if (h >= bar + R) return 'goal';
  if (h >= bar) return 'barIn';
  if (h >= bar - R) return 'bar';
  return 'short';
}
const scores = r => r === 'goal' || r === 'postIn' || r === 'barIn';
function curlOf(g, m) {
  const rho = 1 - KICK.curlK*(g.kicking - 3);
  return m > g.hi ? -KICK.hook*rho*(m - g.hi)/0.1 : m < g.lo ? KICK.push*rho*(g.lo - m)/0.1 : 0;   // over hooks left, under fades right
}
function clearPower(g, aim) {                              // the lowest m whose curl-free flight at this aim clears the bar by 0.3m
  aim = aim || 0;
  const ok = m => { const X = crossOf(launchOf(g, m, aim, 0)); return !X.land && X.h >= KICK.bar + KICK.clear; };
  if (!ok(1)) return 1.05;
  let a = 0, b = 1;
  for (let i = 0; i < 22; i++) { const m = (a + b)/2; if (ok(m)) b = m; else a = m; }
  return b;
}
function aimFor(g, m) {                                    // the aim that sends a curl-free strike at m through y = 35 in this wind
  let a = -0.6, b = 0.6;
  for (let i = 0; i < 30; i++) { const mid = (a + b)/2; if (crossOf(launchOf(g, m, mid, 0)).y < 35) a = mid; else b = mid; }
  return (a + b)/2;
}
function bandOf(g, aim) {                                  // at aim 0, except the Easy path's band, which is honest for the arrow it hands you
  const k = KICK, di = g.di, kk = g.kicking - 3;
  const w0 = clamp(k.band[di] - k.bandD*(g.dist - 12) - k.bandA*g.ang + k.bandK*kk, k.bandMin + k.minK*kk, k.bandMax);
  g.w = g.type === 'drop' ? w0*k.dropBand : w0;
  g.mClear = clearPower(g, aim);
  g.ctr = Math.min(Math.max(g.mClear + k.lift + k.liftW*g.w, k.floor), k.ceil);   // the floor makes short kicks fly like real ones
  g.lo = g.ctr - g.w/2; g.hi = g.ctr + g.w/2;
  g.fill = (g.type === 'drop' ? k.dropFill : k.fill)[di]/(1 + (g.dist - 12)*k.fillD);
  if (M && M.kids && isHuman(g.team)) kidsBand(g);        // Kids: a wider band and a slower meter
  return g;
}
function strikeGoal(g, m, aim) {                           // draws no random numbers: the result is known at the release
  g.m = m; g.aim = aim; g.curl = curlOf(g, m);
  g.L = launchOf(g, m, aim, g.curl);
  g.X = crossOf(g.L);
  g.res = judgeCross(g.X);
  g.ok = scores(g.res);
  g.grade = gradeOf(g);
  return g;
}
function gradeOf(g) {
  if (g.ok) return g.res === 'postIn' ? 'Off the Post' : g.res === 'barIn' ? 'Off the Bar' : (g.m >= g.lo && g.m <= g.hi ? 'Pure Strike' : null);
  if (g.m > g.hi) return 'Overcooked';
  if (g.m < g.lo) return 'Under-Hit';
  if (scores(judgeCross(crossOf(launchOf({ ...g, W:{ x:0, y:0, mph:0 } }, g.m, g.aim, g.curl))))) return 'Wind';   // would have scored in still air
  return 'Pure Strike';
}
function verdictOf(g) {
  if (g.ok) return g.kind === 'conversion' ? 'Converted' : g.kind === 'penalty' ? 'Penalty Goal' : 'Drop Goal';
  return { wideL:'Wide Left', wideR:'Wide Right', short:'Short', post:'Off the Post', bar:'Off the Bar' }[g.res];
}
function cpuKickInputs(g) {                                // the CPU allows for about 90% of the wind, with some spread
  const k = KICK, di = cpuSide(g.team) ? levelOf(g.team) : 1;   // a CPU kicker's spread is its level's
  const aim = aimFor(g, g.ctr)*(k.cpuAim[0] + k.cpuAim[1]*gauss()) + k.cpuAimSd*D2R*gauss();
  const m = clamp(g.ctr + k.cpuSig[di]*gauss()/g.fill, 0, 1);
  return { m, aim };
}
function scoreGoal(g) {                                    // the verdict moment: points, banner, sound
  if (g.judged) return;
  g.judged = true;
  const { team, ok, kind } = g;
  if (ok) {
    M.score[team] += kind === 'conversion' ? 2 : 3; (kind === 'drop' ? M.stats.dg : M.stats.gk).made[team]++;
    if (kind === 'conversion') M.stats.conv.made[team]++; else if (kind === 'penalty') M.stats.pen.made[team]++;
    if (M.career) careerDeed('goals', g.kicker);            // a career match: a goal kicked by your player
    goldenScored();
  }
  say(verdictOf(g), '', ok ? team : null, g.grade, M.cut && M.cut.kind === 'goal' && verdictLow(g));
  if (g.res === 'post' || g.res === 'postIn' || g.res === 'bar' || g.res === 'barIn') { sfx('post'); buzz(40); }
  sfx(ok ? 'cheer' : 'groan');
  if (ok && kind === 'drop') sfx('roar');
}
function verdictLow(g) {                                   // the banner goes under the bar when the ball is up at the posts at the verdict, and up top when it has dropped short
  const cam = kickCam(g), p = ballAt(g, g.X.t);
  return kickView(g, cam, g.X.t, p.x, p.y, p.h).sy < 0.55*V.H;
}
function settleGoal(g) {
  if (practice && practiceGoal(g)) return;
  const w = toWorld(g.team, g.X.x, g.X.y), x = clamp(w.x, 0, 120), y = clamp(w.y, 0, 70);
  placeBall(x, y);
  const { team, ok, kind } = g;
  startSet({ kind:'score', team, x, y, t:M.phase === 'goal' ? 1.0 : 0.6, then:() => deadBall(() => (kind === 'penalty' && !ok) ? dropOut(1-team) : kickoff(1-team)) });
}
/* ---------- the close-up ---------- */
function startGoalCut(g) {
  for (const inp of humanSlots()) { inp.pre = null; inp.reanchor(); inp.held = new Set(inp.keys); }   // every human slot: touch re-centred, a pad stick latched, held keys ignored
  startCut({ kind:'goal', g, inp:g.inp, armA:null, skipAt:1e9 });   // c.inp: the kicker's slot, the only one that acts (null for a CPU kick)
  sfx('whoosh');
}
function updateGoalCut(c, dt) {
  const g = c.g, t = c.t;
  g.t = t;
  if (t < CUT_IN) { for (const inp of humanSlots()) inp.reanchor(); return; }
  if (g.watch) return watchStep(c, dt);
  const inp = c.inp;
  if (c.armA == null) c.armA = !inp.aDown;                 // a finger already down must lift first
  if (!inp.aDown) c.armA = true;
  if (g.type === 'drop') return dropStep(c, dt);
  if (g.stage === 'aim') {
    if (g.drain > 0) { g.drain = Math.max(0, g.drain - dt); g.m = g.mRel*g.drain/0.2; }
    steerAim(g, dt, inp);
    if (inp.aPressed && c.armA) { g.stage = 'power'; g.pt = 0; g.m = 0; g.drain = 0; g.mRel = null; }
  } else if (g.stage === 'power') {
    g.pt += dt; g.m = Math.min(1, g.pt/g.fill);
    if (inp.aCancel || (!inp.aDown && g.m < KICK.tap)) backToAim(g);
    else if (!inp.aDown) { strikeGoal(g, kidsStrike(g, g.m), g.aim); g.mRel = g.m; g.stage = 'runup'; g.st = 0; }
  } else if (g.stage === 'runup') {
    if ((g.st += dt) >= KICK.runup) strikeNow(c);
  } else if (g.stage === 'flight' && !g.judged && t - g.tStrike - KICK.hitStop >= g.X.t) verdict(c, 1.5);
}
function strikeNow(c) {                                    // the boot meets the ball. In two player a player's first strike of the match ends his first-kick aid (one player's is the tutorial's memory, marked at the cut-in)
  const g = c.g; g.stage = 'flight'; g.tStrike = c.t; sfx('strike'); buzz(25);
  if (g.watch || !isHuman(g.team)) return;
  if (M.two) sideOf(g.team).kickFirst = false;
}
function watchStep(c, dt) {                                // the CPU's kick: settle, run-up, flight; Skip jumps to the verdict
  const g = c.g, t = c.t;
  if (t >= 0.3 && !g.judged && humanSlots().some(i => i.aPressed || i.bPressed)) {   // Skip, from any seat
    g.skipped = true; g.stage = 'flight'; g.tStrike = t - KICK.hitStop - g.X.t;   // the ball is drawn at the crossing
    verdict(c, 0.6);
    return;
  }
  if (g.stage === 'settle') { if (t >= CUT_IN + 0.6) { g.stage = 'runup'; g.st = 0; } }
  else if (g.stage === 'runup') { if ((g.st += dt) >= KICK.runup) strikeNow(c); }
  else if (g.stage === 'flight' && !g.judged && t - g.tStrike - KICK.hitStop >= g.X.t) verdict(c, 1.5);
}
function steerAim(g, dt, inp) {
  if (M.kids && isHuman(g.team)) return;                   // Kids: the aim the path shows is set for you
  const k = KICK;
  const jx = inp.jx, kx = inp.keyX();                      // the d-pad aims at the keyboard's rate too
  const rate = jx ? k.aimRate*Math.sign(jx)*Math.pow(Math.abs(jx), 1.6) : k.keyRate*kx;
  if (!rate) return;
  const lim = 85*D2R;
  g.aim = clamp(clamp(g.aim + rate*D2R*dt, -k.aimMax*D2R, k.aimMax*D2R), -lim - g.beta, lim - g.beta);
}
function backToAim(g) { g.stage = 'aim'; g.mRel = g.m; g.drain = 0.2; g.pt = 0; }   // the meter drains over 0.2s
function verdict(c, hold) { const g = c.g; scoreGoal(g); c.skipAt = c.t + 0.25; finishCut(() => g.type === 'drop' ? applyDrop(c) : settleGoal(g), hold); }
function goalResume(c) {                                   // back to Aim with the meter empty; a fresh press is needed. A drop goes back to Wait, with the chargers where the cut began
  const g = c.g;
  if (g.type === 'drop') { if (!g.out && (g.stage === 'hold' || g.stage === 'wait')) { g.stage = 'wait'; g.m = 0; g.pt = 0; g.started = true; c.t = CUT_IN; } }
  else if (!g.watch && (g.stage === 'aim' || g.stage === 'power')) { g.stage = 'aim'; g.m = 0; g.pt = 0; g.drain = 0; g.mRel = null; }
  c.armA = false;
  for (const inp of humanSlots()) { inp.aDown = inp.bDown = false; inp.reanchor(); inp.held = new Set(); }
}
function goalLabels(c) {
  const g = c.g;
  if (g.watch) return ['Skip', null, false, false];
  if (g.type === 'drop') return [null, 'Kick', false, g.stage === 'wait' && !c.after && !g.out];
  return ['Kick', null, g.stage === 'aim' && !c.after, false];
}
function dropGoal(team, quiet) {                           // quiet: the close-up has already shown the verdict and added the points
  if (!quiet) { M.score[team] += 3; say('Drop Goal', 'big', team); sfx('roar'); goldenScored(); }
  placeBall(M.ball.x, M.ball.y);
  startSet({ kind:'score', team, x:M.ball.x, y:M.ball.y, t:quiet ? 0.6 : 1.6, then:() => deadBall(() => kickoff(1-team)) });
}

/* ---------- drop goals ----------
   In range, the small button reads Drop Goal: a tap is still a chip, a 0.20s
   hold freezes play and cuts to the goal-kick shot with the thumb still down.
   The meter fills while B is held, the stick steers, and the nearest three
   defenders charge at the lens. The label is geometry alone (2026-10-17): the
   kick is offered whenever it is viable, in range (a calm pure strike reaches
   the bar) and at a bearing that can go between the posts, judged on the world
   as the hold will leave it, whatever the chargers are doing. They still run
   at him in the close-up, and one rule, blockedBy, decides whether the kick
   gets away: pressure is the risk he takes. What the label says at the press
   is what the press gives: a Drop Goal press opens the close-up at 0.20s
   whatever has moved since, and a Kick press stays a kick. The CPU's own drop
   decisions (cpuDropOffer) still weigh the chargers, in the top-down view. */
const DZ_ON = { ok:true }, DZ_OFF = { ok:false };
const holdSteps = () => Math.ceil(KICK.hold/STEP - 1e-9);     // the B press opens the cut on this step, the press step counted as the first: the one count the trigger and the label's projection share
const holdLead = () => (holdSteps() - 1)*STEP;               // how long the world runs between the B press and the freeze: the step that opens the cut does not move it
function dropZone(c) {                                     // is this carrier offered a drop goal right now? Rules 1 and 3 where he stands; range and bearing where the hold will leave him
  const t = c.team, inp = inputOf(t), b = M.ball, k = KICK;
  const off = () => { M.dropOn[t] = false; return DZ_OFF; };
  if (!inp || c !== ctrlOf(t) || b.state !== 'held' || b.carrier !== c || M.phase !== 'play' || M.cut || c.hold < 0.3 || c.bind) return off();
  const j = frameVec(t, inp.world());
  if (Math.abs(j.y) > 0.55 || j.x < -0.3) return off();   // pointing at touch, or back: the button is today's kick
  const proj = projectHold(c, holdLead()), f = toFrame(t, proj.x, proj.y), D = hyp(110 - f.x, 35 - f.y);
  if (f.x < 70 || f.x > 104 || D > 42 || Math.abs(Math.atan2(35 - f.y, 110 - f.x)) > 40*D2R) return off();
  const g = goalOf(t, proj.x, proj.y, 'drop', c, CALM);
  const on = g.mClear <= k.range;                          // in range: a calm pure strike reaches the bar
  if (on) M.dropSeen[t] = new Set(rushersOf(c, g, proj).map(r => r.q));   // the chargers as the hold will leave them: the cut takes the ones behind him from this set, not from where the hold really left them
  M.dropOn[t] = on;
  return on ? DZ_ON : DZ_OFF;
}
// at the B press the label decides: if it read Drop Goal on the last frame, a thumb leaving the stick on this one doesn't take it away. The
// cut then judges the chargers that label saw, so a chaser who crosses into the shoulder radius during the hold stays out of it
function dropPress(c) {
  const t = c.team, on = M.dropOn[t] || dropZone(c).ok;
  M.dropSet[t] = on ? M.dropSeen[t] : null;
  return on;
}
function kickLabel(t) {                                    // the small button with the ball in hand, for the human on side t: what this press will do. Through a hold it stays what the press promised
  const c = ctrlOf(t);
  if (!c) return 'Kick';
  if (sideOf(t).charging && M.ball.carrier === c) return M.dropArmed[t] ? 'Drop Goal' : 'Kick';
  return dropZone(c).ok ? 'Drop Goal' : 'Kick';
}
// the world `lead` seconds on, run the way the hold will run it: the real step for everyone (the kicker on his stick, a CPU kicker checking
// his run as the wind-up does, the AI's chasers and the defensive line as computeTargets drives them, collisions included), then everyone put back.
// Nothing random is drawn. Returns the kick spot and every standing opponent's projected spot and velocity, all in the world.
const HOLD_KEYS = ['x', 'y', 'vx', 'vy', 'fx', 'fy', 'down', 'tcd', 'side', 'hold', 'boost', 'offside', 'sprint', 'stumble', 'wf', 'bite'];   // what moveAll touches
function projectHold(c, lead) {
  const t = c.team, n = Math.max(0, Math.round(lead/STEP)), dt = n ? lead/n : 0, P = M.players;
  const saved = P.map(p => HOLD_KEYS.map(k => p[k])), steps0 = M.stats.steps, drop0 = c.drop;
  if (!isHuman(t) && !c.drop) c.drop = { t:1e9, g:null };   // a CPU kicker brakes through the wind-up, and never strikes inside the projection
  for (let i = 0; i < n; i++) moveAll(dt);
  const out = { x:c.x, y:c.y, vx:c.vx, vy:c.vy, opps:P.filter(q => q.team !== t && q.down <= 0).map(q => ({ q, x:q.x, y:q.y, vx:q.vx, vy:q.vy })) };
  P.forEach((p, i) => HOLD_KEYS.forEach((k, j) => { p[k] = saved[i][j]; }));
  M.stats.steps = steps0; c.drop = drop0;
  return out;
}
// the chargers: every standing opponent within 15m of the kick spot ahead of it or level, and behind it only within the shoulder radius (a man on the
// kicker's shoulder counts, a chaser deeper behind him does not, at the label and in the cut alike), the nearest three. Each is frozen where `proj` puts
// him (or where he really stands), with his speed toward the kicker and his top speed. g.x/g.y is the kick spot, in the frame.
function rushersOf(c, g, proj, only) {                     // only: behind the kick spot, judge these opponents and no others (the ones the label saw)
  const t = c.team, k = KICK, mul = isHuman(t) ? k.rushMul[levelOf(t)]*(M.kids ? KIDS.kick.rush : 1) : 1, out = [];   // a human's chargers run at the difficulty's pace; a CPU kicker faces real players
  const list = proj ? proj.opps : M.players.filter(q => q.team !== t && q.down <= 0).map(q => ({ q, x:q.x, y:q.y, vx:q.vx, vy:q.vy }));
  for (const o of list) {
    const f = toFrame(t, o.x, o.y), v = frameVec(t, { x:o.vx, y:o.vy });
    const dx = g.x - f.x, dy = g.y - f.y, d0 = hyp(dx, dy);
    if (d0 > (dx > 0 ? k.shoulder : k.rushR)) continue;   // dx > 0: he is behind the kick spot
    if (only && dx > 0 && !only.has(o.q)) continue;        // a chaser who crossed into the shoulder radius during the hold was not in the label's set
    const vmax = maxSpeed(o.q)*mul, ux = d0 > 1e-6 ? dx/d0 : 1, uy = d0 > 1e-6 ? dy/d0 : 0;
    out.push({ q:o.q, x:f.x, y:f.y, ux, uy, d0, v0:clamp(v.x*ux + v.y*uy, 0, vmax), vmax, a:k.rushAcc*vmax/8.35 });
  }
  out.sort((p, q) => p.d0 - q.d0);
  return out.slice(0, 3);
}
function rushRun(r, t) {                                   // metres covered t seconds after the chargers start: v = min(vmax, v0 + a t)
  if (t <= 0) return 0;
  const ta = (r.vmax - r.v0)/r.a;
  return t <= ta ? r.v0*t + 0.5*r.a*t*t : r.v0*ta + 0.5*r.a*ta*ta + r.vmax*(t - ta);
}
function rushAt(r, t) {                                    // where he is, closing straight at the kicker and stopping on him; d is his distance to the kicker
  const d = Math.max(0, r.d0 - rushRun(r, t)), s = r.d0 - d;
  return { x:r.x + r.ux*s, y:r.y + r.uy*s, d };
}
function rushWhen(r, d) {                                  // when he first comes within d of the kicker
  const s = r.d0 - d;
  if (s <= 0) return 0;
  const ta = (r.vmax - r.v0)/r.a, sa = r.v0*ta + 0.5*r.a*ta*ta;
  return s <= sa ? (Math.sqrt(r.v0*r.v0 + 2*r.a*s) - r.v0)/r.a : ta + (s - sa)/r.vmax;
}
// the one charging rule. A charger within 1.0m of the kicker before the strike blocks it (Smothered before the release, Charged Down
// after it); so does the ball passing within 0.9m of a charger, horizontally, while under 2.4m in its first 0.8s. tStrike is on the
// chargers' clock, which starts at the end of the cut-in. Returns null, or the earliest block.
function blockedBy(g, rushers, tStrike) {
  const k = KICK;
  let hit = null;
  for (const r of rushers) if (rushAt(r, tStrike).d <= k.block) { const at = rushWhen(r, k.block); if (!hit || at < hit.t) hit = { q:r.q, t:at, how:at < tStrike - k.dropT ? 'smothered' : 'charged' }; }
  if (hit || !g.L) return hit;
  for (let i = 0; i <= 80; i++) {
    const tau = i*0.01, p = posAt(g.L, tau);
    if (p.h <= 0) break;
    if (p.h > k.reach) continue;
    for (const r of rushers) { const a = rushAt(r, tStrike + tau); if (hyp(p.x - a.x, p.y - a.y) <= k.lat) return { q:r.q, t:tStrike + tau, how:'charged' }; }
  }
  return null;
}
function startDropCut(c) {                                 // the carrier has held B for 0.20s in range: freeze, and cut in with the thumb still down
  const t = c.team, g = makeGoal(t, c.x, c.y, 'drop', c);
  g.inp = inputOf(t);
  g.rush = rushersOf(c, g, null, M.dropSet[t]);           // the chargers as they really stand at the freeze; behind him, only the ones the label saw
  M.dropSet[t] = null;
  g.stage = 'hold';
  M.goal = g; M.stats.dg.att[t]++; M.dropArmed[t] = false;
  startGoalCut(g);
}
function dropStep(c, dt) {
  const g = c.g, k = KICK, t = c.t, inp = inputOf(g.team), tau = t - CUT_IN;   // tau: the chargers' clock
  if (g.out) return;
  if (!g.started) { g.started = true; g.pt = 0; g.m = 0; g.stage = inp.bDown ? 'hold' : 'wait'; }   // the press carries over the cut-in; a thumb that lifted needs a fresh press
  if (g.stage === 'hold' || g.stage === 'wait') {
    for (const r of g.rush) if (rushAt(r, tau).d <= k.block) return dropStop(c, 'smothered', r.q, 0);
    steerAim(g, dt, inp);
    if (g.stage === 'hold') {
      g.pt += dt; g.m = Math.min(1, g.pt/g.fill);
      if (inp.bCancel || (!inp.bDown && g.m < k.tap)) { g.stage = 'wait'; g.m = 0; g.pt = 0; }
      else if (!inp.bDown) { strikeGoal(g, kidsStrike(g, g.m), g.aim); g.mRel = g.m; g.tRel = tau; g.stage = 'drop'; g.st = 0; }
    } else if (inp.bPressed) { g.stage = 'hold'; g.pt = 0; g.m = 0; }
  } else if (g.stage === 'drop') {
    if ((g.st += dt) >= k.dropT) {                         // the half-volley: charging is checked now, with the strike on the chargers' clock
      const hit = blockedBy(g, g.rush, g.tRel + k.dropT);
      if (hit) dropStop(c, 'charged', hit.q, Math.max(0.02, hit.t - g.tRel - k.dropT));
      else strikeNow(c);
    }
  } else if (g.stage === 'flight') {
    const tf = t - g.tStrike - k.hitStop;
    if (g.X.land) { if (tf >= 0.6) finishCut(() => applyDrop(c), 0); }   // short: no banner, and the ball stays live in the air
    else if (!g.judged && tf >= g.X.t) verdict(c, 1.5);
  }
}
function dropStop(c, how, q, hitT) {                       // Smothered before the release, or Charged Down at the strike (hitT: how long the ball flew first)
  const g = c.g;
  g.out = how; g.outQ = q; g.judged = true; g.tauStop = c.t - CUT_IN;
  if (how === 'charged') { g.hitT = hitT; strikeNow(c); M.stats.dg.charged[g.team]++; }
  say(how === 'charged' ? 'Charged Down' : 'Smothered', '', 1 - g.team);
  sfx('tackle'); buzz(30);
  c.skipAt = c.t + 0.25;
  finishCut(() => applyDrop(c), 0.9);
}
// hand the drop back to the match: everyone stands where the freeze left them, except the charger
function applyDrop(c) {
  const g = c.g, team = g.team, kk = g.kicker, q = g.outQ, inp = inputOf(team);
  if (inp) inp.restore();
  if (g.out === 'smothered') { put(q, stopSpot(g, q, 0.5)); q.vx = q.vy = 0; countTk(q.team, true); tackle(kk, q); return; }
  if (g.out === 'charged') { chargeDownBy(kk, q, true, stopSpot(g, q, 1.2)); return; }
  const w = toWorld(team, g.X.x, g.X.y);
  if (g.ok) { placeBall(clamp(w.x, 0, 120), clamp(w.y, 0, 70)); dropGoal(team, true); return; }
  if (g.X.land) { kk.hold = 0; launchG3d(g, kk, Math.min(0.6, g.X.t)); return; }   // the flight the cut left 0.6s into
  if (g.res === 'post' || g.res === 'bar') { looseOffWood(g); return; }
  placeBall(clamp(w.x, 0, 120), clamp(w.y, 0, 70));
  deadBall(() => dropOut(1 - team));                       // wide, or under the bar and dead: their 22
}
function stopSpot(g, q, back) {                            // where the charger who stopped the kick lands: `back` metres from the kick spot on the side he came from, in the world
  const r = g.rush && g.rush.find(r => r.q === q), ux = r ? r.ux : -1, uy = r ? r.uy : 0;
  return toWorld(g.team, g.x - ux*back, g.y - uy*back);
}
function looseOffWood(g) {                                 // a post or bar miss: loose, 1m in front of the goal line, bouncing back into play
  const b = M.ball, X = g.X, w = toWorld(g.team, 109, X.y), v = frameVec(g.team, { x:-4, y:X.y < 35 ? -1 : 1 });
  b.state = 'loose'; b.carrier = null; b.f = null; b.last = g.team; b.kickInfo = { team:g.team, ownHalf:false };   // a kicked ball: no turnover for whoever gathers it
  b.x = w.x; b.y = w.y; b.z = Math.min(X.h, KICK.bar); b.vx = v.x; b.vy = v.y; b.vz = 2;
  M.phase = 'play';
}
// a struck drop flying on in the top-down view, t0 seconds in: the closed form drives the ball, and x1/y1 is where it comes down, so chasers go there
function launchG3d(g, kk, t0) {
  const b = M.ball, team = g.team, d = dirOf(team), X = g.X, w0 = toWorld(team, g.x, g.y), w1 = toWorld(team, X.x, X.y);
  const onside = new Set();
  for (const p of M.players) if (p.team === team && (p.x - w0.x)*d <= 0.5) onside.add(p);
  b.state = 'air'; b.carrier = null; b.last = team; b.kickInfo = { team, ownHalf:false };   // a kicked ball: no turnover for whoever gathers it
  b.f = { kind:'g3d', team, L:g.L, X, t:t0 || 0, T:X.t, x0:w0.x, y0:w0.y, x1:w1.x, y1:w1.y, z0:KICK.h0, z1:0, onside, rolled:new Set(), target:null, drop:true };
  const p = posAt(g.L, Math.min(b.f.t, X.t)), w = toWorld(team, p.x, p.y);
  b.x = w.x; b.y = w.y; b.z = Math.max(0, p.h);
  M.phase = 'play'; clearCharge();
  for (const t of [0, 1]) if (isHuman(t)) setCtrl(t, nearestFree(t, w1.x, w1.y));
}
function updateG3d(dt) {                                   // the g3d ball in the air: the one posts rule at the line, touch, and a catch under 2.7m as for any kick
  const b = M.ball, f = b.f, team = f.team, X = f.X;
  f.t += dt;
  const tt = Math.min(f.t, X.t), p = posAt(f.L, tt), w = toWorld(team, p.x, p.y), v = frameVec(team, velAt(f.L, tt));
  b.x = w.x; b.y = w.y; b.z = Math.max(0, p.h); b.vx = v.x; b.vy = v.y;
  if (f.t >= X.t) {
    if (!X.land) {
      const res = judgeCross(X);
      if (scores(res)) { if (f.drop) M.stats.dg.made[team]++; dropGoal(team); return; }
      if (res === 'post' || res === 'bar') { looseOffWood({ team, X }); sfx('post'); return; }
      placeBall(clamp(b.x, 0, 120), clamp(b.y, 0, 70)); sfx('whistle');
      deadBall(() => dropOut(1 - team));
      return;
    }
    b.state = 'loose'; b.f = null; b.vx = v.x*0.32; b.vy = v.y*0.32; b.vz = 3.2; b.z = 0.01;
    return;
  }
  if (b.y < 0 || b.y > 70) {
    const own22 = team === 0 ? f.x0 <= 32 : f.x0 >= 88;
    placeBall(b.x, clamp(b.y, 0, 70));
    deadBall(() => lineout(1 - team, own22 ? b.x : f.x0, b.y, own22 ? 'Into Touch' : 'Out on the Full'));
    return;
  }
  if (f.t/X.t > 0.45 && b.z < 2.7) {
    let best = null, bd = 1.6;
    for (const q of M.players) {
      if (q.down > 0 || (q.team === team && !f.onside.has(q))) continue;
      const dd = hyp(q.x - b.x, q.y - b.y); if (dd < bd) { bd = dd; best = q; }
    }
    if (best) catchBall(best, 'kick');
  }
}
/* The CPU's drop: offered by the same charging rule from his side on the clock his strike keeps, then a 0.25s wind-up in the open (a
   tackle in that time is a normal tackle), the strike checked against every opponent where he really stands, and a g3d flight with no
   close-up. The offer projects the world through the wind-up and gives your players KICK.cpuReact to react, so a man closing on him can block it. */
function cpuDropOffer(p) {
  const proj = projectHold(p, KICK.dropT), g = goalOf(p.team, proj.x, proj.y, 'drop', p, windNow(p.team));
  return g.mClear <= KICK.range && !blockedBy({ L:launchOf(g, g.ctr, 0, 0) }, rushersOf(p, g, proj), KICK.cpuReact);
}
function cpuDrop(p) {
  const g = makeGoal(p.team, p.x, p.y, 'drop', p);        // his inputs are drawn now: nothing random happens at the strike
  p.drop = { t:KICK.dropT, g };
  M.stats.drops++; M.stats.dg.att[p.team]++;
}
function cpuDropStrike(p) {
  const g0 = p.drop.g, g = goalOf(p.team, p.x, p.y, 'drop', p, g0.W);   // struck from where the wind-up leaves him, with the inputs drawn at the decision
  g.cpu = g0.cpu; p.drop = null;
  strikeGoal(g, g.cpu.m, g.cpu.aim);
  g.rush = rushersOf(p, g, null);                          // every opponent where he really stands, your controlled player included
  const hit = blockedBy(g, g.rush, 0);
  if (hit) { M.stats.dg.charged[p.team]++; chargeDownBy(p, hit.q, false, stopSpot(g, hit.q, 1.2)); return; }
  p.hold = 0;
  launchG3d(g, p, 0);
  sfx('kick');
}
// canonical positions for the tests and the console: a carrier of `team` at a frame spot, holding the ball with the stick forward, and
// opponents at frame positions (with frame velocities) as chargers; everyone else well away. Returns the carrier.
function stageDrop(spot, chargers, team) {
  team = team || 0; chargers = chargers || [];
  const P = M.players, b = M.ball, d = dirOf(team), w = toWorld(team, spot.x, spot.y);
  const own = P.filter(p => p.team === team), opp = P.filter(p => p.team !== team);
  M.phase = 'play'; M.set = null; M.cut = null; M.clock = 30; M.dclock = 100; M.hooter = false; clearCharge(); M.phaseCount = 2;
  M.dropOn = [false, false]; M.dropArmed = [false, false]; M.dropSeen = [null, null]; M.dropSet = [null, null];
  for (const p of P) { p.vx = p.vy = 0; p.down = 0; p.tcd = 0; p.side = -1; p.boost = 0; p.hold = 2; p.drop = null; p.quick = false; }
  own.forEach((p, i) => { p.x = clamp(i ? w.x - d*(8 + i) : w.x, 1, 119); p.y = i ? 6 + i*9.5 : w.y; p.fx = d; p.fy = 0; });
  opp.forEach((q, i) => {
    const ch = chargers[i];
    if (ch) { const cw = toWorld(team, ch.x, ch.y), cv = frameVec(team, { x:ch.vx || 0, y:ch.vy || 0 }); q.x = cw.x; q.y = cw.y; q.vx = cv.x; q.vy = cv.y; }
    else { q.x = clamp(w.x + d*(22 + i), 1, 119); q.y = 6 + i*9.5; }
    q.fx = -d; q.fy = 0;
  });
  const c = own[0];
  setCarrier(c); c.hold = 2;
  b.x = c.x + c.fx*0.55; b.y = c.y; b.z = 1;
  setCtrl(team, c); for (const s of M.side) { s.ctrlPrev = s.ctrl; s.ctrlT = 1; }
  const inp = inputOf(team); if (inp) { inp.jx = d; inp.jy = 0; }   // the stick forward, in his own direction
  return c;
}

/* ---------- close-ups: scrums, lineouts, duels ----------
   A close-up freezes the pitch and the clock, slides a side-on broadcast
   view in, runs one short contest, then slides out and hands the result
   back to the match. Headless runs, the menu demo and AI v AI resolve
   them instantly instead. */
const CUT_IN = 0.22, CUT_OUT = 0.25;
const interactive = () => !M.auto && !M.demo && !M.headless;
function startCut(c) {
  c.t = 0; c.after = null; c.hold = 0; c.exit = -1; c.acc = 0;
  M.cut = c; M.phase = 'cut';
  clearBanner();
  clearCharge(); for (const s of M.side) s.pass = null;
  for (const inp of inputs) { inp.aPressed = inp.bPressed = inp.cPressed = false; inp.cDown = false; }   // a Sprint held into a close-up must be pressed again after it
  lastBtn = '';
  hintCut(c);                                              // the open-play hint, if one was up, is over; and the tutorial, the first time this kind of moment comes up
  tutStart(c);
}
function finishCut(after, hold) {
  const c = M.cut;
  if (!c || c.after) return;
  c.after = after; c.hold = hold == null ? 0.9 : hold;
}
/* Slow motion (2026-10-17, Gordon: duels came too fast to react to). A duel's run-in plays slowly after the slide-in, then ramps to
   full speed into the window: secs[level] of real time at `rate`, a ramp of `ramp` scene seconds easing to 1, done `lead` before the
   ring opens (a run-in too short for all that loses slow time, never the ramp). The window, the tells and the verdict are untouched
   in scene time: the scene clock steps whole frames, held back by the accumulator, so a bot acting on c.t sees exactly the steps it
   always saw and only the real time (the frames) stretches; the drawing adds the fraction back (c.acc) so the motion is smooth.
   Resume before the window restarts the slow phase from the resumed time (c.slowFrom). Instant mode has no close-up at all. */
const DUEL_SLOW = { secs:[1.2, 0.9, 0.6], rate:0.4, ramp:0.10, lead:0.03 };   // measured 2026-10-17: a 0.15 ramp and 0.05 lead clipped Easy's slow phase to 0.95s (its ring opens at 0.80s scene) and left its run-in no longer than Normal's
function cutRate(c) {                                      // the scene clock's rate this step
  if (!c.duel || c.after || c.res || c.t < CUT_IN) return 1;
  const S = DUEL_SLOW, from = c.slowFrom == null ? CUT_IN : c.slowFrom;
  const rampEnd = Math.min(from + S.rate*S.secs[levelOf(c.own)] + S.ramp, c.win[0] - S.lead), rampStart = rampEnd - S.ramp;
  if (c.t >= rampEnd) return 1;
  if (c.t <= rampStart) return S.rate;
  const u = (c.t - rampStart)/S.ramp;
  return S.rate + (1 - S.rate)*u*u*(3 - 2*u);
}
function updateCut(dt) {
  const c = M.cut;
  if (M.tut && c.t + dt >= CUT_IN - 1e-9) {                // the tutorial card: the close-up holds its first frame (the slide-in's last step taken, nothing run on it), presses advance the card, the stick is re-centred under the thumb
    if (c.t < CUT_IN) c.t += dt;
    if (humanSlots().some(i => i.aPressed)) tutAdvance();
    if (c.duel || c.kind === 'goal') for (const inp of (M.two ? [inputOf(c.duel ? c.own : c.g.team)].filter(Boolean) : humanSlots())) { inp.reanchor(); inp.flick = 0; }   // as the grace: in two player only the owner's stick is re-centred (re-anchoring a pad stick latches it, and the chooser's choice would be lost on a pad but kept on keys)
    for (const inp of inputs) { inp.aPressed = inp.bPressed = inp.cPressed = false; inp.flick = 0; inp.aCancel = inp.bCancel = inp.cCancel = false; }
    return;
  }
  const rate = cutRate(c);
  if (rate >= 1) c.t += dt;
  else { c.acc += rate*dt; if (c.acc >= STEP - 1e-9) { c.acc -= STEP; c.t += dt; } }   // slow motion: whole frames only, so nothing judged on c.t moves
  if (c.after) {
    if ((c.duel || c.kind === 'goal') && c.t >= c.skipAt && humanSlots().some(i => i.aPressed || i.bPressed || i.flick)) c.hold = 0;   // tap to skip, from either seat
    if (c.hold > 0) c.hold -= dt;
    else {
      c.exit = Math.max(0, c.exit) + dt;
      if (c.exit >= CUT_OUT) {
        const fn = c.after; M.cut = null; M.phase = 'play'; lastBtn = ''; for (const inp of inputs) inp.cDown = inp.cPressed = false; fn();
        for (const inp of humanSlots()) { inp.latch = false; inp.pre = null; inp.held.clear(); }   // every slot the cut-in prepared reads live again: a stick the non-owner (or a watcher of a CPU kick) held through it is no longer latched
      }
    }
  } else if (c.kind === 'scrum') updateScrum(c, dt);
  else if (c.kind === 'lineout') updateLineout(c, dt);
  else if (c.kind === 'goal') updateGoalCut(c, dt);
  else updateDuel(c, dt);
  for (const inp of inputs) { inp.aPressed = inp.bPressed = inp.cPressed = false; inp.flick = 0; inp.aCancel = inp.bCancel = inp.cCancel = false; }
}
function surge(team, secs) { M.surge = { team, t:secs }; }

/* Scrum: Crouch, Bind, Set. Press on Set for a good start, then tap Push fast to drive: the taps alone are the shove, the stick
   plays no part (2026-10-17: it used to scale the taps by 0.55 at rest and 0.2 held back, and nothing on screen said so). pos is
   metres gained by your pack. SCRUM_DOM is the one penalty line: a pack that has gained that much wins a penalty (a pushover
   within 8m of the line); the steal line is 1.2, half way up the bar. */
const SCRUM_SET = 1.4, SCRUM_PUSH = 2.6, SCRUM_DOM = 2.4;
function startScrum(s) {
  // every scrum is a little different: a CPU pack's strength varies, and the side putting in gets a small edge. pos is metres gained by team 0's pack
  const c = { kind:'scrum', feed:s.team, x:s.x, y:s.y, pos:0, engaged:false, mine:0, theirs:0, result:null,
    rate:[0, 0], taps:[0, 0], hit:[false, false], early:[false, false], base:[0, 0], wave:0, msg:[null, null] };   // a pack a side: a human's taps and timing, every pack's base effort; msg: two player's Early / Good Hit tag over each pack
  for (const t of [0, 1]) c.base[t] = cpuSide(t) ? (diffOf(t).scrumCpu + (powerOf(t)-3)*0.06)*(0.75 + rnd()*0.5) + (s.team === t ? 0.08 : 0) : (powerOf(t)-3)*0.06 + (s.team === t ? 0.08 : 0) + (M.two ? SCRUM_LEVEL[levelOf(t)] : 0) + (M.kids ? KIDS.scrum : 0);
  c.wave = rnd()*6;
  startCut(c);
}
function scrumPush(c, s, dt) {                             // a human pack's shove this step: a timed hit on Set, then the taps of the last quarter second or so. The stick is not read
  const t = c.t, inp = inputOf(s), d = dirOf(s);
  if (inp && inp.aPressed) {
    const note = text => { if (M.two) c.msg[s] = { text, at:t }; else say(text, 'small'); };   // two player: a tag over that pack in its seat colour, so two hits at once don't fight over the banner
    if (t < SCRUM_SET - 0.08) { if (!c.early[s] && !c.hit[s]) { c.early[s] = true; c.pos -= 0.25*d; note('Early'); } }
    else if (!c.hit[s] && !c.early[s] && t <= SCRUM_SET + 0.28) { c.hit[s] = true; c.pos += 0.35*d; note('Good Timing'); buzz(25, s); }
    if (t >= SCRUM_SET) { c.rate[s] += practice && !practice.demo ? drillRate() : 1; c.taps[s]++; }   // a live drill's clock runs slow, so a real tap counts for less and the same thumb makes the same shove. A demo's pilot taps on the drill's own clock
  }
  if (t < SCRUM_SET) return 0;
  c.rate[s] *= Math.exp(-dt/0.25);
  return 0.85*Math.min(1.3, c.rate[s]/1.25) + c.base[s];   // 5 taps a second = full shove, about 6.5 the most (a phone thumb manages 5-7)
}
function updateScrum(c, dt) {
  const t = c.t, eff = [0, 1].map(s => (cpuSide(s) ? 0 : scrumPush(c, s, dt)));   // a human's press is read before Set too (Early, or the Good Hit)
  if (practice && practice.drive) driveShape(c, dt, eff);    // the Driving drill's body shape; nothing else reaches it
  if (t < SCRUM_SET) return;
  if (!c.engaged) { c.engaged = true; sfx('tackle'); buzz(40); }
  for (const s of [0, 1]) if (cpuSide(s)) eff[s] = c.base[s]*(1 + 0.22*Math.sin((t-SCRUM_SET)*2.4 + c.wave));
  c.mine = eff[0]; c.theirs = eff[1];
  c.pos = clamp(c.pos + (c.mine - c.theirs)*1.8*dt, -2.5, 2.5);
  if (t >= SCRUM_SET + SCRUM_PUSH || Math.abs(c.pos) >= SCRUM_DOM) resolveScrum(c);
}
function resolveScrum(c) {
  const p = c.pos, F = c.feed;
  let res = p >= SCRUM_DOM ? 'dom0' : p <= -SCRUM_DOM ? 'dom1' : F === 0 ? (p <= -1.2 ? 'steal1' : 'win0') : (p >= 1.2 ? 'steal0' : 'win1');
  if (res === 'dom1' && !cpuSide(0) && !c.taps[0] && !c.hit[0]) res = F === 0 ? 'steal1' : 'win1';   // a human pack that never pushed loses the ball, nothing worse
  if (res === 'dom0' && !cpuSide(1) && !c.taps[1] && !c.hit[1]) res = F === 1 ? 'steal0' : 'win0';
  c.result = res;
  if (practice && practiceScrum(c)) return;                // the Driving drill counts it and sets the next scrum
  const mx = clamp(c.x + p, 15, 105), y = c.y;
  if (res === 'dom0' || res === 'dom1') {
    const t = res === 'dom0' ? 0 : 1, over = Math.abs(oppLine(t) - mx) <= 8;
    say(over ? 'Pushover' : 'Scrum Penalty ' + M.nat[t].id, '', t); sfx('whistle');
    finishCut(() => {
      if (over) { const q = nearestFree(t, mx, y) || M.players.find(p => p.team === t); q.x = oppLine(t) + dirOf(t)*0.8; q.y = y; scoreTry(q); }
      else penalty(t, mx, y);
    });
    return;
  }
  const w = res.endsWith('0') ? 0 : 1, stolen = res.startsWith('steal');
  const strong = w === 0 ? p > 0.8 : p < -0.8;
  say(stolen ? 'Against the Head' : strong ? 'Go-Forward Ball' : 'Scrum Won', stolen || strong ? '' : 'small', w);
  finishCut(() => { releaseTo(w, mx, y, 'scrum'); if (stolen || strong) surge(w, 2.5); }, 0.8);
}
function autoScrum(s) {
  const F = s.team, o = 1-F, edge = (powerOf(F) - powerOf(o))*0.03, r = rnd();
  if (r < 0.035) { penalty(rnd() < 0.6 + edge ? F : o, s.x, s.y); return; }
  if (r < 0.035 + clamp(0.07 - edge, 0.02, 0.12)) { say('Against the Head', 'small'); releaseTo(o, s.x, s.y, 'scrum'); return; }
  releaseTo(F, s.x, s.y, 'scrum');
}

/* Lineout: one jumper each side in the middle. The thrower dummies, then
   throws; press Jump so your jumper is at full height when the ball arrives. */
const LINE_X = 7;            // metres in from touch where the jumpers stand
function liftAt(s) {          // metres a jumper's feet are off the ground, s seconds after the jump
  if (s == null || s < 0) return 0;
  if (s < 0.42) return 1.45*Math.sin(s/0.42*Math.PI/2);
  if (s < 0.72) return 1.45;
  if (s < 1.12) return 1.45*(1 - (s-0.72)/0.4);
  return 0;
}
function startLineout(s) {
  const throwT = 0.75 + rnd()*0.6, flight = 0.95 + rnd()*0.35;
  const c = { kind:'lineout', team:s.team, x:s.x, y:s.y, throwT, flight, arrive:throwT + flight, catchH:3.4 + rnd()*0.3,
    jump:[null, null], outcome:null, winner:null, decidedAt:null,
    reach:[0, 1].map(t => 2.35 + gauss()*0.08 + (t === s.team ? (M.two ? 0.10 : 0.06) : 0) + (M.two ? LINE_LEVEL[levelOf(t)] : 0) + (M.kids && isHuman(t) ? KIDS.reach : 0)) };   // two player: the throw's edge is 0.10 (the thrower keeps about 86% at equal timing, measured over 4,000 throws a side), plus an Easy player's reach; the same draws
  for (const t of [0, 1]) {                                  // a CPU jumper: always on its own throw, else at its level's contest rate, timed with its level's spread
    if (!cpuSide(t)) continue;
    const contest = s.team === t || rnd() < diffOf(t).lineContest;
    if (contest) c.jump[t] = c.arrive - 0.57 + gauss()*diffOf(t).lineSigma*(s.team === t ? 0.9 : 1);
  }
  startCut(c);
}
function handAt(c, team, t) { return c.reach[team] + liftAt(c.jump[team] == null ? null : t - c.jump[team]); }
function updateLineout(c, dt) {
  const t = c.t;
  for (const s of [0, 1]) { const inp = inputOf(s); if (inp && inp.aPressed && c.jump[s] == null && t > CUT_IN) { c.jump[s] = t; sfx('pass'); } }   // each human side's Jump
  if (c.outcome == null && t >= c.arrive) {
    const u = handAt(c, 0, t), k = handAt(c, 1, t), need = c.catchH - 0.2;
    const okU = u >= need, okK = k >= need;
    c.decidedAt = t;
    if (okU && okK) c.winner = Math.abs(u - k) < 0.03 ? c.team : (u > k ? 0 : 1);
    else if (okU) c.winner = 0;
    else if (okK) c.winner = 1;
    if (c.winner == null) { c.outcome = 'over'; return; }
    c.outcome = 'caught';
    const w = c.winner, steal = w !== c.team;
    say(steal ? 'Lineout Steal' : 'Lineout Won', steal ? '' : 'small', w);
    if (steal) buzz(40);
    finishCut(() => { releaseTo(w, c.x, c.y, 'lineout'); if (steal) surge(w, 2.5); }, 0.9);
  }
  if (c.outcome === 'over' && c.winner == null && t >= c.decidedAt + 0.45) {
    const w = rnd() < 0.5 ? 0 : 1;
    c.winner = w;
    say('Overthrown', 'small');
    finishCut(() => releaseTo(w, c.x, c.y, 'lineout'), 0.5);
  }
}
function autoLineout(s) {
  const T = s.team, o = 1-T, edge = (M.nat[T].handling - M.nat[o].handling)*0.03;
  const w = rnd() < clamp(0.84 + edge, 0.7, 0.93) ? T : o;
  if (w !== T) say('Lineout Steal', 'small', w);
  releaseTo(w, s.x, s.y, 'lineout');
}

/* ---------- duels ----------
   Four one-on-one moments that cut to a chase-cam close-up: Get Past and
   Key Pass on attack, Tackle and Block on defence. A gold ring is the only
   timing cue. A win gives a short burst; a mistime falls back to the odds
   the open game would have given, so a duel is never a trap.
   M.duels: 'off' (AI v AI, the menu demo, and the headless default),
   'live' (a match you play; the close-up runs) or 'instant' (resolved at the trigger, for tools). */
const DUEL = {
  past:   { name:'Get Past', rig:1, tk:1.20, win:[0.30,0.23,0.17], mod:['pace','power'],       cpu:[0,0.20,0.40] }, // feint chance
  pass:   { name:'Key Pass', rig:2, tk:1.20, win:[0.32,0.24,0.18], mod:['handling','pace'],    cpu:[0,0.06,0.12] }, // commit jitter, s
  tackle: { name:'Tackle',   rig:1, tk:1.20, win:[0.30,0.23,0.17], mod:['power','pace'],       cpu:[0.15,0.30,0.50] }, // step chance
  block:  { name:'Block',    rig:2, tk:1.05, win:[0.26,0.20,0.15], mod:['handling','handling'], cpu:[0,0.15,0.30] }, // dummy chance
};
const DUEL_GRACE = 0.30, DUEL_OUTRO = 0.55, DUEL_SKIP = 0.25, DUEL_GAP = 30, DUEL_LAST_GAP = 6;
/* The Tackle duel's trigger (findTackleDuel), one line so the harness can try values: TDUEL='{"hold":0.5}' node tools/bot.mjs. hold: the CPU
   carrier's seconds on the ball; ctrlT: seconds since your ring last moved; ahead: how far goal-side of him your man must be (front-on);
   near/far: the distance band; lastBack/lastR: no other standing man of yours within lastR of the carrier and no more than lastBack metres
   behind him (negative: at least that far goal-side of him); cos: your stick's cosine toward the carrier.
   2026-10-17: hold 0.5 -> 0.3 and the last-defender test from "nobody within 10m unless 1m behind him" to "nobody goal-side of him within
   7m", since the led pass has the CPU's receivers catching at pace with team-mates level: the duel had fallen from 0.6 to 0.15 a match. */
const TDUEL = { hold:0.3, ctrlT:0.6, ahead:0.5, near:2.9, far:6.0, lastBack:-0.5, lastR:7, cos:0.57 };
const G_START = 7.0, G_WIN = 2.4, G_HIT = 0.8;          // the restaged approach, metres apart
const BURST = { ok:[1.09, 2.0], perfect:[1.14, 2.5], knock:[1.06, 1.2] };   // measured at n=1440 per row: x1.12/x1.18 overshoots Normal once the Dummy is in, x1.06 is barely felt
const DOM_TURN = [0.25, 0.35], DOM_RUCK = 1.6, LINE_SPEED = 2.5;
/* Contact, the ruck and Sprint. Every lever is here, one line each, so the harness can override them:
   CONTACT='{"bind":0.3}' SPRINT='{"mul":[1.25,1.25,1.2]}' node tools/bot.mjs tries values without an edit. Arrays are by level (Easy, Normal, Hard). */
const CONTACT = { bind:0.25, side:1.10, contact:[0.58,0.42,0.42], dive:[0.66,0.50], ankle:0.55, diveDown:0.75, brokenDown:0.5, stumble:[0.15,0.9], slide:[0.5,0.95], downR:0.95, second:{ r:1.3, toDom:0.35, softToWrap:0.35 }, dom:{ base:0.14, pow:0.04, front:0.03, dive:0.08, sprint:0.10, cpu:[-0.03,0,0.03] }, soft:{ base:0.22, behind:0.25, fast:0.08, pow:0.04 }, fend:{ pow:1, margin:0.35 }, trip:{ p:0.4, t:0.5, mul:0.5 }, jolt:{ dom:0.09, wrap:0.02, soft:0.01, fwd:0.55 }, off:{ soft:0.85, wrap:0.70, range:9, cpu:0.10, hold:0.5, knock:0.55 } };
const RUCK = { t:{ quick:0.7, normal:1.0, slow:1.5 }, quickLead:0.3, attHead:0.35, gate:3.5, retire:0.6, flatBase:0.11, pen:0.045, wf:{ r:3, t:0.7, mul:0.5 } };
const SPRINT = { mul:[1.25,1.25,1.20], mulBall:[1.06,1.06,1.05], secs:2.0, ballDrain:1.5, refill:[7,10,10], floor:0.2, fade:0.3, pick:4, cpu:{ chase:[0.1,0.12,0.2], chaseLast:[0,0,0], carry:[0,0.05,0.3], carryLast:[0,0,0], lane:15, min:2.5, max:12, space:6, keep:2.5, think:0.25 } };
const INSTANT = [0.85, 0.70, 0.55];
// Key Pass: how often the defender drifts onto the runner (Dummy is right) and, when he doesn't, how often he fakes a drift first
const DUMMY = { drift:[0.35, 0.40, 0.45], fake:[0, 0.15, 0.30] };                      // instant-mode win rate by difficulty
/* Open-play moves (2026-10-17): the Side Step and the Dummy, read from the stick with no new button. gestureStep runs once a step for
   each human slot while his ringed man carries in open play with neither Pass nor Kick held (both aim with the stick). It reads only
   inputOf(t).world(): L = j.y is across the pitch and F = j.x*dirOf(t) along the run, so it is the same for either team, either seat,
   touch, pad or keys. The history is cleared at a new carrier, at any step he is not carrying in open play (a cut, a set piece, the ball
   in the air, a button held), on a lifted thumb, on the stick's restore after a duel, at newMatch, a seat change and a resume.
   Side Step: one sharp flick across the run (L rises `rise` inside `win` steps to |L| >= L with |j| >= mag), armed from each carry and
   re-armed once |L| is back under rearm, acting with a standing opponent inside `range` and `since` seconds on the
   ball: x`odds` tackle odds while side > 0 (`side` seconds; the cooldown is side counting back to -0.9, 1.25s, as the AI's step), a
   `push` m/s dart along the stick. A fresh up or down key is a flick on its own. The old turn-rate step (p.turn / p.lastA) is gone:
   a single flick could never turn the floating stick far enough, and most of its steps fired on the first step after a catch.
   Dummy: the run held at F >= fwd for `hold` seconds, pulled back to F <= back inside `drop` seconds and pushed on to F >= on inside
   `ret` seconds, with the ring on a teammate and a standing AI defender ahead inside range: he buys it with chance bite[level] (the
   carrier's level) and for `drift` seconds runs at the ring's man, wrong-footed (x0.5 pace for wf seconds), shoved `shove` m/s that way
   and unable to tackle for tcd seconds; the carrier keeps the pace he had before the pull, since the check is a shape, not a stop. On
   keys the pull must be a fresh press of the back key: forward let go and pressed again is not a Dummy. The CPU dummies from
   aiCarrier's think with chance cpu[level] (Hard only) when a human defends, so AI v AI draws nothing, and never sells a human's
   ringed man. Every lever is here: MOVES='{"step":{"push":4}}' node tools/bot.mjs tries values without an edit. */
const MOVES = {
  step:{ win:4, rise:0.45, L:0.45, mag:0.6, rearm:0.3, range:4, since:0.10, side:0.35, push:5, odds:0.65, cpuPush:4 },
  dummy:{ fwd:0.7, hold:0.20, back:0.3, drop:0.15, ret:0.30, on:0.6, range:[1.5, 9], cd:2.5, bite:[0.9, 0.75, 0.6], drift:0.6, wf:0.5, tcd:0.4, shove:3, cpu:[0, 0, 0.04], cpuRange:[2.5, 7] },
};
// CONTACT_TUNE
/* Two player only (never read on a one-player path). DUEL_LOCK: how long before the plain window the chooser's choice locks, by
   the timer's level (Normal's 0.32 is when the CPU shows its feint, drift or step; an Easy timer gets longer to read it). TWO.tackle:
   how hard a side's AI men tackle the other player's carrier, read at the carrier's level: the scoring lever, tuned with
   `twoplayer.mjs --sym` toward 5-7 tries a match at 4-minute halves. SCRUM_LEVEL and LINE_LEVEL: an Easy player's shove and reach. */
const DUEL_LOCK = [0.40, 0.32, 0.24];
const TWO = { tackle:[0.72, 0.80, 0.88] };
const SCRUM_LEVEL = [0.10, 0, 0], LINE_LEVEL = [0.06, 0, 0];

function tackleChance(q, c, mode, stepped) {
  if (stepped == null) stepped = c.side > 0;
  let p = mode === 'dive' ? (dist(q, c) < 1.7 ? CONTACT.dive[0] : CONTACT.dive[1]) : mode === 'contact' ? CONTACT.contact[levelOf(q.team)] : (cpuSide(q.team) ? diffOf(q.team).cpuTackle : M.two ? TWO.tackle[levelOf(c.team)] : diffOf(q.team).myTackle);   // an AI tackler: the CPU's rate at its level, or (two player) the rate the carrier's level faces
  p += (M.career ? careerAbility(q, 'power') - careerAbility(c, 'power') : powerOf(q.team) - powerOf(c.team))*0.05;   // a career match: your player's own power
  if (M.kids && isHuman(q.team) && mode !== 'ai') p += KIDS.tackle;   // Kids: your ringed man's contact tackle and dive
  if (stepped) p *= MOVES.step.odds;
  if ((q.x - c.x)*dirOf(c.team) < -0.3) p *= 0.75;
  return clamp(p, 0.08, 0.95);
}
function setBoost(p, mul, secs) {
  p.boostMul = mul; p.boost = secs; p.autoDir = 0;
  const sp = maxSpeed(p), m = hyp(p.fx, p.fy) || 1;
  p.vx = p.fx/m*sp; p.vy = p.fy/m*sp;
}
function duelGate(kind, owner) {                           // owner: the side that would own it. One player keeps the shared log; two player gives each owner his own quota and "never the same kind twice running", with the gap and the Last Play bonus shared
  if (M.duels === 'off' || M.phase !== 'play' || anyCharging() || M.clock < 15 || M.cut) return false;
  const L = M.duelLog, h = Math.min(M.half, 2) - 1;
  if (M.hooter && !L.bonus[h] && M.dclock - L.last >= DUEL_LAST_GAP) return 'bonus';
  if (M.dclock - L.last < DUEL_GAP) return false;
  if (M.two) {
    const S = sideOf(owner).duel;
    if (kind === S.lastKind || S.half[h] >= Math.ceil(M.halfLen/180)) return false;
    return 'normal';
  }
  if (kind === L.lastKind) return false;
  if (L.half[h] >= Math.ceil(M.halfLen/90)) return false;
  return 'normal';
}
// "ahead" and "behind" along a side's direction of attack, written out per direction so team 0's comparisons are the floats they always were
const notBehind = (qx, cx, d, k) => (d > 0 ? qx >= cx - k : qx <= cx + k);   // q is no more than k metres behind c
const wellAhead = (qx, cx, d, k) => (d > 0 ? qx > cx + k : qx < cx - k);     // q is more than k metres ahead of c
function findAttackDuel(c) {                                // a human carrier at the last defender: Key Pass with a runner outside him, else Get Past
  const t = c.team, d = dirOf(t), inp = inputOf(t);
  if (!ringed(c) || c.hold < 0.5 || c.down > 0 || c.side > -0.9 || c.vx*d <= 3) return null;
  if ((oppLine(t) - c.x)*d < 3 || c.y < 6 || c.y > 64) return null;
  if (inp.world().x*d < 0.5) return null;                       // running at him, or no duel
  let d1 = null, bd = 1e9;
  for (const q of M.players) if (q.team !== t && q.down <= 0 && (q.x - c.x)*d > 0.5) { const dd = dist(q, c); if (dd < bd) { bd = dd; d1 = q; } }
  if (!d1 || bd < 3.6 || bd > 4.6 || d1.tcd > 0) return null;
  const ux = (d1.x - c.x)/bd, uy = (d1.y - c.y)/bd;
  if ((c.vx - d1.vx)*ux + (c.vy - d1.vy)*uy <= 3) return null;
  for (const q of M.players) if (q.team !== t && q !== d1 && q.down <= 0 && notBehind(q.x, c.x, d, 1) && dist(q, c) < 10) return null;
  let r = null;
  for (const p of M.players) {
    if (p.team !== t || p === c || p.down > 0) continue;
    const back = (c.x - p.x)*d, lat = Math.abs(p.y - c.y);
    if (back < 0 || back > RUNON.kpBack || lat < 4 || lat > 12) continue;   // the runner box: the line sits deeper now the ball moves faster
    if (M.players.some(q => q.team !== t && q !== d1 && q.down <= 0 && dist(q, p) < 6)) continue;
    r = p; break;
  }
  if (r) { const g = duelGate('pass', t); if (g) return { kind:'pass', U:c, O:d1, R:r, how:g }; }
  const g = duelGate('past', t);
  return g ? { kind:'past', U:c, O:d1, how:g } : null;
}
function findTackleDuel(c) {                                // the other side's human as the last defender, front-on, running at the carrier (the levers are TDUEL)
  const K = TDUEL;
  if (c.hold < K.hold || c.down > 0) return null;
  const t = 1 - c.team, d = dirOf(c.team), q = ctrlOf(t);
  if (!q || q.down > 0 || q.tcd > 0 || sideOf(t).ctrlT < K.ctrlT) return null;
  if (!wellAhead(q.x, c.x, d, K.ahead)) return null;
  const dd = dist(q, c);
  if (dd < K.near || dd > K.far) return null;
  if ((oppLine(c.team) - c.x)*d < 3 || c.y < 6 || c.y > 64) return null;
  for (const o of M.players) if (o.team === t && o !== q && o.down <= 0 && notBehind(o.x, c.x, d, K.lastBack) && dist(o, c) < K.lastR) return null;   // the last defender: no other man of his goal-side of the carrier (lastBack < 0: by more than -lastBack) within lastR
  const j = inputOf(t).world();
  if (j.mag <= 0.5 || (j.x*(c.x - q.x) + j.y*(c.y - q.y))/(j.mag*dd) < K.cos) return null;
  const g = duelGate('tackle', t);
  return g ? { kind:'tackle', U:q, O:c, how:g } : null;
}
function pickOwner(a, k) {                                 // two candidates on one step (two player only): the side with more duels left this half, then the side that didn't have the last one, then the attacker
  const h = Math.min(M.half, 2) - 1, left = t => Math.ceil(M.halfLen/180) - sideOf(t).duel.half[h];
  if (left(a.U.team) !== left(k.U.team)) return left(a.U.team) > left(k.U.team) ? a : k;
  if (M.duelLog.lastOwner === a.U.team) return k;
  return a;
}
function duelCheck(c) {
  if (M.duels === 'off' || c.drop) return false;    // before any rnd(), so AI v AI keeps its sequence; a CPU carrier winding up a drop is not duelled
  const a = ringed(c) ? findAttackDuel(c) : null, k = isHuman(1 - c.team) ? findTackleDuel(c) : null;
  const s = a && k ? pickOwner(a, k) : (a || k);
  if (!s) return false;
  startDuel(s);
  return true;
}
function blockSpec(from, to) {                             // the defending side's human on the line of a pressure pass, running at it
  const t = 1 - from.team, q = ctrlOf(t), b = M.ball;
  if (!q || q.down > 0 || q.tcd > 0 || sideOf(t).ctrlT < 0.6 || (oppLine(from.team) - from.x)*dirOf(from.team) < 3) return null;
  const aim = leadPass(from, to), P0 = { x:b.x, y:b.y }, P1 = { x:aim.x, y:aim.y };   // the lane is the line the ball will take
  const vx = P1.x - P0.x, vy = P1.y - P0.y, len = hyp(vx, vy);
  if (len < 5) return null;
  const u = ((q.x - P0.x)*vx + (q.y - P0.y)*vy)/(len*len);
  if (u < 0.25 || u > 0.85) return null;
  const L = { x:P0.x + vx*u, y:P0.y + vy*u };
  if (hyp(q.x - L.x, q.y - L.y) > 3.0) return null;
  if (M.players.some(o => o.team === t && o !== q && o.down <= 0 && dist(o, to) < 5)) return null;
  const j = inputOf(t).world();
  if (j.mag <= 0.5) return null;
  const toward = (x, y) => { const dx = x - q.x, dy = y - q.y, m = hyp(dx, dy) || 1; return (j.x*dx + j.y*dy)/(j.mag*m) >= 0.57; };
  if (!toward(L.x, L.y) && !toward(from.x, from.y)) return null;
  const g = duelGate('block', t);
  return g ? { kind:'block', U:q, O:from, R:to, P0, P1, L, how:g } : null;
}
// a pressure pass across the other side's man: when that side is human and duels are live, a Block duel may take it over. The AI's
// passes and a human's go through it alike; a floater is not the flat pass a Block duel reads
function passOrBlock(p, to, o) {
  if (M.duels !== 'off' && isHuman(1 - p.team) && !(o && o.long)) {
    const s = blockSpec(p, to);
    if (s) { M.duelPending = s; return; }
  }
  doPass(p, to, o);
}
function startPendingDuel() {
  const s = M.duelPending; M.duelPending = null;
  if (!(M.phase === 'play' && M.ball.state === 'held' && M.ball.carrier === s.O) || s.O.bind) return;   // tackled as he shaped to pass: no pass, no duel
  const again = blockSpec(s.O, s.R);          // your man may have gone down, or another duel just used the gap
  if (again) startDuel(again); else doPass(s.O, s.R);
}
function startDuel(s) {
  for (const p of M.players) { p.sprinting = false; p.sprint = 0; }   // a duel is run at the duel's pace; the meters keep their level
  for (const S of M.spr) S.p = null;
  const own = s.U.team, k = DUEL[s.kind], di = levelOf(own), ab = (t, m) => (m === 'power' ? powerOf(t) : M.nat[t][m]), L = M.duelLog, h = Math.min(M.half, 2) - 1;
  if (s.how === 'bonus') L.bonus[h] = true; else if (s.how !== 'force') { L.half[h]++; sideOf(own).duel.half[h]++; }
  L.last = M.dclock; L.lastKind = s.kind; L.lastOwner = own; sideOf(own).duel.lastKind = s.kind;
  M.stats.duels++; M.stats['d_' + s.kind] = (M.stats['d_' + s.kind] || 0) + 1; M.stats.duelN.att[own]++;
  if (M.two && (s.kind === 'past' || s.kind === 'pass')) setCtrl(s.O.team, s.O);   // the chooser's ring goes to the man in the close-up (O is the nearest defender, not always his), and stays on him after
  // the duel runs in its owner's frame (toFrame, the kick frame): Step Right is always the owner's right, and a team 0 duel is the geometry it always was
  const snap = p => { if (!p) return null; const f = toFrame(own, p.x, p.y), v = frameVec(own, { x:p.vx, y:p.vy }); return { x:f.x, y:f.y, vx:v.x, vy:v.y }; };
  const c = { duel:true, kind:s.kind, own, U:s.U, O:s.O, R:s.R || null, how:s.how, lastEvt:0, armed:false, opened:false,
    res:null, act:null, judged:null, out:null, verdict:null, u0:snap(s.U), o0:snap(s.O), r0:snap(s.R) };
  const U = c.u0, tgt = s.kind === 'block' ? toFrame(own, s.L.x, s.L.y) : c.o0;
  const gx = tgt.x - U.x, gy = tgt.y - U.y, g0 = hyp(gx, gy) || 1;
  c.D = { x:gx/g0, y:gy/g0 }; c.g0 = g0;
  let vc = 6;
  if (s.kind === 'block') { c.w = 1; c.K = { x:tgt.x, y:tgt.y }; c.P0 = toFrame(own, s.P0.x, s.P0.y); c.P1 = toFrame(own, s.P1.x, s.P1.y); c.L = { x:tgt.x, y:tgt.y }; }
  else {
    const uv = U.vx*c.D.x + U.vy*c.D.y, ov = c.o0.vx*c.D.x + c.o0.vy*c.D.y;
    vc = Math.max(4, uv - ov);
    c.w = clamp(uv/vc, 0.3, 0.7);
    c.K = { x:U.x + c.D.x*g0*c.w, y:U.y + c.D.y*g0*c.w };
  }
  c.tk = k.tk;
  c.rho = (G_START - G_HIT)/vc/(c.tk - CUT_IN);
  c.tTrig = CUT_IN + clamp((G_START - g0)/(G_START - G_HIT), 0, 1)*(c.tk - CUT_IN);
  c.dtau = clamp(c.rho*(c.tk - c.tTrig), 0, 0.5);
  const tw = CUT_IN + (c.tk - CUT_IN)*(G_START - G_WIN)/(G_START - G_HIT);
  const SD = sideOf(own).duel, first = M.two ? SD.first : !tutSeen(s.kind), fails = M.two ? SD.fails : L.fails;   // the aids are per owner in two player: his own first duel, his own failures in a row. One player: the first duel of each kind on this device (the tutorial's moment, marked at the cut-in)
  const w = k.win[di] + clamp(0.012*(ab(s.U.team, k.mod[0]) - ab(s.O.team, k.mod[1])), -0.036, 0.036)
    + (first ? 0.08 : 0) + (fails >= 2 ? 0.04 : 0) + (M.kids ? KIDS.duelWin : 0);
  if (M.two) SD.first = false;
  let centre = tw;
  if (s.kind === 'past') {
    const touch = U.y < 15 ? -1 : U.y > 55 ? 1 : 0;           // show him the touchline (frame y: his own left or right)
    c.open = touch && rnd() < 0.65 ? touch : (rnd() < 0.5 ? -1 : 1);
    c.open0 = rnd() < k.cpu[di] ? -c.open : c.open;           // a feint starts on the other shoulder
  } else if (s.kind === 'pass') {
    centre = c.commitT = tw + (rnd()*2 - 1)*k.cpu[di];
  } else if (s.kind === 'tackle') {
    if (rnd() < k.cpu[di]) { c.stepDir = rnd() < 0.5 ? -1 : 1; c.tk += 0.10; centre += 0.10; }
  } else {
    c.dummy = rnd() < k.cpu[di];
    c.rel = c.dummy ? 1.05 : 0.75;
    centre = c.rel + 0.30; c.tk = centre;
  }
  c.centre = centre; c.wid = w; c.win = [centre - w/2, centre + w/2];
  if (s.kind === 'past' && c.open0 !== c.open) c.feintAt = c.win[0] - 0.32;
  if (s.kind === 'pass') {
    c.side = Math.sign((c.r0.y - U.y) || 1);                   // the runner's side, in the frame
    c.drift = rnd() < DUMMY.drift[di];
    if (c.drift) c.driftAt = c.win[0] - 0.32;                  // he drifts onto the runner, in plain view
    else if (rnd() < DUMMY.fake[di]) c.fakeAt = c.win[0] - 0.55;   // starts to drift, then comes back at you
  }
  if (c.stepDir) c.stepAt = c.win[0] - 0.32;
  c.endT = s.kind === 'block' ? centre + 0.45 : c.tk + 0.35;
  if (M.two) duelHeadToHead(c);                              // head to head: the other player makes the choice the AI drew above, by the lock
  if (M.duels === 'instant') { duelInstant(c); return c; }
  for (const inp of humanSlots()) { inp.pre = null; inp.reanchor(); inp.held = new Set(inp.keys); inp.flick = 0; }   // every human slot: touch re-centred, a pad stick latched, held keys ignored
  startCut(c);
  sfx('whoosh');
  return c;
}
/* Head to head. In two player the duel's other man is the other player's, so he is the chooser: he makes the choice the CPU draws in
   one player (the shoulder the defender guards in a Get Past, a drift onto the runner or a rush at the passer in a Key Pass, the
   carrier's step in a Tackle, the passer's dummy in a Block). The CPU's plan is drawn in startDuel exactly as in one player and runs
   unless the chooser moves first: his first fresh input before the lock takes over and cancels what is left of the plan, so a
   chooser who does nothing defends as the CPU does, and a plan event after the lock shows at the lock. The lock is DUEL_LOCK at the
   timer's level before the plain window (the pump, 0.75s, for a Block); from there the choice is fixed and the timer reads it as he
   would read the CPU's tell. The chooser's hand is sideX(): fresh keys only, never one held into the cut-in, and an unlatched stick.
   Nothing random is drawn here. One player never reaches this, so its duels are the draws they always were. */
function setWindow(c, centre) { c.centre = centre; c.win = [centre - c.wid/2, centre + c.wid/2]; c.endT = c.kind === 'block' ? centre + 0.45 : c.tk + 0.35; }
function duelHeadToHead(c) {
  c.locked = false; c.lean = 0; c.dummyPress = false; c.taken = false; c.changes = 0; c.lastSx = 0;
  const plain0 = c.win[0] - (c.kind === 'tackle' && c.stepDir ? 0.10 : 0);   // the window before any drawn step
  c.lock = c.kind === 'block' ? 0.75 : plain0 - DUEL_LOCK[levelOf(c.own)];
  for (const k of ['feintAt', 'driftAt', 'fakeAt', 'stepAt']) if (c[k] != null) c[k] = Math.min(c[k], c.lock);   // a plan event after the lock is pulled back to it
  if (c.kind === 'tackle' && c.stepDir) c.tkAt = c.stepAt;                     // the drawn step's slower approach eases in at the step, not from the cut-in
  if (c.kind === 'block') c.reachT = 1.05;                                      // the blocker's run is timed to the plain release whether or not a dummy is drawn: nothing on screen tells before the pump
}
function duelOther(c, t) {                                  // the chooser's hand, every step from the cut-in: shown live, and fixed at the lock
  if (c.locked) return;
  const inp = inputOf(1 - c.own); if (!inp) { c.locked = true; return; }
  const sx = inp.sideX(), fresh = sx !== 0 && sx !== c.lastSx; c.lastSx = sx;   // the duel's right is the owner's right
  if (t < c.lock) {
    if (c.kind === 'block') { if (inp.bPressed) c.dummyPress = true; return; }
    if (c.kind === 'past') {
      if (!fresh) return;
      const shown = c.feintAt != null && t < c.feintAt ? c.open0 : c.open;   // the open side as the timer sees it now
      if (!c.taken) { c.taken = true; c.open = c.open0 = shown; c.feintAt = null; }   // the plan's feint is off: the guard follows his hand from here
      if (-sx !== c.open && c.changes < 2) { c.open0 = c.open; c.open = -sx; c.feintAt = t; c.changes++; }   // he guards the side he points at, with the feint's own animation; at most a feint and back
      return;
    }
    c.lean = clamp(sx || (inp.latch ? 0 : inp.jx), -1, 1);
    if (c.kind === 'pass') {
      if (fresh && !c.taken) { c.taken = true; c.drift = false; c.driftAt = null; c.fakeAt = null; }
      if (c.taken) {
        if (sx === c.side && !c.drift) { c.drift = true; c.driftAt = t; c.fakeAt = null; }       // held toward the runner: he drifts onto him, in plain view
        else if (sx !== c.side && c.drift) { c.drift = false; c.driftAt = null; c.fakeAt = t - 0.2; }   // let go before the lock: the drift was a fake, and he comes back
      }
      if (c.drift) c.lean = 0;
    } else if (c.kind === 'tackle' && fresh && !c.stepped) {   // one step, as the AI's: the contact, the window and the end move 0.10s later, the approach easing to the slower pace over the step
      c.stepped = true;
      if (!c.stepDir) { c.tk += 0.10; setWindow(c, c.centre + 0.10); }
      c.stepDir = sx; c.stepAt = t; c.tkAt = t; c.cam = null; sfx('whoosh');
    }
    return;
  }
  c.locked = true; c.lean = 0;                             // (the lock is no event of its own: a resume can land before it, and the choice stays fixed)
  if (c.kind === 'block' && (c.dummyPress || inp.bPressed) && !c.dummy) { c.dummy = true; c.rel = 1.05; c.tk = c.rel + 0.30; setWindow(c, c.tk); }   // the pump: one dummy, the real release at 1.05
}
function updateDuel(c, dt) {
  const t = c.t, input = inputOf(c.own);                   // the timer acts from the owner's slot
  if (M.two) duelOther(c, t);                              // the chooser's hand first, from the cut-in, so a release or a dummy on the lock step is settled before anything sounds
  if (t < DUEL_GRACE) { for (const inp of M.two ? [input] : humanSlots()) { inp.reanchor(); inp.flick = 0; } return; }   // the owner's stick is re-centred through the grace; the chooser's reads live from the cut-in (it was latched once there)
  if (c.feintAt != null && t >= c.feintAt && c.lastEvt < c.feintAt) { c.lastEvt = c.feintAt; sfx('whoosh'); }
  if (c.stepAt != null && t >= c.stepAt && c.lastEvt < c.stepAt) c.lastEvt = c.stepAt;
  for (const at of [c.driftAt, c.fakeAt]) if (at != null && t >= at && c.lastEvt < at) c.lastEvt = at;
  if (c.kind === 'block') {
    if (c.dummy && t >= 0.75 && c.lastEvt < 0.75) c.lastEvt = 0.75;
    if (t >= c.rel && c.lastEvt < c.rel) { c.lastEvt = c.rel; sfx('pass'); }
  }
  if (!c.opened && t >= c.win[0]) { c.opened = true; sfx('tick'); buzz(12, c.own); }
  let act = null;
  if (c.kind === 'past') {
    // a step is a fresh sideways flick of the re-anchored stick, or an arrow key pressed during the duel
    const jx = input.jx, jy = input.jy;
    (c.jxHist ||= []).push(jx); if (c.jxHist.length > 8) c.jxHist.shift();   // the last ~0.13 s
    const moved = jx - c.jxHist[0];
    if (!c.armed && Math.abs(jx) < 0.35) c.armed = true;
    if (input.flick) act = input.flick;
    else if (c.armed && Math.abs(jx) >= 0.6 && Math.abs(jx) > Math.abs(jy) && Math.abs(moved) >= 0.5 && Math.sign(moved) === Math.sign(jx)) act = Math.sign(jx);
  } else if (c.kind === 'pass') {
    if (input.aPressed) act = 'pass'; else if (input.bPressed) act = 'dummy';
  } else if (input.aPressed) act = 1;
  if (act == null && M.kids) act = kidsDuelAct(c, input);   // Kids: any press acts
  input.flick = 0;
  if (act != null) judgeDuel(c, act, t);
  else if (t > c.win[1]) judgeDuel(c, null, t);
}
function judgeDuel(c, act, t) {
  c.judged = t;
  let res = act == null ? 'late' : t < c.win[0] ? 'early' : Math.abs(t - c.centre) <= 0.2*c.wid ? 'perfect' : 'ok';
  if (M.kids) [res, act] = kidsDuel(c, res);              // Kids: never lost, a Perfect in the gold
  settle(c, res, act);
}
function settle(c, res, act) {
  c.res = res; c.act = act;
  const U = c.U, O = c.O, won = res === 'ok' || res === 'perfect';
  let out, verdict;
  if (c.kind === 'past') {
    if (won && act === c.open) { out = 'break'; verdict = 'Line Break'; }
    else if (won) { out = 'tackled'; verdict = 'Wrong Way'; }
    else if (rnd() < tackleChance(O, U, 'ai', res === 'early')) { out = 'tackled'; verdict = res === 'early' ? 'Too Early' : 'Too Late'; }
    else { out = 'broken'; verdict = 'Broken Tackle'; }
  } else if (c.kind === 'pass') {
    const right = c.drift ? 'dummy' : 'pass';
    if (won && act === right) { out = right === 'pass' ? 'drawn' : 'sold'; verdict = right === 'pass' ? 'Draw and Pass' : 'Dummy'; }
    else if (won && act === 'pass') { out = 'covered'; verdict = 'Covered'; }               // he'd drifted onto the runner
    else if (won || (res === 'early' && act === 'dummy') || res === 'late') {               // dummied a man coming at you, or held on
      if (rnd() < tackleChance(O, U, 'ai')) { out = 'tackled'; verdict = won ? 'Not Fooled' : res === 'early' ? 'Too Early' : 'Too Late'; }
      else { out = 'broken'; verdict = 'Broken Tackle'; }
    } else { out = 'early'; verdict = 'Too Early'; }
  } else if (c.kind === 'tackle') {
    if (won) { out = 'bighit'; verdict = matchMild() ? 'Stopped' : 'Big Hit'; }
    else if (rnd() < tackleChance(U, O, res === 'early' ? 'dive' : 'contact', O.side > 0)) { out = 'tackled'; verdict = res === 'early' ? 'Too Early' : 'Too Late'; }
    else { out = 'missed'; verdict = 'Missed'; }
  } else {
    if (won) { out = res === 'perfect' ? 'intercept' : 'knock'; verdict = res === 'perfect' ? 'Intercepted' : 'Knocked Down'; }
    else { out = 'pass'; verdict = res === 'early' ? 'Too Early' : 'Too Late'; }
  }
  c.out = out; c.verdict = verdict;
  const good = ['break', 'drawn', 'sold', 'bighit', 'intercept', 'knock'].includes(out);
  const ours = good || out === 'broken';
  c.good = good;
  if (good) { M.stats.duelsWon = (M.stats.duelsWon || 0) + 1; M.stats['w_' + c.kind] = (M.stats['w_' + c.kind] || 0) + 1; M.stats.duelN.won[c.own]++; }
  if (good && res === 'perfect' && c.kind !== 'block') M.stats.duelsPerfect = (M.stats.duelsPerfect || 0) + 1;
  M.duelLog.fails = good ? 0 : M.duelLog.fails + 1;
  if (M.two) { const SD = sideOf(c.own).duel; SD.fails = good ? 0 : SD.fails + 1; }   // the catch-up aid counts each owner's own failures
  if (good) sfx('cheer');
  if (['tackled', 'bighit'].includes(out)) { sfx('tackle'); buzz(25); }
  say(verdict, good ? '' : 'small', ours ? c.U.team : c.O.team, good && res === 'perfect' && c.kind !== 'block' ? 'Perfect' : null);
  if (M.duels === 'instant') { applyDuel(c); return; }
  c.skipAt = c.t + DUEL_SKIP;
  finishCut(() => applyDuel(c), Math.max(DUEL_OUTRO + (res === 'perfect' ? 0.1 : 0), c.endT - c.t));
}
function duelInstant(c) {
  let res = rnd() < INSTANT[levelOf(c.own)] ? (rnd() < (c.kind === 'block' ? 0.4 : 0.35) ? 'perfect' : 'ok') : (rnd() < 0.5 ? 'early' : 'late');
  let act = null;
  if (c.kind === 'past') {
    if (res === 'ok' || res === 'perfect') act = c.open;
    else if (rnd() < 0.3) { res = 'ok'; act = -c.open; }
    else if (res === 'early') act = rnd() < 0.5 ? -1 : 1;
  } else if (c.kind === 'pass') {
    const right = c.drift ? 'dummy' : 'pass', wrong = c.drift ? 'pass' : 'dummy';
    if (res === 'ok' || res === 'perfect') act = right;
    else if (rnd() < 0.3) { res = 'ok'; act = wrong; }
    else if (res === 'early') act = rnd() < 0.5 ? 'pass' : 'dummy';
  } else if (res !== 'late') act = 1;
  c.judged = c.centre;
  settle(c, res, act);
}
function put(p, P, carrier) { p.x = clamp(P.x, 0.5, 119.5); p.y = clamp(P.y, carrier ? 3 : 1.5, carrier ? 67 : 68.5); }
// hand the result back to the match, with everyone where the close-up left them
function applyDuel(c) {
  const own = c.own, inp = inputOf(own);
  if (c.kind === 'block' && c.out === 'intercept' && inp) inp.pre = { x:0, y:0 };   // the aim was at the lane; the run is upfield
  if (M.duels !== 'instant' && inp) inp.restore();
  const U = c.U, O = c.O, R = c.R, K = c.K, D = c.D, b = M.ball;
  const at = (k, lat) => toWorld(own, K.x + D.x*k, K.y + D.y*k + (lat || 0));   // a frame spot on the approach line, back in the world
  const face = (p, fx, fy) => { const v = frameVec(own, { x:fx, y:fy }); p.fx = v.x; p.fy = v.y; };
  if (R && c.kind !== 'block') { R.x += R.vx*c.dtau; R.y += R.vy*c.dtau; }
  switch (c.kind + ':' + c.out) {
    case 'past:break': {
      const o = c.open;
      put(U, at(1.3, 1.2*o), true); put(O, at(0, -0.6*o));
      O.down = 0.9; O.tcd = 1; O.vx = O.vy = 0;
      U.side = 0.35; artStepped(U, frameVec(own, { x:0, y:o }).y);   // he comes out of the close-up on the art's feint: render-only
      const m = hyp(1, 0.3); face(U, 1/m, 0.3*o/m);
      setBoost(U, ...(c.res === 'perfect' ? BURST.perfect : BURST.ok));
      U.autoDir = o;
      break;
    }
    case 'past:tackled': case 'pass:tackled':
      put(U, at(-0.4), true); put(O, at(0.4)); countTk(O.team, true); tackle(U, O); break;
    case 'past:broken': case 'pass:broken': {
      const lat = c.res === 'early' && c.act ? 0.8*c.act : 0;
      put(U, at(1.0, lat), true); put(O, at(0.4));
      U.side = 0.35; O.down = 0.5; O.tcd = 1; O.vx = O.vy = 0; M.stats.broken++; countTk(O.team, false);
      if (c.kind === 'past') artStepped(U, frameVec(own, { x:0, y:lat || 1 }).y);   // and here
      break;
    }
    case 'pass:drawn':
      put(U, at(-0.9), true); put(O, at(0.2)); O.down = 0.6; O.vx = O.vy = 0;
      b.x = U.x; b.y = U.y;
      doPass(U, R, { sure:true, boost:c.res === 'perfect' ? BURST.perfect : BURST.ok });
      break;
    case 'pass:sold': {
      // he went with the runner; you go through the gap he left
      put(U, at(1.3, -0.5*c.side), true); put(O, at(0.2, 1.2*c.side));
      O.down = 0.5; O.tcd = 1; O.vx = O.vy = 0;
      U.side = 0.35; U.fx = dirOf(own); U.fy = 0;
      setBoost(U, ...(c.res === 'perfect' ? BURST.perfect : BURST.ok));
      break;
    }
    case 'pass:covered': {
      // he sat on the runner; the pass goes, with him right there
      const dx = R.x - O.x, dy = R.y - O.y, m = hyp(dx, dy) || 1;
      O.x = R.x - dx/m*1.2; O.y = R.y - dy/m*1.2; O.vx = dx/m*6; O.vy = dy/m*6;
      b.x = U.x; b.y = U.y;
      doPass(U, R);
      break;
    }
    case 'pass:early': {
      const dx = R.x - O.x, dy = R.y - O.y, m = hyp(dx, dy) || 1;
      O.x += dx/m*1.5; O.y += dy/m*1.5; O.vx = dx/m*7; O.vy = dy/m*7;
      b.x = U.x; b.y = U.y;
      doPass(U, R);
      break;
    }
    case 'tackle:bighit':
      put(O, at(1.9), true); put(U, at(1.3));
      countTk(U.team, true); tackle(O, U, { dom:true, domP:DOM_TURN[c.res === 'perfect' ? 1 : 0] });
      U.down = 0.4; U.tcd = 0.4;
      break;
    case 'tackle:tackled':
      put(U, at(0.3)); put(O, at(0.9), true); countTk(U.team, true); tackle(O, U); break;
    case 'tackle:missed':
      put(U, toWorld(own, K.x, K.y)); U.down = 0.75; U.vx = U.vy = 0; put(O, at(-1.2), true); M.stats.broken++; countTk(U.team, false); break;
    case 'block:intercept':
      put(U, toWorld(own, K.x, K.y)); U.fx = dirOf(own); U.fy = 0;
      setCarrier(U); b.x = U.x; b.y = U.y;
      M.stats.intercepts++;
      setBoost(U, ...BURST.ok);
      if (R) { R.x += R.vx*c.dtau; R.y += R.vy*c.dtau; }
      break;
    case 'block:knock': {
      const Kw = toWorld(own, K.x, K.y), kv = frameVec(own, { x:-(3 + 2*rnd()), y:(rnd() - 0.5)*2 });   // the knock-down runs back along the owner's own direction
      b.state = 'loose'; b.carrier = null; b.f = null; b.x = Kw.x; b.y = Kw.y; b.z = 1;
      b.vx = kv.x; b.vy = kv.y; b.vz = 1.5; b.last = own; b.kickInfo = { team:own, ownHalf:false };
      put(U, toWorld(own, K.x - 0.5, K.y)); U.fx = -dirOf(own); U.fy = 0;   // half a metre back towards his own line
      setBoost(U, ...BURST.knock);
      break;
    }
    case 'block:pass':
      doPass(O, R, { skip:[U] }); break;
  }
}
function duelResume(c) {
  c.t = Math.max(c.lastEvt + 0.05, DUEL_GRACE, c.t - 0.25);
  if (c.t < c.win[0]) { c.opened = false; c.slowFrom = c.t; c.acc = 0; }   // the window's tick plays again, and the slow phase starts over from here
  for (const inp of humanSlots()) { inp.reanchor(); inp.held = new Set(); }
}
// canonical positions for tests and the console: __tryline.forceDuel('past'). The scene is laid out in the owner's frame and
// mirrored into the world for team 1 (stageDuel('past', 1) in a match with humans:[false, true]), so the two read the same duel
function stageDuel(kind, team) {
  const own = team || 0, P = M.players, b = M.ball, d = dirOf(own);
  const at = (p, fx, fy) => { const w = toWorld(own, fx, fy); p.x = w.x; p.y = w.y; };
  const run = (p, vx, vy, fx, fy) => { const v = frameVec(own, { x:vx, y:vy }); p.vx = v.x; p.vy = v.y; if (fx != null) { const f = frameVec(own, { x:fx, y:fy }); p.fx = f.x; p.fy = f.y; } };
  P.forEach((p, i) => { const j = p.team === own ? i - 7*own : i + 7*own; at(p, p.team === own ? 20 + j : 100 - j, 5 + (j % 7)*9); p.vx = p.vy = 0; p.down = 0; p.tcd = 0; p.side = -1; p.boost = 0; p.hold = 2; });
  const T0 = P.filter(p => p.team === own), T1 = P.filter(p => p.team !== own);
  M.phase = 'play'; M.set = null; M.cut = null; M.clock = 30; M.dclock = 100; M.hooter = false; for (const s of M.side) s.charging = false;
  M.duelLog = { last:-99, lastKind:null, lastOwner:null, half:[0, 0], bonus:[false, false], fails:0 };
  const input = inputOf(own) || inputs[0];
  input.jx = d; input.jy = 0;
  let U, O, R = null;
  if (kind === 'past' || kind === 'pass') {
    U = T0[0]; O = T1[0];
    at(U, 70, 35); run(U, 8, 0, 1, 0);
    at(O, 74.2, 35); run(O, -7, 0, -1, 0);
    if (kind === 'pass') { R = T0[1]; at(R, 68, 42); run(R, 8, 0); }
    setCarrier(U); U.hold = 2; b.x = U.x + d*0.55; b.y = U.y;
  } else if (kind === 'tackle') {
    U = T0[0]; O = T1[0];
    at(O, 50, 35); run(O, -7, 0, -1, 0);
    at(U, 46, 35); run(U, 3, 0, 1, 0);
    setCarrier(O); O.hold = 2; setCtrl(own, U); b.x = O.x - d*0.55; b.y = O.y;
  } else {
    U = T0[0]; O = T1[0]; R = T1[1];
    at(O, 50, 30); run(O, -4, 0, -1, 0);
    at(R, 54, 40); run(R, -4, 0);
    at(U, 51.8, 35.6); run(U, 0, 0, 1, 0);
    setCarrier(O); O.hold = 2; setCtrl(own, U); b.x = O.x; b.y = O.y;
  }
  for (const s of M.side) { s.ctrlPrev = s.ctrl; s.ctrlT = 1; }
  if (kind === 'tackle') { input.jx = d; input.jy = 0; }
  if (kind === 'block') { const L = toWorld(own, 51.2, 34.4), dx = L.x - U.x, dy = L.y - U.y, m = hyp(dx, dy); input.jx = dx/m; input.jy = dy/m; }
  return { U, O, R };
}
function forceDuel(kind, team) {
  const { U, O, R } = stageDuel(kind, team);
  if (kind === 'block') {
    const s = blockSpec(O, R) || (() => {
      const b = M.ball, P1 = { x:R.x + R.vx*0.4, y:R.y + R.vy*0.4 }, P0 = { x:b.x, y:b.y };
      return { kind:'block', U, O, R, P0, P1, L:{ x:(P0.x + P1.x)/2, y:(P0.y + P1.y)/2 } };
    })();
    return startDuel({ ...s, how:'force' });
  }
  return startDuel({ kind, U, O, R, how:'force' });
}

/* ---------- arcade ----------
   On Fire, the louder Big Hit and the Golden Try. Only a match you play has them (newMatch's opts.arcade, which startMatch
   passes): AI v AI, the demo, practice and the balance tools never do, so every sim and suite that ran before still runs the
   same. Both sides can go On Fire, the CPU included. The Golden Try is for Quick Match and Two Player: a championship is a
   league, and a league keeps its draws. */
const ARCADE = {
  fire:{ need:3, secs:12, speed:1.06, hands:0.5, pts:{ break:0, hit:1, turnover:1, try:2 } },   // 3 points unanswered (about two a match at the middle length) lights it for 12 match seconds: 6% quicker, half the handling errors. A try is worth two; a broken tackle (90-odd a match) only breaks the other side's run
  hit:{ jolt:0.12, stop:180, shake:0.28, hitShake:0.18 },    // your Big Hit: an extra 12% chance the ball spills, a 180ms freeze and a harder shake; taking one shakes too
  golden:{ len:0.5 },                                         // sudden-death extra time is half a half; still level at its hooter, the draw stands
};
const onFire = t => !!(M && M.arcade && M.fire[t].t > 0);
/* A good moment for side t: a broken tackle, a Big Hit, a turnover won or a try. Each breaks the other side's run; all but the broken tackle build this one's. */
function heat(t, why) {
  if (!M || !M.arcade) return;
  const F = M.fire[t], O = M.fire[1 - t];
  O.heat = 0;
  st('heat_' + why);
  if (F.t > 0) return;                                        // already alight: the run starts again when it goes out
  F.heat = Math.min(ARCADE.fire.need, F.heat + (ARCADE.fire.pts[why] || 0));
  if (F.heat < ARCADE.fire.need) return;
  F.heat = 0; F.t = ARCADE.fire.secs*staminaLasts(t); st('fire' + t);   // longer or shorter by the side's Stamina (src/stamina.js)
  say('On Fire', 'big fire', t); sfx('roar'); buzz(50, t);
}
function fireOut(t) { if (M && M.arcade) { M.fire[t].t = 0; M.fire[t].heat = 0; } }
function fireTick(dt) { if (M.arcade) for (const F of M.fire) if (F.t > 0) F.t = Math.max(0, F.t - dt); }

/* The Golden Try: level at the end of the second half, play on until somebody scores. */
const goldenOn = () => !!(M && M.arcade && !M.champ && !M.career);   // a career season is a league too
const periodLen = () => M.golden ? M.halfLen*ARCADE.golden.len : M.halfLen;
function startGolden() {
  M.half = 3; M.golden = true; M.clock = 0; M.hooter = false;
  for (const t of [0, 1]) fireOut(t);
  sfx('horn'); st('golden');
  kickoff(M.firstKick);
  say('Golden Try', 'big');
}
function goldenScored() { if (M.golden) M.hooter = true; }   // any score in extra time wins it: the next dead ball ends the match
/* ---------- stamina ----------
   The fifth ability (staminaOf in data.js reads it, 3 when a team has none). Only a match you play feels it: the same M.arcade as
   On Fire, which only startMatch sets, so AI v AI, the demo, practice and the balance tools read every side as they always have.
   Each side by its own Stamina:
   - Sprint: the meter lasts STAMINA.len longer for each point above 3 and that much shorter below (5: 20% longer, 1: 20% shorter).
   - On Fire burns longer or shorter by the same measure.
   - Power fades over each half, in a straight line from nothing at the kick-off to its fade at the hooter, and is back at half time;
     top speed fades the same way, a little (staminaPace, read by maxSpeed). The owner chose this over a separate Stamina budget so
     that Stamina is worth its point when you make a team;
     extra time starts fresh. Every engine read of a side's Power goes through powerOf: the tackle and the Big Hit, the ruck, the
     scrum (the push and the scrum played for you) and the Get Past and Tackle duel windows.
   simMatch, the championship's other fixtures, ignores Stamina as it ignores the rest of the open game. */
const STAMINA = { len:0.10, fade:[2.0, 0.2], pace:[0.05, 0] };   // fade: Power lost by the hooter at Stamina 1 and at 5, in a straight line between (3 loses 1.1); pace: the share of top speed lost by the hooter, the same way (3 loses 2.5%)
/* All consts, not function declarations: a name another section also uses stops the build instead of quietly replacing one. */
const staminaOn = () => !!(M && M.arcade);
const staminaLasts = t => (staminaOn() ? 1 + (staminaOf(M.nat[t]) - 3)*STAMINA.len : 1);   // how much longer side t's Sprint meter and On Fire last
const staminaFade = t => {                                 // the Power side t has lost so far this half
  if (!staminaOn()) return 0;
  const [at1, at5] = STAMINA.fade, most = at1 + (staminaOf(M.nat[t]) - 1)*(at5 - at1)/4;
  return most*clamp(M.clock/M.halfLen, 0, 1);
};
const powerOf = t => M.nat[t].power - staminaFade(t);      // side t's Power as the engine plays it now
const staminaPace = t => {                                 // side t's top-speed multiplier this far into the half: tired legs late on
  if (!staminaOn()) return 1;
  const [at1, at5] = STAMINA.pace, most = at1 + (staminaOf(M.nat[t]) - 1)*(at5 - at1)/4;
  return 1 - most*clamp(M.clock/M.halfLen, 0, 1);
};
/* ---------- ball in flight / loose ---------- */
function updateBallAir(dt) {
  const b = M.ball, f = b.f;
  if (f.kind === 'g3d') return updateG3d(dt);
  const px = b.x, py = b.y, pz = b.z;
  f.t += dt;
  const u = Math.min(1, f.t/f.T);
  b.x = f.x0 + (f.x1-f.x0)*u; b.y = f.y0 + (f.y1-f.y0)*u;
  b.z = f.z0 + (f.z1-f.z0)*u + 4*f.H*u*(1-u);
  b.vx = (f.x1-f.x0)/f.T; b.vy = (f.y1-f.y0)/f.T;
  if (f.kind === 'pass') {
    if (!f.sure) for (const q of M.players) {
      if (q.team === f.team || q.down > 0 || f.rolled.has(q)) continue;
      if (f.long && u > 0.18 && u < 0.82) continue;          // the loop is over the men in between; the contest is at the passer and the receiver
      if (hyp(q.x-b.x, q.y-b.y) < 1.1 && b.z < 2.3) {
        f.rolled.add(q);
        const pI = ringed(q) ? 0.4 : (cpuSide(q.team) ? diffOf(q.team).cpuIntercept : M.two ? DIFF[levelOf(f.team)].cpuIntercept : 0.18);   // an AI interceptor in two player reads at the passer's level, as the CPU does against a human
        if (rnd() < pI) { catchBall(q, 'intercept'); return; }
      }
    }
    if (u >= 1) resolvePass();
    return;
  }
  const d = dirOf(f.team);
  if (f.kind === 'kick') {                                 // an ordinary kick through the posts is a drop goal, judged by the one posts rule at the interpolated crossing
    const line = oppLine(f.team);
    if ((px-line)*d < 0 && (b.x-line)*d >= 0) {
      const s = (line - px)/(b.x - px), yc = py + s*(b.y - py), zc = pz + s*(b.z - pz);
      if (scores(judgeCross({ land:false, x:110, y:toFrame(f.team, line, yc).y, h:zc }))) { dropGoal(f.team); return; }
    }
  }
  if (b.y < 0 || b.y > 70) {
    const own22 = f.team === 0 ? f.x0 <= 32 : f.x0 >= 88;
    const lx = (f.kind === 'restart' || own22) ? b.x : f.x0;
    const full = f.kind === 'kick' && !own22;
    placeBall(b.x, clamp(b.y,0,70));
    deadBall(() => lineout(1-f.team, lx, b.y, full ? 'Out on the Full' : 'Into Touch'));
    return;
  }
  if (u > 0.45 && b.z < 2.7) {
    let best = null, bd = 1.6;
    for (const q of M.players) {
      if (q.down > 0 || (q.team === f.team && !f.onside.has(q))) continue;
      const dd = hyp(q.x-b.x, q.y-b.y); if (dd < bd) { bd = dd; best = q; }
    }
    if (best) { catchBall(best, 'kick'); return; }
  }
  if (u >= 1) {
    b.state = 'loose'; b.f = null;
    b.vx = (f.x1-f.x0)/f.T*0.32; b.vy = (f.y1-f.y0)/f.T*0.32; b.vz = 3.2; b.z = 0.01;
    sfx('bounce');
  }
}
function resolvePass() {
  const b = M.ball, f = b.f, tgt = f.target;
  if (f.sure && tgt && tgt.down <= 0 && hyp(tgt.x-b.x, tgt.y-b.y) < 3.5) {
    setCarrier(tgt); sfx('catch');
    if (f.boost) { tgt.fx = dirOf(tgt.team); tgt.fy = 0; setBoost(tgt, ...f.boost); }   // the burst goes upfield, not along his catching angle
    return;
  }
  if (tgt && tgt.down <= 0 && hyp(tgt.x-b.x, tgt.y-b.y) < 2.4) { catchBall(tgt, 'pass'); return; }
  let best = null, bd = 1.8;
  if (!f.sure) for (const q of M.players) { if (q.down > 0) continue; const dd = hyp(q.x-b.x, q.y-b.y); if (dd < bd) { bd = dd; best = q; } }
  if (best) { catchBall(best, best.team === f.team ? 'pass' : 'intercept'); return; }
  b.state = 'loose'; b.vx = (f.x1-f.x0)/f.T*0.25; b.vy = (f.y1-f.y0)/f.T*0.25; b.vz = 1.5; b.z = 0.9; b.f = null;
  say('Dropped', 'small'); sfx('fumble');
}
function updateLoose(dt) {
  const b = M.ball;
  const fr = Math.exp(-1.4*dt); b.vx *= fr; b.vy *= fr;
  b.x += b.vx*dt; b.y += b.vy*dt;
  b.vz -= 9.8*dt; b.z += b.vz*dt;
  if (b.z <= 0) {
    b.z = 0;
    if (Math.abs(b.vz) > 1.2) { sfx('bounce', Math.min(1, Math.abs(b.vz)/5)); b.vz = -b.vz*0.45; b.vx += (rnd()-0.5)*2.5; b.vy += (rnd()-0.5)*2.5; } else b.vz = 0;
  }
  if (b.y < 0 || b.y > 70) {
    const ki = b.kickInfo;
    let t = 1-b.last, reason = 'Into Touch';
    if (ki && ki.ownHalf && (ki.team === 0 ? b.x >= 88 : b.x <= 32)) { t = ki.team; reason = '50:22'; }
    const x = b.x, y = b.y;
    placeBall(x, clamp(y,0,70)); sfx('whistle');
    deadBall(() => lineout(t, x, y, reason));
    return;
  }
  if (b.x < 0 || b.x > 120) {
    const defTeam = b.x < 0 ? 0 : 1;
    placeBall(clamp(b.x,0,120), b.y); sfx('whistle');
    deadBall(() => dropOut(defTeam));
    return;
  }
  if (b.z < 1.0) {
    let best = null, bd = 1.1;
    for (const q of M.players) { if (q.down > 0) continue; const dd = hyp(q.x-b.x, q.y-b.y); if (dd < bd) { bd = dd; best = q; } }
    if (best) pickUp(best);
  }
}

/* ---------- team shape ---------- */
/* One runner is held on the open shoulder, still behind the ball. The rest of the line stays on the flat shelf.
   The open shoulder is the side the nearest defender up on the ball is not on; head-on, it is the side with more
   room to touch. He slides wider, then a little deeper, while a defender is inside SUPPORT.clear — never forward,
   and never outside the Key Pass box. The stick still picks the man; the ring only shows whether that man is free. */
function supportSlots(fx, fy, d, n, depth, skipNear) {
  const out = [];
  for (const k of [1,-1,2,-2,3,-3,4,-4,5,-5,6,-6,7,-7,8,-8,9,-9]) {
    if (out.length >= n) break;
    if (skipNear && k === skipNear) continue;             // the near slot on the open side: the held runner stands there instead
    const y = fy + k*6.5; if (y < 3 || y > 67) continue;
    out.push({ x:clamp(fx - d*(depth + 1.3*Math.abs(k)), 1, 119), y });
  }
  while (out.length < n) out.push({ x:clamp(fx - d*depth, 1, 119), y:clamp(fy,3,67) });
  return out;
}
function shoulderRoom(fy, sign) { return sign > 0 ? 67 - fy : fy - 3; }
function openShoulder(fx, fy, d, team) {                   // +1 is +y. 0 when neither touch leaves room for a shoulder
  let best = null, bd = 1e9, side = 0;
  for (const q of M.players) {
    if (q.team === team || !onFeet(q) || q.offside > 0) continue;
    const dx = (q.x - fx)*d; if (dx < -2.5) continue;     // behind the ball: not guarding a shoulder
    const dy = q.y - fy, dd = hyp(dx, dy);
    if (dd > 16 || dd >= bd) continue;
    bd = dd; best = q; side = dy;
  }
  let sign = best && Math.abs(side) >= 1.5 ? (side > 0 ? -1 : 1) : ((70 - fy) >= fy ? 1 : -1);
  if (shoulderRoom(fy, sign) < 4.5 && shoulderRoom(fy, -sign) >= 4.5) sign = -sign;
  return shoulderRoom(fy, sign) >= 4.5 ? sign : 0;
}
function shoulderPoint(fx, fy, d, open, team) {            // where the held runner stands: in space, on that shoulder, behind the ball
  if (!open) return null;
  let lat = SUPPORT.lat, back = SUPPORT.back, best = null, bestC = -1;
  for (let i = 0; i < 14; i++) {
    const y = clamp(fy + open*lat, 3, 67), x = clamp(fx - d*back, 1, 119);
    const gotLat = (y - fy)*open, gotBack = (fx - x)*d;
    if (gotLat < 4 || gotBack < 1) break;                 // a clamp that pulled him off the shoulder, or in front of the ball
    let clear = 99;
    for (const q of M.players) if (q.team !== team && onFeet(q)) clear = Math.min(clear, hyp(q.x - x, q.y - y));
    if (clear > bestC) { bestC = clear; best = { x, y, lat:gotLat, back:gotBack }; }
    if (clear >= SUPPORT.clear) return best;
    if (lat < SUPPORT.latMax - 0.01) lat = Math.min(SUPPORT.latMax, lat + 1.2);
    else if (back < SUPPORT.backMax - 0.01) back = Math.min(SUPPORT.backMax, back + 0.6);
    else break;
  }
  return best;
}
function holdShoulder(A, fx, fy, d, team) {                // the attacker already in that channel, held on the point. Null keeps the flat shelf
  const open = openShoulder(fx, fy, d, team), pt = shoulderPoint(fx, fy, d, open, team);
  if (!pt || !A.length) return null;
  let holder = null, by = 1e9, bx = 1e9;
  for (const p of A) {
    const dy = Math.abs(p.y - pt.y), dx = Math.abs(p.x - pt.x);
    if (dy < by - 1e-6 || (Math.abs(dy - by) <= 1e-6 && dx < bx)) { by = dy; bx = dx; holder = p; }
  }
  return holder ? { holder, at:pt, skip:open } : null;
}
function assignByY(T, arr, slots, lx = 0) {              // lx: an upfield lead on every slot (the line running on while a pass is in the air)
  const a = arr.slice().sort((p,q) => p.y-q.y), s = slots.slice().sort((p,q) => p.y-q.y);
  a.forEach((p,i) => { const t = s[i] || s[s.length-1]; if (t) T.set(p, { x:clamp(t.x + lx, 1, 119), y:t.y, s:maxSpeed(p) }); });
}
/* A line break: the men still goal-side come up instead of holding the sweeper's depth.
   Easy commits only when he is the last man, and slower, so a break near the line can still be finished.
   Normal and Hard bring the last two. The angle is onto the inside shoulder, which turns the run toward touch. */
const COVER = { last:[1, 2, 2], speed:[0.90, 0.98, 1], acc:[12, 15, 18], inside:[2.2, 2.8, 3.2], ahead:[0.6, 1.0, 1.4] };
function commitPoint(p, carrier, lv, dA) {
  const room = Math.min(carrier.y, 70 - carrier.y);
  const drifting = Math.abs(carrier.y - 35) < 4;
  const inside = drifting ? (Math.abs(carrier.vy) > 0.4 ? (carrier.vy > 0 ? -1 : 1) : (p.y >= carrier.y ? 1 : -1)) : (carrier.y < 35 ? 1 : -1);
  const gap = dist(p, carrier);
  const depth = (p.x - carrier.x) * dA;                         // goal-side of the carrier is positive
  const wide = room < 6 ? 0.35 : clamp(room / 14, 0.45, 1);     // already near touch: shut the short side rather than overshoot it
  const shade = COVER.inside[lv] * wide * clamp((gap - 1.6) / 8, 0, 1);   // the angle is for the run in; the last metres are at the man
  // Close, or he has stepped level: go at the body. A point ahead of the carrier is how he runs past the tackle.
  if (gap < 4.2 || depth < 2.2) return { x:clamp(carrier.x, 1, 119), y:clamp(carrier.y + inside * shade, 2, 68) };
  // Still in front: the earliest spot on the carrier's line he can reach, a touch goal-side so he arrives in the tackle and not a stride late.
  const sp = Math.max(0.5, maxSpeed(p) * COVER.speed[lv]);
  let t = gap / sp;
  for (let i = 0; i < 5; i++) {
    const tx = carrier.x + carrier.vx * t + dA * COVER.ahead[lv], ty = carrier.y + carrier.vy * t + inside * shade;
    t = clamp(hyp(tx - p.x, ty - p.y) / sp, 0.08, 3.2);
  }
  return {
    x: clamp(carrier.x + carrier.vx * t + dA * COVER.ahead[lv], 1, 119),
    y: clamp(carrier.y + carrier.vy * t + inside * shade, 2, 68),
  };
}
function assignMarks(T, D, pts, dA, fx, fy, lineX, mode, sweep) {
  if (!D.length) return;
  let rest = D.slice();
  if (sweep !== false && rest.length >= 4) {
    const own = dA > 0 ? 110 : 10;
    let fbx = fx + dA*(mode === 'kick' ? 10 : 18);
    fbx = dA > 0 ? Math.min(fbx, own+3) : Math.max(fbx, own-3);
    const fby = 35 + (fy-35)*0.5;
    const fb = nearestOf(rest, fbx, fby);
    T.set(fb, { x:clamp(fbx,1,119), y:fby, s:maxSpeed(fb)*0.85 });
    rest = rest.filter(p => p !== fb);
  }
  const ps = pts.slice().sort((a,b) => hyp(a.x-fx, a.y-fy) - hyp(b.x-fx, b.y-fy)).slice(0, rest.length);
  for (const off of [7,-7,14,-14,21,-21,28,-28,35,-35]) {
    if (ps.length >= rest.length) break;
    const y = fy + off; if (y >= 3 && y <= 67) ps.push({ x:fx, y });
  }
  while (ps.length < rest.length) ps.push({ x:fx, y:clamp(fy,3,67) });
  ps.sort((a,b) => a.y-b.y); rest.sort((a,b) => a.y-b.y);
  rest.forEach((p,i) => {
    const a = ps[i]; let x;
    if (lineX != null) x = lineX;
    else if (mode === 'kick') x = a.x + dA*7;
    else { x = a.x + dA*4.5; x = dA > 0 ? Math.max(x, fx+2.5) : Math.min(x, fx-2.5); }
    T.set(p, { x:clamp(x,1,119), y:clamp(a.y + (fy-a.y)*0.12, 2, 68), s:maxSpeed(p)*0.86 });
  });
}
function matchTargets() {
  const T = new Map(), b = M.ball, P = M.players;
  const uc = new Set(); for (const t of [0, 1]) if (userActive(t)) uc.add(ctrlOf(t));   // the men under a human's ring drive themselves
  const free = p => p.down <= 0 && !uc.has(p) && !p.bind;
  if (M.phase === 'goal' || (M.phase === 'set' && (M.set.kind === 'try' || M.set.kind === 'score'))) {
    for (const p of P) T.set(p, { x:p.x, y:p.y, s:0 });
    return T;
  }
  if (M.phase === 'set' && (M.set.kind === 'kickoff' || M.set.kind === 'dropout')) {
    for (const p of P) T.set(p, { x:p.hx, y:p.hy, s:5 });
    return T;
  }
  let att, fx, fy, mode, carrier = null;
  if (M.phase === 'set') { att = M.set.team; fx = M.set.x; fy = M.set.y; mode = 'set'; }
  else if (b.state === 'held') { carrier = b.carrier; att = carrier.team; fx = carrier.x; fy = carrier.y; mode = 'held'; }
  else if (b.state === 'air' && b.f.kind === 'pass') { att = b.f.team; fx = b.f.x1; fy = b.f.y1; mode = 'pass'; }
  else if (b.state === 'air') { att = 1-b.f.team; fx = b.f.x1; fy = b.f.y1; mode = 'kick'; }
  else { att = 1-b.last; fx = b.x; fy = b.y; mode = 'kick'; }
  const dA = dirOf(att);
  let A = P.filter(p => p.team === att && free(p)), D = P.filter(p => p.team !== att && free(p));
  if (mode === 'kick') {
    for (const side of [A, D]) {
      const s = side.slice().sort((p,q) => hyp(p.x-fx, p.y-fy) - hyp(q.x-fx, q.y-fy));
      for (const p of s.slice(0,2)) T.set(p, { x:fx, y:fy, s:maxSpeed(p), a:16 });
    }
    A = A.filter(p => !T.has(p)); D = D.filter(p => !T.has(p));
  } else if (mode === 'pass') {
    const r = b.f.target; if (r && free(r)) { T.set(r, b.f.sure ? { x:fx, y:fy, s:maxSpeed(r), a:18 } : runOnTarget(r, b.f, passPace(b.f.team))); A = A.filter(p => p !== r); }   // an AI receiver runs onto it at his side's pace; a sure pass keeps its seek
  } else if (mode === 'held') {
    A = A.filter(p => p !== carrier);
  } else {
    const k = M.set.kind, m = playFrom(att, fx, fy, k);
    const sx = clamp(m.x, 1, 119), sy = m.y;
    const pin = k === 'ruck' && M.set.picker && M.set.picker.team === att && onFeet(M.set.picker) ? M.set.picker : null;   // he keeps the half-back mark, so the rest of the shape is the one it was
    const sh = pin || nearestOf(A, sx, sy);
    if (sh) { T.set(sh, { x:sx, y:sy, s:maxSpeed(sh) }); A = A.filter(p => p !== sh); }
  }
  const depth = mode === 'set' ? ((M.set.kind === 'scrum' || M.set.kind === 'lineout') ? 5 : 3) : SUPPORT.back;
  const pod = (mode === 'held' || mode === 'pass') ? holdShoulder(A, fx, fy, dA, att) : null;   // one runner on the open shoulder; a set piece keeps the flat shelf
  const rest = pod ? A.filter(p => p !== pod.holder) : A;
  const slots = supportSlots(fx, fy, dA, rest.length, depth, pod ? pod.skip : 0);
  const lead = mode === 'pass' && b.f.target ? dA*maxSpeed(b.f.target)*0.95*RUNON.line : 0;   // the line keeps running while the ball is in the air, instead of pulling up round the landing spot
  assignByY(T, rest, slots, lead);
  if (pod) T.set(pod.holder, { x:clamp(pod.at.x + lead, 1, 119), y:pod.at.y, s:maxSpeed(pod.holder) });
  let sweep = true;
  if (mode === 'held') {
    const live = D.filter(p => !(p.offside > 0));                  // a retiring tackler is never the chaser, and never the man who comes up
    const depthOf = p => (p.x - carrier.x) * dA;
    const L = levelOf(att), lv = L === 0 || L === 2 ? L : 1;         // how hard the defence is for this attacker: his side's level
    const quota = COVER.last[lv];
    const ahead = live.filter(p => depthOf(p) > 0.8);               // still goal-side: a formed line, or the last men of a break
    const stepped = live.filter(p => { const z = depthOf(p); return z > -4 && z <= 0.8; }).sort((a, b) => depthOf(b) - depthOf(a));
    let committers = [];
    if (ahead.length > 0 && ahead.length <= quota) {               // through the line: those men come up, and one who has just drawn level stays on the commit
      committers = ahead.slice();
      for (const p of stepped) { if (committers.length >= quota) break; committers.push(p); }
    } else if (ahead.length === 0 && stepped.length > 0 && stepped.length <= quota) committers = stepped.slice();
    const taken = new Set();
    const chase = p => {
      const lead = clamp(dist(p, carrier) / 9, 0, 0.7);
      T.set(p, { x:carrier.x + carrier.vx*lead, y:carrier.y + carrier.vy*lead, s:maxSpeed(p), a:15, pursue:true });
      taken.add(p);
    };
    if (committers.length) {
      sweep = false;                                                // nobody is posted to the 18m station once the line is broken
      const commitSet = new Set(committers);
      const behind = live.filter(p => !commitSet.has(p)).sort((a, b) => dist(a, carrier) - dist(b, carrier));
      const ch = [];
      if (behind[0]) ch.push(behind[0]);
      for (const q of behind.slice(1, 3)) if (dist(q, carrier) < 5.5) ch.push(q);
      for (const p of ch) chase(p);
      for (const p of committers) {
        const to = commitPoint(p, carrier, lv, dA);
        T.set(p, { x:to.x, y:to.y, s:maxSpeed(p)*COVER.speed[lv], a:COVER.acc[lv], pursue:true });
        taken.add(p);
      }
    } else {
      const s = live.slice().sort((a, b) => dist(a, carrier) - dist(b, carrier));
      const ch = [];
      if (s[0]) ch.push(s[0]);
      for (const q of s.slice(1, 3)) if (dist(q, carrier) < 5.5) ch.push(q);
      for (const p of ch) chase(p);
    }
    D = D.filter(p => !taken.has(p));
  } else if (mode === 'pass') {
    const c = nearestOf(D, fx, fy);
    if (c) { T.set(c, { x:fx + dA*1.2, y:fy, s:maxSpeed(c), a:15, pursue:true }); D = D.filter(p => p !== c); }
  }
  const pts = (mode === 'held' || mode === 'pass')
    ? P.filter(p => p.team === att && p.down <= 0 && p !== carrier).map(p => ({ x:p.x, y:p.y }))
    : slots;
  const lineX = mode === 'set' ? fx + dA*(SETGAP[M.set.kind] || 5) : null;
  assignMarks(T, D, pts, dA, fx, fy, lineX, mode, sweep);
  for (const p of P) if (p.bite > 0 && p.biteTo && T.has(p)) { const r = p.biteTo; T.set(p, { x:r.x + r.vx*0.3, y:r.y + r.vy*0.3, s:maxSpeed(p), a:15, pursue:true }); }   // a sold Dummy: he runs at the man the pass was shown to
  return T;
}

/* ---------- AI ball carrier ---------- */
function aiCarrier(p, dt) {
  if (p.drop) { steer(p, 0, 0, 12, dt); if ((p.drop.t -= dt) <= 0) cpuDropStrike(p); return; }   // winding up a drop goal: he checks his run and strikes it on the half-volley
  const d = dirOf(p.team), n = M.nat[p.team];
  let ax = d, ay = 0, near = 99;
  for (const q of M.players) {
    if (q.team === p.team || q.down > 0) continue;
    const dx = (q.x-p.x)*d, dy = q.y-p.y, dd = hyp(dx,dy);
    if (dd < near) near = dd;
    if (dx > 0 && dd < 9) { const w = (9-dd)/9; ay += (dy > 0 ? -1 : 1)*w*1.0; }
  }
  if (p.y < 8) ay += (8-p.y)*0.25;
  if (p.y > 62) ay -= (p.y-62)*0.25;
  const toLine = (oppLine(p.team)-p.x)*d;
  if (toLine < 12) ay += (35-p.y)*0.015;
  const m = hyp(ax,ay) || 1, sp = maxSpeed(p)*0.95;
  steer(p, ax/m*sp, ay/m*sp, 15, dt);
  if (near < 3 && p.side <= -0.9 && rnd() < dt*0.9*n.handling/5) { p.side = 0.35; const s = rnd() < 0.5 ? -1 : 1; p.vy += s*MOVES.step.cpuPush; artStepped(p, s); }
  p.think -= dt; if (p.think > 0) return; p.think = 0.15;
  if (p.hold < 0.5) return;
  const KD = MOVES.dummy, lv = levelOf(p.team);
  if (KD.cpu[lv] > 0 && isHuman(1 - p.team) && p.side <= -0.9 && M.dclock - p.dumAt >= KD.cd) {   // the CPU's Dummy, only against a human and only where cpu[level] > 0: AI v AI and Normal draw nothing here
    let fa = 99; for (const q of M.players) if (q.team !== p.team && onFeet(q) && (q.x - p.x)*d > 0) fa = Math.min(fa, dist(q, p));
    if (fa >= KD.cpuRange[0] && fa <= KD.cpuRange[1]) { const r = bestReceiver(p); if (r && rnd() < KD.cpu[lv]) { p.dumAt = M.dclock; dummyPass(p, r.q); return; } }
  }
  if (p.quick && p.hold > 0.4) {
    p.quick = false;
    if (rnd() < 0.85) { const r = bestReceiver(p); if (r) { doPass(p, r.q); return; } }
  }
  const fromOwn = (p.x-ownLine(p.team))*d;
  if (p.fromKick) { p.fromKick = false; if (fromOwn < 40 && rnd() < 0.5) { aiKick(p, 'territory'); return; } }
  if (fromOwn < 22 && near < 8 && rnd() < 0.45) { aiKick(p, 'clear'); return; }
  if (toLine < 30 && toLine > 6 && Math.abs(p.y-35) < 13 && M.phaseCount >= 2 && cpuDropOffer(p) && rnd() < 0.07) { aiKick(p, 'drop'); return; }   // the same offer rule as yours, from his side
  if (fromOwn < 45 && near > 5 && M.phaseCount >= 3 && rnd() < 0.03) { aiKick(p, 'territory'); return; }
  if (near < 2.6 || (p.hold > 2.4 && rnd() < 0.15)) {
    const r = bestReceiver(p);
    if (r && r.space > near + 2 && rnd() < 0.6) {
      const nearMan = pickReceiver(p, 0);                     // the man a flat pass would find; a long one skips him when he is crowded and the next man is in space
      const nxt = nearMan && pressure(nearMan) < 2.2 ? pickLong(p, 0, nearMan) : null;
      if (nxt && pressure(nxt) > pressure(nearMan) + 2) passOrBlock(p, nxt, { long:true });
      else passOrBlock(p, r.q);
    }
  }
}

/* ---------- the user's player ---------- */
function userMove(p, dt, inp) {
  const j = inp.world(), b = M.ball;
  const ms = maxSpeed(p)*(b.carrier === p ? 0.95 : 1);
  if (b.state === 'air' && b.f.kind === 'pass' && b.f.target === p) {   // a pass to him: he runs onto it whatever the stick says, and the stick takes over at the catch
    if (b.f.sure) { seek(p, b.f.x1, b.f.y1, ms, 22, dt); return; }     // a won Key Pass keeps its seek
    const r = runOnTarget(p, b.f, passPace(p.team)); seek(p, r.x, r.y, r.s, 22, dt, true); return;
  }
  if (b.carrier === p && p.boost > 0 && j.mag < 0.3) { const m = hyp(1, 0.3*p.autoDir), v = frameVec(p.team, { x:ms/m, y:ms*0.3*p.autoDir/m }); steer(p, v.x, v.y, 20, dt); return; }   // the burst runs upfield, autoDir to the owner's right
  steer(p, j.x*ms, j.y*ms, 20, dt);                       // the Side Step and the Dummy are read in gestureStep, from the slot's history, not here
}
function throwUserPass(c, shown) {
  sideOf(c.team).pass = null;
  if (!shown || !shown.to) { say('No Support', 'small'); return; }
  passOrBlock(c, shown.to, { long:!!shown.gold });          // the other side's human may get a Block on it
}
function startUserPass(c) {                                // a tap (no hold) is today's pass; a finger still down starts the charge. Inside the catch gate the press is kept, not dropped.
  const S = sideOf(c.team), inp = inputOf(c.team), to = pickReceiver(c, inp.world().y);
  if (!inp.aDown) {
    S.pass = { mode:'tap', to, t:0 };
    if (c.hold >= LONG.gate) throwUserPass(c, shownPass(c));
    return;
  }
  S.pass = { mode:'hold', to, t:0 };
}
function tickUserPass(t, dt) {
  const S = sideOf(t), p = S.pass;
  if (!p) return;
  const b = M.ball, c = ctrlOf(t), inp = inputOf(t);
  const carrying = c && M.phase === 'play' && b.state === 'held' && b.carrier === c && !c.bind;
  if (!carrying || inp.aCancel) { S.pass = null; return; }
  if (p.mode === 'tap') { if (c.hold >= LONG.gate) throwUserPass(c, shownPass(c)); return; }
  p.t += dt;
  if (!inp.aDown) {
    if (c.hold < LONG.gate) { p.to = shownPass(c).to; p.mode = 'tap'; return; }   // let go inside the gate: it still goes, to the man the ring showed
    throwUserPass(c, shownPass(c));
    return;
  }
  if (p.t >= LONG.auto && c.hold >= LONG.gate) throwUserPass(c, shownPass(c));
}
function userKick(t, power) {
  const c = ctrlOf(t);
  doKick(c, power, inputOf(t).world().y);
}
function canDive(q) {                                      // would a Tackle press act now: a carrier of the other side within 2.8m, and this man up, off cooldown, not retiring and unbound
  const b = M.ball, c = b.state === 'held' ? b.carrier : null;
  if (!q || !c || c.team === q.team || !onFeet(q) || q.tcd > 0 || q.offside > 0 || dist(q, c) >= 2.8) return false;
  return !c.bind || (!c.bind.q2 && c.bind.q !== q);
}
function userTackle(t) {                                   // the Tackle press for the human on side t: a dive, an Ankle Tap from behind, or joining a bind; beyond reach it does nothing
  const q = ctrlOf(t), b = M.ball;
  if (practice && practice.tagOnly) { drillTagPull(q); return; }   // the youngest pull a tag: no dive
  if (!canDive(q)) { st('ignored'); if (practice && practice.id === 'defend') drillWhiff(q); return; }   // a press with nothing in reach costs a moment in that drill, so the timing counts
  const c = b.carrier;
  if (dropHolding(c)) { st('ignored'); return; }   // he is about to drop for goal: the close-up judges you as a charger
  if (c.bind) { joinTackle(c.bind, q); return; }
  const behind = (q.x - c.x)*dirOf(c.team) < -0.3;
  const dx = c.x-q.x, dy = c.y-q.y, m = hyp(dx,dy) || 1;
  q.vx = dx/m*9; q.vy = dy/m*9;
  commitTackle(q, c, behind ? 'ankle' : 'dive');
}
function switchMark(t) {                               // where "behind the ball" is judged. The carrier, when they have it (the ball sits half a metre in front of his hands). The ball itself on their pass or kick. Nothing on a loose ball: there is no line to be behind
  const b = M.ball;
  if (b.state === 'held' && b.carrier && b.carrier.team !== t) return { x:b.carrier.x, y:b.carrier.y, d:dirOf(b.carrier.team) };
  if (b.state === 'air' && b.f && b.f.team !== t && (b.f.kind === 'pass' || b.f.kind === 'kick')) return { x:b.x, y:b.y, d:dirOf(b.f.team) };
  return null;
}
function switchTarget(t) {                                // the one man the dashed ring, the press and the pulse agree on. Nearest the ball, or the second-nearest when that is already you. When your man is behind the ball, the nearest teammate still in front
  const b = M.ball, cur = ctrlOf(t);
  const list = M.players.filter(p => p.team === t && onFeet(p)).sort((p, q) => hyp(p.x-b.x, p.y-b.y) - hyp(q.x-b.x, q.y-b.y));
  if (!list.length) return null;
  const m = switchMark(t);
  if (cur && m && (cur.x - m.x)*m.d < -0.3) {             // behind: the attack is past him, the same 0.3m an Ankle Tap calls behind. Still in front: level, or goal-side
    const front = list.find(p => p !== cur && (p.x - m.x)*m.d >= -0.3);
    if (front) return front;
  }
  const pick = (list[0] === cur && list[1]) ? list[1] : list[0];
  return pick === cur ? null : pick;
}
function switchUseful(t) {                                // worth pulsing, the way Offload pulses: your man is behind the ball and the man in the ring can still meet it. A switch onto someone already beaten stays quiet
  if (!M || M.phase !== 'play' || M.cut || ourBall(t)) return false;
  const q = switchTarget(t), cur = ctrlOf(t), m = switchMark(t);
  return !!(q && cur && m && (cur.x - m.x)*m.d < -0.3 && (q.x - m.x)*m.d >= -0.3);
}
function switchPlayer(t) {
  const q = switchTarget(t);
  if (q) setCtrl(t, q);
}
/* Phase A reads every human slot's edges; Phase B resolves the side in possession first (the carrier's team, the passer's team
   while a pass is in the air, M.poss otherwise), then the other, each in today's order: A, the pass in hand, B, Sprint, then the
   charge. One player has one side, so nothing moves; in two player a pass and a dive pressed on the same step resolve the same
   way whichever seat pressed. */
/* ---------- open-play moves: the Side Step and the Dummy (see MOVES) ---------- */
function sideStep(c, j, s) {                               // the carrier steps toward s (the flick's sign across the pitch), darting along the stick
  const K = MOVES.step;
  c.side = K.side; c.vx += j.x*K.push; c.vy += j.y*K.push;
  M.stats.steps = (M.stats.steps || 0) + 1; st('steps' + c.team);
  if (ringed(c)) tag('Side Step', c.x, c.y);
  sfx('whoosh'); buzz(15, c.team);
  artStepped(c, s);                                        // the art's feint: render-only, nothing else reads it
}
function dummyPass(c, r) {                                 // c shows a pass to r and keeps the ball: the nearest standing AI defender ahead may buy it. False when there is nobody to sell
  const K = MOVES.dummy, t = c.team, d = dirOf(t);
  if (!r) return false;
  let q = null, bd = K.range[1];
  for (const o of M.players) { if (o.team === t || !onFeet(o) || ringed(o) || (o.x - c.x)*d < -0.5) continue; const dd = dist(o, c); if (dd >= K.range[0] && dd < bd) { bd = dd; q = o; } }
  if (!q) return false;
  st('dummies' + t);
  sfx('whoosh');
  if (rnd() < K.bite[levelOf(t)]) {                        // he bites: wrong-footed, drifting onto the runner, no tackle for a moment
    q.wf = Math.max(q.wf, K.wf); q.tcd = Math.max(q.tcd, K.tcd);
    q.vy += (Math.sign(r.y - q.y) || 1)*K.shove;
    q.bite = K.drift; q.biteTo = r;
    st('sold' + t);
    tag('Dummy', c.x, c.y); buzz(15, t);
  } else if (isHuman(t)) tag('Not Fooled', c.x, c.y);
  return true;
}
const dirKeyHeld = (inp, d) => { for (const code of inp.keys) { const k = KEYDIR[code]; if (k && (d == null || keyFwd(inp, k)*d < 0)) return true; } return false; };   // any direction key, or (with d) one pointing back toward his own line
function gestureStep(t, dt) {                              // one human side's open-play gestures, read once a step from its slot's history
  const inp = inputOf(t), c = ctrlOf(t), b = M.ball, S = sideOf(t), KS = MOVES.step, KD = MOVES.dummy;
  const peak = inp.latPeak; inp.latPeak = null;            // consumed this step, carrying or not, so a flick from a cut can't finish on the next carry
  const G = inp.gest || (inp.gest = { who:null, n:-9, L:[], gap:[], armed:true, run:0, lastRun:0, dropT:-9, pull:null, keyed:false, kb:false, v:null, t:0, tagAt:0, tagged:null });   // the Dummy's cooldown is not kept here: it is the carrier's (c.dumAt, on the match clock), so a lifted thumb, a pause or a duel's restore can't reset it
  G.t += dt;
  if (G.tagged && G.t - G.tagAt <= 0.15 && (S.pass || (b.state === 'air' && b.f.kind === 'pass' && b.f.team === t))) { const i = M.tags.indexOf(G.tagged); if (i >= 0) M.tags.splice(i, 1); G.tagged = null; }   // Pass inside 0.15s of a step: that flick was an aim, so the tag comes off
  const carrying = M.phase === 'play' && !!c && b.state === 'held' && b.carrier === c && !c.bind && !inp.aDown && !inp.bDown && !S.charging;
  if (!carrying) { G.who = null; return; }
  if (G.who !== c || G.n !== M.stepN - 1) { G.who = c; G.L.length = 0; G.gap.length = 0; G.armed = true; G.run = 0; G.lastRun = 0; G.dropT = -9; G.pull = null; G.keyed = false; G.kb = false; G.v = null; }   // a new carrier, or any step he was not carrying in open play (a cut, a set piece, the ball in the air): the history starts again
  G.n = M.stepN;
  const j = inp.world(), d = dirOf(t);
  let jx = j.x, jy = j.y, L = jy, mag = j.mag;
  if (typeof peak === 'number' && !inp.keys.size && Math.abs(peak) > Math.abs(jy)) { jy = peak; L = peak; mag = Math.max(mag, Math.abs(peak)); }   // a flick Chrome coalesced into one move: the peak across the run, not the sample that landed back near centre
  const F = jx*d;
  // the Side Step: a sharp rise across the run inside the window, armed
  G.L.push(L); G.gap.push(stepGap); if (G.L.length > KS.win + 3) { G.L.shift(); G.gap.shift(); }   // the thumb lives in real time whatever the pace, so the window is real time too: a slower match must not make a slower thumb a flick
  if (Math.abs(L) < KS.rearm) G.armed = true;              // the investigation's re-arm: back inside rearm first (a key switch passes through 0; a thumb crosses the centre in a few steps)
  if (G.armed && Math.abs(L) >= KS.L && mag >= KS.mag) {
    const s = Math.sign(L), W = KS.win/60; let lo = s*L, back = 0;
    for (let i = G.L.length - 1; i > 0 && back < W - 1e-9; i--) {   // back through the samples to the window's real start, the far one read part way along. At a step a frame this is simply the last win steps
      const gap = G.gap[i] ?? 1/60, f = back + gap <= W + 1e-9 ? 1 : (W - back)/gap;
      lo = Math.min(lo, s*(G.L[i] + (G.L[i - 1] - G.L[i])*f)); back += gap;
    }
    if (s*L - lo >= KS.rise) {
      G.armed = false;                                     // the flick is spent whether or not it acts: outside a tackler's reach it is steering
      if (c.side <= -0.9 && c.hold >= KS.since && pressure(c) < KS.range) { sideStep(c, { x:jx, y:jy }, s); G.tagged = M.tags[M.tags.length - 1] || null; G.tagAt = G.t; }
    }
  }
  // the Dummy: a held run, a quick pull back, and the push on
  const keyHeld = dirKeyHeld(inp), backKey = dirKeyHeld(inp, d);
  if (F >= KD.fwd) { G.run += dt; if (G.pull == null) G.v = { x:c.vx, y:c.vy }; G.keyed = keyHeld; }   // his pace before the pull, not the push-on step's (already slowed)
  else { if (G.run > 0) { G.lastRun = G.run; G.dropT = G.t; G.kb = false; } G.run = 0; }
  if (G.pull == null && F <= KD.back && G.t - G.dropT <= KD.drop && G.lastRun >= KD.hold) G.pull = G.t;
  if (G.pull != null) { if (backKey) G.kb = true; if (keyHeld) G.keyed = true; if (G.t - G.pull > KD.ret) G.pull = null; }
  if (G.pull != null && G.t > G.pull && F >= KD.on) {
    G.pull = null; G.lastRun = 0;
    if ((!G.keyed || G.kb) && M.dclock - c.dumAt >= KD.cd) { const v = G.v; if (dummyPass(c, shownPass(c).to)) { c.dumAt = M.dclock; if (v) { c.vx = v.x; c.vy = v.y; } } }   // on keys the pull must have been the back key itself; the cooldown is the carrier's, on the match clock, as the CPU's is
  }
}
/* Phase A reads every human slot's edges; Phase B resolves the side in possession first (the carrier's team, the passer's team
   while a pass is in the air, M.poss otherwise), then the other, each in today's order: A, the pass in hand, B, Sprint, then the
   charge. One player has one side, so nothing moves; in two player a pass and a dive pressed on the same step resolve the same
   way whichever seat pressed. The open-play gestures are read last, once a step for each human side. */
function handleUser(dt) {
  if (M.auto) return;
  const b = M.ball, I = [null, null];
  for (const t of [0, 1]) {
    const inp = inputOf(t); if (!inp) continue;
    I[t] = { a:inp.aPressed, b:inp.bPressed, c:inp.cPressed };
    inp.aPressed = inp.bPressed = inp.cPressed = false;
  }
  const poss = b.state === 'held' ? b.carrier.team : (b.state === 'air' && b.f.kind === 'pass') ? b.f.team : M.poss;
  for (const t of [poss, 1 - poss]) if (I[t]) userStep(t, I[t], dt);
  for (const inp of inputs) inp.aCancel = inp.bCancel = inp.cCancel = false;
  for (const t of [0, 1]) if (inputOf(t)) gestureStep(t, dt);
  if (M.kids) for (const t of [0, 1]) kidsSwitch(t);      // Kids: the ring finds your best defender
}
function userStep(t, i, dt) {
  const b = M.ball, c = ctrlOf(t), S = sideOf(t), inp = inputOf(t);
  if (M.phase === 'set' && M.set && M.set.kind === 'ruck') { S.pass = null; if (S.charging) { S.charging = false; S.charge = 0; } return; }   // Pass, Kick and Tackle stay dead until the ball is out
  if (i.a) {
    if (inp.aCancel) S.pass = null;
    else if (M.phase === 'play' && c) {
      if (b.state === 'held' && b.carrier === c) { if (c.bind) { S.pass = null; offload(c.bind, true); } else startUserPass(c); }   // held in a tackle, Pass is the offload, on the press
      else if (!ourBall(t)) { S.pass = null; userTackle(t); }
    }
  }
  tickUserPass(t, dt);
  if (i.b && !inp.bCancel) {
    if (M.phase === 'play' && b.state === 'held' && b.carrier === c && !c.bind) { S.charging = true; S.charge = 0; S.holdN = 0; M.dropArmed[t] = dropPress(c); }   // what the label promised at the press
    else if (M.phase === 'play' && !ourBall(t)) switchPlayer(t);
  }
  if (i.c && !inp.cCancel && c) sprintPress(t);                            // the hold itself is read by sprintTick
  if (S.charging) {
    if (!(M.phase === 'play' && b.state === 'held' && b.carrier === c) || inp.bCancel || c.bind) { S.charging = false; S.charge = 0; }   // a cancelled touch is never a kick, and a man held in a tackle can't kick
    else {
      S.charge = Math.min(1, S.charge + dt/0.85); S.holdN++;
      if (!inp.bDown) { const pw = S.charge; S.charging = false; S.charge = 0; userKick(t, pw); }   // a tap is a chip, as ever
      else if (M.dropArmed[t] && S.holdN >= holdSteps()) startDropCut(c);   // a Drop Goal press held 0.20s (holdSteps steps, the press step the first): the close-up, with the thumb still down. The label is not run again: what it said at the press is what you get
    }
  }
}

/* ---------- the step ---------- */
function moveAll(dt) {
  const b = M.ball;
  const T = computeTargets();
  const snap = M.phase === 'set' && M.set.snap;
  const ua = [userActive(0), userActive(1)];
  for (const p of M.players) {
    if (p.bind) { bindMove(p, dt); continue; }
    if (p.down > 0) { p.down -= dt; steer(p, 0, 0, 16, dt); continue; }
    if (ua[p.team] && ringed(p)) {
      const inp = inputOf(p.team);
      if (M.phase === 'set' && M.set && M.set.kind === 'ruck' && M.set.picker === p && inp.world().mag < 1e-6) {
        const t = T.get(p);                                     // the stick let go: he still runs onto the ball, as he did before the ring moved
        if (t) { seek(p, t.x, t.y, t.s, t.a || 13, dt, t.pursue); continue; }
      }
      if (M.kids && kidsChase(p, inp, dt)) continue;           // Kids: let go of the stick and he chases on his own
      userMove(p, dt, inp); continue;                          // any deflection places him until the ball is out
    }
    if (M.phase === 'play' && b.state === 'held' && b.carrier === p) { aiCarrier(p, dt); continue; }
    const t = T.get(p);
    if (!t) { steer(p, 0, 0, 10, dt); continue; }
    if (snap && hyp(t.x-p.x, t.y-p.y) > 12) { p.x = t.x + (rnd()-0.5)*1.5; p.y = t.y + (rnd()-0.5)*1.5; p.vx = p.vy = 0; }
    seek(p, t.x, t.y, t.s, t.a || 13, dt, t.pursue);
  }
  if (snap) M.set.snap = false;
  let carryX = null, carryTeam = -1;
  const carrying = M.phase === 'play' && b.state === 'held' ? b.carrier : null;   // metres made: ground gained with the ball, after the shove of this step
  for (const p of M.players) {
    if (p === carrying) { carryX = p.x; carryTeam = p.team; }
    p.x += p.vx*dt; p.y += p.vy*dt;
    const sp = hyp(p.vx, p.vy);
    if (sp > 0.6) { p.fx = p.vx/sp; p.fy = p.vy/sp; }
    else if (b.carrier !== p) {
      const dx = b.x-p.x, dy = b.y-p.y, m = hyp(dx,dy);
      if (m > 0.5) { p.fx += (dx/m-p.fx)*0.12; p.fy += (dy/m-p.fy)*0.12; const n = hyp(p.fx,p.fy) || 1; p.fx /= n; p.fy /= n; }
    }
    if (p.tcd > 0) p.tcd -= dt;
    if (p.offside > 0) p.offside -= dt;
    if (p.sprinting) p.sprint = Math.min(SPRINT.fade, p.sprint + dt); else if (p.sprint > 0) p.sprint -= dt;   // the burst climbs while held, eases out when not
    if (p.stumble > 0) p.stumble -= dt;
    if (p.wf > 0) p.wf -= dt;
    if (p.bite > 0) p.bite -= dt;
    if (p.boost > 0) p.boost -= dt;
    if (p.grace > 0) p.grace -= dt;                        // the moment after a catch: see PASS_FLIGHT
    if (p.side > -1) p.side -= dt;
    p.hold += dt;
    p.x = clamp(p.x, -4, 124);
    if (b.carrier !== p) p.y = clamp(p.y, -3, 73);
  }
  collide();
  if (carryX != null && b.state === 'held' && b.carrier && b.carrier.team === carryTeam) M.stats.gain[carryTeam] += (b.carrier.x - carryX)*dirOf(carryTeam);
}
function computeTargets() {
  const targets = matchTargets();
  if (practice && practice.id === 'defend') for (const p of M.players) {
    if (p.team === 0 && p !== ctrlOf(0)) targets.set(p, { x:p.x, y:p.y, s:0 });
  }
  return targets;
}
function update(dt) {
  if (practice && practice.demo && demoStep(dt)) return;   // Watch How: the pilot writes the input first, or the world holds (drill-demo.js)
  if (practice) dt *= drillRate();                         // a drill runs at its own pace, the world and its clocks together; a match is untouched
  if (!(practice && practice.space)) matchUpdate(dt);      // a training space has no match flow: its drill moves the men and the ball (training.js)
  practiceTick(dt);
  if (practice && practice.demo) demoSync();               // the ghost shows what the input holds after the step
}
function matchUpdate(dt) {
  if (!M || M.phase === 'break' || M.phase === 'menu' || M.paused || M.over) return;
  M.stepN++;                                               // every step, close-ups included: gestureStep reads it to see a gap in a man's carry
  if (M.phase === 'cut') { updateCut(dt); return; }
  const b = M.ball;
  if (M.surge && (M.surge.t -= dt) <= 0) M.surge = null;
  fireTick(dt);
  const clockOn = M.phase === 'play' || (M.phase === 'set' && M.set.kind !== 'try' && M.set.kind !== 'score');
  if (clockOn) {
    M.clock += dt; M.dclock += dt;
    if (!M.hooter && M.clock >= periodLen()) { M.hooter = true; if (!M.demo) { say('Last Play'); sfx('horn'); } }
  }
  handleUser(dt);
  if (M.phase === 'cut') return;                           // a drop goal's close-up opened on this step: the world is frozen from here
  contactGuard(); sprintTick(dt);
  for (const s of M.side) { if (s.ctrl !== s.ctrlPrev) { s.ctrlPrev = s.ctrl; s.ctrlT = 0; } else s.ctrlT += dt; }
  moveAll(dt);
  if (M.phase === 'play') {
    if (b.state === 'held') {
      const c = b.carrier;
      b.x = c.x + c.fx*0.55; b.y = c.y + c.fy*0.55; b.z = 1.0;
      if (M.contact) contactStep(c, dt); else if (!carrierChecks(c) && !duelCheck(c)) tackleChecks(c);
    } else if (b.state === 'air') updateBallAir(dt);
    else if (b.state === 'loose') updateLoose(dt);
    if (M.phase === 'play' && M.hooter && !M.demo && M.clock > periodLen() + 45) endHalf();
  } else if (M.phase === 'set') {
    M.set.t -= dt;
    if (M.set.t <= 0) { const s = M.set; M.set = null; M.phase = 'play'; s.then(s); }
  } else if (M.phase === 'goal') updateGoal(dt);
  if (M.duelPending) startPendingDuel();
}

/* ---------- halves ---------- */
function endHalf() {
  placeBall(M.ball.x, M.ball.y);
  for (const s of M.side) s.charging = false;
  if (M.demo) { M.clock = 0; M.hooter = false; kickoff(rnd() < 0.5 ? 0 : 1); return; }
  sfx('long');
  if (M.half === 1) {
    if (M.headless) { secondHalf(); return; }
    M.phase = 'break'; showBreak('half');
  } else if (M.half === 2 && goldenOn() && M.score[0] === M.score[1]) {
    startGolden();                                         // level: sudden death, straight from the hooter
  } else {
    M.phase = 'break'; M.over = true;
    if (!M.headless) finishMatch();
  }
}
function secondHalf() { M.half = 2; M.clock = 0; M.hooter = false; M.wind.a += Math.PI; kickoff(1-M.firstKick); }   // you always attack +x, so the wind turns instead of the ends

/* =========================================================
   Championship
   ========================================================= */
function roundRobin(teams) {
  const ids = teams.slice(), n = ids.length, rounds = [];
  for (let r = 0; r < n-1; r++) {
    const pairs = [];
    for (let i = 0; i < n/2; i++) { const a = ids[i], b = ids[n-1-i]; pairs.push(r % 2 ? [b,a] : [a,b]); }
    rounds.push(pairs);
    ids.splice(1, 0, ids.pop());
  }
  return rounds;
}
function poisson(l) { const L = Math.exp(-l); let k = 0, p = 1; do { k++; p *= rnd(); } while (p > L); return k-1; }
function simMatch(c, h, a) {                              // pace, power, handling and kicking only: Stamina is left out on purpose, so simulated fixtures read as they always have
  const H = c.teams[h], A = c.teams[a];
  const atk = n => (n.pace + n.handling)/2, def = n => (n.power + n.handling)/2;
  const ht = poisson(clamp(2.5 + (atk(H)-def(A))*0.6 + 0.25, 0.5, 5));
  const at = poisson(clamp(2.5 + (atk(A)-def(H))*0.6, 0.5, 5));
  const pts = (n, t) => { let s = t*5; for (let i = 0; i < t; i++) if (rnd() < 0.5 + n.kicking*0.06) s += 2; return s + poisson(1.2 + n.kicking*0.2)*3; };
  return { h, a, hs:pts(H, ht), as:pts(A, at), ht, at };
}
/* Six teams: yours and five others. The championship keeps its own copy, so editing a team later can't change one under way.
   The five are whoever was passed in (at the team screen: champOthers). You play the weakest of them first and the
   strongest last: circle position 0 stays put and meets position 5, then the new position 5, each round. */
const champSide = ({ league, place, w, d, l, pf, pa, level, ...side }) => ({ ...side });   // the league line is read from the list, never saved; nor is a made team's level, which only the builder reads
function newChamp(user, others) {
  if (practice) return;
  retainCompletedSeason(champ);
  const five = others.slice(0, 5);
  const ranked = five.map((t, i) => ({ i:i + 1, r:rateOf(t) })).sort((a, b) => a.r - b.r || a.i - b.i);
  const order = [0, ranked[4].i, ranked[3].i, ranked[2].i, ranked[1].i, ranked[0].i];
  champ = { id:'season-' + Date.now().toString(36) + '-' + (++seasonSerial).toString(36), user:0, teams:[user, ...five].map(champSide), round:0, fixtures:roundRobin(order), results:[] };
  save();
}
/* Who a side plays, from the list on screen. The Six Nations stays those six; any other side on International plays the
   five nations nearest in rating; every other list is a random draw. g: the men's or the women's list, so all six are the same side. */
function champOthers(t, pool, g = teamSide(t) === 1 ? 1 : 0) {
  if (pool === IMPORT_POOL) return importOthers(t, g);
  if (pool === 0) {
    const six = g ? womenSix() : NATIONS;
    return six.includes(t) ? shuffle(six.filter(o => o !== t)) : nationsNearest(t, g);
  }
  const base = t.key ? t : ALL_TEAMS.find(o => o.id === t.id) || t, rest = shuffle(POOLS[pool].filter(o => o !== base));
  return g ? rest.map(womenClub) : rest;
}
function userFixture(c) {
  const pair = c.fixtures[c.round].find(p => p[0] === c.user || p[1] === c.user);
  return { pair, opp: pair[0] === c.user ? pair[1] : pair[0] };
}
function standings(c) {
  const rows = c.teams.map((n,i) => ({ i, P:0, W:0, D:0, L:0, PF:0, PA:0, TF:0, BP:0, Pts:0, gs:false }));
  for (const rd of c.results) for (const r of rd) {
    const H = rows[r.h], A = rows[r.a];
    H.P++; A.P++; H.PF += r.hs; H.PA += r.as; A.PF += r.as; A.PA += r.hs; H.TF += r.ht; A.TF += r.at;
    if (r.hs > r.as) { H.W++; A.L++; H.Pts += 4; if (r.hs-r.as <= 7) A.BP++; }
    else if (r.hs < r.as) { A.W++; H.L++; A.Pts += 4; if (r.as-r.hs <= 7) H.BP++; }
    else { H.D++; A.D++; H.Pts += 2; A.Pts += 2; }
    if (r.ht >= 4) H.BP++;
    if (r.at >= 4) A.BP++;
  }
  for (const r of rows) { r.Pts += r.BP; if (r.P === 5 && r.W === 5) { r.Pts += 3; r.gs = true; } r.PD = r.PF - r.PA; }
  rows.sort((a,b) => b.Pts-a.Pts || b.PD-a.PD || b.TF-a.TF);
  return rows;
}
function honours(c, rows) {
  const out = [['Champions', rows[0].i, true]];
  const gs = rows.find(r => r.gs); if (gs) out.push(['Grand Slam', gs.i, true]);
  const all = c.results.flat();
  const beat = (x, y) => all.some(r => (r.h === x && r.a === y && r.hs > r.as) || (r.a === x && r.h === y && r.as > r.hs));
  const home = c.teams.map((t, i) => t.home ? i : -1).filter(i => i >= 0);   // the Triple Crown needs all four home nations
  if (home.length === 4) for (const h of home) if (home.every(o => o === h || beat(h, o))) out.push(['Triple Crown', h, false]);
  out.push(['Wooden Spoon', rows[rows.length-1].i, false]);
  return out;
}
function matchPoints(us, them, ourTries) {
  let p = 0; const why = [];
  if (us > them) { p += 4; why.push('Win'); } else if (us === them) { p += 2; why.push('Draw'); } else if (them-us <= 7) { p += 1; why.push('Losing Bonus'); }
  if (ourTries >= 4) { p += 1; why.push('Try Bonus'); }
  return { p, why };
}
/* The chase is the table talking. The points are the ones standings() already awards: 4 a win, 2 a draw,
   a try bonus at 4, a losing bonus within 7, and 3 for a grand slam once all five are won. A side's best
   return from here is a win and a try bonus from every game left (5), plus the slam if it is still unbeaten.
   Nothing here is a new rule, and a match in progress is still not stored. */
const CHASE_WIN = 5, CHASE_DRAW = 3, CHASE_GS = 3;
function ordinal(n) { return n + (n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'); }
function ptsWord(n) { return n === 1 ? 'point' : 'points'; }
function maxPoints(row, left) {
  if (left <= 0) return row.Pts;
  return row.Pts + left * CHASE_WIN + (row.W === row.P ? CHASE_GS : 0);
}
/* What another side can still reach once the user's next result is decided. share is the points that
   result gives the side the user plays (a close win still leaves them the losing bonus), or null for
   everyone else, who can still take their best. A win for the user is not a win for them, so the slam
   dies on it. Claiming the title only when this still leaves you clear never pretends two other sides
   can both win the game they play against each other. */
function otherCeiling(row, left, share) {
  if (left <= 0) return row.Pts;
  if (share == null) return maxPoints(row, left);
  return row.Pts + share + (left - 1) * CHASE_WIN + (share >= 4 && row.W === row.P ? CHASE_GS : 0);
}
function userOpponent(c) {
  if (!c || c.round >= 5) return -1;
  return userFixture(c).opp;
}
function clearsAll(c, rows, gain, oppShare) {
  const left = 5 - c.round, me = rows.find(r => r.i === c.user), opp = userOpponent(c);
  const gs = gain >= 4 && left === 1 && me.W === me.P ? CHASE_GS : 0;
  const mine = me.Pts + gain + gs;
  return rows.every(r => r.i === c.user || mine > otherCeiling(r, left, r.i === opp ? oppShare : null));
}
function chaseFacts(c, rows) {
  const left = 5 - c.round;
  const place = rows.findIndex(r => r.i === c.user);
  const me = rows[place];
  const others = rows.filter(r => r.i !== c.user);
  const neighbour = place === 0 ? rows[1] : rows[0];   // the gap is to second when you lead, and to the leader when you don't
  const gap = neighbour ? (place === 0 ? me.Pts - neighbour.Pts : neighbour.Pts - me.Pts) : 0;
  const clinched = left > 0 && me.Pts > Math.max(...others.map(r => maxPoints(r, left)));
  const alive = maxPoints(me, left) >= Math.max(...others.map(r => r.Pts));
  return { left, place, me, neighbour, gap, clinched, alive, bar: Math.max(...others.map(r => r.Pts)) };
}
function positionPhrase(c, f) {
  const ord = ordinal(f.place + 1);
  if (!f.neighbour) return ord;
  if (f.gap === 0) return ord + ', level on points with ' + c.teams[f.neighbour.i].name;
  return f.place === 0
    ? ord + ', ' + f.gap + ' ' + ptsWord(f.gap) + ' clear'
    : ord + ', ' + f.gap + ' ' + ptsWord(f.gap) + ' behind';
}
function splitBy(ahead, behind) {
  if (ahead.Pts !== behind.Pts) return null;
  if (ahead.PD !== behind.PD) return 'points difference';
  if (ahead.TF !== behind.TF) return 'tries';
  return null;
}
function chaseTitle(c, rows) {
  if (c.round < 5) return 'Round ' + (c.round + 1) + ' of 5';
  const mine = new Set(honours(c, rows).filter(h => h[1] === c.user).map(h => h[0]));
  if (mine.has('Grand Slam')) return 'Grand Slam';
  if (mine.has('Champions')) return 'Champions';
  if (mine.has('Triple Crown')) return 'Triple Crown';
  if (mine.has('Wooden Spoon')) return 'Wooden Spoon';
  return ['Runners-Up', '3rd', '4th', '5th'][rows.findIndex(r => r.i === c.user) - 1] || 'Final Table';
}
function finishLine(c, rows) {
  const name = c.teams[c.user].name;
  const mine = new Set(honours(c, rows).filter(h => h[1] === c.user).map(h => h[0]));
  const place = rows.findIndex(r => r.i === c.user);
  const me = rows[place];
  if (mine.has('Grand Slam')) return name + ' win the Grand Slam' + (mine.has('Triple Crown') ? ' and the Triple Crown' : '');
  if (mine.has('Champions')) {
    let line = name + ' win the championship' + (mine.has('Triple Crown') ? ' and the Triple Crown' : '');
    const next = rows[1];
    if (next && next.Pts === me.Pts) { const how = splitBy(me, next); if (how) line += ', ahead on ' + how; }
    return line;
  }
  if (mine.has('Triple Crown')) return name + ' take the Triple Crown, and finish ' + ordinal(place + 1);
  if (mine.has('Wooden Spoon')) return name + ' take the Wooden Spoon';
  const champRow = rows[0], gap = champRow.Pts - me.Pts;
  if (gap === 0) {
    const how = splitBy(champRow, me);
    return name + ' finish ' + ordinal(place + 1) + ', level with ' + c.teams[champRow.i].name + (how ? ', behind on ' + how : '');
  }
  return name + ' finish ' + ordinal(place + 1) + ', ' + gap + ' ' + ptsWord(gap) + ' short of ' + c.teams[champRow.i].name;
}
function fixtureStake(c, rows) {
  if (!c || c.round >= 5) return '';
  const f = chaseFacts(c, rows);
  if (f.left === 1 && f.me.W === 4 && f.me.W === f.me.P) return 'For the Grand Slam';
  if (f.clinched) return '';
  if (clearsAll(c, rows, 2, 3)) return 'A draw is enough';
  if (clearsAll(c, rows, 4, 1)) return 'A win takes the title';
  if (clearsAll(c, rows, 5, 1)) return 'A try-bonus win takes the title';
  const withWin = f.me.Pts + CHASE_WIN + (f.left - 1) * CHASE_WIN + (f.me.W === f.me.P ? CHASE_GS : 0);
  if (f.me.Pts + CHASE_DRAW + (f.left - 1) * CHASE_WIN < f.bar && withWin >= f.bar) return 'Must win to stay in it';
  return '';
}
function chaseLine(c, rows) {
  if (c.round >= 5) return finishLine(c, rows);
  if (c.round === 0) return 'Five rounds. Top the table.';
  const f = chaseFacts(c, rows);
  if (f.clinched) return 'Champions, with ' + (f.left === 1 ? 'a round' : f.left + ' rounds') + ' to play';
  const pos = positionPhrase(c, f);
  if (!f.alive) return pos + ', and out of the title';
  if (f.place === 0 || fixtureStake(c, rows)) return pos;
  return pos + '. Still in it';
}
function champNote(c) {
  const name = c.teams[c.user].name;
  if (c.round >= 5) return name + ' · ' + chaseTitle(c, standings(c));
  if (c.round === 0) return name + ' · Round 1 of 5';
  const rows = standings(c), f = chaseFacts(c, rows);
  return name + ' · ' + (f.clinched ? 'Champions' : ordinal(f.place + 1)) + ' · Round ' + (c.round + 1) + ' of 5';
}
function recordChampResult() {
  if (!champ || champ.round >= 5 || !M || !M.champ || M.demo || M.two || practice || M.champResultDone) return;
  const c = champ, { pair } = userFixture(c);
  const userHome = pair[0] === c.user;
  const mine = userHome
    ? { h:pair[0], a:pair[1], hs:M.score[0], as:M.score[1], ht:M.tries[0], at:M.tries[1] }
    : { h:pair[0], a:pair[1], hs:M.score[1], as:M.score[0], ht:M.tries[1], at:M.tries[0] };
  const S = M.stats, detail = {};
  if (S && !M.headless) {
    for (const key of ['conv', 'pen', 'dg', 'tk', 'duelN']) {
      const made = key === 'duelN' ? 'won' : 'made';
      detail[key] = { att:S[key]?.att?.[0], [made]:S[key]?.[made]?.[0] };
    }
    detail.gain = S.gain?.[0];
    const valid = cleanSeasonStats(detail);
    if (valid) mine.stats = valid;
  }
  const rd = [mine];
  for (const p of c.fixtures[c.round]) if (p !== pair) rd.push(simMatch(c, p[0], p[1]));
  M.champResultDone = true;
  c.results.push(rd);
  c.round++;
  save();
}


/* Scores cover every round; detailed totals cover only matches with a saved full-time card. */
function seasonSummary(c = champ) {
  const out = { played:0, won:0, drawn:0, lost:0, pointsFor:0, pointsAgainst:0, triesFor:0, triesAgainst:0, detailedMatches:0, legacyMatches:0,
    stats:{ conv:{att:0,made:0}, pen:{att:0,made:0}, dg:{att:0,made:0}, tk:{att:0,made:0}, duelN:{att:0,won:0}, gain:0 } };
  if (!c) return out;
  for (const rd of c.results) for (const r of rd) {
    if (r.h !== c.user && r.a !== c.user) continue;
    const home = r.h === c.user, us = home ? r.hs : r.as, them = home ? r.as : r.hs;
    out.played++; out[us > them ? 'won' : us < them ? 'lost' : 'drawn']++;
    out.pointsFor += us; out.pointsAgainst += them;
    out.triesFor += home ? r.ht : r.at; out.triesAgainst += home ? r.at : r.ht;
    const detail = cleanSeasonStats(r.stats);
    if (!detail) { out.legacyMatches++; continue; }
    out.detailedMatches++;
    for (const key of ['conv', 'pen', 'dg', 'tk', 'duelN']) for (const field in out.stats[key]) out.stats[key][field] += detail[key][field];
    out.stats.gain += detail.gain;
  }
  return out;
}
function retainCompletedSeason(c) {
  if (practice || !c || c.round !== 5) return false;
  const valid = cleanChamp(c);
  if (!valid || champHistory.some(old => old.id === valid.id)) return false;
  c.id = valid.id;
  champHistory.push(valid);
  champHistory = champHistory.slice(-SEASON_LIMIT);
  return true;
}
function archiveChampionship(c = champ) {
  const added = retainCompletedSeason(c);
  if (added) save();
  return added;
}
/* Counts describe only the retained completed seasons, rather than an all-time record. */
function savedHonours() {
  const out = { seasons:champHistory.length, champions:0, grandSlams:0, tripleCrowns:0, woodenSpoons:0 };
  const keys = { Champions:'champions', 'Grand Slam':'grandSlams', 'Triple Crown':'tripleCrowns', 'Wooden Spoon':'woodenSpoons' };
  for (const c of champHistory) for (const h of honours(c, standings(c))) if (h[1] === c.user) out[keys[h[0]]]++;
  return out;
}
/* =========================================================
   Career: one player, from the minis to the national team.

   The rules, all of them here:
   - Five stages, each a season of the championship's shape (six sides, five rounds, three games a round): Minis,
     Juniors, County, Pro Club, International. Only your game is played; the other two are drawn by simMatch, as in a
     championship. Points are the championship's (4 a win, bonus points, 3 for a grand slam).
   - Minis and Juniors are your club against five other Local clubs drawn at random, every side at a lower rating worked
     out from its own, so sides stay different: Minis 40 to 46, one and two stars, Juniors 46 to 55 (CAREER_CUT). County is Surrey against five invented county
     sides, a little above it. Pro Club is the city side you sign for (drawn when you go up from the lists a step above the counties, and only a side that is not above its rivals: careerSign) against five others from its list. International is your country (picked from every nation
     when you are called up), at its own rating: a Six Nations side against the other five, any other against the five
     nations nearest in rating. The strongest comes last either way.
   - Your player's look and Male or Female (cr.look) go on your squad entry in the match. Minis is mixed (CAREER_STAGES[].age against
     MIXED_THROUGH); from Juniors on every side is your player's: a female player's clubs are women's sides and the country list the
     women's nations at the women's ratings. A save from before this has no look: it stays men's, with its country, in every season.
   - Promotion at the end of a season: finish in the top two, or reach the stage's bar with your overall rating
     (CAREER_STAGES[].bar). Otherwise you play the stage again, against a new draw. A finished International season
     ends the career, whatever the table says.
   - Your player has a 1 to 99 rating in each ability (Pace, Power, Handling, Kicking, and Stamina even before the
     teams have it). The overall is the team cards' overallOf on the same 40 to 99 scale.
   - Skills rise from training (one session a round, between matches: a drill's stars give points to its skill,
     CAREER_TRAIN) and a little from what your player does in a match (CAREER_DEEDS, capped a match).
   - In a career match only (M.career, set by careerArm after startMatch), your player wears a star in the kit's trim. The
     star means your player and the ring means who you control now, and only one of each is drawn. The ring starts on
     him at every kick-off and moves with Switch and passes, he takes your side's goal kicks, and his skills shade HIS
     speed, catching, tackling, kicking and stamina from the team's baseline (CAREER_SHADE). Every engine site reads
     the side's own value unless M.career is set, and careerNatOf, careerAbility, careerFade and careerSprintDrain add
     the shade for your player only, so no other match and no other man changes.
   - The career keeps its own seasons in `career` (persistence.js), never in `champ` or champHistory. Championship
     helpers that take the season as an argument (roundRobin, simMatch, standings, userFixture) are reused; the ones
     that read the global champ (newChamp, recordChampResult, retainCompletedSeason) never are.
   ========================================================= */
const CAREER_STAGES = [
  { id:'minis', name:'Minis', bar:64, age:10 },       // age: the stage's age group, against MIXED_THROUGH
  { id:'juniors', name:'Juniors', bar:70, age:14 },
  { id:'county', name:'County', bar:77 },
  { id:'pro', name:'Pro Club', bar:85 },
  { id:'intl', name:'International', bar:null },   // the last stage: one season, then the career is over
];
const CAREER_UP = 2;                                 // the top two go up
/* How much harder the other side plays at each stage: the share of the step from Normal's levers to Hard's (DIFF), added to the level you chose, so each stage is a step whichever you play on. Minis is as chosen, and Hard, already the hardest, stays as it is. A Kids match keeps its own terms. */
const CAREER_PUSH = [0, 0.08, 0.15, 0.25, 0.55];
/* Minis and Juniors: a club's ability sum read on to a lower range. from: what a side at the Local floor (sum 5, 40 overall) plays at; per: how many of its points make one here; top: the most here, so Twickenham and a team you made
   at a high level play as the best of the stage. Minis 5 to 7 is 40 to 46; Juniors 7 to 10 is 46 to 55, under the counties. */
const CAREER_CUT = [{ from:5, per:3, top:7 }, { from:7, per:2, top:10, up:1 }];   // up: the points your rivals have on you at this stage, under the same top, so going up is a step up (README, the career ladder)
const careerCutSum = (sum, c, up = 0) => Math.min(c.top, c.from + up + Math.ceil(Math.max(0, sum - ABILITIES.length)/c.per));
/* Invented county sides: county names, made-up kits and ratings. The abilities written here are each side's flavour; every side
   comes out four points under them, and never under Local's best, so 58 to 64 overall: between the Local list (58 at the top) and the top flights (64 at the foot). Surrey, yours, is at the foot: you go up to meet them.
   Overall doesn't settle how a stage plays: Pace counts for more than the others, so what Surrey is good at matters
   as much as its 58 (README, Ratings from real results). Surrey is yours. */
const CAREER_COUNTIES = [
  { id:'SUR', name:'Surrey',    kit:'#2a3d8f', trim:'#f2b01e', pace:4, power:3, handling:3, kicking:3, stamina:3 },   // Pace: at Pace 2 Surrey was the slowest side in its stage and the stage played harder than Pro Club
  { id:'KEN', name:'Kent',      kit:'#f2efe6', trim:'#c8102e', pace:3, power:4, handling:3, kicking:3, stamina:3 },
  { id:'SSX', name:'Sussex',    kit:'#1c6fb8', trim:'#f2b01e', hoops:true, pace:3, power:3, handling:3, kicking:3, stamina:3 },
  { id:'HAM', name:'Hampshire', kit:'#c8102e', trim:'#f2efe6', pace:4, power:3, handling:3, kicking:3, stamina:3 },
  { id:'MDX', name:'Middlesex', kit:'#0f5a32', trim:'#f2efe6', hoops:true, pace:4, power:4, handling:3, kicking:3, stamina:3 },
  { id:'BRK', name:'Berkshire', kit:'#5b2d8e', trim:'#f2efe6', pace:3, power:3, handling:3, kicking:2, stamina:3 },
].map((t, i) => ({ ...t, ...abilitiesFor(t, i ? Math.max(sumOfOverall(58), rateOf(t) - 4) : sumOfOverall(58)) }));
const CAREER_PRO_POOLS = [FRANCE, AUSTRALIA, SOUTH_AFRICA, ENGLAND, IRELAND, WALES_SCOTLAND_ITALY, ENGLAND_TWO];
const CAREER_POS = { F:[1, 2, 3], B:[4, 5, 6, 7] };   // sevens: forwards wear 1 to 3, backs 4 to 7
/* A new player: about 61 overall, above every Minis side (40 to 46) as a player's rating has always read, three short of the Minis bar. Rechecked by bot with the wider bands: kept, as the bars are (README). Any skill not listed starts at CAREER_BASE. */
const CAREER_START = { F:{ pace:32, power:44, handling:36, kicking:26, stamina:38 }, B:{ pace:44, power:26, handling:38, kicking:34, stamina:34 } };
const CAREER_BASE = 35;
const CAREER_TRAIN = [1, 3, 5, 8];                   // skill points for 0, 1, 2 and 3 stars
/* Which skill a drill trains. A drill's own result wins when it names one: Pass Around the Circle trains Stamina as the
   Runner and Handling as the Passer. The contact games (PRACTICE_DRILLS' contact) are hidden in the Minis, which plays Tag Chase instead, and at the Kids level. */
const CAREER_DRILL_SKILL = { tag:'pace', egg:'handling', pass:'handling', circle:'handling', tackle:'power', scrum:'power', back:'handling', cones:'pace', defend:'pace', kick:'kicking' };
const CAREER_DRILL_ORDER = ['tag', 'egg', 'pass', 'circle', 'tackle', 'scrum', 'back', 'cones', 'defend', 'kick'];
const CAREER_DRILL_NAME = { tag:'Tag Chase', egg:'Bouncy Egg', pass:'Create a Two-on-One', circle:'Pass Around the Circle', tackle:'Tackling', scrum:'Driving', back:'Ball Back', cones:'Cones', defend:'Defend a Breakaway', kick:'Kicking' };   // only if a drill has no name of its own
/* A match's deeds by your player: each try a point of Pace and one of Handling, each tackle a point of Power, each goal
   kicked a point of Kicking. At most CAREER_DEED_CAP points a match: training is where most of it comes from. */
const CAREER_DEEDS = { tries:{ pace:1, handling:1 }, goals:{ kicking:1 }, tackles:{ power:1 } };
const CAREER_DEED_CAP = 6;
const CAREER_SHADE = 0.5;                            // how far your player's own rating pulls his abilities from the team's
const CAREER_FADE = 0.02;                            // late in a half: top speed per ability point of stamina above (or below) the team's
const CAREER_SPRINT = 0.08;                          // the sprint meter's drain while he sprints, per ability point of stamina
const CAREER_HISTORY = 40;
let careerLast = null;                               // what the last match or session gave, for the hub: { kind, gains }

/* ---------- skills ---------- */
function careerSkills() {                            // [key, label]: the team abilities, plus Stamina while the teams don't have it yet
  const out = ABILITIES.map(([k, l]) => [k, l]);
  if (!out.some(([k]) => k === 'stamina')) out.push(['stamina', 'Stamina']);
  return out;
}
const careerSkillKeys = () => careerSkills().map(([k]) => k);
const careerAbil = v => 1 + (clamp(v, 1, 99) - 1)*4/98;   // a 1 to 99 rating on the team scale, 1 to 5
function careerOverall(skills) {                     // overallOf's 40 to 99, from the mean rating
  const keys = careerSkillKeys(), mean = keys.reduce((a, k) => a + (+skills[k] || 1), 0)/keys.length;
  return clamp(Math.round(40 + (mean - 1)*59/98), 40, 99);
}
function careerName(v) { return Array.from(String(v == null ? '' : v).normalize('NFC').replace(/[^\p{L}' -]/gu, '').replace(/\s+/g, ' ').trim()).slice(0, 12).join('').trim(); }

/* ---------- your player's look ---------- */
const CAREER_LOOK = { g:0, skin:2, hair:1, style:0, b:1 };   // Male, Medium build; every field is there, so a saved look never depends on the team's deal
function careerLook(l) {                             // always all five (and a height if one was saved); anything off takes the default
  const c = cleanLook(l);
  return { ...CAREER_LOOK, ...c, g:c.g === 1 ? 1 : 0 };
}
/* ---------- teams for each stage ---------- */
const careerFemale = cr => !!(cr && cr.look && cr.look.g === 1);
const careerStageG = (cr, stage) => (!cr.look ? 0 : CAREER_STAGES[stage].age <= MIXED_THROUGH ? 'mixed' : cr.look.g);   // no look: a save from before this stays men's
function careerSide(t, cut, g, up) {
  const s = t ? cleanSide({ ...t, g }) : null; if (!s) return null;   // the stage decides, whatever side a team you made plays elsewhere
  if (cut) Object.assign(s, abilitiesFor(s, careerCutSum(rateOf(s), cut, up)));   // from the side's own abilities, so it keeps its character
  return s;
}
const careerProSide = id => CAREER_PRO_POOLS.flat().find(t => t.id === id) || FRANCE[0];
const careerNations = cr => (careerFemale(cr) ? WOMEN_NATIONS : allNations());
const careerNation = (id, cr) => careerNations(cr).find(t => t.id === id) || (careerFemale(cr) ? WOMEN_NATIONS.find(t => t.id === 'ENG') : NATIONS[0]);
/* The club for a new season: a Local club at its rating now, whatever the save copied when the career began, so it stays on the same scale as the rivals drawn for it.
   A team you made or imported has only the copy. A season under way keeps the sides it was drawn with. */
const careerClubNow = cr => (cr.club.key || cr.club.custom ? cr.club : CLUBS.find(t => t.id === cr.club.id) || cr.club);
function careerTeamFor(cr, stage) {
  const g = careerStageG(cr, stage);
  if (stage <= 1) return careerSide(careerClubNow(cr), CAREER_CUT[stage], g);
  if (stage === 2) return careerSide(CAREER_COUNTIES[0], null, g);
  if (stage === 3) return careerSide(careerProSide(cr.pro), null, g);
  return careerSide(careerNation(cr.country, cr), null, g);
}
function careerOpponents(cr, stage) {               // five sides; the random draws happen here, never in a save or a render
  const g = careerStageG(cr, stage);
  if (stage <= 1) {
    const mine = cr.club, others = CLUBS.filter(t => t.id !== mine.id && t.name !== mine.name);
    return shuffle(others.slice()).slice(0, 5).map(t => careerSide(t, CAREER_CUT[stage], g, CAREER_CUT[stage].up));
  }
  if (stage === 2) return CAREER_COUNTIES.slice(1).map(t => careerSide(t, null, g));
  if (stage === 3) {
    const me = careerProSide(cr.pro), pool = CAREER_PRO_POOLS.find(p => p.includes(me)) || FRANCE;
    return shuffle(pool.filter(t => t !== me)).slice(0, 5).map(t => careerSide(t, null, g));
  }
  const me = careerNation(cr.country, cr), six = careerFemale(cr) ? womenSix() : NATIONS;
  return (six.includes(me) ? six.filter(t => t !== me) : nationsNearest(me, careerFemale(cr) ? 1 : 0)).map(t => careerSide(t, null, g));
}
/* A season: the championship's shape, with the weakest opponent first and the strongest last, as newChamp does. */
function careerNewSeason(cr) {
  const user = careerTeamFor(cr, cr.stage), five = careerOpponents(cr, cr.stage);
  const ranked = five.map((t, i) => ({ i:i + 1, r:rateOf(t) })).sort((a, b) => a.r - b.r || a.i - b.i);
  const order = [0, ranked[4].i, ranked[3].i, ranked[2].i, ranked[1].i, ranked[0].i];
  cr.seasons++;
  cr.season = { user:0, teams:[user, ...five], round:0, fixtures:roundRobin(order), results:[], id:'career-' + Date.now().toString(36) + '-' + cr.seasons.toString(36) };   // cleanChamp's shape and order, so a reload is the same season
  cr.trained = false;
  return cr.season;
}
function careerCreate(o) {
  const pos = o && o.pos === 'F' ? 'F' : 'B', nums = CAREER_POS[pos];
  const club = cleanSide(o && o.club);
  if (!club) return null;
  const skills = {};
  for (const k of careerSkillKeys()) skills[k] = CAREER_START[pos][k] || CAREER_BASE;
  const cr = { name:careerName(o.name), pos, num:nums.includes(o.num) ? o.num : nums[0], club, pro:null, country:null, skills, look:careerLook(o.look),
    stage:0, seasons:0, season:null, trained:false, history:[], totals:{ matches:0, tries:0, tackles:0, goals:0 } };
  careerNewSeason(cr);
  return cr;
}
function careerStart(o) {                            // Start Career on the new player screen
  if (practice) return null;
  const cr = careerCreate(o); if (!cr) return null;
  career = cr; careerLast = null;
  save();
  return cr;
}

/* ---------- the season's end ---------- */
function careerPlace(c) { return standings(c).findIndex(r => r.i === c.user) + 1; }
function careerOutcome(cr) {
  const c = cr && cr.season;
  if (!c || c.round < 5) return null;
  const place = careerPlace(c), ovr = careerOverall(cr.skills), st = CAREER_STAGES[cr.stage];
  const final = cr.stage >= CAREER_STAGES.length - 1, top = place <= CAREER_UP, bar = st.bar != null && ovr >= st.bar;
  return { place, ovr, final, top, bar, promoted:!final && (top || bar) };
}
/* Going up to Pro Club: the draw must not decide how hard the stage is, so a first signing is only a side whose rivals are a step above the counties (their mean at least the best county's) and that is not far above or below them. gap: its overall less its rivals' mean.
   That leaves out England 2, whose rivals are the counties' level; Dublin and Bordeaux, which won nearly everything (98% and 99% for the scripted bot, margins of +26 and +32), and the other sides well clear of their list; and the sides far under theirs, Cork and Ballymena. They are still on their lists to meet, and a saved career already at one stays. */
const CAREER_SIGN = { rivals:64, gap:[-7, -2.5] };
function careerRivals(t) { const list = CAREER_PRO_POOLS.find(p => p.includes(t)).filter(o => o !== t); return list.reduce((a, o) => a + overallOf(o), 0)/list.length; }
const careerSignable = () => CAREER_PRO_POOLS.flat().filter(t => { const m = careerRivals(t), gap = overallOf(t) - m; return m >= CAREER_SIGN.rivals && gap >= CAREER_SIGN.gap[0] && gap <= CAREER_SIGN.gap[1]; });
function careerSign(cr) {
  const all = careerSignable();
  cr.pro = all[Math.floor(rnd()*all.length)].id;
}
function careerAdvance(country) {                    // Next Season (or a country, when called up)
  const cr = career, out = careerOutcome(cr);
  if (practice || !out || out.final) return false;
  const c = cr.season, s = seasonSummary(c);
  cr.history.push({ stage:cr.stage, name:c.teams[c.user].name, place:out.place, up:out.promoted, w:s.won, d:s.drawn, l:s.lost });
  cr.history = cr.history.slice(-CAREER_HISTORY);
  if (out.promoted) {
    cr.stage++;
    if (cr.stage === 3 && !cr.pro) careerSign(cr);
    if (cr.stage === 4) cr.country = careerNations(cr).some(t => t.id === country) ? country : (cr.country || 'ENG');
  }
  careerNewSeason(cr);
  careerLast = null;
  save();
  return true;
}
function careerEnd() { if (practice) return; career = null; careerLast = null; save(); }   // Start New Career, or Start Fresh

/* ---------- training ---------- */
function careerDrills(cr) {                          // the drills that exist right now, in the career's order; no contact game in the Minis or at the Kids level
  const have = new Map(PRACTICE_DRILLS.map(d => [d.id, d]));
  return CAREER_DRILL_ORDER.filter(id => have.has(id) && !(have.get(id).contact && ((cr && cr.stage === 0) || kidsLevel())))
    .map(id => ({ id, name:have.get(id).name || CAREER_DRILL_NAME[id], skills:id === 'circle' ? ['stamina', 'handling'] : [CAREER_DRILL_SKILL[id]] }));
}
const careerCanTrain = cr => !!(cr && cr.season && cr.season.round < 5 && !cr.trained);
/* The drill's onDone ({ id, stars, success[, role, skill, quit] }), once its settings are restored. One session a round;
   a drill left before it finished (quit) gives nothing and keeps the session. */
function careerTrainDone(res) {
  const cr = career;
  let out = null;
  if (!practice && careerCanTrain(cr) && res && typeof res === 'object' && !res.quit) {
    const keys = careerSkillKeys();
    const skill = keys.includes(res.skill) ? res.skill : CAREER_DRILL_SKILL[res.id];
    if (skill && keys.includes(skill)) {
      const stars = clamp(Math.round(+res.stars || 0), 0, 3), before = cr.skills[skill];
      cr.skills[skill] = clamp(before + CAREER_TRAIN[stars], 1, 99);
      cr.trained = true;
      out = careerLast = { kind:'train', stars, gains:{ [skill]:cr.skills[skill] - before } };
      save();
    }
  }
  if (mode === 'match' && !practice) { setTwo(false); startDemo(); }   // the drill's match is over: back to the menus' demo, whatever the drill left behind
  careerOpen();
  return out;
}
function careerTrain(id) {
  if (!careerCanTrain(career) || !careerDrills(career).some(d => d.id === id)) return false;
  practiceStart(id, { onDone:careerTrainDone, leaveLabel:'Back to Career' });
  return true;
}

/* ---------- a career match ---------- */
function careerNatFor(team, skills) {                // the team's abilities, each pulled toward your player's own
  const out = { ...team };
  for (const k of careerSkillKeys()) {
    const base = k === 'stamina' ? careerTeamStamina(team) : +team[k] || 3;
    out[k] = clamp(base + (careerAbil(+skills[k] || CAREER_BASE) - base)*CAREER_SHADE, 1, 5);
  }
  return out;
}
const CAREER_CAP = { matches:3, secs:4 };            // the kick-off caption: a player's first matches, this long on M.rt. Over the play, never stopping it
const careerCaption = () => !!(M && M.career && M.capUntil > M.rt && !M.cut && !M.tut && !M.paused && !M.over && !practice);
function careerArm() {                               // straight after startMatch: this match is a career match
  if (!M || !career) return;
  M.career = true;
  M.careerP = M.players.find(p => p.team === 0 && p.n === career.num) || M.players.find(p => p.team === 0);
  M.careerNat = careerNatFor(M.nat[0], career.skills);
  M.careerDeeds = { tries:0, tackles:0, goals:0 };
  const push = M.di < 2 ? CAREER_PUSH[career.stage] : 0;
  if (push) { const d = M.early && earlyDiff ? earlyDiff : DIFF[M.di], o = { ...d }; for (const k in d) o[k] = d[k] + push*(DIFF[2][k] - DIFF[1][k]); earlyDiff = o; M.early = true; }   // the engine's one way to change a match's levers (diffOf); a new match clears it
  M.capUntil = settings.hints && career.totals && career.totals.matches < CAREER_CAP.matches ? M.rt + CAREER_CAP.secs : 0;
  careerKickoff();
}
function careerPlay() {                              // Play Match on the hub
  const cr = career, c = cr && cr.season;
  if (practice || !c || c.round >= 5) return false;
  const { opp } = userFixture(c);
  const mine = c.teams[c.user];                      // your player's look is on the squad entry, for this match; a save from before it has none
  if (!startMatch(cr.look ? { ...mine, squad:[{ n:cr.num, look:cr.look }] } : mine, c.teams[opp], false)) return false;   // no match started: nothing to arm
  careerArm();
  return true;
}
/* engine hooks: each one is read only behind M.career, or gives the team's own value when M.career is not set */
function careerNatOf(p) { return M.career && p === M.careerP ? M.careerNat : M.nat[p.team]; }
/* One ability for man p as the engine reads it: his side's (Power after the stamina fade, where the game has powerOf), plus, for
   your player in a career match only, the pull of his own rating as an extra term. Everyone else gets exactly the side's value. */
function careerAbility(p, k) {
  const t = M.nat[p.team], base = k === 'power' && typeof powerOf === 'function' ? powerOf(p.team) : +t[k];
  return M.career && p === M.careerP ? base + M.careerNat[k] - (+t[k] || 3) : base;
}
const careerTeamStamina = t => (typeof staminaOf === 'function' ? staminaOf(t) : +t.stamina || 3);   // a side without Stamina reads 3
function careerGoalNat(team, kicker, kind) {         // your side's goal kicks are his; a drop goal is whoever drops it
  const his = kicker ? kicker === M.careerP : team === 0 && kind !== 'drop';
  return M.career && his ? M.careerNat : M.nat[team];
}
function careerKicker(team) { return M.career && team === 0 && M.careerP ? M.careerP : null; }
function careerStamina(p) { return M.career && p === M.careerP ? M.careerNat.stamina - careerTeamStamina(M.nat[p.team]) : 0; }   // his stamina against the team's, ability points: an extra term on him, the side's own fade and sprint length are the side's
function careerFade(p) { const d = careerStamina(p); return d ? 1 + d*CAREER_FADE*clamp(M.clock/M.halfLen, 0, 1) : 1; }   // nothing at the kick-off, the full shade at the hooter
function careerSprintDrain(p) { const d = careerStamina(p); return d ? clamp(1 - d*CAREER_SPRINT, 0.7, 1.3) : 1; }
function careerDeed(kind, p) { if (M.career && M.careerDeeds && p && p === M.careerP) M.careerDeeds[kind]++; }
function careerKickoff() { if (M.career && M.careerP && isHuman(0)) setCtrl(0, M.careerP); }
function careerDeedGains(deeds) {
  const gains = {}, keys = careerSkillKeys();
  let left = CAREER_DEED_CAP;
  for (const kind of Object.keys(CAREER_DEEDS)) {
    const n = Math.max(0, Math.floor(+(deeds && deeds[kind]) || 0));
    for (let i = 0; i < n && left > 0; i++) for (const [k, v] of Object.entries(CAREER_DEEDS[kind])) {
      if (left <= 0 || !keys.includes(k)) continue;
      const add = Math.min(v, left); gains[k] = (gains[k] || 0) + add; left -= add;
    }
  }
  return gains;
}
/* Full time in a career match: the result into the career's season (never the championship), the deeds into his skills. */
function careerRecordResult() {
  const cr = career, c = cr && cr.season;
  if (!c || c.round >= 5 || !M || !M.career || M.demo || M.two || practice || M.careerDone) return false;
  const { pair } = userFixture(c), home = pair[0] === c.user;
  const mine = home
    ? { h:pair[0], a:pair[1], hs:M.score[0], as:M.score[1], ht:M.tries[0], at:M.tries[1] }
    : { h:pair[0], a:pair[1], hs:M.score[1], as:M.score[0], ht:M.tries[1], at:M.tries[0] };
  const rd = [mine];
  for (const p of c.fixtures[c.round]) if (p !== pair) rd.push(simMatch(c, p[0], p[1]));
  M.careerDone = true;
  c.results.push(rd);
  c.round++;
  const deeds = M.careerDeeds || {}, gains = careerDeedGains(deeds);
  for (const k in gains) cr.skills[k] = clamp(cr.skills[k] + gains[k], 1, 99);
  const T = cr.totals;
  T.matches++; T.tries += deeds.tries || 0; T.tackles += deeds.tackles || 0; T.goals += deeds.goals || 0;
  cr.trained = false;
  careerLast = { kind:'match', gains };
  careerSettle(cr);
  save();
  return true;
}
function careerSettle(cr) {                          // going up to Pro Club: sign at the season's end, so the screen can name the club
  const out = careerOutcome(cr);
  if (!out || !out.promoted || cr.stage !== 2 || cr.pro) return false;
  careerSign(cr);
  return true;
}

/* ---------- the save ---------- */
const careerInt = (v, lo, hi) => (Number.isInteger(v) && v >= lo && v <= hi ? v : null);
function cleanCareer(c) {
  if (!c || typeof c !== 'object' || Array.isArray(c)) return null;
  const club = cleanSide(c.club);
  if (!club) return null;
  const pos = c.pos === 'F' ? 'F' : c.pos === 'B' ? 'B' : null;
  if (!pos) return null;
  const stage = careerInt(c.stage, 0, CAREER_STAGES.length - 1);
  if (stage == null) return null;
  const skills = {}, raw = c.skills && typeof c.skills === 'object' ? c.skills : {};
  for (const k of careerSkillKeys()) skills[k] = typeof raw[k] === 'number' && Number.isFinite(raw[k]) ? clamp(Math.round(raw[k]), 1, 99) : (CAREER_START[pos][k] || CAREER_BASE);
  const T = c.totals && typeof c.totals === 'object' ? c.totals : {}, totals = {};
  for (const k of ['matches', 'tries', 'tackles', 'goals']) totals[k] = careerInt(T[k], 0, 100000) || 0;
  const history = [];
  if (Array.isArray(c.history)) for (const h of c.history.slice(-CAREER_HISTORY)) {
    if (!h || typeof h !== 'object') continue;
    const e = { stage:careerInt(h.stage, 0, CAREER_STAGES.length - 1), name:h.stage <= 1 && club.id === 'HAR' && !club.key && !club.custom ? club.name : String(h.name || '').replace(/\s+/g, ' ').trim().slice(0, 24), place:careerInt(h.place, 1, 6), up:!!h.up,
      w:careerInt(h.w, 0, 5), d:careerInt(h.d, 0, 5), l:careerInt(h.l, 0, 5) };
    if (e.stage == null || e.place == null || e.w == null || e.d == null || e.l == null || !e.name) continue;
    history.push(e);
  }
  const season = c.season == null ? null : cleanChamp(c.season);   // a broken season is dropped; the hub draws a new one for the same stage
  const looks = c.look && typeof c.look === 'object' && !Array.isArray(c.look) ? { look:careerLook(c.look) } : {};   // no look is a save from before it: male, and men's sides
  return { name:careerName(c.name), pos, num:CAREER_POS[pos].includes(c.num) ? c.num : CAREER_POS[pos][0], club,
    pro:CAREER_PRO_POOLS.flat().some(t => t.id === c.pro) ? c.pro : null, country:careerNations(looks).some(t => t.id === c.country) ? c.country : (stage === 4 ? 'ENG' : null),
    skills, ...looks, stage, seasons:careerInt(c.seasons, 0, 100000) || 0, season, trained:c.trained === true && !!season && season.round < 5, history, totals };
}
/* Your player: a star in the trim, the shirt or chalk, whichever stands off the grass, on his back on Top and over his head in a behind
   view, drawn over the men so a ruck can't hide him. No ring of his own: a ring on the grass always means who you control now. */
function careerCol() { const k = M.kit[0]; return colorDist(k.trim, '#2f6a38') >= 90 ? k.trim : colorDist(k.fill, '#2f6a38') >= 90 ? k.fill : '#f1eee4'; }
const careerEdgeCol = () => { const c = careerCol(); return colorDist(c, '#08110b') >= 90 ? c : '#f1eee4'; };   // the edge arrow sits on a dark disc: a near-black trim would vanish there
function careerStar(cx, cy, r, col) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) { const a = -Math.PI/2 + i*Math.PI/5, rr = i % 2 ? r*0.42 : r; ctx.lineTo(cx + Math.cos(a)*rr, cy + Math.sin(a)*rr); }
  ctx.closePath();
  ctx.fillStyle = col; ctx.fill();
  ctx.lineWidth = 1.5; ctx.strokeStyle = C.outline; ctx.stroke();
}
function careerMark(r) {
  const p = M.careerP; if (!p) return;
  const [wx, wy] = drawPos(p), [sx, sy] = toS(wx, wy);
  if (sx < 0 || sx > V.W || sy < 0 || sy > V.H) { BV.edges.length = 0; edgeTag(sx, sy, careerEdgeCol(), 'star', safeInsets()); return; }
  careerStar(sx, sy, r, careerCol());
}
/* =========================================================
   Rendering
   ========================================================= */
const cv = $('cv');
let ctx = cv.getContext('2d');   // let: paintMan points it at a sprite cell for one man
const V = { W:0, H:0, dpr:1, s:10 };
const C = { surround:'#0e2414', grassA:'#2a6233', grassB:'#2f6a38', line:'rgba(244,241,232,.92)', board:'#122018', boardHi:'#1c3125', pad:'#1b2747', ctrl:'#ffcf3d', p2:'#ff5fd2', head:'#2a1d16', outline:'#08110b' };
const ringCol = t => (seatOfTeam(t) === 1 ? C.p2 : C.ctrl);   // the ring, the pointer and the kick aim: gold for seat 0, pink for Player 2
const SHADOWS = [[0.45,0.35],[-0.45,0.35],[0.45,-0.35],[-0.45,-0.35]];

/* iPhone Safari can still zoom a page: a quick double tap, a rotation, or a pinch it lets through.
   Block the gestures, and if the page ever ends up zoomed, snap it back to 1. */
['gesturestart', 'gesturechange', 'gestureend'].forEach(t => document.addEventListener(t, e => e.preventDefault(), { passive:false }));
document.addEventListener('dblclick', e => e.preventDefault(), { passive:false });
function unzoom() {
  const vv = window.visualViewport, meta = document.querySelector('meta[name="viewport"]');
  if (!vv || !meta || vv.scale <= 1.01) return;
  const c = meta.content;
  meta.content = c.replace('maximum-scale=1', 'maximum-scale=1.01');   // a change to the tag makes Safari re-apply it
  requestAnimationFrame(() => { meta.content = c; window.scrollTo(0, 0); });
}
function resize() {
  V.dpr = Math.min(dprMax(), window.devicePixelRatio || 1);
  V.W = window.innerWidth; V.H = window.innerHeight;
  cv.width = Math.round(V.W*V.dpr); cv.height = Math.round(V.H*V.dpr);
}
function toS(x, y) {
  if (BV.on) return bvS(x, y);
  const s = V.s, c = M.cam;
  return [V.W/2 + (x-c.x)*s, V.H/2 + (y-c.y)*s];
}
function svec(x, y) { return [x, y]; }

function drawPitch() {
  const s = V.s, lw = Math.max(0.14, 1.3/s);
  ctx.fillStyle = C.surround; ctx.fillRect(-40, -40, 200, 150);
  // perimeter boards
  for (let i = -2; i < 25; i++) {
    ctx.fillStyle = i % 2 ? C.board : C.boardHi;
    ctx.fillRect(i*6, -6.5, 6, 1.6); ctx.fillRect(i*6, 74.9, 6, 1.6);
  }
  for (let i = 0; i < 12; i++) { ctx.fillStyle = i % 2 ? C.grassA : C.grassB; ctx.fillRect(i*10, 0, 10, 70); }
  ctx.globalAlpha = 0.14;
  ctx.fillStyle = M.kit[0].fill; ctx.fillRect(0, 0, 10, 70);
  ctx.fillStyle = M.kit[1].fill; ctx.fillRect(110, 0, 10, 70);
  ctx.globalAlpha = 1;
  ctx.strokeStyle = C.line; ctx.lineWidth = lw;
  const line = (x0,y0,x1,y1) => { ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x1,y1); ctx.stroke(); };
  ctx.strokeRect(0, 0, 120, 70);
  for (const x of [10, 110, 32, 88, 60]) line(x, 0, x, 70);
  ctx.setLineDash([2, 2]);
  for (const x of [50, 70, 15, 105]) line(x, 0, x, 70);
  ctx.setLineDash([1, 4]);
  for (const y of [5, 15, 55, 65]) line(10, y, 110, y);
  ctx.setLineDash([]);
  line(59, 35, 61, 35);
  // posts with floodlight shadows
  for (const px of [10, 110]) {
    ctx.fillStyle = 'rgba(0,0,0,.07)';
    for (const [sx,sy] of [[2.2,1.4],[-2.2,1.4],[2.2,-1.4],[-2.2,-1.4]]) {
      ctx.beginPath(); ctx.moveTo(px, 32.2); ctx.lineTo(px+sx, 32.2+sy); ctx.lineTo(px+sx, 37.8+sy); ctx.lineTo(px, 37.8); ctx.closePath(); ctx.fill();
    }
    ctx.strokeStyle = '#f7f5ee'; ctx.lineWidth = Math.max(0.28, 2.2/s);
    line(px, 32.2, px, 37.8);
    for (const py of [32.2, 37.8]) {
      ctx.fillStyle = C.pad; ctx.beginPath(); ctx.arc(px, py, 0.55, 0, 7); ctx.fill();
      ctx.fillStyle = '#f7f5ee'; ctx.beginPath(); ctx.arc(px, py, 0.22, 0, 7); ctx.fill();
    }
    ctx.lineWidth = lw; ctx.strokeStyle = C.line;
  }
}
function ellipse(x, y, rx, ry, rot) { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, rot || 0, 0, Math.PI*2); }
function drawPos(p) {                                      // where he is drawn: the logic's teleports (a slide-off, a roll-away) are smoothed over drawFrom.T
  const f = p.drawFrom;
  if (!f || f.t <= 0) return [p.x, p.y, 0];
  const u = clamp(f.t/f.T, 0, 1);                           // 1 at the jump, 0 once the drawing has caught up
  return [p.x + (f.x - p.x)*u, p.y + (f.y - p.y)*u, u];
}
function drawPlayer(p, r) {
  const [wx, wy, u] = drawPos(p);
  const [sx, sy] = toS(wx, wy);
  const kit = M.kit[p.team], k = p.bind, tackler = !!(k && p !== k.c);
  const [fx, fy] = svec(p.fx, p.fy);
  let ang = Math.atan2(fy, fx);
  ctx.fillStyle = 'rgba(0,0,0,.12)';
  for (const [ox, oy] of SHADOWS) { ellipse(sx + ox*r, sy + oy*r, r*0.95, r*0.75); ctx.fill(); }
  const sp = hyp(p.vx, p.vy), spr = sprintLevel(p);
  const fire = onFire(p.team);
  if (fire && p.down <= 0) {                                 // On Fire: an orange glow under every man on the side, pulsing
    ctx.fillStyle = `rgba(255,110,30,${(0.30 + 0.12*Math.sin(M.rt*2*Math.PI*3)).toFixed(3)})`;
    ellipse(sx, sy, r*1.55, r*1.3); ctx.fill();
  }
  if (p.down <= 0 && !k && (p.boost > 0 || spr > 0 || fire || (M.surge && M.surge.team === p.team)) && sp > (fire ? 1.5 : 3)) {
    const tx = -p.vx/sp, ty = -p.vy/sp;
    ctx.fillStyle = fire ? 'rgba(255,110,30,.6)' : (p.boost > 0 || spr > 0) ? 'rgba(255,207,61,.35)' : 'rgba(244,241,232,.18)';   // On Fire burns orange
    for (const kk of [1.1, 2.0]) { ellipse(sx + tx*r*kk, sy + ty*r*kk, r*(1 - kk*0.22), r*(0.85 - kk*0.2)); ctx.fill(); }
    if (spr > 0) {                                           // a sprint: two speed streaks behind him
      ctx.strokeStyle = `rgba(244,241,232,${(0.55*spr).toFixed(3)})`; ctx.lineWidth = 2; ctx.lineCap = 'round';
      for (const side of [-1, 1]) { const ox = -ty*side*r*0.75, oy = tx*side*r*0.75; ctx.beginPath(); ctx.moveTo(sx + ox + tx*r*1.2, sy + oy + ty*r*1.2); ctx.lineTo(sx + ox + tx*r*2.8, sy + oy + ty*r*2.8); ctx.stroke(); }
    }
  }
  ctx.save(); ctx.translate(sx, sy);
  if (tackler) { const off = p.bindOff || { x:1, y:0 }; ctx.rotate(Math.atan2(off.y, off.x) + Math.PI/2); ctx.scale(0.85, 0.85); }   // bound across the carrier's hips, on the side he came from
  else {
    if (p.down > 0 && u > 0 && p.drawFrom.spin) ang += p.drawFrom.spin*Math.PI/2*u;   // the slide-off: a quarter turn away from the carrier as he lands
    if (p.stumble > 0) ang += 9*D2R*Math.sin(M.rt*2*Math.PI*14);                      // the wobble after an ankle tap
    ctx.rotate(ang);
  }
  ctx.strokeStyle = C.outline; ctx.lineWidth = Math.max(1.4, r*0.15);
  if (p.down > 0 || tackler) {
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = kit.fill; ellipse(0, 0, r*1.3, r*0.58); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.head; ctx.beginPath(); ctx.arc(r*1.05, 0, r*0.36, 0, 7); ctx.fill();
  } else {
    const lean = k ? (k.tier === 'soft' ? 0.15 : k.tier === 'dom' && k.t/k.T >= 0.4 ? -0.12 : 0) : 0;   // a bound carrier leans into a Soft tackle, stands up in a Wrap, recoils from a Big Hit
    ctx.fillStyle = kit.trim;
    ctx.beginPath(); ctx.arc(lean*r, -r*0.86, r*0.3, 0, 7); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(lean*r, r*0.86, r*0.3, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = kit.fill; ellipse(lean*r*0.5, 0, r*0.62*(1 + Math.abs(lean)), r*0.92); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.head; ctx.beginPath(); ctx.arc(r*0.1 + lean*r*1.4, 0, r*0.4, 0, 7); ctx.fill();
  }
  ctx.restore();
  if (p.fend > 0) {                                          // the fend: an arm out at the man he has just beaten, in his trim colour
    const a = p.fendA, l = r*(0.9 + 0.5*(1 - p.fend/0.2));
    ctx.strokeStyle = kit.trim; ctx.lineWidth = Math.max(2, r*0.22); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(sx + Math.cos(a)*r*0.4, sy + Math.sin(a)*r*0.4); ctx.lineTo(sx + Math.cos(a)*l, sy + Math.sin(a)*l); ctx.stroke();
  }
}
function drawTags(dt, r) {                                 // on-pitch tags: chalk, outlined, rising 14px over 0.7s, fading over the last 0.25s, at most two
  if (M.fx.length) {                                       // the Big Hit's impact ring grows from 0.3m to 1.6m over 0.22s
    for (const f of M.fx) { const u = clamp(f.t/0.22, 0, 1), [x, y] = toS(f.x, f.y); ctx.strokeStyle = `rgba(255,255,255,${(0.8*(1 - u)).toFixed(3)})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, (0.3 + 1.3*u)*V.s, 0, 7); ctx.stroke(); f.t += dt; }
    M.fx = M.fx.filter(f => f.t < 0.22);
  }
  if (!M.tags.length) return;
  ctx.font = `800 16px 'Big Shoulders Display', Impact, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  ctx.lineJoin = 'round'; ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(8,14,10,.85)'; ctx.fillStyle = '#f1eee4';
  for (const t of M.tags) {
    const u = clamp(t.t/0.7, 0, 1), a = t.t > 0.45 ? clamp(1 - (t.t - 0.45)/0.25, 0, 1) : 1;
    let [x, y] = toS(t.x, t.y);
    const edge = tagBox();                                          // insets 0: 76 / 60 / W-200, as before. A right inset walks the clamp in with the buttons
    y = Math.max(edge.top, y - 2.2*r - 14*u); x = clamp(x, edge.left, V.W - edge.right);
    ctx.globalAlpha = a; ctx.strokeText(t.text.toUpperCase(), x, y); ctx.fillText(t.text.toUpperCase(), x, y);
    t.t += dt;
  }
  ctx.globalAlpha = 1;
  M.tags = M.tags.filter(t => t.t < 0.7);
}
function drawBall(r) {
  const b = M.ball, s = V.s;
  const [gx, gy] = toS(b.x, b.y);
  const rx = Math.max(4.4, 0.4*s);
  const scG = 1/(1 + Math.max(0, b.z)*0.16);             // the shadow shrinks as the ball climbs, so a long pass reads as a loop
  ctx.fillStyle = 'rgba(0,0,0,.32)'; ctx.globalAlpha = 0.45 + 0.55*scG;
  ellipse(gx, gy, rx*0.9*scG, rx*0.55*scG); ctx.fill(); ctx.globalAlpha = 1;
  const lift = b.z*s*0.55, sc = 1 + Math.min(b.z, 20)*0.035;
  let ang = 0;
  if (b.state === 'held') { const [fx, fy] = svec(b.carrier.fx, b.carrier.fy); ang = Math.atan2(fy, fx); }
  else { const [vx, vy] = svec(b.vx, b.vy); if (hyp(vx, vy) > 0.5) ang = Math.atan2(vy, vx); }
  const tum = b.tumble != null && b.state !== 'held' ? b.tumble : null;   // Bouncy Egg: the ball tumbles end over end, so its length comes and goes as it turns. Nothing else sets it
  if (tum != null) ang += tum*0.35;
  const len = tum == null ? 1 : 0.62 + 0.38*Math.abs(Math.cos(tum));
  ctx.save(); ctx.translate(gx, gy - lift); ctx.rotate(ang);
  ctx.fillStyle = '#f6f3ea'; ctx.strokeStyle = '#3b2f22'; ctx.lineWidth = 1.2;
  ellipse(0, 0, rx*sc*len, rx*0.62*sc); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = 'rgba(59,47,34,.6)'; ctx.beginPath(); ctx.moveTo(-rx*0.45*sc, 0); ctx.lineTo(rx*0.45*sc, 0); ctx.stroke();
  ctx.restore();
}
/* ---------- close-up view: a side-on broadcast camera ---------- */
const CROWD = Array.from({ length:280 }, () => [Math.random(), Math.random(), Math.floor(Math.random()*5)]);
const CROWD_C = ['#2b3a4a', '#4a3a2e', '#6b5a48', '#203528', '#5a2f35'];
let SKIN = '#c69c7c', HAIR = '#2a1d16';   // let: paintMan sets them for one man
function luma(hex) { const [r, g, b] = hexRgb(hex); return (0.299*r + 0.587*g + 0.114*b)/255; }
function shade(hex, k) { const a = hexRgb(hex); return `rgb(${a.map(v => Math.round(v*(1-k) + 11*k)).join(',')})`; }
function kitOf(team) { const k = M.kit[team]; return { shirt:k.fill, trim:k.trim, hoops:k.hoops, shorts:luma(k.fill) > 0.6 ? '#1b2233' : '#ece9df' }; }
function seg(x1, y1, x2, y2) { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }
function rrect(x, y, w, h, r) { ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h); }
function cutGeom() { const W = V.W, H = V.H; return { W, H, horizon:H*0.38, ground:H*0.83, sc:H*0.15 }; }
function drawStage(g) {
  const { W, H, horizon } = g;
  const st = ctx.createLinearGradient(0, 0, 0, horizon);
  st.addColorStop(0, '#05080a'); st.addColorStop(1, '#14201a');
  ctx.fillStyle = st; ctx.fillRect(0, 0, W, horizon);
  for (const [cx, cy, k] of CROWD) { ctx.fillStyle = CROWD_C[k]; ctx.fillRect(cx*W, horizon*0.22 + cy*horizon*0.66, 3, 3); }
  for (const fx of [0.1, 0.9]) {
    const gl = ctx.createRadialGradient(W*fx, 0, 0, W*fx, 0, H*0.6);
    gl.addColorStop(0, 'rgba(255,238,196,.32)'); gl.addColorStop(1, 'rgba(255,238,196,0)');
    ctx.fillStyle = gl; ctx.fillRect(0, 0, W, H*0.6);
  }
  ctx.fillStyle = '#0c1611'; ctx.fillRect(0, horizon - H*0.04, W, H*0.04);
  ctx.fillStyle = '#2b6334'; ctx.fillRect(0, horizon, W, H - horizon);
  const vx = W*0.5, vy = horizon - H*0.9, k = (horizon - vy)/(H - vy);
  ctx.fillStyle = '#326e3b';
  for (let i = -14; i < 14; i += 2) {
    const a = vx + i*W*0.09, b = vx + (i+1)*W*0.09;
    ctx.beginPath(); ctx.moveTo(a, H); ctx.lineTo(b, H); ctx.lineTo(vx + (b-vx)*k, horizon); ctx.lineTo(vx + (a-vx)*k, horizon); ctx.closePath(); ctx.fill();
  }
  const sh = ctx.createLinearGradient(0, horizon, 0, H);
  sh.addColorStop(0, 'rgba(0,0,0,.35)'); sh.addColorStop(0.4, 'rgba(0,0,0,0)');
  ctx.fillStyle = sh; ctx.fillRect(0, horizon, W, H - horizon);
}
/* A side-on player. x/gy: feet position in px; sc: px per metre.
   o.face 1 = facing right; o.lean 0..1 bends the body forward (1 = horizontal);
   o.crouch 0..1; o.lift metres off the ground; o.arms down|up|bind|reach|carry; o.stride run phase. */
function fig(x, gy, sc, kit0, o) {
  const f = o.face || 1, lift = (o.lift || 0)*sc, lean = o.lean || 0, cr = o.crouch || 0, w = sc*0.15;
  const dk = o.dim || 0, tone = h => dk ? shade(h, dk) : h;
  const kit = { shirt:tone(kit0.shirt), trim:tone(kit0.trim), shorts:tone(kit0.shorts) }, skin = tone(SKIN), hair = tone(HAIR);
  ctx.fillStyle = 'rgba(0,0,0,.28)'; ellipse(x, gy, sc*(0.42 - Math.min(o.lift || 0, 1.5)*0.12), sc*0.08); ctx.fill();
  ctx.save(); ctx.translate(x, gy - lift); ctx.scale(f, 1);
  ctx.lineCap = 'round';
  const hipH = (0.95 - cr*0.4)*sc, st = o.stride || 0;
  for (const [hx, sw] of [[-0.04*sc, Math.sin(st)], [0.04*sc, -Math.sin(st)]]) {
    let fx = hx + sw*0.34*sc + lean*0.12*sc, kx = (hx + fx)/2 + cr*0.3*sc + sw*0.06*sc, ky = -hipH*0.5;
    if (o.drive) { fx = hx - 0.55*sc + sw*0.06*sc; kx = hx - 0.12*sc; ky = -hipH*0.42; }
    ctx.strokeStyle = kit.shorts; ctx.lineWidth = w*1.15; seg(hx, -hipH, kx, ky);
    ctx.strokeStyle = kit.shirt; ctx.lineWidth = w*0.85; seg(kx, ky, fx, -0.07*sc);
    ctx.fillStyle = '#111'; ctx.fillRect(fx - 0.04*sc, -0.08*sc, 0.2*sc, 0.08*sc);
  }
  ctx.translate(0, -hipH); ctx.rotate(lean*1.42);
  ctx.strokeStyle = C.outline; ctx.lineWidth = 1.5;
  ctx.fillStyle = kit.shirt; rrect(-0.2*sc, -0.64*sc, 0.4*sc, 0.68*sc, 0.12*sc); ctx.fill(); ctx.stroke();
  ctx.fillStyle = kit.trim; ctx.fillRect(-0.19*sc, -0.5*sc, 0.38*sc, 0.07*sc);
  if (kit0.hoops) { ctx.fillRect(-0.19*sc, -0.34*sc, 0.38*sc, 0.07*sc); ctx.fillRect(-0.19*sc, -0.18*sc, 0.38*sc, 0.07*sc); }
  ctx.fillStyle = kit.shorts; rrect(-0.21*sc, -0.06*sc, 0.42*sc, 0.16*sc, 0.05*sc); ctx.fill();
  ctx.fillStyle = skin; ctx.beginPath(); ctx.arc(0.04*sc, -0.78*sc, 0.13*sc, 0, 7); ctx.fill();
  ctx.fillStyle = hair; ctx.beginPath(); ctx.arc(0.02*sc, -0.81*sc, 0.135*sc, Math.PI*0.85, Math.PI*2.05); ctx.fill();
  const sx = 0.03*sc, sy = -0.56*sc;
  const ARMS = { up:[0.1, -1.24], bind:[0.56, -0.48], reach:[0.62, -0.78], carry:[0.3, -0.32], down:[0.1, -0.1] };
  const [ex, ey] = (ARMS[o.arms] || ARMS.down).map(v => v*sc);
  const mx = (sx + ex)/2, my = (sy + ey)/2;
  ctx.strokeStyle = kit.shirt; ctx.lineWidth = w*0.85; seg(sx, sy, mx, my);
  ctx.strokeStyle = skin; ctx.lineWidth = w*0.7; seg(mx, my, ex, ey);
  ctx.restore();
}
function cutBall(x, y, sc, ang) {
  const rx = Math.max(5, sc*0.17);
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang || 0);
  ctx.fillStyle = '#f6f3ea'; ctx.strokeStyle = '#3b2f22'; ctx.lineWidth = 1.4;
  ellipse(0, 0, rx, rx*0.62); ctx.fill(); ctx.stroke();
  ctx.restore();
}
function cutText(text, y, size, alpha) {
  const a0 = ctx.globalAlpha;
  ctx.globalAlpha = a0*(alpha == null ? 1 : alpha);
  ctx.font = `900 ${Math.round(size)}px 'Big Shoulders Display', Impact, sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillText(text.toUpperCase(), V.W/2 + 2, y + 3);
  ctx.fillStyle = '#f1eee4'; ctx.fillText(text.toUpperCase(), V.W/2, y);
  ctx.globalAlpha = a0;
}
function cutTag(text, g) {
  ctx.font = `700 ${Math.round(g.H*0.034)}px 'Atkinson Hyperlegible', system-ui, sans-serif`;
  ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#a7b4a9';
  ctx.fillText(text.toUpperCase(), 16, g.H*0.035);
}
/* two player: each player's cue in the bottom bar of a close-up, in his colour and naming his own key (the on-screen buttons are off,
   so this is where a pair learns that Kick at goal, Push and Jump are the Pass key). The owner's cue stays until the verdict; the
   other player's until his choice locks. [[seat, text], ...], Player 1's first */
const KEYCAP = { KeyW:'W', KeyA:'A', KeyS:'S', KeyD:'D', KeyF:'F', KeyG:'G', KeyH:'H', KeyJ:'J', KeyK:'K', KeyL:'L', Slash:'/', Period:'.', Comma:',', Space:'Space', ShiftLeft:'Shift', ShiftRight:'Shift', Numpad1:'Num 1', Numpad2:'Num 2', Numpad3:'Num 3' };
function seatKey(s, act) {                                 // what seat s presses for an action, as the screen names it: a keycap, or a controller button by its position
  const sch = seatScheme(s);
  if (!sch) return act === 'a' ? 'Bottom Button' : act === 'b' ? 'Right Button' : act === 'c' ? 'Shoulder' : act === 'x' ? 'Stick' : 'Stick';
  if (act === 'x') return sch === 'right' ? 'Arrows' : 'A D';   // a sideways step or guard
  if (act === 'm') return sch === 'right' ? 'Arrows' : 'W A S D';
  return KEYCAP[KB[sch][act][0]] || KB[sch][act][0];
}
function cutCues(c) {
  const out = [], key = (t, act) => seatKey(seatOfTeam(t), act);
  if (c.kind === 'scrum') { for (const t of [0, 1]) out.push([seatOfTeam(t), key(t, 'a') + ' · Push']); return out; }
  if (c.kind === 'lineout') { for (const t of [0, 1]) out.push([seatOfTeam(t), key(t, 'a') + ' · Jump']); return out; }
  if (c.kind === 'goal') { const t = c.g.team; if (!c.after && !c.g.out && !c.g.watch) out.push([seatOfTeam(t), c.g.type === 'drop' ? key(t, 'b') + ' · Drop Goal' : 'Hold ' + key(t, 'a') + ' · Kick']); return out; }
  if (c.out != null) return out;
  const k = c.kind, U = c.own, O = 1 - c.own;
  out.push([seatOfTeam(U), k === 'past' ? key(U, 'x') + ' · Step Left · Step Right' : k === 'pass' ? key(U, 'a') + ' Pass · ' + key(U, 'b') + ' Dummy' : k === 'tackle' ? key(U, 'a') + ' · Tackle' : key(U, 'a') + ' · Block']);
  if (!c.locked) out.push([seatOfTeam(O), k === 'past' ? key(O, 'x') + ' · Guard Left · Guard Right' : k === 'pass' ? key(O, 'x') + ' · Drift · Rush' : k === 'tackle' ? key(O, 'x') + ' · Step Left · Step Right' : key(O, 'b') + ' · Dummy']);
  out.sort((a, b) => a[0] - b[0]);
  return out;
}
function cutSeatTag(s, x, y, size) {                       // two player: a seat tag (the numeral on the seat colour) over a figure in a close-up, its bottom edge at y
  if (s == null) return;
  const w = Math.max(14, size), h = w*0.9;
  ctx.fillStyle = s === 1 ? C.p2 : C.ctrl; rrect(x - w/2, y - h, w, h, w*0.18); ctx.fill();
  ctx.fillStyle = TAG_INK[s]; ctx.font = `900 ${Math.round(w*0.72)}px 'Big Shoulders Display', Impact, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(String(s + 1), x, y - h/2 + 0.5);
}
function drawCutCues(c, g) {
  const cues = cutCues(c); if (!cues.length) return;
  ctx.font = `700 ${Math.round(g.H*0.034)}px 'Atkinson Hyperlegible', system-ui, sans-serif`; ctx.textBaseline = 'middle';
  for (const [s, text] of cues) {
    ctx.fillStyle = s === 1 ? C.p2 : C.ctrl; ctx.textAlign = s === 1 ? 'right' : 'left';
    ctx.fillText(('Player ' + (s + 1) + ' · ' + text).toUpperCase(), s === 1 ? g.W - 16 : 16, g.H*0.965);
  }
}
function drawScrum(c, g) {
  if (practice) dvStage(g.H*0.62); else drawStage(g);
  const { W, H } = g, sc = H*0.2, ground = H*0.85;
  const t = c.t, engaged = t >= SCRUM_SET;
  const mid = W*0.5 + c.pos*sc*0.7 + (engaged && !c.result ? Math.sin(t*31)*1.5 : 0);
  const gap = engaged ? 0 : t < 0.75 ? 0.9 : 0.4;
  const lean = engaged ? 1 : t < 0.75 ? 0.5 : 0.85, crouch = engaged ? 0.75 : t < 0.75 ? 0.35 : 0.65;
  // far prop, hooker, near prop: the far two sit just behind and darker
  for (const [k, dy, dim] of [[0.86, -0.045, 0.42], [0.93, -0.022, 0.22], [1, 0, 0]]) {
    const s = sc*k;
    for (const team of [1, 0]) {
      const f = team === 0 ? 1 : -1;
      if (!(practice && dvScrumMan(team, dim ? (dim > 0.3 ? 2 : 1) : 0, mid - f*(0.92 + gap/2)*s, ground + dy*H, s, f, t, engaged))) fig(mid - f*(0.92 + gap/2)*s, ground + dy*H, s, kitOf(team), { face:f, lean, crouch, arms:'down', drive:t >= 0.75, dim });
    }
  }
  if (M.two) for (const team of [0, 1]) {                     // the seat tag over each pack, and that pack's Early or Good Hit for 0.9s
    const f = team === 0 ? 1 : -1, px = mid - f*(0.92 + gap/2)*sc, ty = ground - 1.75*sc, tag = Math.max(16, H*0.045);
    cutSeatTag(seatOfTeam(team), px, ty, tag);
    const m = c.msg[team];
    if (m && t - m.at < 0.9) { ctx.fillStyle = ringCol(team); ctx.font = `800 ${Math.round(H*0.045)}px 'Big Shoulders Display', Impact, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom'; ctx.fillText(m.text.toUpperCase(), px, ty - tag*0.9 - 4); }
  }
  // the feed: the ball waits at the mouth of the tunnel, then rolls in
  const roll = engaged ? clamp((t - SCRUM_SET - 0.2)/0.35, 0, 1) : 0, shF = c.feed === 0 ? 1 : -1;
  cutBall(mid - shF*0.5*sc*(1 - roll), ground + (0.06 - 0.075*roll)*H, sc*(1.1 - 0.25*roll), roll*6);
  // calls
  const call = t < 0.75 ? 'Crouch' : t < 1.3 ? 'Bind' : t < 1.9 ? 'Set' : null;
  if (call && t > CUT_IN) cutText(call, H*0.37, H*(call === 'Set' ? 0.17 : 0.13), call === 'Set' ? 1 : 0.92);
  // who is winning the shove
  const bw = W*0.38, bx = W*0.5 - bw/2, by = H*0.885, bh = Math.max(8, H*0.022);
  ctx.fillStyle = 'rgba(8,14,10,.8)'; rrect(bx - 3, by - 3, bw + 6, bh + 6, 4); ctx.fill();
  const frac = clamp(c.pos/SCRUM_DOM, -1, 1);                // the bar fills exactly at a penalty; the steal line sits half way
  ctx.fillStyle = M.two ? (frac >= 0 ? ringCol(0) : ringCol(1)) : (frac >= 0 ? C.ctrl : showCol(1));   // two player: each pack's gain in its player's colour
  if (frac >= 0) ctx.fillRect(W*0.5, by, bw/2*frac, bh); else ctx.fillRect(W*0.5 + bw/2*frac, by, -bw/2*frac, bh);
  ctx.fillStyle = '#f1eee4'; ctx.fillRect(W*0.5 - 1, by - 4, 2, bh + 8);
  ctx.font = `800 ${Math.round(H*0.04)}px 'Big Shoulders Display', Impact, sans-serif`; ctx.textBaseline = 'middle';
  ctx.textAlign = 'right'; ctx.fillText(practice ? 'YOU' : M.nat[0].id, bx - 10, by + bh/2);
  ctx.textAlign = 'left'; ctx.fillText(practice ? 'THEM' : M.nat[1].id, bx + bw + 10, by + bh/2);
}
function drawLineout(c, g) {
  drawStage(g);
  const { W, H, ground } = g, t = c.t;
  const sc = Math.min(g.sc, (W*0.96 - W*0.3)/((LINE_X + 1.15)*0.9 + 0.25));   // the far lifter stays on screen
  const X = m => W*0.3 + m*sc*0.9;   // clear of the joystick on the left
  ctx.strokeStyle = 'rgba(244,241,232,.85)'; ctx.lineWidth = 3;
  seg(X(-0.6), H, X(-0.6) + (W*0.5 - X(-0.6))*0.18, g.horizon);
  const thrown = t >= c.throwT;
  fig(X(-0.2), ground + 0.05*H, sc*1.08, kitOf(c.team), { face:1, arms:thrown ? 'reach' : 'up', crouch:thrown ? 0 : 0.1, lean:thrown ? 0.15 : 0 });
  for (const team of [1, 0]) {
    const k = team === 0 ? 1 : 0.88, off = team === 0 ? 0 : 0.4, gy = ground + (team === 0 ? 0 : -0.08*H), s = sc*k;
    const lift = liftAt(c.jump[team] == null ? null : t - c.jump[team]);
    const kit = kitOf(team);
    fig(X(LINE_X + off - 0.75), gy, s, kit, { face:-1, arms:lift > 0.3 ? 'up' : 'carry', crouch:lift > 0.3 ? 0.05 : 0.3 });
    fig(X(LINE_X + off + 0.75), gy, s, kit, { face:-1, arms:lift > 0.3 ? 'up' : 'carry', crouch:lift > 0.3 ? 0.05 : 0.3 });
    fig(X(LINE_X + off), gy, s, kit, { face:-1, lift, arms:lift > 0.15 || (c.winner === team) ? 'up' : 'down' });
    if (M.two) cutSeatTag(seatOfTeam(team), X(LINE_X + off), gy - (lift + 2.45)*s, Math.max(16, H*0.045));   // the seat tag over each jumper
  }
  let bx, bh, ang = 0;
  if (!thrown) { bx = -0.05; bh = 2.5; }
  else if (c.outcome === 'caught') { const off = c.winner === 0 ? 0 : 0.4; bx = LINE_X + off; bh = handAt(c, c.winner, t) + 0.08; }
  else {
    const u = (t - c.throwT)/c.flight;
    if (u <= 1) { bx = -0.05 + (LINE_X + 0.05)*u; bh = 2.5 + (c.catchH - 2.5)*u + 2.8*u*(1-u); ang = -0.5 + u; }
    else { bx = LINE_X + (u-1)*LINE_X*1.1; bh = Math.max(0.1, c.catchH - (u-1)*5); ang = u; }
  }
  const gyB = c.outcome === 'caught' && c.winner === 1 ? ground - 0.08*H : ground;
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ellipse(X(bx), gyB, sc*0.12, sc*0.035); ctx.fill();
  cutBall(X(bx), gyB - bh*sc*(c.outcome === 'caught' && c.winner === 1 ? 0.88 : 1), sc, ang);
}
function drawCut() {
  const c = M.cut; if (!c) return;
  const g = cutGeom();
  const ease = u => 1 - Math.pow(1 - u, 3);
  const ein = ease(clamp(c.t/CUT_IN, 0, 1)), eout = c.exit > 0 ? ease(clamp(c.exit/CUT_OUT, 0, 1)) : 0;
  const left = RM ? 0 : eout*g.W, right = RM ? g.W : ein*g.W;
  if (right - left <= 0.5) return;
  ctx.save();
  if (RM) ctx.globalAlpha = Math.min(ein, 1 - eout);
  ctx.beginPath(); ctx.rect(left, 0, right - left, g.H); ctx.clip();
  if (c.kind === 'scrum') drawScrum(c, g);
  else if (c.kind === 'lineout') drawLineout(c, g);
  else if (c.kind === 'goal') drawKick(c, g);
  else drawDuel(c, g);
  if (!practice) { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, g.W, g.H*0.07); ctx.fillRect(0, g.H*0.93, g.W, g.H*0.07); }   // the broadcast bars are a match's
  if (!(hintShown[0] && hintShown[0].title)) cutTag(cutTitle(c), g);   // a hints card with a title sits where the tag goes and names the moment itself
  if (M.two) drawCutCues(c, g);
  ctx.restore();
  if (RM) return;
  ctx.fillStyle = C.ctrl;
  if (ein < 1) ctx.fillRect(right - 3, 0, 6, g.H);
  if (eout > 0 && eout < 1) ctx.fillRect(left - 3, 0, 6, g.H);
}
/* ---------- duel view: a chase-cam over your player's shoulder ----------
   Looks along +x, so screen-right is always world +y. A point (x, y, h)
   projects with z = x - camX: sx = cx + F(y - camY)/z, sy = hz + F(camH - h)/z. */
let RM = (() => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } })();   // let: the render test flips it
const RIG = { 1:{ back:4.2, side:2.2, h:2.3, F:1.2, hz:0.20 }, 2:{ back:6.5, side:2.4, h:3.0, F:1.05, hz:0.16 } };
const ease3 = u => 1 - Math.pow(1 - clamp(u, 0, 1), 3);
const lerp = (a, b, u) => a + (b - a)*u;
// where everyone stands at scene time t (render only: the world is frozen)
function duelPose(c, t) {
  const tk = c.tkAt != null ? c.tk - 0.10*(1 - ease3((t - c.tkAt)/0.15)) : c.tk, D = c.D, K = c.K, w = c.w;   // two player: a step's slower approach eases in over the step's 0.15s, so the figures don't jump apart
  const gap = G_START - (G_START - G_HIT)*clamp((t - CUT_IN)/(tk - CUT_IN), 0, 1);
  const P = { u:{ x:K.x - D.x*gap*w, y:K.y - D.y*gap*w, h:0 }, o:{ x:K.x + D.x*gap*(1 - w), y:K.y + D.y*gap*(1 - w), h:0 }, r:null, ball:null };
  const after = c.judged != null ? t - c.judged : -1, hit = t - c.tk;
  if (c.kind === 'past') {
    const shade = c.feintAt != null && t < c.feintAt + 0.12 ? -c.open0 : -c.open;      // the side he's blocking
    const into = c.feintAt != null ? clamp((t - c.feintAt)/0.12, 0, 1) : 1;
    P.o.shift = c.feintAt != null ? lerp(-c.open0, -c.open, into)*0.55 : shade*0.55;
    if (c.act && after >= 0) P.u.y += 1.2*c.act*ease3(after/0.15);
    if (c.out === 'break' && hit > 0) { P.u.x += hit*6; P.o.dive = c.act ? -c.act : 1; P.o.y += -0.6*c.open*ease3(hit/0.2); P.o.lying = hit > 0.18; }
    if (c.out === 'tackled' && hit > 0) { P.u.lying = hit > 0.15; P.o.lying = hit > 0.2; }
    if (c.out === 'broken' && hit > 0) { P.u.x += hit*5; P.o.lying = hit > 0.12; }
  } else if (c.kind === 'pass') {
    const r = c.r0, rx = r.x + r.vx*c.rho*(t - c.tTrig), dy = r.y - c.u0.y;
    const ly = Math.sign(dy)*Math.min(Math.abs(dy), 3.0 + 0.15*(Math.abs(dy) - 4));   // squeezed for the shot
    P.r = { x:Math.max(rx, P.u.x - 1.5), y:P.u.y + ly, h:0 };
    const drift = c.driftAt != null ? ease3((t - c.driftAt)/0.15)
      : c.fakeAt != null ? ease3((t - c.fakeAt)/0.12)*(1 - ease3((t - c.fakeAt - 0.2)/0.12)) : 0;
    P.o.y += c.side*1.2*drift; P.o.shift = c.side*0.45*drift + (c.lean || 0)*0.45;   // two player: the other player's hand before the lock
    P.o.commit = c.drift ? 0 : clamp((t - c.commitT + 0.1)/0.15, 0, 1);
    if (c.act === 'dummy' && after >= 0 && after < 0.2) P.u.fake = true;
    if (c.out === 'sold' && hit > 0) { P.u.x += hit*6; P.u.y -= 0.5*c.side*ease3(hit/0.2); }
    if (after >= 0 && !['tackled', 'broken', 'sold'].includes(c.out)) {
      const fl = clamp(after/0.35, 0, 1);
      P.ball = { x:lerp(P.u.x, P.r.x, fl), y:lerp(P.u.y, P.r.y, fl), h:1.1 + 0.6*fl*(1 - fl) };
      if (c.out === 'drawn' && hit > 0) { P.o.lying = hit > 0.15; P.o.x = lerp(P.o.x, P.u.x + 0.3, ease3(hit/0.2)); }
      if (c.out === 'early') P.o.y = lerp(P.o.y, P.r.y, ease3(after/0.6)*0.4);
    }
    if ((c.out === 'tackled' || c.out === 'broken') && hit > 0) { if (c.out === 'tackled') { P.u.lying = hit > 0.15; P.o.lying = hit > 0.2; } else { P.u.x += hit*5; P.o.lying = hit > 0.12; } }
  } else if (c.kind === 'tackle') {
    if (c.stepAt != null) P.o.y += c.stepDir*1.2*ease3((t - c.stepAt)/0.15);
    if (after >= 0 && c.act) P.u.dive = ease3(after/0.2);
    if (c.out === 'bighit' && hit > 0) { P.o.x += 1.5*ease3(hit/0.25); P.o.lying = hit > 0.12; P.u.x += 0.8*ease3(hit/0.25); P.u.lying = hit > 0.2; }
    if (c.out === 'tackled' && hit > 0) { P.o.lying = hit > 0.15; P.u.lying = hit > 0.15; }
    if (c.out === 'missed' && hit > 0) { P.u.lying = hit > 0.1; P.o.x -= hit*5; }
  } else {
    const t1 = c.reachT != null ? c.reachT : c.centre, q0 = c.u0;
    const reach = ease3((t - CUT_IN)/(t1 - CUT_IN));
    P.u = { x:q0.x + (c.L.x - q0.x)*0.85*reach, y:q0.y + (c.L.y - q0.y)*0.85*reach, h:0 };
    const slow = (p0, s) => ({ x:p0.x + p0.vx*0.35*s, y:p0.y + p0.vy*0.35*s, h:0 });
    P.o = slow(c.o0, t); P.r = slow(c.r0, t);
    P.o.wind = clamp((t - 0.55)/0.2, 0, 1); P.o.thrown = t >= c.rel;
    if (c.dummy && t > 0.75 && t < c.rel) P.o.pump = clamp((t - 0.75)/0.15, 0, 1);
    if (t < c.rel) P.ball = null;
    else {
      const sp = hyp(c.L.x - c.P0.x, c.L.y - c.P0.y)/0.30, dir = { x:(c.P1.x - c.P0.x), y:(c.P1.y - c.P0.y) }, m = hyp(dir.x, dir.y) || 1;
      let s = (t - c.rel)*sp;
      if (c.out === 'intercept' && after >= 0) s = Math.min(s, hyp(c.L.x - c.P0.x, c.L.y - c.P0.y));
      P.ball = { x:c.P0.x + dir.x/m*s, y:c.P0.y + dir.y/m*s, h:1.3 };
      if (c.out === 'intercept' && after >= 0) { P.ball = { x:P.u.x + 0.3, y:P.u.y, h:1.2 }; P.u.x += Math.max(0, after - 0.1)*6; P.ball.x = P.u.x + 0.3; P.u.carry = true; }
      if (c.out === 'knock' && after >= 0) { const k = clamp(after/0.5, 0, 1); P.ball = { x:c.L.x - 3*k, y:c.L.y + (c.act || 1)*0.4*k, h:1.3*(1 - k) + 0.6*Math.sin(k*Math.PI) }; }
    }
  }
  return P;
}
// Block frames the pass itself: from behind whichever of you and the passer is nearer, centred between passer and receiver
function camAt(c, cam, P, Pl) {
  if (c.kind === 'block') return { camX:Math.min(P.u.x, P.o.x) - cam.back, camY:(Pl.o.y + Pl.r.y)/2 + cam.side*0.4 };
  return { camX:P.u.x - cam.back, camY:Pl.u.y + cam.side };
}
function duelCam(c) {
  const key = V.W + 'x' + V.H;
  if (c.cam && c.cam.key === key) return c.cam;
  const r = RIG[DUEL[c.kind].rig], tw = (c.win[0] + c.win[1])/2;
  const P = duelPose({ ...c, judged:null, out:null, act:null }, tw);
  const focus = c.kind === 'block' ? { x:c.L.x, y:(P.o.y + P.r.y)/2 } : P.o;
  const s = c.kind === 'pass' ? Math.sign((P.r.y - P.u.y) || 1) : c.kind === 'block' ? Math.sign((c.r0.y - c.u0.y) || 1) : ((P.o.y - P.u.y) < -0.5 ? -1 : 1);
  const cam = { key, back:r.back, side:r.side*s, h:r.h, F:r.F*V.H, hz:r.hz*V.H, s, rig:DUEL[c.kind].rig };
  for (let i = 0; i < 6; i++) {
    const { camX, camY } = camAt(c, cam, P, P);
    cam.cx = clamp((0.5 - (cam.rig === 2 ? 0.07*s : 0))*V.W - cam.F*(focus.y - camY)/Math.max(0.5, focus.x - camX), 0.30*V.W, 0.75*V.W);
    // keep every opponent between the bars and clear of the buttons
    let ok = true;
    for (const tt of [CUT_IN, tw, c.tk]) {
      const Q = duelPose({ ...c, judged:null, out:null, act:null }, tt);
      const qc = camAt(c, cam, Q, Q);
      for (const a of [Q.o, Q.r].filter(Boolean)) {
        const z = a.x - qc.camX;
        if (z < 0.8) continue;
        const k = cam.F/z, sx = cam.cx + k*(a.y - qc.camY), top = cam.hz + k*(cam.h - 1.9), bot = cam.hz + k*cam.h;
        if (sx - 0.45*k < 0.05*V.W || sx + 0.45*k > V.W - 124 || top < 0.07*V.H + 4 || bot > 0.93*V.H - 4 || (sx < 180 && bot > V.H - 190)) ok = false;
      }
    }
    if (ok) break;
    cam.back += 0.8; cam.h += 0.25;
  }
  c.cam = cam;
  return cam;
}
function drawStands(g, hz, top) {
  const { W, H } = g;
  top = top || 0;
  const st = ctx.createLinearGradient(0, top, 0, hz);
  st.addColorStop(0, '#05080a'); st.addColorStop(1, '#14201a');
  ctx.fillStyle = st; ctx.fillRect(0, top, W, hz - top);
  for (const [cx, cy, k] of CROWD) { ctx.fillStyle = CROWD_C[k]; ctx.fillRect(cx*W, hz*0.22 + cy*hz*0.66, 3, 3); }
  for (const fx of [0.1, 0.9]) {
    const gl = ctx.createRadialGradient(W*fx, 0, 0, W*fx, 0, H*0.6);
    gl.addColorStop(0, 'rgba(255,238,196,.32)'); gl.addColorStop(1, 'rgba(255,238,196,0)');
    ctx.fillStyle = gl; ctx.fillRect(0, 0, W, H*0.6);
  }
  ctx.fillStyle = '#0c1611'; ctx.fillRect(0, hz - H*0.035, W, H*0.035);
}
function drawDuel(c, g) {
  const { W, H } = g;
  const cam = duelCam(c);
  // hit-stop: the scene clock holds for 90ms at contact
  const ti = c.out === 'bighit' ? c.judged + 0.12 : c.tk;
  let t = c.t + (c.acc || 0);                              // slow motion: the fraction of a frame the logic is holding back, so the run-in is smooth
  if (!RM && c.out && t > ti) t = t < ti + 0.09 ? ti : t - 0.09;
  const P = duelPose(c, t);
  const lagT = RM ? t : Math.max(0, t - 0.12);
  const Pl = duelPose(c, lagT);
  const { camX, camY } = camAt(c, cam, P, Pl), F = cam.F, hz = cam.hz, cx = cam.cx, ch = cam.h;
  const proj = (x, y, h) => { const z = x - camX; return z < 0.05 ? null : { sx:cx + F*(y - camY)/z, sy:hz + F*(ch - h)/z, k:F/z, z }; };
  ctx.save();
  if (!RM && c.out && ['tackled', 'bighit', 'break', 'broken'].includes(c.out)) {
    const dt = c.t - c.tk;
    if (dt > 0 && dt < 0.25) { const a = 6*Math.exp(-dt/0.08); ctx.translate((Math.random() - 0.5)*a, (Math.random() - 0.5)*a); }
  }
  drawStands(g, hz);
  ctx.fillStyle = C.surround; ctx.fillRect(0, hz, W, H - hz);
  // grass bands, as drawPitch does them, projected
  const quad = (x0, y0, x1, y1, fill) => {
    const a = Math.max(x0, camX + 0.5), bnd = x1;
    if (bnd <= camX + 0.5) return;
    const p1 = proj(a, y0, 0), p2 = proj(a, y1, 0), p3 = proj(bnd, y1, 0), p4 = proj(bnd, y0, 0);
    ctx.fillStyle = fill; ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy); ctx.lineTo(p3.sx, p3.sy); ctx.lineTo(p4.sx, p4.sy); ctx.closePath(); ctx.fill();
  };
  for (let i = 0; i < 12; i++) quad(i*10, 0, i*10 + 10, 70, i % 2 ? C.grassA : C.grassB);
  const a0 = ctx.globalAlpha;
  ctx.globalAlpha = a0*0.14; quad(0, 0, 10, 70, M.kit[c.own].fill); quad(110, 0, 120, 70, M.kit[1 - c.own].fill); ctx.globalAlpha = a0;   // the owner's in-goal behind him, the other side's ahead
  ctx.strokeStyle = C.line;
  const lineX = (x, dash) => {
    if (x <= camX + 0.5) return;
    const a = proj(x, 0, 0), b2 = proj(x, 70, 0);
    ctx.lineWidth = Math.max(1, 0.1*a.k); ctx.setLineDash(dash ? [a.k*1.5, a.k*1.5] : []);
    ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b2.sx, b2.sy); ctx.stroke();
  };
  for (const x of [10, 110, 32, 88, 60]) lineX(x, false);
  for (const x of [50, 70, 15, 105]) lineX(x, true);
  ctx.setLineDash([]);
  for (const y of [0, 70]) {
    const a = proj(camX + 0.6, y, 0), b2 = proj(camX + 160, y, 0);
    ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b2.sx, b2.sy); ctx.stroke();
  }
  // posts
  if (110 - camX > 0.5 && 110 - camX < 70) {
    for (const py of [32.2, 37.8]) {
      const a = proj(110, py, 0), b2 = proj(110, py, 11);
      ctx.strokeStyle = '#f7f5ee'; ctx.lineWidth = Math.max(1.5, 0.12*a.k); ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b2.sx, b2.sy); ctx.stroke();
      ctx.fillStyle = C.pad; ctx.fillRect(a.sx - 0.3*a.k, a.sy - 1.8*a.k, 0.6*a.k, 1.8*a.k);
    }
    const l = proj(110, 32.2, 3), r = proj(110, 37.8, 3);
    ctx.strokeStyle = '#f7f5ee'; ctx.beginPath(); ctx.moveTo(l.sx, l.sy); ctx.lineTo(r.sx, r.sy); ctx.stroke();
  }
  // Easy only: the open lane
  if (c.kind === 'past' && levelOf(c.own) === 0 && c.out == null) {
    const o = c.open, path = (k, lat) => proj(c.K.x + c.D.x*k, c.K.y + c.D.y*k + lat*o, 0);
    const pts = [path(-1, 0.7), path(3, 0.7), path(3, 1.9), path(-1, 1.9)].filter(Boolean);
    if (pts.length === 4) { ctx.fillStyle = 'rgba(255,207,61,.22)'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p.sx, p.sy) : ctx.moveTo(p.sx, p.sy)); ctx.closePath(); ctx.fill(); }
  }
  // the ring: the one timing cue
  if (c.out == null && !(c.kind === 'block' && t < c.rel)) {
    const A = c.kind === 'block' ? { x:c.L.x, y:c.L.y } : P.o, pa = proj(A.x, A.y, 0);
    if (pa) {
      const r = c.kind === 'block' ? 0.9 : lerp(2.6, 0.9, clamp((t - CUT_IN)/(c.win[0] - CUT_IN), 0, 1));
      const rx = r*pa.k, ry = rx*clamp(ch/pa.z, 0.18, 0.6), live = t >= c.win[0] && t <= c.win[1];
      ctx.beginPath(); ctx.ellipse(pa.sx, pa.sy, rx, ry, 0, 0, Math.PI*2);
      if (live) { ctx.fillStyle = seatOfTeam(c.own) === 1 ? 'rgba(255,95,210,.30)' : 'rgba(255,207,61,.30)'; ctx.fill(); ctx.strokeStyle = ringCol(c.own); ctx.lineWidth = 4; }   // the ring in the owner's colour: pink for Player 2
      else { ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 2; }
      ctx.stroke();
    }
  }
  // figures, far to near
  const actors = [];
  const add = (a, team, back, extra) => { if (a) actors.push({ a, team, back, o:extra || {} }); };
  if (c.kind === 'past' || c.kind === 'pass') {
    add(P.u, c.U.team, true, { carry:!P.ball && !P.u.fake, arms:P.u.fake ? 'pass' : undefined, num:c.U.n, stride:t*19 });
    add(P.o, c.O.team, false, { shift:P.o.shift || 0, lean:(P.o.shift || 0)*0.6 + (P.o.commit || 0)*0.25, arms:P.o.commit > 0.5 ? 'wide' : 'run', stride:t*12, lying:P.o.lying, dive:P.o.dive });
    if (P.r) add(P.r, c.R.team, true, { num:c.R.n, stride:t*19, arms:P.ball ? 'reach' : 'run' });
  } else if (c.kind === 'tackle') {
    add(P.u, c.U.team, true, { num:c.U.n, stride:t*16, dive:P.u.dive ? 1 : 0, lying:P.u.lying, arms:P.u.dive ? 'reach' : 'run' });
    add(P.o, c.O.team, false, { carry:true, stride:t*19, lean:c.stepAt != null && t > c.stepAt ? c.stepDir*0.3 : (c.lean || 0)*0.3, lying:P.o.lying });
  } else {
    add(P.u, c.U.team, true, { num:c.U.n, stride:t*14, arms:P.u.carry ? 'carry' : 'reach' });
    add(P.o, c.O.team, false, { stride:t*8, arms:P.o.thrown ? 'pass' : (P.o.wind ? 'carry' : 'run'), twist:P.o.pump || P.o.wind });
    add(P.r, c.R.team, false, { stride:t*10, arms:'reach' });
  }
  actors.sort((p, q) => q.a.x - p.a.x);
  for (const it of actors) {
    const p = proj(it.a.x, it.a.y, 0);
    if (!p || p.z < 0.8) continue;
    figFB(p.sx, p.sy, p.k, it.team, { back:it.back, ...it.o });
    if (it.o.carry) cutBall(p.sx + (it.back ? 0.18 : -0.18)*p.k, p.sy - 1.15*p.k, Math.max(10, p.k*0.9), 0.3);
    if (M.two && c.out == null && (it.a === P.u || it.a === P.o)) cutSeatTag(seatOfTeam(it.team), p.sx, p.sy - 2.25*p.k, 0.4*p.k);   // the seat tags over the two men in it, until the verdict
  }
  if (P.ball) { const pb = proj(P.ball.x, P.ball.y, P.ball.h); if (pb) { const sh = proj(P.ball.x, P.ball.y, 0); if (sh) { ctx.fillStyle = 'rgba(0,0,0,.25)'; ellipse(sh.sx, sh.sy, 0.18*sh.k, 0.05*sh.k); ctx.fill(); } cutBall(pb.sx, pb.sy, Math.max(10, pb.k*0.9), 0.6); } }
  // effects
  if (!RM && c.out) {
    const dt = c.t - c.tk;
    const k0 = proj(c.K.x, c.K.y, 1.2);
    if (k0 && dt > 0 && dt < 0.15 && ['tackled', 'bighit', 'break', 'broken', 'missed'].includes(c.out)) {
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) { const a = i/8*Math.PI*2, r0 = 0.3*k0.k, r1 = (0.6 + dt*3)*k0.k; seg(k0.sx + Math.cos(a)*r0, k0.sy + Math.sin(a)*r0, k0.sx + Math.cos(a)*r1, k0.sy + Math.sin(a)*r1); }
    }
    if (c.out === 'bighit' && dt > 0 && dt < 0.3) {
      ctx.fillStyle = 'rgba(120,170,90,.8)';
      for (let i = 0; i < 10; i++) { const kk = proj(c.K.x + 1 + (i % 3)*0.3, c.K.y + (i - 5)*0.15, dt*4*(1 + i % 2)); if (kk) ctx.fillRect(kk.sx, kk.sy, 3, 3); }
    }
    if ((c.out === 'break' || c.out === 'intercept') && c.after) {
      ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 2;
      for (let i = 0; i < 12; i++) { const a = i/12*Math.PI*2 + 0.2, r0 = H*0.25; seg(cx + Math.cos(a)*r0, hz + H*0.3 + Math.sin(a)*r0*0.6, cx + Math.cos(a)*r0*2.2, hz + H*0.3 + Math.sin(a)*r0*1.3); }
    }
  }
  ctx.restore();
}
/* ---------- goal-kick view: a still, pitch-level camera behind the kicker ----------
   Everything is in the kick frame. The camera sits back metres behind the mark
   at 2.2m, looking along u at the posts' centre, with no pitch and no roll.
   The lens is solved per kick so the mark sits at 0.80H and the upright tops
   just under the scoreboard. Only the arrow moves while you steer. */
function kickCam(g) {
  const key = V.W + 'x' + V.H;
  if (g.cam && g.cam.key === key) return g.cam;
  const W = V.W, H = V.H, D = g.dist, u = { x:Math.cos(g.beta), y:Math.sin(g.beta) }, r = { x:-u.y, y:u.x };
  const back = CAM.b0 + CAM.bK*D, ch = CAM.h, ytop = Math.max(CAM.topY*H, CAM.topPx);
  const F = clamp((CAM.ballY*H - ytop)/(ch/back + (KICK.upH - ch)/(D + back)), CAM.Fmin*H, CAM.Fmax*H);
  g.cam = { key, W, H, cx:0.5*W, F, hz:CAM.ballY*H - F*ch/back, ch, u, r, back, ytop, Cx:g.x - back*u.x, Cy:g.y - back*u.y, fi:null, gy:0 };
  g.cam.gy = proj(g.cam, camPt(g.cam, 110, 35, 4.25)).sy;   // the goal window: the flight zoom closes on it
  return g.cam;
}
function camPt(cam, x, y, h) { const dx = x - cam.Cx, dy = y - cam.Cy; return { z:dx*cam.u.x + dy*cam.u.y, a:dx*cam.r.x + dy*cam.r.y, h }; }
function proj(cam, q) { const k = cam.F/q.z; return { sx:cam.cx + k*q.a, sy:cam.hz + k*(cam.ch - q.h), k, z:q.z }; }
function pr(cam, x, y, h) { const q = camPt(cam, x, y, h); return q.z < CAM.near ? null : proj(cam, q); }   // null behind the near plane
// a ground polygon (flat x,y pairs at height h), clipped against z >= near before projection
const CZ = [], CA = [];
function groundPoly(cam, pts, h, fill) {
  const n = pts.length >> 1, near = CAM.near;
  let m = 0;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n, p = camPt(cam, pts[2*i], pts[2*i + 1], h), q = camPt(cam, pts[2*j], pts[2*j + 1], h), pin = p.z >= near, qin = q.z >= near;
    if (pin) { CZ[m] = p.z; CA[m] = p.a; m++; }
    if (pin !== qin) { const t = (near - p.z)/(q.z - p.z); CZ[m] = near; CA[m] = p.a + (q.a - p.a)*t; m++; }
  }
  if (m < 3) return false;
  ctx.fillStyle = fill; ctx.beginPath();
  for (let i = 0; i < m; i++) { const k = cam.F/CZ[i], sx = cam.cx + k*CA[i], sy = cam.hz + k*(cam.ch - h); if (i) ctx.lineTo(sx, sy); else ctx.moveTo(sx, sy); }
  ctx.closePath(); ctx.fill();
  return true;
}
// adds one clipped ground segment to the current path; returns the mean px-per-metre, or 0 when it is all behind the camera
function groundSeg(cam, x0, y0, x1, y1, h) {
  let p = camPt(cam, x0, y0, h), q = camPt(cam, x1, y1, h);
  const near = CAM.near;
  if (p.z < near && q.z < near) return 0;
  if (p.z < near) { const t = (near - p.z)/(q.z - p.z); p = { z:near, a:p.a + (q.a - p.a)*t, h }; }
  if (q.z < near) { const t = (near - q.z)/(p.z - q.z); q = { z:near, a:q.a + (p.a - q.a)*t, h }; }
  const a = proj(cam, p), b = proj(cam, q);
  ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy);
  return (a.k + b.k)/2;
}
function groundLine(cam, x0, y0, x1, y1, dash) {
  ctx.beginPath();
  const k = groundSeg(cam, x0, y0, x1, y1, 0);
  if (!k) return;
  ctx.lineWidth = clamp(0.1*k, 1, 3.5); ctx.setLineDash(dash ? [k*1.5, k*1.5] : []);
  ctx.stroke(); ctx.setLineDash([]);
}
const JUDGE_KIT = { shirt:'#2b2f36', trim:'#f1eee4', hoops:false, shorts:'#1b1d22' };
const BANDS = Array.from({ length:12 }, (_, i) => [i*10, 0, i*10 + 10, 0, i*10 + 10, 70, i*10, 70]);   // the 10m grass bands, in the frame
const easeIO = u => u < 0.5 ? 2*u*u : 1 - 2*(1 - u)*(1 - u);
// where the kicker and the ball are at run-up time st (< 0 before it) and flight time tf (< 0 before the strike)
function kickPose(g, st, tf) {
  const k = KICK, drop = g.type === 'drop', ux = Math.cos(g.beta), uy = Math.sin(g.beta), rx = -uy, ry = ux;
  // a placed kicker starts 1.6m back and 1.2m left and runs up; a drop kicker stands at the mark, 0.9m left of the arrow, and steps onto the line as he drops it
  const K0x = g.x - (drop ? 0.25 : 1.6)*ux - (drop ? 0.9 : 1.2)*rx, K0y = g.y - (drop ? 0.25 : 1.6)*uy - (drop ? 0.9 : 1.2)*ry, K1x = g.x - 0.25*ux - 0.3*rx, K1y = g.y - 0.25*uy - 0.3*ry;
  const runT = drop ? k.dropT : k.runup, relT = drop ? 0 : 0.12;   // the run-up (or the drop), and when the ball leaves his hands
  const run = st < 0 ? 0 : ease3(st/runT);
  const P = { kx:K0x + (K1x - K0x)*run, ky:K0y + (K1y - K0y)*run, stride:st > 0 && !drop ? st*16 : 0, leg:0, bx:0, by:0, bh:0, held:false };
  if (st >= 0) P.leg = tf < 0 ? clamp((st - (runT - 0.10))/0.10, 0, 1) : Math.max(0, 1 - tf/0.25);
  const hx = 0.15*ux + 0.26*rx, hy = 0.15*uy + 0.26*ry;         // the held ball sits at his right hip, where it shows past his back
  if (st < relT) { P.bx = P.kx + hx; P.by = P.ky + hy; P.bh = 1.05; P.held = true; }
  else if (tf < 0 && st < runT) {                              // let go from the hands, meeting the ground on the mark as the boot arrives
    const s = (st - relT)/(runT - relT), r0 = ease3(relT/runT), Rx = K0x + (K1x - K0x)*r0 + hx, Ry = K0y + (K1y - K0y)*r0 + hy;
    P.bx = Rx + (g.x - Rx)*s; P.by = Ry + (g.y - Ry)*s; P.bh = 1.05 - (1.05 - k.h0)*s*s;
  } else if (tf < 0) { P.bx = g.x; P.by = g.y; P.bh = k.h0; }  // the hit-stop
  else { const p = ballAt(g, tf); P.bx = p.x; P.by = p.y; P.bh = p.h; }
  return P;
}
// the drawn ball at flight time tf: the closed form, then a cosmetic 0.5s rebound off the woodwork, or a roll on from a short landing
function ballAt(g, tf) {
  const X = g.X, L = g.L, res = g.res, k = KICK;
  if (g.out === 'charged') {                                 // blocked hitT into the flight: it comes back toward the lens, low
    if (tf <= g.hitT) { const p = posAt(L, tf); p.h = Math.max(0, p.h); return p; }
    const p = posAt(L, g.hitT), tau = tf - g.hitT, tr = Math.min(tau, 0.6), ux = Math.cos(g.beta), uy = Math.sin(g.beta);
    return { x:p.x - 5*ux*tr, y:p.y - 5*uy*tr, h:Math.max(0, p.h + 2*tau - 4.9*tau*tau) };
  }
  const wood = res === 'post' || res === 'postIn' || res === 'bar' || res === 'barIn';
  if (tf <= X.t || !(X.land || wood)) { const p = posAt(L, tf); p.h = Math.max(0, p.h); return p; }
  const v = velAt(L, X.t), tau = tf - X.t, tr = Math.min(tau, 0.5);
  if (X.land) return { x:X.x + v.x*0.3*tr, y:X.y + v.y*0.3*tr, h:0 };
  // in the kick's own axes (along the line to the posts' centre, and across it), so the woodwork reads on screen the way the verdict does:
  // a contact that scores carries on behind the posts, a miss comes back into play, and a post sends the ball away from itself
  const ux = Math.cos(g.beta), uy = Math.sin(g.beta), rx = -uy, ry = ux;
  const al = v.x*ux + v.y*uy, ac = v.x*rx + v.y*ry, aX = (X.x - g.x)*rx + (X.y - g.y)*ry;   // across 0 is the posts' centre
  let a2 = al, c2 = ac, vh = v.h;
  if (res === 'post' || res === 'postIn') {
    const up = Math.abs(X.y - k.upL) < Math.abs(X.y - k.upR) ? k.upL : k.upR, aU = (110 - g.x)*rx + (up - g.y)*ry;   // the nearer upright
    const away = Math.sign(aX - aU) || (res === 'postIn' ? -1 : 1)*Math.sign(aU);
    if (res === 'postIn') c2 = away*1.5;                                                   // clipped the inside and on through
    else { a2 = -0.5*al; c2 = away*Math.max(1.5, 0.5*Math.abs(ac)); }                      // off the face: back, and out
  } else if (res === 'bar') a2 = -0.5*al;                                                  // back into play
  else { a2 = 0.5*al; c2 = 0; vh = 0.5*Math.abs(v.h); }                                    // barIn: popped up and on over
  return { x:X.x + (a2*ux + c2*rx)*tr, y:X.y + (a2*uy + c2*ry)*tr, h:Math.max(0, X.h + vh*tau - 4.9*tau*tau) };
}
// worst cases of this flight, for the camera: the ball's highest screen point and how far it climbs over the scoreboard
function flightInfo(g, cam) {
  if (cam.fi) return cam.fi;
  const l = pr(cam, 110, 32.2, 3), r = pr(cam, 110, 37.8, 3), gap = Math.abs(r.sx - l.sx);
  let tA = 0, minSy = 1e9;
  for (let t = 0; t <= g.X.t; t += 0.02) { const p = posAt(g.L, t), s = pr(cam, p.x, p.y, Math.max(0, p.h)); if (s && s.sy < minSy) { minSy = s.sy; tA = t; } }
  const tZ = Math.max(0, Math.min(tA, g.X.t - 0.4));   // the zoom starts at the screen apex, but at least 0.4s before the crossing: a short kick's apex is almost on it
  cam.fi = { tA, tZ, ramp:Math.max(0.4, g.X.t - tZ), S:Math.max(0, cam.ytop + 12 - minSy), Zend:clamp(0.20*cam.W/gap, 1, 2.2) };
  return cam.fi;
}
// the flight camera at tf: a tilt keeps a high ball in frame, a zoom closes on the goal window as it comes down; sy is the ball's screen y after both
const VIEW = { tilt:0, Z:1, sy:0 };
function kickView(g, cam, tf, bx, by, bh) {
  const v = VIEW, fi = flightInfo(g, cam), pb = pr(cam, bx, by, bh), gx = cam.cx, gy = cam.gy;
  v.tilt = 0; v.Z = 1; v.sy = gy;
  if (!pb) return v;
  v.tilt = RM ? fi.S*ease3(tf/0.3) : 12*Math.log(1 + Math.exp((cam.ytop + 12 - pb.sy)/12));
  if (!RM && tf >= fi.tZ) {
    const Z = 1 + (fi.Zend - 1)*easeIO(clamp((tf - fi.tZ)/fi.ramp, 0, 1));
    // the zoom is about (gx, gy): hold it to the largest Z that keeps the ball inside x 0.04-0.96W and y ytop-0.91H, so it follows the ball rather than stepping
    const lim = (p, c, lo, hi) => p < c ? (c - lo)/(c - p) : p > c ? (hi - c)/(p - c) : 1e9;
    v.Z = Math.max(1, Math.min(Z, lim(pb.sx, gx, 0.04*cam.W, 0.96*cam.W), lim(pb.sy, gy, cam.ytop, 0.91*cam.H)));
  }
  v.sy = gy + v.tilt + v.Z*(pb.sy - gy);
  return v;
}
const ARROW = new Array(14).fill(0);
function arrowLen(g, psi) { const fx = Math.cos(psi); return Math.max(2, Math.min(14, (108 - g.x)/Math.max(0.2, fx) - 0.6)); }
function drawArrow(cam, g, aim, alpha, chalk) {
  const psi = g.beta + aim, fx = Math.cos(psi), fy = Math.sin(psi), nx = -fy, ny = fx;
  const len = arrowLen(g, psi), s0 = 0.6, s1 = s0 + len, hl = 1.4, hw = 0.55, sw = 0.16;
  const S = [s0, -sw, s0, sw, s1 - hl, sw, s1 - hl, hw, s1, 0, s1 - hl, -hw, s1 - hl, -sw];
  for (let i = 0; i < 7; i++) { const s = S[2*i], w = S[2*i + 1]; ARROW[2*i] = g.x + fx*s + nx*w; ARROW[2*i + 1] = g.y + fy*s + ny*w; }
  const a0 = ctx.globalAlpha;
  ctx.globalAlpha = a0*alpha;
  if (groundPoly(cam, ARROW, 0.02, chalk ? 'rgba(241,238,228,.8)' : C.ctrl)) { ctx.strokeStyle = C.outline; ctx.lineWidth = 1.5; ctx.stroke(); }
  ctx.globalAlpha = a0;
}
function drawAimLine(cam, g, aim) {                           // Normal and Hard: the bearing run on to the goal line, with a tick across it
  const psi = g.beta + aim, fx = Math.cos(psi), fy = Math.sin(psi), nx = -fy, ny = fx;
  if (fx < 0.05) return;
  const sEnd = (110 - g.x)/fx, s0 = 0.6 + arrowLen(g, psi) + 0.3;
  const a0 = ctx.globalAlpha;
  ctx.globalAlpha = a0*0.7; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath();
  for (let s = s0; s < sEnd; s += 1.2) { const e = Math.min(s + 0.6, sEnd); groundSeg(cam, g.x + fx*s, g.y + fy*s, g.x + fx*e, g.y + fy*e, 0.01); }
  groundSeg(cam, g.x + fx*sEnd - nx*0.5, g.y + fy*sEnd - ny*0.5, g.x + fx*sEnd + nx*0.5, g.y + fy*sEnd + ny*0.5, 0.01);
  ctx.stroke(); ctx.globalAlpha = a0;
}
function pathPts(g, m, aim) {                                 // Easy: 16 points of the real flight, cached by aim and power
  const key = Math.round(aim*1000) + '|' + Math.round(m*200);
  if (g.pathKey === key) return g.pathPts;
  const L = launchOf(g, m, aim), X = crossOf(L), pts = g.pathPts || (g.pathPts = new Array(48).fill(0));
  for (let i = 0; i < 16; i++) { const p = posAt(L, X.t*i/15); pts[3*i] = p.x; pts[3*i + 1] = p.y; pts[3*i + 2] = Math.max(0, p.h); }
  g.pathLand = X.land; g.pathKey = key;
  return pts;
}
function drawPath(cam, g, m, aim) {
  const pts = pathPts(g, m, aim), a0 = ctx.globalAlpha;
  ctx.globalAlpha = a0*0.85;
  for (let i = 0; i < 16; i++) {
    const p = pr(cam, pts[3*i], pts[3*i + 1], pts[3*i + 2]); if (!p) continue;
    if (i < 15) { ctx.fillStyle = C.line; ctx.beginPath(); ctx.arc(p.sx, p.sy, Math.max(2, 0.08*p.k), 0, 7); ctx.fill(); }
    else if (g.pathLand) { ctx.strokeStyle = C.line; ctx.lineWidth = 2; const r = Math.max(4, 0.2*p.k); seg(p.sx - r, p.sy - r, p.sx + r, p.sy + r); seg(p.sx + r, p.sy - r, p.sx - r, p.sy + r); }
    else { ctx.fillStyle = C.ctrl; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p.sx, p.sy, Math.max(4, 0.16*p.k), 0, 7); ctx.fill(); ctx.stroke(); }
  }
  ctx.globalAlpha = a0;
}
function drawPosts(cam, g, tf) {
  const X = g.X, hit = tf >= 0 && X && (g.res === 'post' || g.res === 'postIn') && tf > X.t && tf < X.t + 0.4 && !RM;
  for (const py of [32.2, 37.8]) {
    let y = py;
    if (hit && Math.abs(X.y - py) < 1) { const tau = tf - X.t; y += 0.06*Math.sin(tau*2*Math.PI*12)*(1 - tau/0.4); }
    const a = pr(cam, 110, y, 0), b = pr(cam, 110, y, KICK.upH);
    if (!a || a.z < 0.8) continue;
    ctx.strokeStyle = '#f7f5ee'; ctx.lineWidth = Math.max(1.5, 0.12*a.k); seg(a.sx, a.sy, b.sx, b.sy);
    ctx.fillStyle = C.pad; ctx.fillRect(a.sx - 0.3*a.k, a.sy - 1.8*a.k, 0.6*a.k, 1.8*a.k);
  }
  const l = pr(cam, 110, 32.2, KICK.bar), r = pr(cam, 110, 37.8, KICK.bar);
  if (l && r && l.z >= 0.8) { ctx.strokeStyle = '#f7f5ee'; ctx.lineWidth = Math.max(1.5, 0.12*l.k); seg(l.sx, l.sy, r.sx, r.sy); }
}
function drawPennants(cam, g, t) {                            // coral, streaming downwind with a little droop; limp when calm
  const W = g.W, mph = W.mph, calm = mph < KICK.wind.calm, len = 1.4*(0.4 + 0.6*Math.min(1, mph/12));
  const m = hyp(W.x, W.y) || 1, dx = calm ? 0 : W.x/m, dy = calm ? 0 : W.y/m;
  const fl = RM || calm ? 0 : 0.15*Math.sin(t*2*Math.PI*(1.5 + 0.15*mph));
  ctx.fillStyle = '#ff8466';
  for (const py of [32.2, 37.8]) {
    const a = pr(cam, 110, py, KICK.upH), b = pr(cam, 110, py, KICK.upH - 0.6);
    const tip = calm ? pr(cam, 110.08, py + 0.12, KICK.upH - 1.1) : pr(cam, 110 + dx*len, py + dy*len, KICK.upH - 0.3 + fl);
    if (!a || !b || !tip || a.z < 0.8) continue;
    ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.lineTo(tip.sx, tip.sy); ctx.closePath(); ctx.fill();
  }
}
function drawTouchJudges(cam, g, up) {
  for (const jy of [30.2, 39.8]) {
    const p = pr(cam, 113, jy, 0); if (!p || p.z < 0.8) continue;
    figFB(p.sx, p.sy, p.k, g.team, { kit:JUDGE_KIT, arms:up ? 'reach' : 'carry' });
    const hx = p.sx + (up ? 0.32 : 0.12)*p.k, hy = p.sy - (up ? 1.85 : 1.12)*p.k, fl = 0.45*p.k;   // the flag, from the right hand
    ctx.strokeStyle = '#f1eee4'; ctx.lineWidth = Math.max(1, 0.04*p.k); seg(hx, hy, hx, hy - fl);
    ctx.fillStyle = '#f1eee4'; ctx.beginPath(); ctx.moveTo(hx, hy - fl); ctx.lineTo(hx + 0.3*p.k, hy - fl + 0.12*p.k); ctx.lineTo(hx, hy - fl + 0.24*p.k); ctx.closePath(); ctx.fill();
  }
}
function drawKick(c, g0) {
  const g = c.g, cam = kickCam(g), { W, H } = g0, t = c.t, k = KICK, hz = cam.hz, a0 = ctx.globalAlpha, drop = g.type === 'drop';
  const tf = g.stage === 'flight' ? t - g.tStrike - k.hitStop : -1;              // the flight clock, hit-stop included
  const runT = drop ? k.dropT : k.runup;
  const st = g.stage === 'runup' || g.stage === 'drop' ? g.st : g.stage === 'flight' ? runT : -1;   // the run-up (or drop) clock
  const live = g.stage === 'aim' || g.stage === 'wait' || g.stage === 'hold';   // the arrow is yours to steer
  let tau = t - CUT_IN - (g.stage === 'flight' ? clamp(t - g.tStrike, 0, k.hitStop) : 0);   // the chargers' clock pauses with the hit-stop
  if (g.out === 'smothered') tau = Math.min(tau, g.tauStop);
  const P = kickPose(g, st, tf);
  const aimShown = g.watch ? g.aim*easeIO(clamp((t - CUT_IN)/0.5, 0, 1)) : g.aim;
  // camera: a tilt keeps a high ball in frame, and a zoom closes on the goal window as it comes down
  let tilt = 0, Z = 1;
  const gx = cam.cx, gy = cam.gy;
  if (tf >= 0 && g.out !== 'charged') { const v = kickView(g, cam, tf, P.bx, P.by, P.bh); tilt = v.tilt; Z = v.Z; }
  ctx.save();
  const ds = tf + k.hitStop;                                                   // the shake is deterministic: no Math.random
  if (!RM && ds >= 0 && ds < 0.12) { const a = 4*Math.exp(-ds/0.04); ctx.translate(a*Math.sin(97*t), a*Math.cos(83*t)); }
  ctx.translate(gx, gy + tilt); ctx.scale(Z, Z); ctx.translate(-gx, -gy);
  if (practice) dvKickField(cam, g, hz, W, H, tilt);
  else {
    drawStands(g0, hz, -tilt - 8);
    ctx.fillStyle = C.surround; ctx.fillRect(0, hz, W, H - hz + tilt + 8);
    for (let i = 0; i < 12; i++) groundPoly(cam, BANDS[i], 0, i % 2 ? C.grassA : C.grassB);
    ctx.globalAlpha = a0*0.14;
    groundPoly(cam, BANDS[11], 0, M.kit[1 - g.team].fill);
    groundPoly(cam, BANDS[0], 0, M.kit[g.team].fill);
    ctx.globalAlpha = a0;
    ctx.strokeStyle = C.line;
    for (const x of [10, 110, 32, 88, 60]) groundLine(cam, x, 0, x, 70, false);
    for (const x of [50, 70, 15, 105]) groundLine(cam, x, 0, x, 70, true);
    for (const y of [0, 70]) groundLine(cam, 0, y, 120, y, false);
    for (const x of [0, 120]) groundLine(cam, x, 0, x, 70, false);
    groundLine(cam, g.x - 0.25, g.y, g.x + 0.25, g.y, false); groundLine(cam, g.x, g.y - 0.25, g.x, g.y + 0.25, false);   // the kick mark
  }
  // the aim aid, then the arrow: gold is the one you steer, chalk the CPU's
  const struck = tf >= -k.hitStop;
  let arrowA = g.watch ? 0.6 : live ? (RM ? 0.85 : 0.85 + 0.15*Math.sin(t*2*Math.PI*1.6)) : 0.6;
  if (struck) arrowA *= Math.max(0, 1 - (tf + k.hitStop)/0.3);
  if (arrowA > 0.01) {
    if (!g.watch && !struck) {
      if (g.aid === 'path') drawPath(cam, g, g.stage === 'aim' || g.stage === 'wait' ? g.ctr : g.m, g.aim);   // the live meter from Power on, so the run-up shows the kick that was struck
      else drawAimLine(cam, g, g.aim);
    }
    drawArrow(cam, g, aimShown, arrowA, g.watch);
  }
  // far figures and the posts, then the chargers closing from the posts' side
  if (!practice) drawTouchJudges(cam, g, g.judged && g.ok);
  drawPosts(cam, g, tf);
  drawPennants(cam, g, t);
  // the kicker, the ball and the chargers in one list, far to near. Until the strike the ball is in his hands or at his feet, so it goes over him
  const scene = kickScene(cam, g, P, tau, tf), qb = camPt(cam, P.bx, P.by, P.bh);
  { const s = seatOfTeam(g.team), cw = Math.min(340, W/2 - 116), top = 0.07*H + 56, bot = top + 112, l = s === 1 ? W - 62 - cw : 12, r = l + cw;   // a charger drawn under the kick hint card dims it (the card is 12..12+cw by 0.07H+56..+112 at the left, mirrored for Player 2)
    g.hcOver = s != null && scene.some(it => it.kind === 'charger' && it.sx + 0.45*it.k > l && it.sx - 0.45*it.k < r && it.sy > top && it.sy - 1.85*it.k < bot); }
  const ball = () => {
    if (practice) dvTee(cam, g);                               // the tee, on the mark
    if (qb.z < CAM.near) return;
    const pb = proj(cam, qb), sh = pr(cam, P.bx, P.by, 0);
    if (tf > 0 && !RM) {                                                       // a chalk trail over the last 0.4s, sampled from the drawn ball's own path
      for (let i = 1; i <= 8; i++) { const tt = tf - 0.05*i; if (tt < 0) break; const p = ballAt(g, tt), s = pr(cam, p.x, p.y, p.h); if (!s) continue; ctx.fillStyle = `rgba(241,238,228,${(0.5 - i*0.055).toFixed(3)})`; ctx.beginPath(); ctx.arc(s.sx, s.sy, Math.max(1.5, 0.06*s.k), 0, 7); ctx.fill(); }
    }
    if (sh && sh.z >= 0.8) { ctx.fillStyle = 'rgba(0,0,0,.25)'; ellipse(sh.sx, sh.sy, 0.18*sh.k, 0.05*sh.k); ctx.fill(); }
    cutBall(pb.sx, pb.sy, Math.max(10, pb.k*0.9), P.held ? 0.3 : tf > 0 ? tf*9 : 0.9);
  };
  for (const it of scene) {
    if (it.kind === 'ball') ball();
    else if (it.kind === 'kicker') { if (!(practice && dvKicker(it, g, P, tf))) figFB(it.sx, it.sy, it.k, g.team, { back:true, num:g.kicker ? g.kicker.n : 10, stride:P.stride, kickLeg:P.leg, arms:P.held ? 'carry' : 'run' }); if (M.two && !g.judged) cutSeatTag(seatOfTeam(g.team), it.sx, it.sy - 2.25*it.k, 0.4*it.k); }   // the seat tag over the kicker
    else { ctx.globalAlpha = a0*it.alpha; figFB(it.sx, it.sy, it.k, 1 - g.team, it.o); ctx.globalAlpha = a0; }
  }
  ctx.restore();
  if (!g.watch && g.out !== 'smothered') drawMeter(g, g0, tf);
  drawWindChip(g, cam, g0);
}
// what the close-up draws between the posts and the lens, far to near: the kicker (from 0.8m in front of the lens), the ball (over him until the strike,
// then by depth) and the chargers, front-on in their kit, arms up within 3m and on the block. A charger is not drawn until he is CAM.fadeZ metres in
// front of the lens, fades in over the next fadeW, and never stands taller than figH of the screen, so one closing from behind or beside the kicker is
// a figure over him, not a wall of shirt under him. P is the kicker's pose, tau the chargers' clock, tf the flight clock.
function kickScene(cam, g, P, tau, tf) {
  const items = [], qk = camPt(cam, P.kx, P.ky, 0), qb = camPt(cam, P.bx, P.by, P.bh), kMax = CAM.figH*cam.H/1.85;   // a figure is 1.85k tall with his arms up
  if (qk.z >= 0.8) { const p = proj(cam, qk); items.push({ kind:'kicker', z:qk.z, sx:p.sx, sy:p.sy, k:p.k, alpha:1 }); }
  if (qb.z >= CAM.near) items.push({ kind:'ball', z:tf >= 0 ? qb.z : Math.min(qb.z, qk.z) - 1e-6, alpha:1 });
  if (g.rush) for (const r of g.rush) {
    const a = rushAt(r, tau);
    if (a.d < 0.8) { const s = Math.max(0, r.d0 - 0.8); a.x = r.x + r.ux*s; a.y = r.y + r.uy*s; }   // drawn no closer than 0.8m, so he and the kicker stay two figures
    const q = camPt(cam, a.x, a.y, 0);
    if (q.z <= CAM.fadeZ) continue;
    const p = proj(cam, q), moving = a.d > 0.8 && g.out !== 'smothered', hit = g.out === 'charged' && g.outQ === r.q && tf >= g.hitT;
    items.push({ kind:'charger', z:q.z, sx:p.sx, sy:p.sy, k:Math.min(p.k, kMax), alpha:clamp((q.z - CAM.fadeZ)/CAM.fadeW, 0, 1), r, a,
      o:{ stride:moving ? tau*19 : 0, arms:hit || a.d < 3 ? 'reach' : 'run', lean:moving ? 0.1 : 0, back:r.ux > 0.3 } });   // one closing from behind the kicker is seen from behind
  }
  return items.sort((p, q) => q.z - p.z);
}
function drawMeter(g, g0, tf) {
  const { W, H } = g0, x = 0.62*W, y0 = 0.40*H, y1 = 0.86*H, w = 16, h = y1 - y0, a0 = ctx.globalAlpha;
  let alpha = 1;
  if (tf >= 0) { alpha = 1 - tf/0.4; if (alpha <= 0) return; }
  const yOf = m => y1 - clamp(m, 0, 1)*h, lo = g.lo, hi = g.hi, m = g.m;
  ctx.globalAlpha = a0*alpha;
  ctx.fillStyle = 'rgba(8,14,10,.85)'; rrect(x, y0, w, h, 8); ctx.fill();
  ctx.save(); rrect(x, y0, w, h, 8); ctx.clip();
  ctx.fillStyle = 'rgba(255,132,102,.25)'; ctx.fillRect(x, y0, w, yOf(hi) - y0);
  ctx.fillStyle = 'rgba(255,207,61,.30)'; ctx.fillRect(x, yOf(hi), w, yOf(lo) - yOf(hi));
  if (m > 0) {
    ctx.fillStyle = m < lo ? '#f1eee4' : m <= hi ? ringCol(g.team) : '#ff8466'; ctx.fillRect(x, yOf(m), w, y1 - yOf(m));
    ctx.fillStyle = '#fff'; ctx.fillRect(x, yOf(m) - 1.5, w, 3);
  }
  ctx.restore();
  ctx.strokeStyle = 'rgba(241,238,228,.35)'; ctx.lineWidth = 1.5; rrect(x, y0, w, h, 8); ctx.stroke();
  ctx.fillStyle = '#f1eee4';
  for (const e of [lo, hi]) ctx.fillRect(x - 3, yOf(e) - 1.5, w + 6, 3);   // chalk ticks: the band doesn't rely on colour
  if (g.mRel != null && g.stage !== 'aim' && g.stage !== 'wait') { ctx.fillStyle = '#fff'; ctx.fillRect(x - 4, yOf(g.mRel) - 1.5, 24, 3); }
  ctx.globalAlpha = a0;
}
function drawWindChip(g, cam, g0) {
  const { H } = g0, W = g.W, x = 16, y = 0.07*H + 6, r = 22, cx = x + r, cy = y + r, calm = W.mph < KICK.wind.calm;
  ctx.fillStyle = 'rgba(8,14,10,.74)'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill();
  ctx.strokeStyle = 'rgba(241,238,228,.25)'; ctx.lineWidth = 1; ctx.stroke();
  if (!calm) {                                                 // chalk, always: up is at your back, toward the posts
    const vx = W.x*cam.r.x + W.y*cam.r.y, vy = -(W.x*cam.u.x + W.y*cam.u.y), m = hyp(vx, vy) || 1;
    const len = 16*Math.max(0.4, Math.min(1, W.mph/15)), ex = vx/m*len/2, ey = vy/m*len/2, hx = -ey/len*5, hy = ex/len*5;
    ctx.strokeStyle = '#f1eee4'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    seg(cx - ex, cy - ey, cx + ex, cy + ey);
    seg(cx + ex, cy + ey, cx + ex*0.55 + hx, cy + ey*0.55 + hy); seg(cx + ex, cy + ey, cx + ex*0.55 - hx, cy + ey*0.55 - hy);
  }
  ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  ctx.font = `700 11px 'Atkinson Hyperlegible', system-ui, sans-serif`; ctx.fillStyle = '#a7b4a9';
  ctx.letterSpacing = '1.3px'; ctx.fillText('WIND', x + 52, y + 11); ctx.letterSpacing = '0px';
  ctx.font = `800 22px 'Big Shoulders Display', Impact, sans-serif`; ctx.fillStyle = W.mph >= 15 ? '#ff8466' : '#f1eee4';
  ctx.fillText(calm ? 'CALM' : Math.round(W.mph) + ' MPH', x + 52, y + 31);
}
function layoutOf(c) {                                        // the framing, for the tests
  const g = c.g, cam = kickCam(g), W = V.W, H = V.H;
  const l = pr(cam, 110, 32.2, 3), r = pr(cam, 110, 37.8, 3), tl = pr(cam, 110, 32.2, KICK.upH), tr = pr(cam, 110, 37.8, KICK.upH), b = pr(cam, g.x, g.y, 0);
  return { gapPx:Math.abs(r.sx - l.sx), ballY:b.sy, topsY:Math.min(tl.sy, tr.sy), meter:{ x:0.62*W, y:0.40*H, w:16, h:0.46*H }, chip:{ x:16, y:0.07*H + 6, w:116, h:44 }, ball:{ x:b.sx, y:b.sy } };
}
/* A front- or back-on player. sx, sy: feet in px; k: px per metre. */
function figFB(sx, sy, k, team, o) {
  const kit = o.kit || kitOf(team), cr = o.crouch || 0, sh = (o.shift || 0)*k;
  ctx.fillStyle = 'rgba(0,0,0,.3)'; ellipse(sx, sy, 0.38*k, 0.09*k); ctx.fill();
  ctx.save(); ctx.translate(sx, sy);
  if (o.lying) { ctx.rotate(Math.PI/2*(o.dive || 1)); ctx.translate(0, 0.25*k); }
  else if (o.dive) ctx.rotate((o.back ? -0.35 : 0.35)*o.dive);
  ctx.lineCap = 'round';
  const hip = 0.95*(1 - 0.3*cr)*k, shY = 1.5*(1 - 0.3*cr)*k, st = o.stride || 0;
  // legs: shorts on the thigh, trim socks, boots
  // shading to one side: the hips slide over, the feet stay planted
  for (const side of [-1, 1]) {
    const lift = Math.max(0, Math.sin(st + (side > 0 ? Math.PI : 0)))*0.22*k + (side > 0 ? (o.kickLeg || 0)*0.6*k : 0);   // the right boot swings through a kick
    const fx = side*0.16*k + (side === Math.sign(sh) ? sh*0.6 : 0), kx = side*0.12*k + sh*0.55;
    ctx.strokeStyle = kit.shorts; ctx.lineWidth = 0.17*k; seg(side*0.08*k + sh, -hip, kx, -hip*0.5 - lift*0.6);
    ctx.strokeStyle = kit.trim; ctx.lineWidth = 0.13*k; seg(kx, -hip*0.5 - lift*0.6, fx, -0.08*k - lift);
    ctx.fillStyle = '#111'; ctx.fillRect(fx - 0.07*k, -0.09*k - lift, 0.14*k, 0.09*k);
  }
  ctx.translate(sh, -hip); ctx.rotate(o.lean || 0); ctx.translate(0, hip);   // lean pivots at the hips
  if (o.twist) ctx.scale(1 - 0.25*o.twist, 1);
  // torso
  ctx.strokeStyle = C.outline; ctx.lineWidth = 1.5;
  ctx.fillStyle = kit.shirt;
  ctx.beginPath(); ctx.moveTo(-0.2*k, -hip + 0.02*k); ctx.lineTo(0.2*k, -hip + 0.02*k); ctx.lineTo(0.28*k, -shY); ctx.lineTo(-0.28*k, -shY); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = kit.trim; ctx.fillRect(-0.27*k, -shY + 0.02*k, 0.54*k, 0.06*k);
  if (kit.hoops) for (const t of [0.36, 0.66]) { const y = -shY + (shY - hip)*t, hw = (0.27 - 0.08*t)*k; ctx.fillRect(-hw, y, hw*2, 0.07*k); }
  ctx.fillStyle = kit.shorts; rrect(-0.21*k, -hip - 0.02*k, 0.42*k, 0.16*k, 0.05*k); ctx.fill();
  if (o.back && o.num) {
    ctx.fillStyle = luma(kit.shirt) > 0.6 ? '#1b2233' : '#f1eee4';
    ctx.font = `900 ${Math.max(8, Math.round(0.3*k))}px 'Big Shoulders Display', Impact, sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (kit.hoops) { ctx.save(); ctx.strokeStyle = kit.shirt; ctx.lineWidth = 0.08*k; ctx.lineJoin = 'round'; ctx.strokeText(String(o.num), 0, -(hip + shY)/2); ctx.restore(); }
    ctx.fillText(String(o.num), 0, -(hip + shY)/2);
  }
  // arms
  const ARM = { run:[[-0.36, -0.95], [0.36, -1.05]], wide:[[-0.75, -1.3], [0.75, -1.3]], carry:[[-0.1, -1.1], [0.12, -1.12]], pass:[[0.5, -1.25], [0.62, -1.3]], reach:[[-0.32, -1.85], [0.32, -1.85]] };
  const arms = ARM[o.arms] || ARM.run, swing = Math.sin(st)*0.08;
  for (const [i, [ax, ay]] of arms.entries()) {
    const ex = ax*k, ey = (ay + (i ? swing : -swing))*k*(1 - 0.3*cr), s0 = (i ? 0.26 : -0.26)*k;
    ctx.strokeStyle = kit.shirt; ctx.lineWidth = 0.12*k; seg(s0, -shY + 0.05*k, (s0 + ex)/2, (-shY + ey)/2);
    ctx.strokeStyle = SKIN; ctx.lineWidth = 0.1*k; seg((s0 + ex)/2, (-shY + ey)/2, ex, ey);
  }
  // head
  const hy = -1.68*(1 - 0.3*cr)*k;
  ctx.fillStyle = SKIN; ctx.beginPath(); ctx.arc(0, hy, 0.12*k, 0, 7); ctx.fill();
  ctx.fillStyle = HAIR;
  if (o.back) { ctx.beginPath(); ctx.arc(0, hy - 0.01*k, 0.125*k, 0, 7); ctx.fill(); }
  else { ctx.beginPath(); ctx.arc(0, hy - 0.03*k, 0.125*k, Math.PI*1.05, Math.PI*1.95); ctx.fill(); }
  ctx.restore();
}
function cutTitle(c) {
  if (practice) return '';                                     // the Training Ground names its own moments
  if (c.duel) return DUEL[c.kind].name;
  if (c.kind === 'goal') return (c.g.kind === 'conversion' ? 'Conversion' : c.g.kind === 'penalty' ? 'Penalty Goal' : 'Drop Goal') + ' · ' + Math.round(c.g.dist) + 'm';
  if (c.kind === 'scrum') return 'Scrum · ' + M.nat[c.feed].id + ' Ball';
  return 'Lineout · ' + M.nat[c.team].id + ' Throw';
}
function duelLabels(c) {
  if (c.kind === 'past') return [null, null];
  if (c.kind === 'pass') return ['Pass', 'Dummy'];
  return [c.kind === 'tackle' ? 'Tackle' : 'Block', null];
}
/* =========================================================
   Player looks, for the behind views only: height, build, skin, hair, a head style and a body (g: 0 male, 1 female, on the same rig in the same kit). Worked out from the team and shirt number with
   a local generator, so the same player looks the same every run, the match's random stream is never touched and nothing is added to
   M.players or a save. Skin is never tied to a team or a country. The team's side picks the bodies (teamSide): a men's squad is all male, a women's squad all
   female, a mixed squad about half and half. A squad entry with a look (the career player) overrides it.
   ========================================================= */
const LOOK_SKIN = ['#f1d0b4', '#e2b593', '#c69c7c', '#a8764f', '#7f5337', '#553522'];
const LOOK_HAIR = ['#17120e', '#2a1d16', '#4c2f1b', '#7d4f25', '#c29a55', '#a33f1f'];
const LOOK_RANGE = { h:[1.62, 2.02], b:[0.88, 1.16] };
const LOOK_STYLES = 12;                                     // short, shaved, big hair, scrum cap, headband, bun, ponytail, plait, long plait, bunches, high ponytail, long bob: append only, a saved look holds the index. The code-drawn man shows everything from the bun on as a bun
const LOOK_LONG = 8;                                        // the four long styles start here (render-art.js keeps them apart from the shirt and the face)
const LOOK_FEMALE = [8, 9, 10, 11, 5, 2, 3, 0];             // what a women's squad wears: the styles that read from the front as well as the back. The ponytail and the plait hang out of sight from the front and the headband is a coloured ring round the head, so they are left to the picker. Eight, so stepping by five gives seven different in a squad
const LOOKS = new WeakMap();
function lookHash(text) {                                   // FNV-1a
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function cleanLook(l) {                                     // keeps only the fields that make sense, clamped; anything else is dropped
  const out = {};
  if (!l || typeof l !== 'object') return out;
  for (const k of ['h', 'b']) if (Number.isFinite(l[k])) out[k] = clamp(l[k], LOOK_RANGE[k][0], LOOK_RANGE[k][1]);
  for (const k of ['skin', 'hair']) if (Number.isInteger(l[k])) out[k] = clamp(l[k], 0, 5);
  if (Number.isInteger(l.style)) out.style = clamp(l.style, 0, LOOK_STYLES - 1);
  if (l.g === 0 || l.g === 1) out.g = l.g;
  return out;
}
function lookRng(seed) {                                    // mulberry, with its own state
  let s = seed;
  return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0)/4294967296; };
}
function lookOf(p) {
  let look = LOOKS.get(p);
  if (look) return look;
  // a custom team's key or a team's name, not its id: newMatch rewrites a clashing id for one match, and the same team should look the same.
  // A mirror match is twins in different kits.
  const nat = M.nat[p.team], name = String(nat.key || nat.name || nat.id || p.team), teamHash = lookHash(name);
  const next = lookRng(lookHash(name + ':' + p.n));
  const deal = tag => {                                     // this man's place in a shuffled squad of seven, so a squad's spread never rests on chance
    const deck = [0, 1, 2, 3, 4, 5, 6], r = lookRng(lookHash(name + ':' + tag));
    for (let i = 6; i > 0; i--) { const j = Math.floor(r()*(i + 1)), t = deck[i]; deck[i] = deck[j]; deck[j] = t; }
    return deck[(p.n - 1) % 7];
  };
  const big = p.n <= 3 ? 1 : 0;                             // the front row leans a little bigger
  const seeded = {
    h:clamp(1.62 + 0.40*(deal('h') + next())/7 + big*0.04, 1.62, 2.02),
    b:clamp(0.88 + 0.28*(deal('b') + next())/7 + big*0.07, 0.88, 1.16),
    skin:(Math.floor(deal('skin')*6/7) + teamHash) % 6,      // every squad holds all six, one of them twice, so no tone belongs to a team
    hair:(Math.floor(deal('hair')*6/7) + teamHash) % 6,
    style:(teamHash + p.n*5) % 6,                           // walks the six styles shirt by shirt
    g:0,
  };
  const side = teamSide(nat);
  if (side) {                                               // a men's squad never comes here, so it stays exactly as it was
    seeded.g = side === 1 ? 1 : (deal('g') + teamHash) % 2;  // mixed: a shuffled deal of its own, so three or four of the seven and nothing to do with skin or shirt
    if (seeded.g) seeded.style = LOOK_FEMALE[(teamHash + p.n*5) % LOOK_FEMALE.length];
  }
  const entry = Array.isArray(nat.squad) ? nat.squad.find(e => e && e.n === p.n) : null;
  const own = cleanLook(entry && entry.look);
  if (own.g && own.style == null) seeded.style = (teamHash + p.n*5) % 8;   // a saved female look with no style of its own: the same eight it always walked, so it keeps its hair
  look = { ...seeded, ...own };
  LOOKS.set(p, look);
  return look;
}
/* =========================================================
   The player art for the behind views: sprites rendered in Blender (tools/blender/build_players.py) and tinted here into any kit, skin and hair. One packed atlas
   holds every body part's light: R the shade, G the part id x 16, B the coverage. A man's picture is tinted into a slot on a fixed set of sheets on first use, a few
   a frame, and the oldest slot is reused when a sheet is full, so the memory is bounded. Until the atlas is in, or if it never comes, paintMan draws him as before.
   Top, Two Player and a match's close-ups never come here; the Training Ground does (render-drill.js), its close-ups included. Nothing here touches a man's object or draws a random number.
   ========================================================= */
const ART_TIERS = [40, 64];                                 // pixels per metre on the sheets: 40 is the main depth on a phone, drawn a little down, so it stays crisp
const ART_SHEET = 1024, ART_CAPS = { stand:[3, 2], low:[1, 1] };   // sheets per shape and tier, 4MB each: 28MB at the very most
const ART_HAIR_SKIN = 45, ART_HAIR_SHIRT = 55;              // how far apart, in colour, a long style keeps from the skin and the shirt
const ART_BAKES = 6;                                        // pictures tinted in one frame
const ART_CLIPS = ['idle', 'carryidle', 'run', 'sprint', 'carry', 'pass', 'sidestep', 'tackle', 'fall', 'lying', 'getup', 'crouch', 'catch', 'reach', 'bind', 'land', 'place', 'kick'];   // the last seven are the Training Ground's
const ART_STEP_T = 0.36;                                    // the Side Step's six pictures play over this long. The move itself is unchanged: its push has already landed
const ART_STEP = new WeakMap();                             // who stepped, when and which way across the pitch: render-only, off the player object
const artStepped = (p, side) => { ART_STEP.set(p, { at:M.rt, s:side }); };
const ART = { state:'idle', gen:0, man:null, pages:[], classes:{}, map:new Map(), sheets:0, tick:0, next:1, epoch:0, baked:0, bakeMs:0, scratch:null, sg:null, img:null, luts:new Map(), last:null, promise:null };
const artReady = () => ART.state === 'ready';
function artInstall(man, pages) {                           // a parsed players.json and its decoded pages: [{ w, h, data }]
  ART.gen++; ART.man = man; ART.pages = pages; ART.ids = ART_CLIPS.reduce((o, c, i) => { o[c] = i; return o; }, {});
  ART.parts = man.parts; ART.state = 'ready'; artClear();
}
function artOff() { ART.state = 'off'; ART.man = null; ART.pages = []; artClear(); }
function artBadPage(data) {                                 // a browser that alters pixels it hands back would tint garbage: the ids must come back whole
  let seen = 0, bad = 0;
  for (let i = 0; i < data.length && seen < 4000; i += 4*37) { if (data[i + 2]) { seen++; if (data[i + 1] & 15) bad++; } }
  return !seen || bad > 0;
}
function artDecode(base, name) {
  return new Promise((ok, no) => {
    const im = new Image();
    im.onload = () => {
      try {
        const c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight;
        const g = c.getContext('2d', { willReadFrequently:true }); g.drawImage(im, 0, 0);
        const d = g.getImageData(0, 0, c.width, c.height), page = { w:c.width, h:c.height, data:d.data };
        c.width = 0;
        if (artBadPage(page.data)) no(new Error('atlas pixels altered')); else ok(page);
      } catch (e) { no(e); }
    };
    im.onerror = () => no(new Error('atlas failed'));
    im.src = base + name;
  });
}
function artLoad(base = 'assets/players/') {                // once: over the network or from the service worker's precache. Any failure leaves the code-drawn men in place
  if (ART.state !== 'idle') return ART.promise;
  if (typeof Image === 'undefined' || typeof fetch !== 'function') { ART.state = 'off'; return null; }
  ART.state = 'loading';
  const gen = ++ART.gen, stale = () => gen !== ART.gen;     // artFree during a load: the pages already decoded go, and nothing is installed
  const started = typeof performance !== 'undefined' ? performance.now() : 0;
  return ART.promise = (async () => {
    try {
      const r = await fetch(base + 'players.json');
      if (!r.ok) throw new Error('no manifest');
      const man = await r.json(), pages = [];
      for (const name of man.pages) { if (stale()) return; pages.push(await artDecode(base, name)); await new Promise(res => setTimeout(res, 0)); }   // a breath between pages
      if (stale()) return;
      artInstall(man, pages);
      ART.loadMs = (typeof performance !== 'undefined' ? performance.now() : 0) - started;
    } catch (e) { if (!stale()) artOff(); }
  })();
}
function artClear() {                                       // every picture is forgotten; the sheets are kept for the next match
  ART.map.clear(); ART.tick = 0; ART.next = 1; ART.epoch++; ART.luts.clear(); ART.last = null;
  for (const k in ART.classes) { const c = ART.classes[k]; c.free = 0; for (const slot of c.slots) slot.key = -1; }
}
function artTrim() {                                        // back on the menus: the demo needs one sheet a shape at the smaller tier, so the rest of a match's go. They are remade if the next match wants them
  for (const k in ART.classes) {
    const c = ART.classes[k], keep = c.tier === 0 ? c.canvases[0] : null;
    for (const cv of c.canvases) if (cv !== keep) cv.width = 0;
    c.canvases = keep ? [keep] : []; c.slots = c.slots.filter(s => s.cv === keep); c.free = 0;
  }
  ART.sheets = Object.values(ART.classes).reduce((n, c) => n + c.canvases.length, 0);
}
function artFree() {                                        // a match on Top or Two Player: the sheets (28MB at most) and the decoded pages (51MB) go, and the next behind view loads them again
  artClear();                                               // first, while it can still reach the slots: a man holding a picture must not draw from a sheet about to go
  for (const k in ART.classes) for (const c of ART.classes[k].canvases) c.width = 0;
  ART.classes = {}; ART.sheets = 0;
  ART.gen++; ART.man = null; ART.pages = []; ART.promise = null;
  if (ART.state !== 'off') ART.state = 'idle';
}

/* ---------- tinting ---------- */
function artLut(hex, gain = 1) {                            // 256 shades of one colour. Mid light is the colour itself, bright light lifts a little toward white, so even a black shirt shows its folds
  const id = hex + gain;
  let L = ART.luts.get(id);
  if (L) return L;
  const [r, g, b] = hexRgb(hex);
  L = new Uint8Array(768);
  for (let s = 0; s < 256; s++) {
    const v = s/255, k = Math.min(v/0.70, 1.06)*gain, lift = Math.max(0, v - 0.46)*62;
    L[s*3] = Math.min(255, r*k + lift); L[s*3 + 1] = Math.min(255, g*k + lift); L[s*3 + 2] = Math.min(255, b*k + lift);
  }
  ART.luts.set(id, L);
  return L;
}
function artMix(a, b, t) { const x = hexRgb(a), y = hexRgb(b); return '#' + x.map((v, i) => Math.round(v + (y[i] - v)*t).toString(16).padStart(2, '0')).join(''); }
function artPalette(p) { return artPaletteOf(kitOf(p.team), lookOf(p)); }   // part id to colour table, for this man in this match
function artHairOf(look, kit, skin) {                       // a long style lies across the shirt and frames the face, so it must not melt into either: black hair on a black shirt comes up a little, brown hair on brown skin goes darker, by the smallest step that clears both. The eight older styles keep the colour as it was
  const base = LOOK_HAIR[look.hair];
  if (!(look.style >= LOOK_LONG)) return base;
  const clear = c => Math.min(colorDist(c, skin)/ART_HAIR_SKIN, colorDist(c, kit.shirt)/ART_HAIR_SHIRT);
  let best = base, at = clear(base);
  for (const t of [0.15, 0.3, 0.45, 0.6]) for (const to of ['#17120e', '#c8a878']) {
    if (at >= 1) return best;
    const c = artMix(base, to, t), v = clear(c);
    if (v > at) { best = c; at = v; }
  }
  return best;
}
function artPaletteOf(kit, look) {
  const skin = LOOK_SKIN[look.skin], hair = artHairOf(look, kit, skin);
  const grassy = c => colorDist(c, C.grassA) < 60 || colorDist(c, C.grassB) < 60, cap = grassy(kit.trim) ? '#f1eee4' : kit.trim;
  // the collar and cuffs sit between shirt and skin: if the trim is as dark as the skin, they lift, so the arm never melts into the shirt
  const trim = colorDist(kit.trim, skin) < 70 && colorDist(kit.shirt, skin) < 90 ? '#f1eee4' : kit.trim;
  // a lock is a plait, a bunch or a tail: hair on hair, a step darker, or lighter when the hair is too dark to go darker, so it shows against the head it falls over
  const lock = luma(hair) < 0.16 ? artMix(hair, '#8a6548', 0.24) : artMix(hair, '#17120e', 0.3);
  const table = { shirt:kit.shirt, hoop:kit.hoops ? kit.trim : kit.shirt, trim, shorts:kit.shorts, socks:kit.shirt, skin, hair, boots:'#22252b', shaved:artMix(skin, hair, 0.45), eye:'#120e0c', cap, line:'#0a120d', lock };
  const out = [null];
  for (const name of ART.parts) out.push(artLut(table[name]));
  return out;
}
function artBlit(g, r, luts, T, dx, dy, W) {                 // one crop of the atlas, tinted, drawn at dx, dy in metres
  const page = ART.pages[r[0]], d = page.data, w = r[3], h = r[4], out = ART.img.data, pw = page.w*4;
  for (let y = 0; y < h; y++) {
    let i = (r[2] + y)*pw + r[1]*4, j = y*W*4;
    for (let x = 0; x < w; x++, i += 4, j += 4) {
      const cov = d[i + 2];
      if (cov) { const L = luts[d[i + 1] >> 4], s = d[i]*3; out[j] = L[s]; out[j + 1] = L[s + 1]; out[j + 2] = L[s + 2]; out[j + 3] = cov; }
      else out[j + 3] = 0;
    }
  }
  for (let y = 0; y <= h; y++) out[(y*W + w)*4 + 3] = 0;     // a clear edge past the crop: scaling down samples it, and it may hold the last picture
  for (let x = 0; x < w; x++) out[(h*W + x)*4 + 3] = 0;
  ART.sg.putImageData(ART.img, 0, 0, 0, 0, w + 1, h + 1);
  const q = T/ART.man.px;
  g.drawImage(ART.scratch, 0, 0, w, h, dx*T, dy*T, w*q, h*q);
}
function artClass(shape, tier) {                            // the slots for one shape at one tier
  const id = shape + tier;
  let c = ART.classes[id];
  if (!c) {
    const S = ART.man.shapes[shape], T = ART_TIERS[tier];
    c = ART.classes[id] = { id, w:Math.ceil(S.w*T), h:Math.ceil(S.h*T), S, T, shape, tier, slots:[], canvases:[], cap:ART_CAPS[shape][tier], free:0 };
  }
  return c;
}
function artSlot(c) {                                       // an unused slot, a new sheet, or the slot unseen for longest
  for (; c.free < c.slots.length; c.free++) if (c.slots[c.free].key < 0) return c.slots[c.free++];
  if (c.canvases.length < (M.demo ? 1 : c.cap)) {            // the demo behind the menus keeps to one sheet a shape, 8MB, and a match may use them all
    const cv = document.createElement('canvas'); cv.width = cv.height = ART_SHEET;
    const g = cv.getContext('2d'); c.canvases.push(cv); ART.sheets++;
    if (g.imageSmoothingQuality !== undefined) g.imageSmoothingQuality = 'high';
    for (let y = 0; y + c.h <= ART_SHEET; y += c.h + 2) for (let x = 0; x + c.w <= ART_SHEET; x += c.w + 2) c.slots.push({ cv, g, x, y, key:-1, t:0, c });
    return artSlot(c);
  }
  let old = c.slots[0];
  for (const s of c.slots) if (s.t < old.t) old = s;
  ART.map.delete(old.key);
  old.key = -1;
  return old;
}
function artScratch() {
  if (ART.img) return;
  ART.scratch = document.createElement('canvas'); ART.scratch.width = ART.scratch.height = 256;
  ART.sg = ART.scratch.getContext('2d', { willReadFrequently:true });
  ART.img = ART.sg.createImageData(256, 256);
}
/* The New Player screen's small picture: the real sprite, standing three-quarters on in the club's kit with the look picked. Off a match, so it reads no
   M. False when the atlas is not in: the shirt beside it is all there is then. */
function artPreview(cv, t, look) {
  if (!artReady() || !t) return false;
  artScratch();
  const man = ART.man, pose = artSprite('idle', 0, 3, false, look), r = pose.row, q = 1/man.px, T = man.px, g = cv.getContext('2d');
  const kit = { shirt:t.kit, trim:t.trim, hoops:!!t.hoops, shorts:luma(t.kit) > 0.6 ? '#1b2233' : '#ece9df' }, luts = artPaletteOf(kit, look);
  const style = man.styles[look.style] || man.styles[0], hk = man.hair[style] && man.hair[style][r[7]];
  g.clearRect(0, 0, cv.width, cv.height);
  g.save(); g.translate(cv.width/2, cv.height - 6); g.scale(look.b/man.builds[pose.build], 1);
  artBlit(g, r, luts, T, -r[5]*q, -r[6]*q, 256);
  if (hk) artBlit(g, hk, luts, T, (r[8] - hk[5])*q, (r[9] - hk[6])*q, 256);
  g.restore();
  return true;
}
function artBake(p, s, key, r, clip, deg, tier, mirror) {   // one picture for one man
  const started = performance.now();
  bvArmFonts();
  const man = ART.man, c = artClass(man.clips[clip].shape, tier), slot = artSlot(c), g = slot.g, T = c.T, S = c.S, q = 1/man.px;
  artScratch();
  g.clearRect(slot.x, slot.y, c.w, c.h);
  g.save(); g.beginPath(); g.rect(slot.x, slot.y, c.w, c.h); g.clip();
  g.translate(slot.x + S.ox*T, slot.y + S.oy*T);
  // a soft shadow on the grass, a little up the screen because the sun is behind the lens. As wide as the man is, and deeper if he is lying down
  const low = c.shape === 'low', wide = clamp(r[3]*q*0.5, 0.26, 1.1), deep = low ? clamp(r[4]*q*0.42, 0.12, 0.5) : 0.13, up = low ? (r[6]*q - r[4]*q*0.5)*-1 : 0.05;
  g.save(); g.translate(0, low ? -up*0.1*T : -up*T); g.scale(1, deep/wide);
  const sh = g.createRadialGradient(0, 0, 0, 0, 0, wide*T);
  sh.addColorStop(0, 'rgba(6,14,8,.5)'); sh.addColorStop(0.55, 'rgba(6,14,8,.3)'); sh.addColorStop(1, 'rgba(6,14,8,0)');
  g.fillStyle = sh; g.beginPath(); g.arc(0, 0, wide*T, 0, 7); g.fill(); g.restore();
  if (mirror) g.scale(-1, 1);
  const luts = artPalette(p);
  artBlit(g, r, luts, T, -r[5]*q, -r[6]*q, 256);
  const look = lookOf(p), style = man.styles[look.style] || man.styles[0], hk = man.hair[style] && man.hair[style][r[7]];
  if (hk) artBlit(g, hk, luts, T, (r[8] - hk[5])*q, (r[9] - hk[6])*q, 256);
  if (mirror) g.scale(-1, 1);
  if (artNumbered(c.shape, deg)) {                           // the number, drawn in type so a mirrored man keeps it readable
    const kit = kitOf(p.team), squeeze = deg ? 0.8 : 1, nx = (mirror ? -r[10] : r[10])*q*T, ny = r[11]*q*T;
    g.save(); g.translate(nx, ny); g.scale(squeeze, 1);
    g.fillStyle = luma(kit.shirt) > 0.6 ? '#1b2233' : '#f1eee4';
    g.font = `900 ${Math.round(0.31*T)}px 'Big Shoulders Display', Impact, sans-serif`;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    if (kit.hoops) { g.strokeStyle = kit.shirt; g.lineWidth = 0.08*T; g.lineJoin = 'round'; g.strokeText(String(p.n), 0, 0); }
    g.fillText(String(p.n), 0, 0);
    g.restore();
  }
  g.restore();
  slot.key = key; slot.t = ART.tick; ART.map.set(key, slot);
  ART.baked++; ART.bakeMs += performance.now() - started;
  return slot;
}

/* ---------- which picture ---------- */
const artNumbered = (shape, deg) => shape === 'stand' && (deg === 0 || deg === 45) && !practice;   // training tops have no numbers
const artBuild = b => (b < 0.96 ? 'slim' : b < 1.06 ? 'medium' : 'stocky');
function artFacing(s, fu, fr) {                             // eight facings, with hysteresis so a man near a diagonal doesn't flicker. 0 is straight up the screen, clockwise
  const a = (Math.atan2(fr, fu)/D2R + 360) % 360, cur = (s.d8 == null ? -1 : s.d8);
  if (cur >= 0) { let off = Math.abs(a - cur*45); if (off > 180) off = 360 - off; if (off < 29) return cur; }
  return s.d8 = Math.round(a/45) % 8;
}
function artTrack(s, sp, p, L) {                            // the stride follows ground covered at the art's own stride length, so a planted foot stays planted
  const moved = s.dist - (s.dl == null ? s.dist : s.dl);
  s.dl = s.dist;
  const m = hyp(p.fx, p.fy) || 1, back = sp > 0.5 && (p.vx*p.fx + p.vy*p.fy)/(m*sp) < -0.3;
  s.ph = ((s.ph || 0) + (back ? -moved : moved)/L + 1000) % 1;
  return Math.floor(s.ph*8) & 7;
}
function artPose(cam, p, s, k, tackler, carrier, sp, spr) { // the clip and frame this man should show this frame
  if (practice) { const own = dvPose(cam, p, s); if (own) return own; }   // a Training Ground game's own pictures
  const man = ART.man, sc = lookOf(p).h/1.8, step = carrier && !k ? ART_STEP.get(p) : null, stepU = step ? M.rt - step.at : -1;
  let fx = p.fx, fy = p.fy, clip, frame = 0, side = 0;
  if (p.down > 0) {
    if (!s.dn) { s.dn = true; s.dnAt = M.rt; s.dnT = p.down; }
    const up = Math.min(0.26, s.dnT*0.35), fall = Math.min(0.24, s.dnT*0.35), u = M.rt - s.dnAt;
    if (RM || (u >= fall && p.down >= up)) clip = 'lying';
    else if (u < fall) { clip = 'fall'; frame = Math.min(2, Math.floor(u/fall*3)); }
    else { clip = 'getup'; frame = Math.min(2, Math.floor((1 - p.down/up)*3)); }
    artTrack(s, 0, p, man.stride.run);
  } else {
    s.dn = false;
    if (tackler) {
      clip = 'tackle'; fx = k.c.x - s.wx; fy = k.c.y - s.wy;
      const u = k.T ? clamp(k.t/k.T, 0, 1) : 1, dive = k.mode === 'dive' || k.mode === 'ankle';
      frame = dive ? (u < 0.2 ? 1 : 2) : (u < 0.3 ? 0 : 1);
      artTrack(s, 0, p, man.stride.run);
    } else if (s.passAt != null && M.rt - s.passAt < 0.3 && !carrier) {
      const u = M.rt - s.passAt; clip = 'pass'; side = s.passSide; frame = u < 0.05 ? 0 : u < 0.14 ? 1 : 2;
      artTrack(s, sp, p, man.stride.run);
    } else if (stepU >= 0 && stepU < ART_STEP_T) {            // the feint, the plant and the step: its own clock, because a stride can't tell the story in 0.36s
      clip = 'sidestep'; side = step.s; frame = Math.floor(stepU/ART_STEP_T*6);
      artTrack(s, sp, p, man.stride.run);
    } else if (carrier) {
      if (k || sp >= 0.6) { clip = 'carry'; frame = artTrack(s, sp, p, man.stride.run*sc); }
      else { clip = 'carryidle'; artTrack(s, sp, p, man.stride.run); }
    } else if (sp < 0.6) {
      clip = 'idle'; frame = Math.floor(M.rt*1.2 + p.n*0.37) & 1;
      artTrack(s, sp, p, man.stride.run);
    } else if (spr > 0 || sp > 7) { clip = 'sprint'; frame = artTrack(s, sp, p, man.stride.sprint*sc); }
    else { clip = 'run'; frame = artTrack(s, sp, p, man.stride.run*sc); }
  }
  const m = hyp(fx, fy) || 1, fu = (fx*cam.u.x + fy*cam.u.y)/m, fr = (fx*cam.r.x + fy*cam.r.y)/m, d8 = artFacing(s, fu, fr);
  // the art throws to the body's left and steps to its right: the other way round is the same picture, mirrored
  const flip = clip === 'pass' ? side > 0 : clip === 'sidestep' ? step.s*(cam.r.y*fu - cam.u.y*fr) < 0 : false;
  return artSprite(clip, frame, d8, flip, lookOf(p));
}
const ART_OUT = { clip:'', frame:0, deg:0, dir:0, mirror:false, row:null, build:null };
function artSprite(clip, frame, d8, flip, look) {           // the atlas row for a facing, mirrored where the art allows
  const man = ART.man, c = man.clips[clip], b = artBuild(look.b), body = man.sprites[b + (look.g ? '.f' : '.m')] || man.sprites[b + '.m'], rows = body[clip], out = ART_OUT;
  let d = d8, mirror = false;
  if (c.dirs.length === 8) { if (flip) { d = (8 - d8) % 8; mirror = true; } }
  else if (d > 4) { d = 8 - d; mirror = true; }
  out.clip = clip; out.frame = frame % c.n; out.dir = d; out.mirror = mirror; out.build = b;
  out.deg = c.dirs[d]; if (out.deg > 180) out.deg = 360 - out.deg;
  out.row = rows[d*c.n + out.frame];
  return out;
}
function artPrepare(cam) {                                  // once a frame: note who has just thrown a pass, and to which side of his body
  ART.tick++;
  const b = M.ball;
  if (b.state === 'held') { ART.last = b.carrier; return; }
  const from = ART.last;
  if (b.state === 'air' && b.f && b.f.kind === 'pass' && from) {
    const s = bvMan(from), m = hyp(from.fx, from.fy) || 1, fu = (from.fx*cam.u.x + from.fy*cam.u.y)/m, fr = (from.fx*cam.r.x + from.fy*cam.r.y)/m;
    const tx = b.f.x1 - from.x, ty = b.f.y1 - from.y, tu = tx*cam.u.x + ty*cam.u.y, tr = tx*cam.r.x + ty*cam.r.y;
    s.passAt = M.rt; s.passSide = tu*(-fr) + tr*fu > 0 ? 1 : -1;
  }
  ART.last = null;
}
function artCell(p, s, pose, tier, mine) {                  // his picture at this tier, or null when this frame's tints are spent. The man you run always gets his
  // the back views carry a number in type, so a mirrored one is baked mirrored; the rest are flipped when drawn
  const numbered = pose.mirror && artNumbered(ART.man.clips[pose.clip].shape, pose.deg);
  if (s.aid == null || s.aEpoch !== ART.epoch) { s.aid = ART.next++; s.aEpoch = ART.epoch; }
  const base = s.aid*16384 + ((ART.ids[pose.clip]*64 + pose.dir*8 + pose.frame)*2 + (numbered ? 1 : 0))*2, key = base + tier;
  let slot = ART.map.get(key);
  if (!slot) {
    if (BV.bakes >= ART_BAKES && !mine) { slot = ART.map.get(base + 1 - tier); if (slot) slot.t = ART.tick; return slot || null; }   // the same picture at the other size is better than an old one
    BV.bakes++;
    slot = artBake(p, s, key, pose.row, pose.clip, pose.deg, tier, numbered);
  }
  slot.t = ART.tick;
  return slot;
}
function artDraw(at, p, s, kk, sc, ang, pose, mine) {       // draws him where at says, and gives back the slot drawn, or null if nothing can be yet
  const want = kk*V.dpr > 46 && !M.demo ? 1 : 0, numbered = pose.mirror && artNumbered(ART.man.clips[pose.clip].shape, pose.deg);   // the dim demo keeps to the smaller sheets
  const owed = M.demo && !(s.artSlot && s.artSlot.key === s.artKey);   // the demo never shows a hole or a code-drawn man: anyone with no picture to hold gets his now, past the budget
  let slot = artCell(p, s, pose, want, mine || owed), flip = pose.mirror && !numbered;
  if (!slot && s.artSlot && s.artSlot.key === s.artKey) { slot = s.artSlot; flip = s.artFlip; }   // tints spent: hold his last picture a frame
  if (!slot) return null;
  s.artSlot = slot; s.artKey = slot.key; s.artFlip = flip;
  const c = slot.c, look = lookOf(p), xs = look.b/ART.man.builds[pose.build];
  ctx.save(); ctx.translate(at.sx, at.sy); ctx.scale(xs*sc, sc); if (ang) ctx.rotate(ang);
  if (flip) ctx.scale(-1, 1);
  ctx.drawImage(slot.cv, slot.x, slot.y, c.w, c.h, -c.S.ox*kk, -c.S.oy*kk, c.w/c.T*kk, c.h/c.T*kk);
  ctx.restore();
  return slot;
}
/* =========================================================
   The behind views: a 2.5D camera for one-player matches (Low, Mid, High), and Mid is where a new game starts. Top is still there, through its own code: render
   returns here only when behindOn(), and toS's one extra line issues no canvas call. Fixed height and pitch, no yaw, roll, bob or shake:
   only depth and a little lateral follow. Up on the stick is always toward the opposition's line. Nothing here draws a random number.
   ========================================================= */
settings.cam = 2;                                           // 0 Top, 1 Low, 2 Mid, 3 High. The default: load() runs later, and a save holding a cam keeps it (cleanSettings: a Top only if the camera button chose it)
const BV_PRESET = [null, { ch:7.5, back:19, fy:0.60 }, { ch:10, back:22, fy:0.58 }, { ch:13, back:25, fy:0.58 }];
const BV_TIERS = [28, 64];                                  // sprite cells, in device pixels per metre
const BV_CELL = { stand:{ w:1.4, h:2.3, ox:0.7, oy:2.1 }, lying:{ w:2.6, h:1.2, ox:0.6, oy:0.7 } };   // in T, with the feet at ox, oy: 0.1T clear of the tallest head style
const BV_RING = 0.6;                                        // the ring's base radius in metres: a top-down ring's radius would swallow a standing man
const BV = { on:false, cam:null, M:null, rt:0, tx:0, ty:0, order:[], cells:[], edges:[], men:new WeakMap(), bakes:0, baked:0, fontsReady:false, fontsArmed:false, fade:1 };
const behindOn = () => settings.cam > 0 && playing() && !M.two && !M.auto && !practice;
function stickTurn(seat) {                                  // the direction of the team this seat plays: 0 means the stick is read as it always was
  if (!behindOn()) return seat === 0 ? dvTurn() : 0;         // a Training Ground game may have a behind view of its own
  const t = teamOfSeat(seat);
  return t < 0 ? 0 : dirOf(t);
}
function keyFwd(inp, k) { const t = stickTurn(inp.seat); return t ? -k[1]*t : k[0]; }   // a direction key's pull along the pitch
const dprMax = () => (behindOn() || dvOn() || menuDemo() ? 1.5 : 2);
/* The demo behind the menus: the rendered men on Mid, whatever camera the player chose. It reads nothing saved and writes nothing saved, and the stick and behindOn() don't know about it. */
const BV_DEMO_CAM = 2, BV_DEMO_IN = 0.6;                    // the men fade in over this long once the art is in; until then, a calm empty pitch
const menuDemo = () => !!(M && M.demo) && !practice;
const BV_DEMO_PEEK = 2500, BV_DEMO_TOP = { ch:34, back:15, fy:0.5 };   // how long a Camera press on the home shows its height (ms); Top's look in that peek, drawn with the demo's own men
const bvPick = () => (menuDemo() ? (BV.peekUntil && performance.now() < BV.peekUntil ? settings.cam : BV_DEMO_CAM) : settings.cam);
const BV_DEMO_AT = { x:0.33, y:0.42 };                      // a phone held sideways: Mid's height and distance, with the ball framed in the gap the home's two columns leave, where a man is clear of the panels
const bvDemoFrame = (W, H) => (menuDemo() && W > H && H <= 560 ? BV_DEMO_AT : null);

/* ---------- camera and follow ---------- */
function bvRelease() {                                      // the sprites die with their match, whichever view comes next
  if (!practice) dvFree();                                   // the Training Ground's painted backdrops go as soon as it is left
  if (!BV.M || BV.M === M) return;
  for (const c of BV.cells) c.width = 0;
  BV.cells.length = 0; BV.men = new WeakMap(); BV.order.length = 0; BV.M = null;
  artClear();
  if (M.demo) artTrim();
}
function bvCam() {
  const W = V.W, H = V.H, t = teamOfSeat(0), d = t < 0 ? 1 : dirOf(t), pick = bvPick(), at = bvDemoFrame(W, H), key = W + 'x' + H + 'x' + pick + 'x' + d + (at ? 'd' : '');
  if (BV.cam && BV.cam.key === key) return BV.cam;
  const P = BV_PRESET[pick] || BV_DEMO_TOP, F = Math.min(0.703*W, 1.25*H);
  BV.cam = { key, W, H, ins:safeInsets(), cx:at ? at.x*W : W/2, F, ch:P.ch, back:P.back, hz:(at ? at.y : P.fy)*H - F*P.ch/P.back, u:{ x:d, y:0 }, r:{ x:0, y:d }, Cx:BV.cam ? BV.cam.Cx : 60, Cy:BV.cam ? BV.cam.Cy : 35 };
  return BV.cam;
}
function bvFollow(dt) {
  const cam = bvCam(), d = cam.u.x, b = M.ball, t = teamOfSeat(0), ctrl = t < 0 ? null : ctrlOf(t);
  let ax = b.x;                                             // depth: the rearmost of the ring man, the ball and where an opposition kick comes down
  if (ctrl && ctrl.x*d < ax*d) ax = ctrl.x;
  if (b.state === 'air' && b.f && b.f.kind !== 'pass' && b.f.team !== t && b.f.x1*d < ax*d) ax = b.f.x1;
  const ref = ctrl || b;
  let ly = ref.y + (35 - ref.y)*0.25;
  if (BV.M !== M || M.rt - BV.rt > dt + 1e-6) { BV.M = M; BV.tx = ax; BV.ty = ly; }   // a new match, or back from Top: no glide across the pitch
  BV.rt = M.rt;
  if (Math.abs(ax - BV.tx) > 25) BV.tx = ax;                // a long jump (a restart) is a cut, not a pan
  else BV.tx += clamp((ax - BV.tx)*Math.min(1, dt*4), -14*dt, 14*dt);
  const off = ly - BV.ty;
  if (Math.abs(off) > 25) BV.ty = ly;
  else if (Math.abs(off) > 1) BV.ty += clamp((off - Math.sign(off))*Math.min(1, dt*3), -14*dt, 14*dt);   // a 1m dead band: small steers leave the frame alone
  cam.Cx = clamp(BV.tx - cam.back*d, -24, 144); cam.Cy = clamp(BV.ty, 6, 64);
  return cam;
}
function bvS(x, y) {                                        // toS in a behind view. Behind the lens is off the bottom edge, which is where he really is
  const q = pr(BV.cam, x, y, 0);
  return q ? [q.sx, q.sy] : [V.W/2, V.H + 999];
}

/* ---------- the pitch ---------- */
function drawPitchBehind(cam) {
  const W = V.W, H = V.H;
  ctx.fillStyle = C.surround; ctx.fillRect(0, 0, W, H);
  if (cam.hz > 0) {
    ctx.fillStyle = '#0a1210'; ctx.fillRect(0, 0, W, cam.hz);
    ctx.fillStyle = C.board; ctx.fillRect(0, cam.hz - H*0.025, W, H*0.025);
  }
  for (let i = 0; i < 12; i++) groundPoly(cam, BANDS[i], 0, i % 2 ? C.grassA : C.grassB);
  ctx.globalAlpha = 0.14;
  groundPoly(cam, BANDS[0], 0, M.kit[0].fill); groundPoly(cam, BANDS[11], 0, M.kit[1].fill);
  ctx.globalAlpha = 1;
  ctx.strokeStyle = C.line;
  const far = 34, zOf = x => (x - cam.Cx)*cam.u.x;          // past here dashes would only crawl, so lines run solid
  for (const y of [0, 70]) groundLine(cam, 0, y, 120, y, false);
  for (const x of [0, 120, 10, 110, 32, 88, 60]) groundLine(cam, x, 0, x, 70, false);
  for (const x of [50, 70, 15, 105]) groundLine(cam, x, 0, x, 70, zOf(x) < far);
  groundLine(cam, 59, 35, 61, 35, false);
  // the 5m and 15m channels: 1m on, 4m off near the camera, on the pitch's own grid from x=10 as drawPitch paints them, one solid run past that
  const d = cam.u.x, lo = Math.max(10, Math.min(110, cam.Cx + d*3)), hi = Math.max(10, Math.min(110, cam.Cx + d*far));
  const a = 10 + 5*Math.ceil((Math.min(lo, hi) - 10)/5), e = d > 0 ? 10 + 5*Math.floor((hi - 10)/5) : lo;
  ctx.lineWidth = Math.max(1, 0.05*cam.F/cam.back); ctx.beginPath();
  for (const y of [5, 15, 55, 65]) {
    for (let x = a; x < e; x += 5) groundSeg(cam, x, y, Math.min(x + 1, e), y, 0);
    if (d > 0) { if (e < 110) groundSeg(cam, e, y, 110, y, 0); } else if (a > 10) groundSeg(cam, 10, y, a, y, 0);
  }
  ctx.stroke();
  for (const px of [10, 110]) bvPosts(cam, px);
}
function bvPosts(cam, px) {                                 // drawPosts' geometry at either end. A near pair thins out, so it never hides the man you are running
  const near = pr(cam, px, 35, 0);
  if (!near || near.z < 0.8) return;
  ctx.globalAlpha = clamp((near.z - 4)/14, 0.25, 1);
  for (const py of [32.2, 37.8]) {
    const a = pr(cam, px, py, 0), b = pr(cam, px, py, KICK.upH);
    ctx.strokeStyle = '#f7f5ee'; ctx.lineWidth = Math.max(1.5, 0.12*a.k); seg(a.sx, a.sy, b.sx, b.sy);
    ctx.fillStyle = C.pad; ctx.fillRect(a.sx - 0.3*a.k, a.sy - 1.8*a.k, 0.6*a.k, 1.8*a.k);
  }
  const l = pr(cam, px, 32.2, KICK.bar), r = pr(cam, px, 37.8, KICK.bar);
  ctx.strokeStyle = '#f7f5ee'; ctx.lineWidth = Math.max(1.5, 0.12*l.k); seg(l.sx, l.sy, r.sx, r.sy);
  ctx.globalAlpha = 1;
}

/* ---------- one man, on any canvas ---------- */
// fig and figFB draw on the module's ctx in the module's SKIN and HAIR, so swapping those paints one man to a sprite cell with their bodies
// unchanged. The head is redrawn a little larger, in his style: at 40px the figures' own heads are about five pixels across.
function paintMan(g, p, o) {                                // o: k, view (0 back, 1 front, 2 side), face, frame, arms, lying, dive, crouch
  const look = lookOf(p), keepCtx = ctx, keepSkin = SKIN, keepHair = HAIR;
  try {
    ctx = g; SKIN = LOOK_SKIN[look.skin]; HAIR = LOOK_HAIR[look.hair];
    const stride = (o.frame || 0)*Math.PI/2;
    if (o.view === 2) fig(0, 0, o.k, kitOf(p.team), { face:o.face || 1, stride, arms:o.arms === 'carry' ? 'carry' : 'down' });
    else figFB(0, 0, o.k, p.team, { back:o.view === 0, num:p.n, stride, arms:o.arms, lying:o.lying, dive:o.dive, crouch:o.crouch });
    paintHead(look, p.team, o);
  } finally { ctx = keepCtx; SKIN = keepSkin; HAIR = keepHair; }
}
function paintHead(look, team, o) {
  const k = o.k, side = o.view === 2, back = o.view === 0, cr = o.crouch || 0;
  const hx = side ? 0.04*k*(o.face || 1) : 0, hy = side ? -1.73*k : -1.68*(1 - 0.3*cr)*k, R = (side ? 0.13 : 0.12)*k*1.3;
  const a0 = ctx.globalAlpha, disc = (x, y, r) => { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); };
  const cap = (r, dy) => { ctx.beginPath(); ctx.arc(hx, hy + dy, r, Math.PI*(side && (o.face || 1) < 0 ? 0.9 : 1.05), Math.PI*(side && (o.face || 1) > 0 ? 2.1 : 1.95)); ctx.closePath(); ctx.fill(); };
  ctx.save();
  if (o.lying) { ctx.rotate(Math.PI/2*(o.dive || 1)); ctx.translate(0, 0.25*k); }
  else if (o.dive) ctx.rotate((back ? -0.35 : 0.35)*o.dive);
  const kitTrim = M.kit[team].trim, trim = colorDist(kitTrim, C.grassA) < 60 || colorDist(kitTrim, C.grassB) < 60 ? '#f1eee4' : kitTrim;   // a green trim would lose the head against the grass: chalk instead
  if (look.style === 2) { ctx.fillStyle = HAIR; disc(hx, hy - R*0.22, R*1.42); }         // big hair goes behind the face
  ctx.fillStyle = SKIN; disc(hx, hy, R);
  ctx.strokeStyle = 'rgba(8,17,11,.5)'; ctx.lineWidth = Math.max(0.7, 0.018*k); ctx.stroke();
  ctx.fillStyle = HAIR;
  if (look.style === 0) { if (back) disc(hx, hy, R); else cap(R*1.02, -R*0.08); }         // short
  else if (look.style === 1) { ctx.globalAlpha = a0*0.4; if (back) disc(hx, hy, R); else cap(R, -R*0.12); ctx.globalAlpha = a0; }   // shaved
  else if (look.style === 2) { if (back) disc(hx, hy - R*0.1, R*1.2); }
  else if (look.style === 3) {                               // a scrum cap, in the kit's trim
    ctx.fillStyle = trim;
    if (back) disc(hx, hy, R*1.08); else cap(R*1.1, -R*0.02);
    ctx.stroke();                                            // the head's own outline, round the cap
    ctx.strokeStyle = trim; ctx.lineWidth = Math.max(1, 0.05*k); ctx.beginPath(); ctx.arc(hx, hy, R*1.02, Math.PI*0.2, Math.PI*0.8); ctx.stroke();
  } else if (look.style === 4) {                             // a headband, in the kit's trim
    if (back) disc(hx, hy, R); else cap(R*1.02, -R*0.08);
    ctx.fillStyle = trim; ctx.fillRect(hx - R*1.04, hy - R*0.48, R*2.08, R*0.42);
  } else {                                                   // a bun
    if (back) disc(hx, hy, R); else cap(R*1.02, -R*0.08);
    disc(hx, hy - R*1.2, R*0.56);
  }
  ctx.restore();
}
function bvMan(p) {                                         // render-only state for a man: never on the player object
  let s = BV.men.get(p);
  if (!s) { s = { z:0, wx:p.x, wy:p.y, u:0, view:0, face:1, dist:0, cells:{} }; BV.men.set(p, s); }
  return s;
}
const bvCellKey = (view, frame, tier) => view*10 + (frame === 2 ? 0 : frame) + tier*100;   // frames 0 and 2 are the same picture; a side view or a man on the floor (view 3) is flipped when drawn
function cellFor(p, s, view, frame, tier) {                 // his sprite, or null when this frame's bakes are spent
  const f = frame === 2 ? 0 : frame, key = bvCellKey(view, f, tier);
  const c = s.cells[key];
  if (c) return c;
  if (BV.bakes >= 6) return null;
  BV.bakes++; BV.baked++;
  bvArmFonts();
  const T = BV_TIERS[tier], cell = document.createElement('canvas'), g = cell.getContext('2d'), shape = view === 3 ? BV_CELL.lying : BV_CELL.stand;
  cell.width = Math.ceil(shape.w*T); cell.height = Math.ceil(shape.h*T);
  g.translate(shape.ox*T, shape.oy*T);
  paintMan(g, p, view === 3 ? { k:T, view:1, face:1, frame:0, arms:'run', lying:true, dive:1 } : { k:T, view, face:1, frame:f, arms:'run' });
  BV.cells.push(cell);
  s.cells[key] = cell;
  return cell;
}
function bvArmFonts() {                                     // a shirt number baked before its font arrives is rebuilt once
  if (BV.fontsArmed) return;
  BV.fontsArmed = true;
  const fonts = document.fonts;
  if (!fonts || !fonts.ready) { BV.fontsReady = true; return; }
  fonts.ready.then(() => {
    BV.fontsReady = true;
    for (const c of BV.cells) c.width = 0;
    BV.cells.length = 0; BV.men = new WeakMap(); BV.order.length = 0;
    artClear();
  });
}

/* ---------- the men ---------- */
function bvPrepareMen(cam) {
  const P = M.players, order = BV.order;
  if (order.length !== P.length) { order.length = 0; for (const p of P) order.push(p); }
  for (const p of P) {
    const s = bvMan(p), [wx, wy] = drawPos(p), m = hyp(p.fx, p.fy) || 1, fu = (p.fx*cam.u.x + p.fy*cam.u.y)/m, fr = (p.fx*cam.r.x + p.fy*cam.r.y)/m;
    const step = hyp(wx - s.wx, wy - s.wy);
    if (step < 3) s.dist += step;                           // the stride follows ground covered, so it can't flicker with the clock or stop on a diagonal
    s.wx = wx; s.wy = wy;
    s.z = (wx - cam.Cx)*cam.u.x + (wy - cam.Cy)*cam.u.y;
    // back, front or side, with 0.1 of hysteresis either way so a man running near the diagonal doesn't flip each frame
    if (s.view === 0 ? fu < 0.5 : s.view === 1 ? fu > -0.5 : Math.abs(fu) > 0.7) s.view = fu > 0.6 ? 0 : fu < -0.6 ? 1 : 2;
    if (fr > 0.1) s.face = 1; else if (fr < -0.1) s.face = -1;
  }
  for (let i = 1; i < order.length; i++) {                  // far to near; nearly sorted already, so this barely moves
    const p = order[i], z = bvMan(p).z;
    let j = i - 1;
    while (j >= 0 && bvMan(order[j]).z < z) { order[j + 1] = order[j]; j--; }
    order[j + 1] = p;
  }
}
const bvFlat = (cam, z) => clamp(cam.ch/z, 0.18, 0.6);
function drawManBehind(cam, p, ctrl) {
  const s = bvMan(p), b = M.ball;
  if (s.z <= CAM.fadeZ) return;
  const k = p.bind, tackler = !!(k && p !== k.c), carrier = b.state === 'held' && b.carrier === p;
  let at = pr(cam, s.wx, s.wy, 0);
  if (tackler && p.bindOff) at = pr(cam, k.c.x + p.bindOff.x, k.c.y + p.bindOff.y, 0) || at;   // bound on to the carrier, on the side he came from
  if (!at || at.sx < -at.k*1.5 || at.sx > V.W + at.k*1.5 || at.sy < -at.k*0.5 || at.sy > V.H + at.k*2.5) return;
  const look = lookOf(p), sc = look.h/1.8, kk = at.k, sp = hyp(p.vx, p.vy), spr = sprintLevel(p), fire = onFire(p.team), flat = bvFlat(cam, s.z);
  const alpha = clamp((s.z - CAM.fadeZ)/CAM.fadeW, 0, 1)*BV.fade;
  if (alpha < 1) ctx.globalAlpha = alpha;
  const R = 0.95*kk;
  if (fire && p.down <= 0) {                                 // On Fire: the same pulse as the top view, flat on the grass
    ctx.fillStyle = `rgba(255,110,30,${(0.30 + 0.12*Math.sin(M.rt*2*Math.PI*3)).toFixed(3)})`;
    ellipse(at.sx, at.sy, R*0.9, R*0.9*flat); ctx.fill();
  }
  if (p.down <= 0 && !k && (p.boost > 0 || spr > 0 || fire || (M.surge && M.surge.team === p.team)) && sp > (fire ? 1.5 : 3)) {
    const tx = -p.vx/sp, ty = -p.vy/sp;                      // the trail and streaks, as points on the ground behind him
    ctx.fillStyle = fire ? 'rgba(255,110,30,.6)' : (p.boost > 0 || spr > 0) ? 'rgba(255,207,61,.35)' : 'rgba(244,241,232,.18)';
    for (const kk2 of [1.1, 2.0]) { const q = pr(cam, s.wx + tx*0.95*kk2, s.wy + ty*0.95*kk2, 0); if (q) { ellipse(q.sx, q.sy, q.k*0.6*(1 - kk2*0.22), q.k*0.6*(1 - kk2*0.22)*flat); ctx.fill(); } }
    if (spr > 0) {
      ctx.strokeStyle = `rgba(244,241,232,${(0.55*spr).toFixed(3)})`; ctx.lineWidth = 2; ctx.lineCap = 'round';
      for (const side of [-1, 1]) {
        const ox = -ty*side*0.7, oy = tx*side*0.7, a = pr(cam, s.wx + ox + tx*1.1, s.wy + oy + ty*1.1, 0.4), e = pr(cam, s.wx + ox + tx*2.7, s.wy + oy + ty*2.7, 0.4);
        if (a && e) seg(a.sx, a.sy, e.sx, e.sy);
      }
    }
  }
  const down = p.down > 0, live = p === ctrl || tackler;     // the man you run and a bound tackler are drawn fresh; everyone else is a sprite
  let frame = 0, ang = 0;
  if (!down && !tackler && sp >= 0.6) frame = Math.floor(s.dist*1.8/(Math.PI/2)) & 3;
  s.frame = frame;
  if (p.stumble > 0) ang = 9*D2R*Math.sin(M.rt*2*Math.PI*14);                 // the wobble after an ankle tap
  if (k && !tackler) ang += (k.tier === 'soft' ? 0.15 : k.tier === 'dom' && k.t/k.T >= 0.4 ? -0.12 : 0)*(s.face);   // a bound carrier leans into a Soft tackle and recoils from a Big Hit
  const view = down ? 3 : s.view, flip = view >= 2 && s.face < 0;
  const place = () => { ctx.save(); ctx.translate(at.sx, at.sy); ctx.scale(look.b*sc, sc); if (ang) ctx.rotate(ang); };   // height, build and lean sit outside the figure, for sprites and live men alike
  let drawn = false, pose = null;
  if (artReady() && (pose = artPose(cam, p, s, k, tackler, carrier, sp, spr))) drawn = !!artDraw(at, p, s, kk, sc, ang, pose, p === ctrl);   // the rendered art, for everyone: the code-drawn man below is what shows until it is in
  if (!drawn && !live) {
    const want = kk*V.dpr > 40 && !M.demo ? 1 : 0, mine = cellFor(p, s, view, frame, want), other = mine ? null : s.cells[bvCellKey(view, frame, 1 - want)], cell = mine || other;
    if (cell) {
      const shape = down ? BV_CELL.lying : BV_CELL.stand;
      place(); if (flip) ctx.scale(-1, 1);
      ctx.drawImage(cell, -shape.ox*kk, -shape.oy*kk, shape.w*kk, shape.h*kk);
      ctx.restore(); drawn = true;
    }
  }
  if (!drawn) {
    place();
    if (down) paintMan(ctx, p, { k:kk, view:1, face:1, frame:0, arms:'run', lying:true, dive:s.face });
    else if (tackler) paintMan(ctx, p, { k:kk*0.92, view:s.view === 1 ? 1 : 0, face:1, frame:0, arms:'wide', crouch:0.65, dive:(k.c.y - s.wy)*cam.r.y >= 0 ? 1 : -1 });
    else paintMan(ctx, p, { k:kk, view:s.view, face:s.face, frame, arms:carrier ? 'carry' : 'run' });
    ctx.restore();
  }
  if (p.fend > 0) {                                          // the fend: an arm out at shoulder height at the man he has just beaten
    const a = p.fendA, l = 0.95*(0.9 + 0.5*(1 - p.fend/0.2)), q0 = pr(cam, s.wx + Math.cos(a)*0.38, s.wy + Math.sin(a)*0.38, 1.3), q1 = pr(cam, s.wx + Math.cos(a)*l, s.wy + Math.sin(a)*l, 1.3);
    if (q0 && q1) { ctx.strokeStyle = M.kit[p.team].trim; ctx.lineWidth = Math.max(2, 0.2*kk); ctx.lineCap = 'round'; seg(q0.sx, q0.sy, q1.sx, q1.sy); }
  }
  if (carrier) {                                             // straight after him, so a nearer man can cover it
    if (drawn && pose && pose.row.length > 12) { const q = kk/ART.man.px, m = pose.mirror ? -1 : 1, side = pose.deg === 90; cutBall(at.sx + m*pose.row[12]*q*look.b/ART.man.builds[pose.build]*sc, at.sy + pose.row[13]*q*sc, kk*0.95, side ? 0.2*m : pose.deg === 0 || pose.deg === 180 ? 1.25 : 0.7*m); }   // in his hands, as the art holds it
    else cutBall(at.sx + 0.18*kk*(s.view === 2 ? s.face : 1), at.sy - 1.15*kk*sc, kk*0.95, s.view === 2 ? 0.2*s.face : 1.25);
  }
  if (alpha < 1) ctx.globalAlpha = 1;
}
function groundRing(cam, x, y, radius, style, width, dash) {
  const q = pr(cam, x, y, 0);
  if (!q) return;
  const rx = Math.max(6, radius*q.k);
  ctx.strokeStyle = style; ctx.lineWidth = width; ctx.setLineDash(dash || []);
  ellipse(q.sx, q.sy, rx, rx*bvFlat(cam, q.z)); ctx.stroke(); ctx.setLineDash([]);
}
/* The ball's own marks. None of them is a ring: a solid ring is who you control, a dashed one a pass, a Switch or where a kick comes down. */
const BV_LOOSE = { rx:8.5, air:7, k:0.34, patch:'rgba(246,243,234,.3)' };                 // a ball not in anyone's hands: its half-length never under these px, and this share of a metre on the screen. It reads about 3m away on a phone
function ballLaces(x, y, rx, ang) {                         // the laces that make a big ball a ball, the same on the grass, in the air, on the edge tag and in the marker
  const l = rx*0.42, h = rx*0.2;
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
  ctx.strokeStyle = BV_CARRY.lace; ctx.lineWidth = Math.max(1.1, rx*0.13); ctx.lineCap = 'round'; ctx.beginPath();
  ctx.moveTo(-l, 0); ctx.lineTo(l, 0);
  for (const f of [-0.55, 0, 0.55]) { ctx.moveTo(f*l, -h); ctx.lineTo(f*l, h); }
  ctx.stroke(); ctx.restore();
}
function bvLooseMark(cam, b) {                              // on the grass, under the men: a pale patch with the rays of a burst
  const q = pr(cam, b.x, b.y, 0);
  if (!q) return;
  const f = bvFlat(cam, q.z), R = Math.max(20, 1.15*q.k)*(RM ? 1 : 1 + 0.08*Math.sin(M.rt*2*Math.PI*1.5));
  ctx.fillStyle = BV_LOOSE.patch; ellipse(q.sx, q.sy, R, R*f); ctx.fill();
  ctx.lineCap = 'round';
  for (const [style, width] of [['rgba(8,17,11,.55)', 4.5], ['#f6f3ea', 2.5]]) {
    ctx.strokeStyle = style; ctx.lineWidth = width; ctx.beginPath();
    for (let i = 0; i < 8; i++) { const a = i*Math.PI/4 + Math.PI/8, c = Math.cos(a), s = Math.sin(a); ctx.moveTo(q.sx + c*R*1.1, q.sy + s*R*1.1*f); ctx.lineTo(q.sx + c*R*1.5, q.sy + s*R*1.5*f); }
    ctx.stroke();
  }
}
function bvBall(cam) {                                      // a ball not in anyone's hands, after the men
  const b = M.ball;
  if (b.state === 'held') return;
  const q = pr(cam, b.x, b.y, Math.max(0, b.z));
  if (b.state === 'air' && b.f && b.f.kind !== 'pass') {     // where a kick comes down
    groundRing(cam, b.f.x1, b.f.y1, BV_RING*1.3, 'rgba(241,238,228,.75)', 2, [4, 3]);
  }
  if (!q) return;
  const sh = pr(cam, b.x, b.y, 0), scG = 1/(1 + Math.max(0, b.z)*0.16);
  if (sh) { ctx.fillStyle = 'rgba(0,0,0,.32)'; ctx.globalAlpha = 0.45 + 0.55*scG; ellipse(sh.sx, sh.sy, Math.max(7, 0.3*sh.k)*scG, Math.max(2.5, 0.11*sh.k)*scG); ctx.fill(); ctx.globalAlpha = 1; }
  const across = b.vx*cam.r.x + b.vy*cam.r.y, along = b.vx*cam.u.x + b.vy*cam.u.y, ang = hyp(across, along) > 0.5 ? Math.atan2(-along*bvFlat(cam, q.z), across) : 0;
  if (b.state === 'dead') { cutBall(q.sx, q.sy, q.k*1.1, ang); return; }   // waiting at a kick-off or a ruck, among the men: its old size, so it never sits on a man like a plate. No one needs to chase it
  const rx = Math.max(b.state === 'air' ? BV_LOOSE.air : BV_LOOSE.rx, BV_LOOSE.k*q.k);
  cutBall(q.sx, q.sy, rx/0.17, ang);                         // cutBall's half-length is 0.17 of its scale
  ballLaces(q.sx, q.sy, rx, ang);
}
const bvHudHides = (x, y, ins) => (y < BV_STACK_HUD && Math.abs(x - V.W/2) < 96) || (y < 54 && x > V.W - 70 - (ins ? ins.r : 0));   // the page draws over the canvas: a ball behind the scorebug, the clock, the sign or pause is not seen
function bvChevron(cam, q, col, badge) {                    // an off-frame pass or Switch target: a chevron on the edge, in the ring's colour. With a badge, the ball or your player: a tag that says which
  const W = V.W, H = V.H, view = camPt(cam, q.x, q.y, 0);
  let [x, y] = bvS(q.x, q.y);
  if (view.z < CAM.near) x = cam.cx + view.a*18;
  const ball = q === M.ball, up = ball && q.z > 0 ? pr(cam, q.x, q.y, q.z) : null;
  if (up) { x = up.sx; y = up.sy; }                         // a ball in the air is where it is drawn, not where its shadow is
  if (x >= 0 && x <= W && y >= (ball ? 8 : 0) && y <= H && !(ball && bvHudHides(x, y, cam.ins))) return false;
  if (badge) { edgeTag(x, y, col, badge, cam.ins); return true; }
  const ex = clamp(x, 14, W - 14), ey = clamp(y, 14, H - 14), a = Math.atan2(y - H/2, x - W/2), ca = Math.cos(a), sa = Math.sin(a);
  ctx.fillStyle = col; ctx.beginPath();
  ctx.moveTo(ex + ca*9, ey + sa*9); ctx.lineTo(ex - ca*5 - sa*8, ey - sa*5 + ca*8); ctx.lineTo(ex - ca*5 + sa*8, ey - sa*5 - ca*8); ctx.closePath(); ctx.fill();
  BV.edges.push({ x:ex, y:ey });
  return true;
}
/* The edge tag: a dark disc holding what it points at, and the chevron. It keeps out of the notch, the scorebug, the pause button, the stick's resting place, the buttons, the career caption and any other edge mark. */
const BV_TAG = { r:13, tip:21, margin:24, clear:28, disc:'rgba(8,14,10,.9)' };
function edgeTagAt(x, y, ins) {                             // where a tag for a thing at screen x, y goes. It changes nothing, for the tools
  const W = V.W, H = V.H, m = BV_TAG.margin, I = ins || { t:0, r:0, b:0, l:0 }, lo = m + I.l, hi = W - m - I.r;
  let ex = clamp(x, lo, hi), ey = clamp(y, m + I.t, H - m - I.b);
  if (ey < 88 && Math.abs(ex - W/2) < 170) ey = 88;          // the scorebug, the clock and the sign under it
  if (ey < 72 && ex > W - 84 - I.r) ey = 72;                 // the pause button
  const floor = H - 128 - I.b, wall = W - 205 - I.r;         // the Pass, Kick and Sprint buttons fill the corner
  if (ey > floor && ex > wall) { if (ex > W - 100 - I.r) ey = floor; else ex = wall; }
  const st = stickRest(W, H, I), R = 62 + BV_TAG.r + 5, dx = ex - st.x;   // the thumb rests on the stick: a tag there is under it
  if (Math.abs(dx) < R) {
    if (ex <= lo + 1) ey = Math.min(ey, st.y - Math.sqrt(R*R - dx*dx));   // on the left edge: above the ring
    else if (hyp(dx, ey - st.y) < R) ex = st.x + Math.sqrt(R*R - (ey - st.y)*(ey - st.y));   // along the bottom: to its right
  }
  if (careerCaption() && ey > H - 66 - I.b && Math.abs(ex - W/2) < 170) ey = H - 66 - I.b;   // over the kick-off caption
  return [ex, ey];
}
function edgeTag(x, y, col, badge, ins) {
  let [ex, ey] = edgeTagAt(x, y, ins);
  const W = V.W, H = V.H, side = ex <= BV_TAG.margin + (ins ? ins.l : 0) + 1 || ex >= W - BV_TAG.margin - (ins ? ins.r : 0) - 1;
  for (const e of BV.edges) if (hyp(e.x - ex, e.y - ey) < BV_TAG.clear) { if (side) ey += ey > H/3 ? -BV_TAG.clear : BV_TAG.clear; else ex += ex > W/2 ? -BV_TAG.clear : BV_TAG.clear; }
  BV.edges.push({ x:ex, y:ey });
  const a = Math.atan2(y - H/2, x - W/2), ca = Math.cos(a), sa = Math.sin(a), r = BV_TAG.r, tip = BV_TAG.tip;
  ctx.fillStyle = BV_TAG.disc; ctx.beginPath(); ctx.arc(ex, ey, r, 0, 7); ctx.fill();
  ctx.fillStyle = col; ctx.beginPath();
  ctx.moveTo(ex + ca*tip, ey + sa*tip); ctx.lineTo(ex + ca*(r - 1) - sa*7, ey + sa*(r - 1) + ca*7); ctx.lineTo(ex + ca*(r - 1) + sa*7, ey + sa*(r - 1) - ca*7); ctx.closePath(); ctx.fill();
  if (badge === 'star') careerStar(ex, ey, 8, col);
  else { cutBall(ex, ey, 7/0.17, -0.35); ballLaces(ex, ey, 7, -0.35); }
}

/* ---------- the frame ---------- */
/* What stands over a man's head, bottom to top: the pointer (who you control), the ball's marker (who has it), the star (your player).
   Pure, so the tools can read it. tip is the bottom of the stack; a man near the top of the frame moves the whole stack down, so nothing leaves the screen or sits on anything else. */
const BV_CARRY = { w:26, h:17, tail:5, r:5, gap:2, fill:'#f6f3ea', edge:'#08110b', ball:'#fffdf6', lace:'#3b2f22' };
const BV_STACK_HUD = 72;                                    // under the scorebug, the clock and the sign, a marked man's stack stops here: the page draws over the canvas, and a marker under them would not be seen
function bvStack(tip, o) {
  const P = o.pointer ? 8 : 0, B = o.carry ? BV_CARRY.h + BV_CARRY.tail : 0, S = o.star ? 2*o.star : 0, n = (P ? 1 : 0) + (B ? 1 : 0) + (S ? 1 : 0);
  let y = Math.max(tip, (o.floor || 6) + P + B + S + Math.max(0, n - 1)*BV_CARRY.gap);
  const out = {};
  if (P) { out.pointer = y; y -= P + BV_CARRY.gap; }
  if (B) { out.carry = y; y -= B + BV_CARRY.gap; }
  if (S) out.star = y - o.star;
  return out;
}
function bvCarryMark(x, y) {                                // a chalk speech bubble with the game's own white laced ball in it, its tail on y. It has no ring and no words, and it reads the same over any kit: chalk on a dark kit, the dark edge on a white one
  const K = BV_CARRY, top = y - K.tail - K.h, l = x - K.w/2;
  ctx.fillStyle = K.fill; ctx.strokeStyle = K.edge; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(x - 5, top + K.h - 0.5); ctx.lineTo(x, y); ctx.lineTo(x + 5, top + K.h - 0.5); ctx.closePath(); ctx.fill(); ctx.stroke();
  rrect(l, top, K.w, K.h, K.r); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x - 4.5, top + K.h - 0.5); ctx.lineTo(x + 4.5, top + K.h - 0.5); ctx.lineWidth = 2; ctx.strokeStyle = K.fill; ctx.stroke();   // the tail runs into the bubble
  ctx.save(); ctx.translate(x, top + K.h/2); ctx.rotate(-0.35);
  ctx.fillStyle = K.ball; ctx.strokeStyle = K.lace; ctx.lineWidth = 1.4; ellipse(0, 0, 9, 5.6); ctx.fill(); ctx.stroke();
  ctx.restore();
  ballLaces(x, top + K.h/2, 9, -0.35);
}
function bvOverheads(cam, ctrls, plain) {                   // plain: a match you are playing, not a drill, the demo or a close-up. Everything else keeps the pointer alone
  const b = M.ball, carrier = plain && M.phase === 'play' && b.state === 'held' ? b.carrier : null, me = plain && M.career ? M.careerP : null;
  const men = [ctrls[0], ctrls[1], carrier, me];
  for (let i = 0; i < 4; i++) {
    const p = men[i];
    if (!p || men.indexOf(p) !== i) continue;                // one stack a man, whatever he is
    const ctrl = p === ctrls[0] || p === ctrls[1], col = ctrl ? ringCol(p === ctrls[0] ? 0 : 1) : null;
    const [wx, wy] = drawPos(p), q = pr(cam, wx, wy, 0), x = q ? q.sx : V.W/2;
    if (!q || x < 0 || x > V.W || q.sy < 0 || q.sy > V.H) {  // off the frame: a dot on the edge for the ring's man; the ball and your player get bvEdgeMarks
      if (ctrl) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(clamp(x, 18, V.W - 18), clamp(q ? q.sy : V.H + 999, 18, V.H - 18), 7, 0, 7); ctx.fill(); }
      continue;
    }
    const star = p === me ? Math.max(8, 0.34*q.k) : 0, S = bvStack(q.sy - (lookOf(p).h + 0.2)*q.k, { pointer:ctrl, carry:p === carrier, star, floor:plain && (p === carrier || star) && Math.abs(x - V.W/2) < 130 ? BV_STACK_HUD : 0 });
    if (ctrl) { const ty = S.pointer; ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x - 6, ty - 8); ctx.lineTo(x + 6, ty - 8); ctx.lineTo(x, ty); ctx.closePath(); ctx.fill(); }
    if (S.carry != null) bvCarryMark(x, S.carry);
    if (star) careerStar(x, S.star, star, careerCol());
  }
}
function bvEdgeMarks(cam, plain) {                          // the ball or its carrier off the frame, and your player. Not at a set piece: the game is about to cut to it, and it has its own banner
  if (!plain) return;
  const b = M.ball;
  if (M.phase === 'play' || (M.phase === 'set' && M.set && M.set.kind === 'ruck')) bvChevron(cam, b.state === 'held' && b.carrier ? b.carrier : b, BV_CARRY.fill, 'ball');
  if (M.career && M.careerP) bvChevron(cam, M.careerP, careerEdgeCol(), 'star');
}
function renderBehind(dt) {
  const drill = !!practice, cam = BV.cam = drill ? dvCamera(dt) : bvFollow(dt), b = M.ball;   // the Training Ground has its own camera and field (render-drill.js), and the men and cues below
  BV.bakes = 0;
  ctx.setTransform(V.dpr, 0, 0, V.dpr, 0, 0);
  if (ART.state === 'idle') artLoad();
  const demo = menuDemo();
  BV.fade = !demo ? 1 : artReady() || ART.state === 'off' ? (RM ? 1 : Math.min(1, BV.fade + dt/BV_DEMO_IN)) : 0;   // loading: no men yet, so never a flash of the code-drawn ones. No art at all: they fade in the same way
  if (drill && dvCovered()) { if (artReady()) artPrepare(cam); drillDrawScreen(); return; }
  const dd = drill ? DV_DRAW[practice.id] : null;
  if (drill) { dvGround(cam); if (dd && dd.ground && !M.cut) dd.ground(cam); if (dd && dd.spots) dd.spots(cam); } else drawPitchBehind(cam);
  const ctrls = [0, 1].map(t => (isHuman(t) ? ctrlOf(t) : null));
  const plain = !drill && !demo && !M.cut;
  BV.edges.length = 0;
  if (plain && M.phase === 'play' && b.state === 'loose') bvLooseMark(cam, b);
  for (const t of [0, 1]) if (ctrls[t]) groundRing(cam, ctrls[t].x, ctrls[t].y, BV_RING*1.55, ringCol(t), 2.5);
  bvPrepareMen(cam);
  if (artReady()) artPrepare(cam);
  const ctrlHuman = ctrls[0] || ctrls[1];
  if (drill) dvMen(cam, ctrlHuman, dt);
  else if (BV.fade > 0) for (const p of BV.order) drawManBehind(cam, p, ctrlHuman);
  // the same cues as the top view, each sized by its own man's depth
  const targetCue = (q, text, colour) => {
    const at = pr(cam, q.x, q.y, 0);
    if (!at) return;
    const x = at.sx, y = at.sy, cy = y - (lookOf(q).h + 0.3)*at.k - 11;
    if (x < 24 || x > V.W - 24 || cy < 83 || y > V.H - 20) return;
    ctx.save();
    ctx.font = `700 11px 'Atkinson Hyperlegible', sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const measured = ctx.measureText(text), w = ((measured && measured.width) || text.length*6) + 12;
    const cx = clamp(x, w/2 + 8, V.W - w/2 - 8);
    ctx.fillStyle = 'rgba(8,14,10,.9)'; rrect(cx - w/2, cy - 9, w, 18, 4); ctx.fill();
    ctx.fillStyle = colour; ctx.fillText(text, cx, cy);
    ctx.restore();
  };
  for (const t of [0, 1]) {                                  // pass target: render-match.js has the reasoning
    const ctrl = ctrls[t];
    if (!(ctrl && M.phase === 'play' && b.state === 'held' && b.carrier === ctrl)) continue;
    const shown = ctrl.bind ? { to:offloadTarget(ctrl.bind), skip:null, gold:false, marked:false } : shownPass(ctrl);
    if (ctrl.bind) shown.marked = !!(shown.to && pressure(shown.to) < SUPPORT.mark);
    if (shown.skip && shown.skip !== shown.to) groundRing(cam, shown.skip.x, shown.skip.y, BV_RING*1.2, 'rgba(244,241,232,.38)', 1.5, [3, 4]);
    if (shown.to) {
      if (shown.gold) groundRing(cam, shown.to.x, shown.to.y, BV_RING*1.6, ringCol(t), 2.5, [4, 3]);
      else groundRing(cam, shown.to.x, shown.to.y, BV_RING*1.6, shown.marked ? SUPPORT.tint : 'rgba(244,241,232,.95)', shown.marked ? 2.5 : 2, [4, 3]);
      if (shown.gold && shown.marked) groundRing(cam, shown.to.x, shown.to.y, BV_RING*1.15, SUPPORT.tint, 2);
      if (shown.marked) targetCue(shown.to, 'Marked', '#f1eee4');
      bvChevron(cam, shown.to, shown.gold ? ringCol(t) : 'rgba(244,241,232,.95)');
    }
  }
  for (const t of [0, 1]) {                                  // switch target
    const ctrl = ctrls[t];
    if (!(ctrl && M.phase === 'play' && !ourBall(t))) continue;
    const q = switchTarget(t);
    if (!q) continue;
    groundRing(cam, q.x, q.y, BV_RING*1.45, ringCol(t), 2, [4, 3]);
    if (switchUseful(t)) targetCue(q, 'Switch', ringCol(t));
    bvChevron(cam, q, ringCol(t));
  }
  for (const t of [0, 1]) {                                  // kick aim
    const ctrl = ctrls[t], S = sideOf(t);
    if (!(S.charging && ctrl && b.carrier === ctrl)) continue;
    const n = M.career ? careerNatOf(ctrl) : M.nat[t], len = 10 + S.charge*(36 + n.kicking*3), ang = clamp(inputOf(t).world().y, -1.2, 1.2)*0.75;
    const wx = ctrl.x + dirOf(t)*len*Math.cos(ang), wy = ctrl.y + len*Math.sin(ang), q = pr(cam, wx, wy, 0);
    if (!q) continue;
    groundRing(cam, wx, wy, BV_RING*1.2, ringCol(t), 2.5);
    const hw = Math.max(5, 0.32*q.k), hh = hw*bvFlat(cam, q.z);
    ctx.beginPath(); ctx.moveTo(q.sx - hw, q.sy - hh); ctx.lineTo(q.sx + hw, q.sy + hh); ctx.moveTo(q.sx + hw, q.sy - hh); ctx.lineTo(q.sx - hw, q.sy + hh); ctx.stroke();
  }
  if (drill) { if (dd && dd.after) dd.after(cam, dt); dvBall(cam); } else if (BV.fade >= 1) bvBall(cam);
  drawTags(dt, 0.95*cam.F/cam.back);                         // its clocks must run; its impact ring stays a circle on the screen in this slice
  bvOverheads(cam, ctrls, plain);                            // the pointer, the ball's marker and the star, stacked over a man's head
  bvEdgeMarks(cam, plain);
  if (M.cut) drawCut();
  if (drill) drillDrawScreen();                              // a drill's own close-up or corner picture
}
/* =========================================================
   The Training Ground's look: a sunny practice field of its own, seen through whichever view shows each game's technique best. It draws through the
   behind view's projection and men (renderBehind, drawManBehind, artDraw), with its own camera, grass, markings and props. A match never comes here:
   every line below is reached only while `practice` is set, and behindOn() stays false, so a match's camera, sizes and Top are as they were.
   Side views keep x across the screen and y down it, as Top does, so the stick reads as it always did. A behind view turns the stick (dvTurn), so up is
   up the screen on touch, keys and a pad alike, and Watch How writes through the same turn (demoStart's go). Nothing here draws a random number.
   ========================================================= */
const DV_SIDE = { u:{ x:0, y:-1 }, r:{ x:1, y:0 } }, DV_BEHIND = { u:{ x:1, y:0 }, r:{ x:0, y:1 } };
// k: px a metre at the focus at 844x390. z: the lens' distance from the focus (longer is flatter). tilt: its height over that distance. sy: where the focus sits up the screen. aim: where it looks, x, y and a zoom
const DV_VIEW = {
  tag:{ ...DV_BEHIND, k:30, z:18, tilt:0.42, sy:0.74, cut:10, aim:() => { const T = practice.tag, m = T.me; return [tagMode(T) === 'keep' ? m.x : Math.min(m.x, T.them.x), 35 + (m.y - 35)*0.35]; } },   // a dodge reads best across the screen, and both hips show
  egg:{ ...DV_SIDE, k:24, z:40, tilt:0.34, sy:0.5, aim:() => [clamp((58 + practice.egg.me.x)/2, 54, 60), 35] },               // from the side, low, so a hop's height reads above its shadow. It leans a little after you, never so far that the thrower goes off
  circle:{ ...DV_SIDE, k:19, z:44, tilt:0.6, sy:0.58, aim:() => { const C = practice.circle, K = DRILL_CIRCLE; return [K.at[0], K.at[1], clamp(10.6/(dvCircleR(C) + K.out), 1, 1.5)]; } },   // high, so the whole ring shows, closer in while it is small
  cones:{ ...DV_SIDE, k:25, z:30, tilt:0.5, sy:0.56, cut:30, aim:() => { const m = practice.cones.me; return [clamp(m.x + m.vx*0.6, 30, 62), clamp(m.y*0.65 + 37*0.35, 30, 44)]; } },            // runs with you: the next gate is what matters
  tackle:{ ...DV_BEHIND, k:30, z:18, tilt:0.42, sy:0.74, aim:() => [DRILL_TACKLE.at[0], 35] },                                  // behind you, to get in their path. The close-ups take over from Head Side on
  back:{ ...DV_SIDE, k:20, z:36, tilt:0.42, sy:0.58, aim:() => [60, 35] },                                                      // all close-up, so only ever seen under nothing
  pass:{ ...DV_SIDE, k:23, z:36, tilt:0.42, sy:0.58, cut:30, aim:() => [clamp(M.ball.x + 3, 72, 98), 36] },                    // from the side: how near the defender is reads as a distance across the screen
  defend:{ ...DV_SIDE, k:21, z:38, tilt:0.42, sy:0.58, cut:30, aim:() => { const c = practice.switched ? ctrlOf(0) : M.players[1], b = M.ball; return [c ? (b.x + c.x)/2 : b.x, 35 + (b.y - 35)*0.4]; } },   // between the runner and the cover: the man you switch to starts clear of the thumb
  kick:{ ...DV_SIDE, k:20, z:36, tilt:0.42, sy:0.58, aim:() => [90, 35] },                                                      // its own close-up: this is only what a wipe uncovers
  scrum:{ ...DV_SIDE, k:20, z:36, tilt:0.42, sy:0.58, aim:() => [60, 35] },
};
const DV = { cam:null, tx:0, ty:0, zoom:1, sky:new Map(), props:{}, egg:null };
const DV_GRASS = ['#4f9b4b', '#59a553'], DV_CHALK = 'rgba(250,248,238,.9)', DV_FAINT = 'rgba(250,248,238,.17)', DV_GOLD = 'rgba(255,207,61,.95)', DV_GREEN = 'rgba(98,214,128,.95)', DV_RED = 'rgba(255,132,102,.95)';
const DV_KITS = [{ fill:'#1d4f9c', trim:'#ffcf3d', hoops:false }, { fill:'#ee6c22', trim:'#1b1d22', hoops:false }];   // training colours, for both sides of every game: yours blue, theirs an orange bib
const dvOn = () => !!practice && playing();
function dvTurn() {                                         // the stick's turn in a behind view. 0 everywhere else, close-ups included: their left and right are the screen's
  if (!dvOn()) return 0;
  if (practice.id === 'tag') return 1;
  if (practice.id === 'tackle') { const T = practice.tackle; return T && (T.stage === 'approach' || T.stage === 'past') ? 1 : 0; }
  return 0;
}
const dvCovered = () => (practice.id === 'back' && !!practice.back) || (practice.id === 'tackle' && !!practice.tackle && practice.tackle.stage !== 'approach' && practice.tackle.stage !== 'past' && !(practice.tackle.stage === 'show' && !practice.tackle.marks.height));   // a close-up has the whole screen: nothing goes on under it

/* ---------- the camera ---------- */
function dvCamera(dt) {
  const v = DV_VIEW[practice.id], W = V.W, H = V.H, tall = H > W, q = Math.min(W/(tall ? 520 : 844), H/390), a = v.aim();   // an upright window (a tablet or a desktop; a phone is told to turn) comes in closer and holds the field lower
  let c = DV.cam;
  const fresh = !c || c.id !== practice.id || c.W !== W || c.H !== H || BV.M !== M;
  if (fresh) c = DV.cam = { id:practice.id, key:'dv', W, H, cx:W/2, F:0, ch:v.tilt*v.z, back:v.z, hz:0, u:v.u, r:v.r, Cx:0, Cy:0 };
  const z = a[2] || 1, dx = a[0] - DV.tx, dy = a[1] - DV.ty, cut = v.cut || 25;
  if (fresh || Math.abs(dx) > cut || Math.abs(dy) > cut) { DV.tx = a[0]; DV.ty = a[1]; DV.zoom = z; }
  else {
    DV.tx += clamp(dx*Math.min(1, dt*4), -14*dt, 14*dt); DV.ty += clamp(dy*Math.min(1, dt*3), -14*dt, 14*dt);
    DV.zoom += (z - DV.zoom)*Math.min(1, dt*3);
  }
  BV.M = M; BV.rt = M.rt;
  const k = v.k*q*DV.zoom;
  c.F = k*v.z; c.hz = (tall ? v.sy*0.72 : v.sy)*H - k*c.ch; c.Cx = DV.tx - v.z*v.u.x; c.Cy = DV.ty - v.z*v.u.y;
  return c;
}
function dvFree() { if (!DV.sky.size) return; for (const c of DV.sky.values()) c.width = 0; DV.sky.clear(); }
const dvCircleR = C => (C.stage === 'grow' ? drillLerp(circleRadius(C.role, C.round - 1), circleRadius(C.role, C.round), Math.min(1, C.t/DRILL_CIRCLE.growT)) : C.R);

/* ---------- the field ---------- */
function dvSky(h) {                                         // daylight, trees, a hedge and a shed: a picture painted once. No boards, stands or floodlights
  const W = V.W, d = V.dpr, key = Math.round(h) + 'x' + W + 'x' + d;
  let cv = DV.sky.get(key);
  if (cv) return cv;
  if (DV.sky.size >= 3) { for (const old of DV.sky.values()) old.width = 0; DV.sky.clear(); }
  cv = document.createElement('canvas'); cv.width = Math.ceil(W*d); cv.height = Math.ceil(h*d);
  DV.sky.set(key, cv);
  const g = cv.getContext('2d');
  g.scale(d, d);
  const sky = g.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#8fc1e2'); sky.addColorStop(1, '#e6efe2');
  g.fillStyle = sky; g.fillRect(0, 0, W, h);
  const R = Math.max(10, Math.min(h, 90)*0.28), base = h;
  g.fillStyle = 'rgba(255,255,255,.75)';
  for (let i = 0; i < 5; i++) { const x = ((i*0.237 + 0.07) % 1)*W, y = base*(0.14 + 0.1*(i % 3)); g.beginPath(); g.ellipse(x, y, R*1.8, R*0.42, 0, 0, 7); g.ellipse(x + R, y - R*0.22, R*1.1, R*0.4, 0, 0, 7); g.fill(); }
  for (const [col, up, gap] of [['#6d9a68', 1.15, 0.9], ['#4f8150', 0.8, 0.65]]) {
    g.fillStyle = col;
    for (let x = -R, i = 0; x < W + R; x += R*gap, i++) { const r = R*(0.75 + 0.35*((i*7) % 5)/4); g.beginPath(); g.arc(x, base - R*up*0.6 + ((i*3) % 4)*0.08*R, r, 0, 7); g.fill(); }
    g.fillRect(0, base - R*up*0.6, W, R*up*0.6);
  }
  const sw = R*3.6, sh = R*1.5, sx = W*0.7, sy = base - R*0.5 - sh;     // a clubhouse shed, plain, no sign
  g.fillStyle = '#d9cdb4'; g.fillRect(sx, sy, sw, sh);
  g.fillStyle = '#8d5a3e'; g.beginPath(); g.moveTo(sx - R*0.25, sy); g.lineTo(sx + sw/2, sy - R*0.62); g.lineTo(sx + sw + R*0.25, sy); g.closePath(); g.fill();
  g.fillStyle = '#5b7a8c'; g.fillRect(sx + R*0.4, sy + R*0.4, R*0.8, R*0.55); g.fillRect(sx + sw - R*1.2, sy + R*0.4, R*0.8, R*0.55);
  g.fillStyle = '#3f6b45'; g.fillRect(0, base - R*0.5, W, R*0.5);        // the hedge
  g.fillStyle = '#f4f1e6';
  for (let x = 0; x < W; x += R*1.5) g.fillRect(x, base - R*0.42, Math.max(1.2, R*0.07), R*0.42);
  g.fillRect(0, base - R*0.34, W, Math.max(1, R*0.05)); g.fillRect(0, base - R*0.16, W, Math.max(1, R*0.05));
  return cv;
}
const DV_WORN = Array.from({ length:40 }, (_, i) => [10 + ((i*37) % 11)*10 + ((i*13) % 7), 8 + ((i*53) % 9)*6.5, 1.2 + ((i*11) % 5)*0.5]);   // worn patches, the same every time
function dvLine(cam, x0, y0, x1, y1, col, w, dash) {
  ctx.beginPath(); if (!groundSeg(cam, x0, y0, x1, y1, 0)) return;
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.setLineDash(dash || []); ctx.stroke(); ctx.setLineDash([]);
}
function dvCircle(cam, x, y, r, col, w, dash) {             // a true circle on the grass, by projection: a large one stays under the men standing on it
  const n = Math.max(20, Math.min(56, Math.round(r*7)));
  ctx.beginPath(); let on = false;
  for (let i = 0; i <= n; i++) { const a = i/n*2*Math.PI, q = pr(cam, x + r*Math.cos(a), y + r*Math.sin(a), 0); if (!q) { on = false; continue; } if (on) ctx.lineTo(q.sx, q.sy); else ctx.moveTo(q.sx, q.sy); on = true; }
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.setLineDash(dash || []); ctx.stroke(); ctx.setLineDash([]);
}
function dvGround(cam) {
  const W = V.W, H = V.H, top = Math.max(0, cam.hz), fx = DV.tx, fy = DV.ty;
  if (cam.hz > 0) ctx.drawImage(dvSky(cam.hz), 0, 0, W, cam.hz);
  ctx.fillStyle = DV_GRASS[0]; ctx.fillRect(0, top, W, H - top);
  const c0 = Math.floor((fx + fy)/14)*14, y0 = fy - 60, y1 = fy + 60;   // mown across the field on the diagonal: the pitch's bands run straight
  for (let i = -6; i <= 6; i++) { const a = c0 + i*14, b = a + 7; groundPoly(cam, [a - y0, y0, b - y0, y0, b - y1, y1, a - y1, y1], 0, DV_GRASS[1]); }
  ctx.fillStyle = 'rgba(112,96,44,.09)';
  for (const [x, y, r] of DV_WORN) { const q = pr(cam, x, y, 0); if (!q || q.sx < -40 || q.sx > W + 40 || q.sy < top - 20 || q.sy > H + 20) continue; ellipse(q.sx, q.sy, r*q.k, r*q.k*bvFlat(cam, q.z)); ctx.fill(); }
  ctx.beginPath();                                          // the training grid, faint, every ten metres
  const gx = Math.floor(fx/10)*10, gy = Math.floor(fy/10)*10;
  for (let i = -4; i <= 4; i++) { groundSeg(cam, gx + i*10, gy - 40, gx + i*10, gy + 40, 0); groundSeg(cam, gx - 40, gy + i*10, gx + 40, gy + i*10, 0); }
  ctx.strokeStyle = DV_FAINT; ctx.lineWidth = Math.max(1, 0.05*cam.F/cam.back); ctx.stroke();
}
function dvStage(y0) {                                      // the close-ups' backdrop: the same day on the same field
  const W = V.W, H = V.H;
  ctx.drawImage(dvSky(y0*0.62), 0, 0, W, y0*0.62);
  ctx.fillStyle = DV_GRASS[0]; ctx.fillRect(0, y0*0.62, W, H - y0*0.62);
  ctx.fillStyle = DV_GRASS[1];
  for (let i = -6; i < 12; i += 2) { const a = W*0.5 + i*W*0.11, b = a + W*0.11, f = 0.3, t = y0*0.62; ctx.beginPath(); ctx.moveTo(a, H); ctx.lineTo(b, H); ctx.lineTo(W*0.5 + (b - W*0.5)*f, t); ctx.lineTo(W*0.5 + (a - W*0.5)*f, t); ctx.closePath(); ctx.fill(); }
  ctx.fillStyle = 'rgba(250,248,238,.85)'; ctx.fillRect(0, y0 - 1, W, 2);
}

/* ---------- the props: cones, saucers, a flag, tackle bags, a bag of balls, a tee. Each is painted once to a small canvas, then one drawImage a time ---------- */
const DV_SCALE = { cone:1.25, saucer:1.2 };                 // a little larger than life, so they read at a phone's size
const DV_PX = 72;                                           // pixels a metre on the prop pictures
const DV_PAINT = {
  cone(g, K) {
    g.fillStyle = 'rgba(10,30,14,.3)'; g.beginPath(); g.ellipse(0.04*K, 0, 0.34*K, 0.11*K, 0, 0, 7); g.fill();
    const s = g.createLinearGradient(-0.24*K, 0, 0.24*K, 0); s.addColorStop(0, '#ffa04d'); s.addColorStop(0.55, '#ff7a1a'); s.addColorStop(1, '#c9530a');
    g.fillStyle = '#d95f0e'; g.beginPath(); g.ellipse(0, -0.01*K, 0.29*K, 0.09*K, 0, 0, 7); g.fill();
    g.fillStyle = s; g.beginPath(); g.moveTo(-0.23*K, -0.03*K); g.lineTo(-0.045*K, -0.56*K); g.lineTo(0.045*K, -0.56*K); g.lineTo(0.23*K, -0.03*K); g.quadraticCurveTo(0, 0.05*K, -0.23*K, -0.03*K); g.closePath(); g.fill();
    g.fillStyle = '#f7f4ea'; g.beginPath(); g.moveTo(-0.142*K, -0.27*K); g.lineTo(-0.086*K, -0.43*K); g.quadraticCurveTo(0, -0.41*K, 0.086*K, -0.43*K); g.lineTo(0.142*K, -0.27*K); g.quadraticCurveTo(0, -0.235*K, -0.142*K, -0.27*K); g.closePath(); g.fill();
    g.fillStyle = '#ffb877'; g.beginPath(); g.ellipse(0, -0.56*K, 0.045*K, 0.016*K, 0, 0, 7); g.fill();
  },
  saucer(g, K) {
    g.fillStyle = 'rgba(10,30,14,.25)'; g.beginPath(); g.ellipse(0.02*K, 0.01*K, 0.27*K, 0.09*K, 0, 0, 7); g.fill();
    g.fillStyle = '#e8b420'; g.beginPath(); g.ellipse(0, 0, 0.25*K, 0.085*K, 0, 0, 7); g.fill();
    g.fillStyle = '#ffd84d'; g.beginPath(); g.ellipse(0, -0.03*K, 0.2*K, 0.066*K, 0, 0, 7); g.fill();
    g.fillStyle = '#6c8c3c'; g.beginPath(); g.ellipse(0, -0.035*K, 0.06*K, 0.02*K, 0, 0, 7); g.fill();
  },
  flag(g, K) {
    g.fillStyle = 'rgba(10,30,14,.3)'; g.beginPath(); g.ellipse(0.02*K, 0, 0.22*K, 0.07*K, 0, 0, 7); g.fill();
    g.fillStyle = '#f7f4ea'; g.fillRect(-0.035*K, -2.3*K, 0.07*K, 2.3*K);
    g.fillStyle = '#ff7a1a'; g.beginPath(); g.moveTo(0.035*K, -2.3*K); g.lineTo(0.95*K, -2.02*K); g.lineTo(0.035*K, -1.72*K); g.closePath(); g.fill();
    g.fillStyle = '#ffd84d'; g.beginPath(); g.ellipse(0, -2.32*K, 0.07*K, 0.07*K, 0, 0, 7); g.fill();
  },
  bag(g, K) {                                               // a padded tackle bag, stood up: two straps and a darker top
    g.fillStyle = 'rgba(10,30,14,.3)'; g.beginPath(); g.ellipse(0.06*K, 0, 0.42*K, 0.14*K, 0, 0, 7); g.fill();
    const s = g.createLinearGradient(-0.3*K, 0, 0.3*K, 0); s.addColorStop(0, '#39558e'); s.addColorStop(0.45, '#2a4478'); s.addColorStop(1, '#172a50');
    g.fillStyle = s; g.beginPath(); g.moveTo(-0.3*K, -0.03*K); g.lineTo(-0.3*K, -1.3*K); g.quadraticCurveTo(0, -1.46*K, 0.3*K, -1.3*K); g.lineTo(0.3*K, -0.03*K); g.quadraticCurveTo(0, 0.09*K, -0.3*K, -0.03*K); g.closePath(); g.fill();
    g.fillStyle = '#f2efe4'; for (const y of [-0.42, -0.95]) { g.beginPath(); g.moveTo(-0.3*K, y*K - 0.05*K); g.quadraticCurveTo(0, y*K + 0.05*K, 0.3*K, y*K - 0.05*K); g.lineTo(0.3*K, y*K + 0.05*K); g.quadraticCurveTo(0, y*K + 0.15*K, -0.3*K, y*K + 0.05*K); g.closePath(); g.fill(); }
    g.fillStyle = '#4a689f'; g.beginPath(); g.ellipse(0, -1.32*K, 0.3*K, 0.09*K, 0, 0, 7); g.fill();
  },
  balls(g, K) {                                             // a net bag of practice balls
    g.fillStyle = 'rgba(10,30,14,.3)'; g.beginPath(); g.ellipse(0.04*K, 0, 0.56*K, 0.17*K, 0, 0, 7); g.fill();
    const ball = (x, y, a) => { g.save(); g.translate(x*K, y*K); g.rotate(a); g.fillStyle = '#f6f3ea'; g.strokeStyle = '#3b2f22'; g.lineWidth = 0.02*K; g.beginPath(); g.ellipse(0, 0, 0.21*K, 0.13*K, 0, 0, 7); g.fill(); g.stroke(); g.restore(); };
    ball(-0.22, -0.13, -0.2); ball(0.22, -0.13, 0.25); ball(0, -0.28, 0.1); ball(-0.08, -0.45, -0.3); ball(0.14, -0.46, 0.4);
    g.strokeStyle = 'rgba(40,40,44,.55)'; g.lineWidth = 0.014*K;
    for (let i = -3; i <= 3; i++) { g.beginPath(); g.moveTo(i*0.14*K, -0.02*K); g.lineTo(i*0.05*K, -0.72*K); g.stroke(); }
    for (const y of [-0.12, -0.3, -0.48]) { g.beginPath(); g.moveTo(-0.5*K*(1 + y), y*K); g.lineTo(0.5*K*(1 + y), y*K); g.stroke(); }
    g.fillStyle = '#ffcf3d'; g.fillRect(-0.09*K, -0.78*K, 0.18*K, 0.06*K);
  },
  tee(g, K) {                                               // a kicking tee: a low yellow cup
    g.fillStyle = 'rgba(10,30,14,.28)'; g.beginPath(); g.ellipse(0, 0.01*K, 0.2*K, 0.06*K, 0, 0, 7); g.fill();
    g.fillStyle = '#e9b81c'; g.beginPath(); g.moveTo(-0.15*K, 0); g.lineTo(-0.07*K, -0.12*K); g.lineTo(0.07*K, -0.12*K); g.lineTo(0.15*K, 0); g.quadraticCurveTo(0, 0.05*K, -0.15*K, 0); g.closePath(); g.fill();
    g.fillStyle = '#ffd84d'; g.beginPath(); g.ellipse(0, -0.12*K, 0.075*K, 0.025*K, 0, 0, 7); g.fill();
  },
};
const DV_BOX = { cone:[0.75, 0.7], saucer:[0.7, 0.2], flag:[2.1, 2.5], bag:[1, 1.55], balls:[1.3, 0.95], tee:[0.45, 0.22] };   // the picture's width and height over the ground, in metres
function dvPropPic(name) {
  let p = DV.props[name];
  if (p) return p;
  const [w, h] = DV_BOX[name], cv = document.createElement('canvas'), low = 0.2;
  cv.width = Math.ceil(w*DV_PX); cv.height = Math.ceil((h + low)*DV_PX);
  const g = cv.getContext('2d'), ox = name === 'flag' ? 0.3 : w/2;
  g.translate(ox*DV_PX, h*DV_PX);
  DV_PAINT[name](g, DV_PX);
  p = DV.props[name] = { cv, w, h:h + low, ox, oy:h };
  return p;
}
function dvProp(cam, name, x, y, s) {                       // stood on the grass at x, y, sized by its depth
  const q = pr(cam, x, y, 0);
  if (!q) return;
  const p = dvPropPic(name), k = q.k*(s || DV_SCALE[name] || 1);
  if (q.sx < -p.w*k || q.sx > V.W + p.w*k || q.sy < -2 || q.sy > V.H + p.h*k) return;
  ctx.drawImage(p.cv, q.sx - p.ox*k, q.sy - p.oy*k, p.w*k, p.h*k);
}
function dvPropAt(name, x, y, k) { const p = dvPropPic(name); ctx.drawImage(p.cv, x - p.ox*k, y - p.oy*k, p.w*k, p.h*k); }   // the same picture at a screen point: the kick's tee

/* ---------- each game's own markings and props ---------- */
const DV_FLAT = { egg:1, cones:1, circle:1 };
const DV_DRAW = {
  tag:{
    ground(cam) {                                           // a channel with a line to run for
      const T = practice.tag, K = DRILL_TAG, B = K.box, Q = K[tagMode(T)], w = Math.max(1.5, 0.08*cam.F/cam.back);
      for (const y of [B[1], B[3]]) dvLine(cam, B[0] - 6, y, B[2] + 6, y, 'rgba(250,248,238,.55)', w, [6, 5]);
      dvLine(cam, Q.line, B[1], Q.line, B[3], DV_CHALK, w*1.8);
      if (tagMode(T) === 'pull' && T.stage === 'play' && tagCanPull(T)) groundRing(cam, T.them.x, T.them.y, 1.0, DV_GOLD, 3);
      if (tagMode(T) === 'keep' && T.lunge) groundRing(cam, T.them.x, T.them.y, 1.2, DV_RED, 3);   // they have gone: the moment to change direction
    },
    props() { const K = DRILL_TAG, B = K.box, out = []; for (let x = B[0]; x <= B[2]; x += 8) out.push(['saucer', x, B[1]], ['saucer', x, B[3]]); out.push(['balls', 40, 24]); return out; },
    under(cam, p) { dvTagFar(cam, p); },
    over(cam, p) { dvTagNear(cam, p); },
    pose(cam, p, s) {
      const T = practice.tag, keep = tagMode(T) === 'keep';
      if (p === T.them && keep && T.lunge) return dvFace(cam, p, s, 'reach', 0, T.me);            // arms out, going for your hip
      if (p === T.them && keep && T.lost === 'me') return dvFace(cam, p, s, 'reach', 1, T.me);    // and your tag held up
      if (p === T.me && !keep && T.lost === 'them') return dvFace(cam, p, s, 'reach', 1, T.them); // their tag held up
      if (p === T.me && !keep && T.stage === 'play' && tagCanPull(T)) return dvFace(cam, p, s, 'reach', 0, T.them);
      return null;
    },
    tick() {                                                // a dodge plays the Side Step: render-only
      const T = practice.tag, m = T.me;
      if (tagMode(T) === 'keep' && T.lunge && !T.stepShown && Math.abs(m.vy) > 2) { T.stepShown = T.rep; artStepped(m, Math.sign(m.vy)); }
      if (!T.lunge && T.stepShown !== T.rep) T.stepShown = 0;
    },
  },
  egg:{
    ground(cam) {                                           // the thrower's spot, the box you may run in, a line of cones six metres out; and the same closing ring whatever is coming
      const E = practice.egg, K = DRILL_EGG, B = K.box, w = Math.max(1.5, 0.07*cam.F/cam.back);
      if (!E) return;
      dvLine(cam, B[0], B[1], B[2], B[1], 'rgba(250,248,238,.5)', w, [7, 6]); dvLine(cam, B[2], B[1], B[2], B[3], 'rgba(250,248,238,.5)', w, [7, 6]);
      dvLine(cam, B[2], B[3], B[0], B[3], 'rgba(250,248,238,.5)', w, [7, 6]);
      groundRing(cam, K.from[0], K.from[1], 0.75, 'rgba(250,248,238,.75)', 2);
      if (E.stage === 'wind') { const u = clamp(E.t/E.wind, 0, 1); dvCircle(cam, E.tw.x, E.tw.y, 2.4 - 1.4*u, `rgba(255,255,255,${(0.45 + 0.5*u).toFixed(3)})`, 2.5); }
      if (E.stage === 'fly' && E.aim) {                     // where the ball comes down, at release and again after every hop: a ring the size of your reach, and its centre
        const lw = Math.max(2.5, 0.14*cam.F/cam.back);
        dvCircle(cam, E.aim.x, E.aim.y, K.reach, DV_GOLD, lw);
        dvCircle(cam, E.aim.x, E.aim.y, 0.18, DV_GOLD, lw);
      }
    },
    props() { const B = DRILL_EGG.box, out = []; for (let i = 0; i < 5; i++) out.push(['cone', B[0] - 0.7, drillLerp(B[1] + 2, B[3] - 2, i/4)]); out.push(['balls', 42, 28]); return out; },
    pose(cam, p, s) {
      const E = practice.egg, b = M.ball;
      if (p === E.tw) {
        if (E.stage === 'wind') return dvFace(cam, p, s, 'carryidle', 0, E.me);
        if (E.stage === 'fly' && E.t < 0.26) return dvFace(cam, p, s, 'pass', E.t < 0.06 ? 0 : E.t < 0.15 ? 1 : 2, E.me);
        return null;
      }
      if (p === E.me && E.stage === 'fly' && dist(p, b) < 3 && (hyp(p.vx, p.vy) < 2.5 || dist(p, b) < 1.6)) return dvFace(cam, p, s, 'catch', b.z > 2 ? 1 : 0, b);   // hands up to take it
      return null;
    },
    after(cam, dt) { dvEggFx(cam, dt); },
  },
  circle:{
    ground(cam) {
      const C = practice.circle, K = DRILL_CIRCLE; if (!C) return;
      const R = dvCircleR(C), home = circleSpot(0, R), w = Math.max(1.6, 0.09*cam.F/cam.back);
      dvCircle(cam, K.at[0], K.at[1], R, 'rgba(250,248,238,.3)', w*0.8);                 // the ring the ball goes round
      dvCircle(cam, K.at[0], K.at[1], R + K.out, 'rgba(250,248,238,.72)', w, [7, 6]);    // the runner's track
      dvCircle(cam, home.x, home.y, 0.95, DV_GOLD, w*1.3);                               // home
      if (C.stage === 'start') {                           // the first pass: the white ring closes on the gold over and over until you tap
        const e = circleStartE(C), r = e < 0 ? 0.95 + 1.8*clamp(-e/(K.beat/2), 0, 1) : Math.max(0.35, 0.95 - 1.3*e);
        dvCircle(cam, home.x, home.y, r, Math.abs(e) <= K.ok ? 'rgba(255,207,61,1)' : 'rgba(255,255,255,.95)', w*1.1);
      }
      if (C.role === 'runner' && C.stage === 'race' && !C.home) {   // the way round: the stick goes the way this arrow goes
        const A = circleRunAt(C.R, C.s + 1), B = circleRunAt(C.R, C.s + 2.4), a = pr(cam, A.x, A.y, 0), b = pr(cam, B.x, B.y, 0);
        if (a && b) { const dx = b.sx - a.sx, dy = b.sy - a.sy, m = hyp(dx, dy) || 1, ux = dx/m, uy = dy/m, s = Math.min(9, m*0.5); ctx.save(); ctx.strokeStyle = DV_GOLD; ctx.lineWidth = w*1.3; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.moveTo(b.sx - ux*s - uy*s*0.7, b.sy - uy*s + ux*s*0.7); ctx.lineTo(b.sx, b.sy); ctx.lineTo(b.sx - ux*s + uy*s*0.7, b.sy - uy*s - ux*s*0.7); ctx.stroke(); ctx.restore(); }
      }
      if (C.role === 'passer' && C.hold && C.stage === 'race') {   // the timing: the white ring closes on the gold one; tap as they meet
        const H = C.hold, p = C.men[H.i], e = H.t - H.tc, r = e < 0 ? 1.0 + 1.8*clamp(-e/K.ready, 0, 1) : Math.max(0.35, 1.0 - 1.3*e);
        dvCircle(cam, p.x, p.y, 1.0, DV_GOLD, w*1.3);
        dvCircle(cam, p.x, p.y, r, Math.abs(e) <= K.perfect ? 'rgba(255,207,61,1)' : 'rgba(255,255,255,.95)', w*1.1);
      }
    },
    spots(cam) { const C = practice.circle; if (!C) return; const R = dvCircleR(C); for (let i = 1; i < DRILL_CIRCLE.n; i++) { const s = circleSpot(i, R); dvProp(cam, 'saucer', s.x, s.y); } },
    props() { return [['balls', 75, 25], ['cone', 76.5, 44], ['cone', 44, 44], ['cone', 44, 25]]; },
    pose(cam, p, s) {
      const C = practice.circle, f = C.fly, i = C.men.indexOf(p);
      if (i < 0 || (i === 0 && C.stage === 'race' && !C.home)) return null;                 // the runner runs
      if (f && f.to === i) return dvFace(cam, p, s, 'catch', 0, M.ball);                    // hands out at the chest
      if (f && f.from === i && f.t < 0.25) return dvFace(cam, p, s, 'pass', f.t < 0.05 ? 0 : f.t < 0.14 ? 1 : 2, C.men[f.to]);
      return null;
    },
  },
  cones:{
    ground(cam) {
      const Q = practice.cones, K = DRILL_CONES; if (!Q) return;
      const w = Math.max(1.3, 0.07*cam.F/cam.back);
      ctx.beginPath();                                      // the route, in chalk
      let [px, py] = K.start, go = (x, y) => { groundSeg(cam, px, py, x, y, 0); px = x; py = y; };
      for (let i = 0; i < K.out; i++) go(K.gates[i][0], K.gates[i][1]);
      go(K.turn[0] + 2.2, K.turn[1] - 4); go(K.turn[0] + 2.2, K.turn[1] + 2); go(K.gates[K.out][0], K.gates[K.out][1]);
      for (let i = K.out + 1; i < K.gates.length; i++) go(K.gates[i][0], K.gates[i][1]);
      go(K.line - 1, K.gates[K.gates.length - 1][1]);
      ctx.strokeStyle = 'rgba(250,248,238,.55)'; ctx.lineWidth = w; ctx.setLineDash([6, 7]); ctx.stroke(); ctx.setLineDash([]);
      dvLine(cam, K.startLine, K.start[1] - 5, K.startLine, K.start[1] + 5, DV_CHALK, w*2);   // start
      const fin = K.gates[K.gates.length - 1][1] - 5;       // the chequered finish, across the way home
      for (let i = 0; i < 10; i++) groundPoly(cam, [K.line - 0.5, fin + i, K.line + 0.5, fin + i, K.line + 0.5, fin + i + 1, K.line - 0.5, fin + i + 1], 0, i % 2 ? '#f6f3e8' : '#16160f');
      const next = Q.pass.findIndex(v => !v);
      for (const c of Q.cones) {                            // gold for the next gate, green cleared, red missed: rings on the grass
        if (c.g < 0) continue;
        const v = Q.pass[c.g], col = v > 0 ? DV_GREEN : v < 0 ? DV_RED : c.g === next && (c.g < K.out || Q.turned) ? DV_GOLD : null;
        if (col) groundRing(cam, c.x, c.y, 0.62, col, 2.5);
      }
      if (!Q.turned) groundRing(cam, K.turn[0], K.turn[1], 1.0, DV_GOLD, 3);
      if (next >= 0 && (next < K.out || Q.turned)) bvChevron(cam, { x:K.gates[next][0], y:K.gates[next][1] }, DV_GOLD);   // the next gate, off the frame
      else if (!Q.turned) bvChevron(cam, { x:K.turn[0], y:K.turn[1] }, DV_GOLD);
      else bvChevron(cam, { x:K.line, y:K.gates[K.gates.length - 1][1] }, '#f6f3e8');
    },
    props() { const Q = practice.cones, K = DRILL_CONES, out = []; for (const c of Q.cones) if (c.g >= 0) out.push(['cone', c.x, c.y]); out.push(['flag', K.turn[0], K.turn[1]], ['balls', 18, 26]); return out; },
  },
  tackle:{
    ground(cam) {                                           // their path, green under you when you are in it, and a gold ring once your feet are set
      const T = practice.tackle, K = DRILL_TACKLE; if (!T || (T.stage !== 'approach' && T.stage !== 'past')) return;
      const me = T.me, inLine = Math.abs(me.y - T.lane) <= K.inLine, w = Math.max(2, 0.1*cam.F/cam.back);
      dvLine(cam, T.ru.x - 0.8, T.lane, K.box[0], T.lane, inLine ? DV_GREEN : 'rgba(250,248,238,.6)', w, [10, 8]);
      if (inLine && hyp(me.vx, me.vy) <= K.still) groundRing(cam, me.x, me.y, 1.35, DV_GOLD, 3);
    },
    props() { return [['bag', 72, 25], ['bag', 74.5, 26], ['bag', 77, 25], ['bag', 72, 45], ['bag', 74.5, 44], ['balls', 62, 24], ['saucer', 52, 28], ['saucer', 52, 42]]; },
    pose(cam, p, s) {
      const T = practice.tackle;
      if (p === T.me && T.stage === 'approach' && Math.abs(p.y - T.lane) <= DRILL_TACKLE.inLine && hyp(p.vx, p.vy) <= DRILL_TACKLE.still) return dvFace(cam, p, s, 'crouch', 1, T.ru);   // set: low, hands up, looking at them
      return null;
    },
  },
  pass:{
    ground(cam) {                                           // the line to score on, and how close the defender has to be: the ball leaving your hands in here is what draws them
      const w = Math.max(2, 0.12*cam.F/cam.back), def = M.players.find(p => p.team === 1), me = ctrlOf(0);
      dvLine(cam, 110, 12, 110, 58, DV_CHALK, w);
      if (def && M.stats.passes === 0) { const inside = me && dist(me, def) <= DRILL_QUICK.draw; dvCircle(cam, def.x, def.y, DRILL_QUICK.draw, inside ? DV_GOLD : 'rgba(250,248,238,.55)', Math.max(1.5, w*0.6), inside ? null : [7, 6]); }
    },
    props() { return [['flag', 110, 22], ['flag', 110, 50], ['cone', 110, 29], ['cone', 110, 36], ['cone', 110, 43], ['balls', 70, 24]]; },
  },
  defend:{
    ground(cam) {                                           // where the runner is heading
      const b = M.ball, c = b.state === 'held' ? b.carrier : null;
      if (c && c.team === 1) dvLine(cam, c.x, c.y, c.x - 14, c.y, 'rgba(250,248,238,.5)', Math.max(1.5, 0.08*cam.F/cam.back), [7, 6]);
    },
    props() { return [['bag', 30, 22], ['bag', 33, 23], ['balls', 56, 24], ['cone', 24, 28], ['cone', 24, 42], ['cone', 44, 28], ['cone', 44, 42]]; },
  },
};
/* a man's hip tags: two ribbons from a belt, the far one behind him and the near one in front */
function dvTagPoints(cam, p) {
  const s = bvMan(p), m = hyp(p.fx, p.fy) || 1, fx = p.fx/m, fy = p.fy/m, sc = lookOf(p).h/1.8, sp = hyp(p.vx, p.vy), hip = 0.93*sc;
  const pts = [-1, 1].map(side => {
    const wx = s.wx - fy*side*0.3, wy = s.wy + fx*side*0.3, z = (wx - cam.Cx)*cam.u.x + (wy - cam.Cy)*cam.u.y, tail = Math.min(0.45, sp*0.06);
    return { z, side, a:pr(cam, wx, wy, hip), b:pr(cam, wx - fx*tail, wy - fy*tail, hip - 0.56 + tail*0.4), m:pr(cam, wx - fx*tail*0.4, wy - fy*tail*0.4, hip - 0.26) };
  });
  return pts.sort((u, v) => v.z - u.z);                     // far first
}
function dvTagRibbon(q, col) {
  if (!q.a || !q.b || !q.m) return;
  const w = Math.max(3, 0.14*q.a.k);
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'rgba(8,14,10,.75)'; ctx.lineWidth = w + 1.6; ctx.beginPath(); ctx.moveTo(q.a.sx, q.a.sy); ctx.quadraticCurveTo(q.m.sx, q.m.sy, q.b.sx, q.b.sy); ctx.stroke();
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(q.a.sx, q.a.sy); ctx.quadraticCurveTo(q.m.sx, q.m.sy, q.b.sx, q.b.sy); ctx.stroke();
}
function dvTagOf(p) { const T = practice.tag; return p === T.me ? { col:'#62d6ff', gone:T.lost === 'me' } : p === T.them ? { col:'#c8ff3d', gone:T.lost === 'them' } : null; }
function dvTagFar(cam, p) { const t = dvTagOf(p); if (!t || t.gone) return; dvTagRibbon(dvTagPoints(cam, p)[0], t.col); }
function dvTagNear(cam, p) {
  const t = dvTagOf(p); if (!t) return;
  const pts = dvTagPoints(cam, p);
  if (pts[0].a && pts[1].a) { ctx.strokeStyle = t.col; ctx.lineWidth = Math.max(2, 0.07*pts[0].a.k); ctx.lineCap = 'round'; seg(pts[0].a.sx, pts[0].a.sy, pts[1].a.sx, pts[1].a.sy); }   // the belt
  dvTagRibbon(pts[1], t.col);
  const T = practice.tag;
  if (T.stage === 'show' && T.lost && p === (T.lost === 'me' ? T.them : T.me)) {           // the pulled tag, held up
    const s = bvMan(p), q = pr(cam, s.wx, s.wy, lookOf(p).h + 0.34);
    if (q) { ctx.strokeStyle = 'rgba(8,14,10,.75)'; ctx.lineWidth = 6; seg(q.sx, q.sy, q.sx + 3, q.sy + 0.44*q.k); ctx.strokeStyle = T.lost === 'me' ? '#62d6ff' : '#c8ff3d'; ctx.lineWidth = 3.4; seg(q.sx, q.sy, q.sx + 3, q.sy + 0.44*q.k); }
  }
}
/* Bouncy Egg: what makes a hop read. A line of chalk dots behind the ball shows the arc, a stem to its shadow shows the height, and a puff shows each landing */
function dvEggFx(cam, dt) {
  const E = practice.egg, b = M.ball; if (!E) return;
  let F = DV.egg;
  if (!F || F.E !== E || F.n !== E.n) F = DV.egg = { E, n:E.n, hops:0, trail:[], puffs:[], up:false };
  const flying = E.stage === 'fly' || E.stage === 'missed';
  if (flying) {
    const last = F.trail[F.trail.length - 1];
    if (!last || hyp(b.x - last[0], b.y - last[1]) + Math.abs(b.z - last[2]) > 0.32) { F.trail.push([b.x, b.y, b.z]); if (F.trail.length > 26) F.trail.shift(); }
    if (b.z <= 0.02 && F.up) { F.up = false; F.puffs.push({ x:b.x, y:b.y, t:0 }); if (F.puffs.length > 4) F.puffs.shift(); }
    if (b.z > 0.12) F.up = true;
  } else if (F.trail.length && E.stage === 'caught') F.trail.length = 0;
  for (let i = 0; i < F.trail.length; i++) {
    const t = F.trail[i], q = pr(cam, t[0], t[1], t[2]);
    if (!q) continue;
    ctx.fillStyle = `rgba(255,255,255,${(0.14 + 0.62*i/F.trail.length).toFixed(3)})`;
    ctx.beginPath(); ctx.arc(q.sx, q.sy, Math.max(1.4, 0.055*q.k*(0.6 + 0.6*i/F.trail.length)), 0, 7); ctx.fill();
  }
  for (const f of F.puffs) {
    const q = pr(cam, f.x, f.y, 0), u = clamp(f.t/0.32, 0, 1);
    f.t += dt;
    if (!q || u >= 1) continue;
    const r = (0.3 + 0.75*u)*q.k, fl = bvFlat(cam, q.z);
    ctx.strokeStyle = `rgba(255,250,225,${(0.9*(1 - u)).toFixed(3)})`; ctx.lineWidth = Math.max(1.5, 3*(1 - u));
    ellipse(q.sx, q.sy, r, r*fl); ctx.stroke();
    ctx.fillStyle = `rgba(214,190,120,${(0.8*(1 - u)).toFixed(3)})`;
    for (let i = 0; i < 6; i++) { const a = i*Math.PI/3 + 0.4; ctx.beginPath(); ctx.arc(q.sx + Math.cos(a)*r*0.8, q.sy + Math.sin(a)*r*0.8*fl - 7*u*(1 - u)*4, Math.max(1, 0.05*q.k), 0, 7); ctx.fill(); }
  }
}
function dvBall(cam) {                                      // a ball that is not in anyone's hands: bigger than a match's, tumbling if it tumbles, with a stem down to its shadow while it is up
  const b = M.ball;
  if (b.state === 'held') return;
  if (b.state === 'air' && b.f && b.f.kind !== 'pass') groundRing(cam, b.f.x1, b.f.y1, BV_RING*1.3, 'rgba(255,255,255,.85)', 2, [4, 3]);
  const z = Math.max(0, b.z), q = pr(cam, b.x, b.y, z), sh = pr(cam, b.x, b.y, 0);
  if (!q || q.sx < -30 || q.sx > V.W + 30) return;
  if (sh) {
    const g = 1/(1 + z*0.2), fl = bvFlat(cam, sh.z);
    ctx.fillStyle = 'rgba(6,20,8,.5)'; ellipse(sh.sx, sh.sy, Math.max(4, 0.26*sh.k)*g, Math.max(2, 0.26*sh.k*fl)*g); ctx.fill();
    if (z > 0.3) { ctx.strokeStyle = 'rgba(255,255,255,.42)'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 3]); seg(q.sx, q.sy, sh.sx, sh.sy); ctx.setLineDash([]); }
  }
  const across = b.vx*cam.r.x + b.vy*cam.r.y, along = b.vx*cam.u.x + b.vy*cam.u.y, tum = b.tumble != null ? b.tumble : null;
  const rx = Math.max(6, 0.24*q.k), len = tum == null ? 1 : 0.62 + 0.38*Math.abs(Math.cos(tum));
  let ang = hyp(across, along) > 0.5 ? Math.atan2(-along*bvFlat(cam, q.z) - (b.vz || 0)*0.6, across) : 0;
  if (tum != null) ang += tum*0.5;
  ctx.save(); ctx.translate(q.sx, q.sy); ctx.rotate(ang);
  ctx.fillStyle = '#fbf8ef'; ctx.strokeStyle = '#3b2f22'; ctx.lineWidth = 1.5;
  ellipse(0, 0, rx*len, rx*0.64); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = 'rgba(200,50,30,.8)'; ctx.lineWidth = Math.max(1, rx*0.14); ctx.beginPath(); ctx.moveTo(-rx*0.5*len, 0); ctx.lineTo(rx*0.5*len, 0); ctx.stroke();
  ctx.restore();
}

/* ---------- the men ---------- */
function dvFace(cam, p, s, clip, frame, at) {               // a Training Ground picture for this man, turned towards at. Eight-way clips flip to whichever side the thing is on
  const dx = at.x - s.wx, dy = at.y - s.wy, m = hyp(dx, dy) || 1, fu = (dx*cam.u.x + dy*cam.u.y)/m, fr = (dx*cam.r.x + dy*cam.r.y)/m, d8 = artFacing(s, fu, fr);
  return artSprite(clip, frame, d8, false, lookOf(p));
}
function dvPose(cam, p, s) { const d = DV_DRAW[practice.id]; return d && d.pose ? d.pose(cam, p, s) : null; }
function dvPropList(cam) {                                  // this game's props, far to near: the order never changes, because the lens doesn't turn
  const d = DV_DRAW[practice.id];
  if (!d || !d.props) return [];
  if (!practice.dvProps) practice.dvProps = d.props().sort((a, b) => (b[1]*cam.u.x + b[2]*cam.u.y) - (a[1]*cam.u.x + a[2]*cam.u.y));
  return practice.dvProps;
}
function dvMen(cam, ctrl, dt) {                             // far to near, the props among them
  const d = DV_DRAW[practice.id] || {}, list = dvPropList(cam);
  if (d.tick) d.tick();
  let n = 0;
  const propsTo = z => { while (n < list.length) { const it = list[n], pz = (it[1] - cam.Cx)*cam.u.x + (it[2] - cam.Cy)*cam.u.y; if (pz < z) break; dvProp(cam, it[0], it[1], it[2]); n++; } };
  for (const p of BV.order) {
    propsTo(bvMan(p).z);
    if (d.under) d.under(cam, p);
    drawManBehind(cam, p, ctrl);
    if (d.over) d.over(cam, p);
  }
  propsTo(-1e9);
}
function dvManAt(x, y, k, p, clip, frame, d8, flip, ang) {  // a rendered man on a close-up, in the art's own drawing, feet at x, y. False when the art isn't in: the close-up draws its code-drawn man instead
  if (!artReady() || !p) return false;
  return !!artDraw({ sx:x, sy:y }, p, bvMan(p), k/DV_SQUASH, 1, ang || 0, artSprite(clip, frame, d8, !!flip, lookOf(p)), true);
}
const DV_BALL = 0.8;                                        // a close-up's ball, for cutBall: a real one's size beside a man
const DV_SQUASH = 0.91;                                     // the art looks down at the Mid camera's tilt, so a man stands this much shorter on the sheet than his height: a close-up takes it back, so its height bands stay true
function dvHeld(x, y, k, p) {                               // the ball in the hands of the picture just drawn by dvManAt, as the art holds it
  const pose = ART_OUT, q = (k/DV_SQUASH)/ART.man.px, m = pose.mirror ? -1 : 1, look = lookOf(p);
  if (pose.row.length <= 12) return false;
  cutBall(x + m*pose.row[12]*q*look.b/ART.man.builds[pose.build], y + pose.row[13]*q, k*DV_BALL, pose.deg === 90 ? 0.2*m : pose.deg === 0 || pose.deg === 180 ? 1.25 : 0.7*m);
  return true;
}
function dvKicker(it, g, P, tf) {                           // Kicking: the rendered kicker, from behind. The run-up, the plant, the strike and the follow-through
  const p = g.kicker || M.players[0];
  let clip = 'idle', frame = 0;
  if (tf >= 0) { if (tf < 0.45) { clip = 'kick'; frame = tf < 0.06 ? 1 : 2; } }
  else if (P.leg > 0.5) { clip = 'kick'; frame = 1; }
  else if (P.leg > 0) { clip = 'kick'; frame = 0; }
  else if (P.stride > 0) { clip = 'run'; frame = Math.floor(P.stride/1.6) & 7; }
  else if (P.held) { clip = 'carryidle'; }
  return dvManAt(it.sx, it.sy, it.k, p, clip, frame, 0);
}
function dvScrumMan(team, i, x, y, s, f, t, engaged) {      // Driving: a rendered pack, side on. Down and ready, then low with the head and shoulders up, driving off each foot in turn
  const row = M.players.filter(p => p.team === team), p = row[i];
  return dvManAt(x, y, s, p, 'bind', !engaged ? 0 : 1 + (Math.floor(t*(5 + i)) & 1), f > 0 ? 2 : 6);
}
function dvKickField(cam, g, hz, W, H, tilt) {              // the goal-kick close-up on the training field: daylight, the mown grass and one chalk line to the posts. No stands and no touch judges
  if (hz > 0) ctx.drawImage(dvSky(Math.max(20, hz + tilt + 8)), 0, -tilt - 8, W, Math.max(20, hz + tilt + 8));
  ctx.fillStyle = DV_GRASS[0]; ctx.fillRect(0, hz, W, H - hz + tilt + 8);
  for (let x = 40; x < 130; x += 6) groundPoly(cam, [x, -60, x + 3, -60, x + 3, 130, x, 130], 0, DV_GRASS[1]);   // mown across the line of the kick
  ctx.strokeStyle = C.line;
  groundLine(cam, 110, 5, 110, 65, false);
  groundLine(cam, g.x - 0.25, g.y, g.x + 0.25, g.y, false); groundLine(cam, g.x, g.y - 0.25, g.x, g.y + 0.25, false);   // the mark
}
function dvTee(cam, g) { const q = pr(cam, g.x, g.y, 0); if (q && q.z >= 0.8) dvPropAt('tee', q.sx, q.sy, q.k*1.5); }
function render(dt) {
  if (!M) return;
  const d = V.dpr;
  const along = V.W, across = V.H;
  V.s = Math.min(along/54, across/36)*(practice && practice.zoom ? practice.zoom : 1);   // a training space may come in closer
  const s = V.s, b = M.ball, cam = M.cam;
  let tx = b.x, ty = b.y;
  if (b.state === 'held') tx += dirOf(b.carrier.team)*7;
  if (practice && practice.cam) { tx = practice.cam.x; ty = practice.cam.y; }   // a training space holds its camera still
  const k = Math.min(1, dt*3.2);
  cam.x += (tx-cam.x)*k; cam.y += (ty-cam.y)*k;
  const ha = along/2/s, hc = across/2/s;
  cam.x = ha*2 >= 132 ? 60 : clamp(cam.x, ha-6, 126-ha);
  cam.y = hc*2 >= 82 ? 35 : clamp(cam.y, hc-6, 76-hc);
  M.rt += dt;
  for (const p of M.players) { if (p.drawFrom && (p.drawFrom.t -= dt) <= 0) p.drawFrom = null; if (p.fend > 0) p.fend -= dt; }   // render-only clocks
  const shake = M.shake > 0 && !RM ? 3*(M.shakeT/0.12)*(M.shake/M.shakeT) : 0;   // your Big Hit: a 3px shake for 0.12s (an arcade one bigger and longer), none under reduced motion
  if (M.shake > 0) M.shake -= dt;
  const camX = cam.x + shake*Math.sin(M.rt*173)/s, camY = cam.y + shake*Math.cos(M.rt*131)/s;
  bvRelease();
  if ((BV.on = behindOn() || dvOn() || menuDemo())) return renderBehind(dt);
  if (!BV.M && playing() && (ART.state === 'ready' || ART.state === 'loading')) artFree();   // played without the art, and no behind match to come back to: a flip to Top and back in one match keeps it

  ctx.setTransform(d*s, 0, 0, d*s, d*(V.W/2 - s*camX), d*(V.H/2 - s*camY));
  drawPitch();

  ctx.setTransform(d, 0, 0, d, 0, 0);
  const r = Math.max(8, 0.95*s);
  const ctrls = [0, 1].map(t => (isHuman(t) ? ctrlOf(t) : null));   // the man under each human's ring
  for (const t of [0, 1]) if (ctrls[t]) {
    const [cx, cy] = toS(ctrls[t].x, ctrls[t].y);
    ctx.strokeStyle = ringCol(t); ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(cx, cy, r*1.55, 0, 7); ctx.stroke();
  }
  const order = M.players.slice().sort((a, c) => toS(a.x, a.y)[1] - toS(c.x, c.y)[1]);
  for (const p of order) drawPlayer(p, r);
  if (M.career && !M.cut) careerMark(r);                   // a career match: the star on your player's back, or an arrow to him
  // A short cue only where a decision matters; free pass targets keep just their ring.
  // Suppress edge cues rather than detach a label from an off-screen player or cover the scorebug.
  const targetCue = (q, text, colour) => {
    const [x, y] = toS(q.x, q.y), cy = y - r*1.6 - 13;
    if (x < 24 || x > V.W - 24 || cy < 83 || y > V.H - 20) return;
    ctx.save();
    ctx.font = `700 11px 'Atkinson Hyperlegible', sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const measured = ctx.measureText(text), w = ((measured && measured.width) || text.length*6) + 12;
    const cx = clamp(x, w/2 + 8, V.W - w/2 - 8);
    ctx.fillStyle = 'rgba(8,14,10,.9)'; rrect(cx - w/2, cy - 9, w, 18, 4); ctx.fill();
    ctx.fillStyle = colour; ctx.fillText(text, cx, cy);
    ctx.restore();
  };
  // pass target, for the human holding the ball. Held in a tackle, the ring sits on the man an Offload would go to. While a long pass charges it turns gold, with a faint ring on the man it skips.
  // White is a free man. The ring tints when a defender is on him; a long pass keeps its gold and draws the tint inside it.
  for (const t of [0, 1]) {
    const ctrl = ctrls[t];
    if (!(ctrl && M.phase === 'play' && b.state === 'held' && b.carrier === ctrl)) continue;
    const shown = ctrl.bind ? { to:offloadTarget(ctrl.bind), skip:null, gold:false, marked:false } : shownPass(ctrl);
    if (ctrl.bind) shown.marked = !!(shown.to && pressure(shown.to) < SUPPORT.mark);
    const ringAt = (q, style, width, rad, dash) => {
      const [qx, qy] = toS(q.x, q.y);
      ctx.strokeStyle = style; ctx.lineWidth = width; ctx.setLineDash(dash);
      ctx.beginPath(); ctx.arc(qx, qy, rad, 0, 7); ctx.stroke(); ctx.setLineDash([]);
    };
    if (shown.skip && shown.skip !== shown.to) ringAt(shown.skip, 'rgba(244,241,232,.38)', 1.5, r*1.2, [3, 4]);
    if (shown.to) {
      if (shown.gold) ringAt(shown.to, ringCol(t), 2.5, r*1.6, [4, 3]);
      else ringAt(shown.to, shown.marked ? SUPPORT.tint : 'rgba(244,241,232,.95)', shown.marked ? 2.5 : 2, r*1.6, [4, 3]);
      if (shown.gold && shown.marked) ringAt(shown.to, SUPPORT.tint, 2, r*1.15, []);
      if (shown.marked) targetCue(shown.to, 'Marked', '#f1eee4');
    }
  }
  // switch target, for a human without the ball: the dashed ring is the man Switch would take, drawn before the press
  for (const t of [0, 1]) {
    const ctrl = ctrls[t];
    if (!(ctrl && M.phase === 'play' && !ourBall(t))) continue;
    const q = switchTarget(t);
    if (!q) continue;
    const [qx, qy] = toS(q.x, q.y);
    ctx.strokeStyle = ringCol(t); ctx.lineWidth = 2; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.arc(qx, qy, r*1.45, 0, 7); ctx.stroke(); ctx.setLineDash([]);
    if (switchUseful(t)) targetCue(q, 'Switch', ringCol(t));
  }
  // kick aim, for each side charging a kick, in its own direction
  for (const t of [0, 1]) {
    const ctrl = ctrls[t], S = sideOf(t);
    if (!(S.charging && ctrl && b.carrier === ctrl)) continue;
    const n = M.career ? careerNatOf(ctrl) : M.nat[t], len = 10 + S.charge*(36 + n.kicking*3), ang = clamp(inputOf(t).world().y, -1.2, 1.2)*0.75;
    const [lx, ly] = toS(ctrl.x + dirOf(t)*len*Math.cos(ang), ctrl.y + len*Math.sin(ang));
    ctx.strokeStyle = ringCol(t); ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(lx-7, ly-7); ctx.lineTo(lx+7, ly+7); ctx.moveTo(lx+7, ly-7); ctx.lineTo(lx-7, ly+7); ctx.stroke();
    ctx.beginPath(); ctx.arc(lx, ly, 13, 0, 7); ctx.stroke();
  }
  drawBall(r);
  drawTags(dt, r);
  for (const t of [0, 1]) if (ctrls[t]) {
    let [cx, cy] = toS(ctrls[t].x, ctrls[t].y);
    const off = cx < 0 || cx > V.W || cy < 0 || cy > V.H;
    cx = clamp(cx, 18, V.W-18); cy = clamp(cy, 18 + r*2.4, V.H-18);
    ctx.fillStyle = ringCol(t);
    if (M.two) { drawSeatMark(t, cx, cy, r, off); continue; }
    if (off) { ctx.beginPath(); ctx.arc(cx, cy, 7, 0, 7); ctx.fill(); }
    else { ctx.beginPath(); ctx.moveTo(cx-6, cy-r*2.4); ctx.lineTo(cx+6, cy-r*2.4); ctx.lineTo(cx, cy-r*1.75); ctx.closePath(); ctx.fill(); }
  }
  const g = ctx.createRadialGradient(V.W/2, V.H/2, Math.min(V.W, V.H)*0.35, V.W/2, V.H/2, Math.max(V.W, V.H)*0.75);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.42)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, V.W, V.H);
  if (M.cut) drawCut();
}
/* two player: the stick and the three buttons are off (they are seat 0's touch controls), so each player's marks are on the pitch: a
   numbered tag in his colour over his man where the pointer sits in one player, the Sprint meter as an arc round his ring (the button's
   ring in one player, dim exactly when a press would do nothing), and under him the word the button would read when it matters now */
const TAG_INK = ['#1c1500', '#2a0a22'];
function drawSeatMark(t, cx, cy, r, off) {
  const col = ringCol(t), s = seatOfTeam(t);
  ctx.fillStyle = col;
  if (off) { ctx.beginPath(); ctx.arc(cx, cy, 7, 0, 7); ctx.fill(); return; }
  const w = 18, h = 16, y0 = cy - r*2.4 - h;
  rrect(cx - w/2, y0, w, h, 3); ctx.fill();
  ctx.beginPath(); ctx.moveTo(cx-5, y0 + h); ctx.lineTo(cx+5, y0 + h); ctx.lineTo(cx, y0 + h + 6); ctx.closePath(); ctx.fill();
  ctx.fillStyle = TAG_INK[s]; ctx.font = `900 13px 'Big Shoulders Display', Impact, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(String(s + 1), cx, y0 + h/2 + 0.5);
  const S = M.spr[t], on = !M.cut && sprintOn(t), a0 = ctx.globalAlpha;
  ctx.globalAlpha = a0*(on ? 0.95 : 0.35); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.lineCap = 'butt';
  ctx.beginPath(); ctx.arc(cx, cy, r*1.55 + 5, -Math.PI/2, -Math.PI/2 + Math.PI*2*clamp(S.m, 0, 1)); ctx.stroke();
  ctx.globalAlpha = a0;
  const cue = cueOf(t);
  if (cue) {
    const text = (cue === 'Long' ? cue : seatKey(s, cue === 'Drop Goal' || cue === 'Switch' ? 'b' : 'a') + ' · ' + cue).toUpperCase(), y = cy + r*2.1;   // the key, then the word: F · OFFLOAD, G · DROP GOAL, G · SWITCH, / · TACKLE
    ctx.font = `800 12px 'Big Shoulders Display', Impact, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const m = ctx.measureText(text), tw = ((m && m.width) || text.length*6.5) + 12;
    ctx.fillStyle = 'rgba(8,14,10,.82)'; rrect(cx - tw/2, y - 9, tw, 18, 4); ctx.fill();
    ctx.fillStyle = col; ctx.fillText(text, cx, y);
  }
}
function cueOf(t) {                                        // the word the big or small button would read for side t when a press matters now (the tests read it too)
  if (!M || M.phase !== 'play' || M.cut) return null;
  const c = ctrlOf(t); if (!c) return null;
  const b = M.ball, k = M.contact;
  if (ourBall(t)) {
    if (b.state !== 'held' || b.carrier !== c) return null;
    if (c.bind) return k && k.c === c && canOffload(k) ? 'Offload' : null;
    const p = sideOf(t).pass;
    if (p && p.mode === 'hold' && p.t >= LONG.arm && passAim(c, inputOf(t).world().y).far) return 'Long';
    return kickLabel(t) === 'Drop Goal' ? 'Drop Goal' : null;
  }
  if (switchUseful(t)) return 'Switch';                  // the chase, when your man is behind and a teammate can still meet the ball. It outranks Tackle: the pulse is the thing to read
  return canDive(c) ? 'Tackle' : null;
}

/* =========================================================
   Sound: every effect is built here from layers of Web Audio oscillators and filtered noise, with
   no samples and nothing to download. It starts after a tap.

   A sound is a voice: a small graph with its own gain, built by a recipe in SND, and gone when its
   time is up. Every voice runs into one bus (a low cut for what a phone speaker cannot play, a top
   cut, a limiter, a trim and a hard ceiling), so nothing can clip however many play at once.
   Variation is Math.random, and only once a real context is running: the game's rnd() is never
   used, and headless runs, Sound Off and a page with no audio draw nothing at all.
   The sound test page loads this very file; soundRender draws a recipe silently so it can be measured.
   ========================================================= */
const SOUND = {
  highpass:75, lowpass:11000,                                // the bus: a phone cannot play under the first, and over the second is only hiss
  limiter:{ threshold:-12, knee:6, ratio:12, attack:0.003, release:0.16 },
  trim:0.62,                                                 // takes back the make-up gain a compressor adds by itself. Every level below sits under this
  ceiling:[0.62, 0.89],                                      // the curve after it: straight up to the first, bending so nothing passes the second
  maxNodes:120, maxVoices:14, reserve:24,                    // live nodes the voices may hold (the bus's six are not counted), and room kept for the largest recipe
  level:{ whistle:1, long:1, horn:0.55, kick:1.2, strike:1.2, post:1.25, pass:2, catch:0.9, fumble:0.45, bounce:1, tackle:0.72, hit:1.35, whiff:1.25, trip:1.5, whoosh:0.6, tick:6.5, tap:1.7, roar:0.6, cheer:0.55, groan:0.58 },   // one number a sound: what the ears ask for goes here
  wakeTries:3, wakeGap:0.4, pendAge:0.25,                    // taps a stuck context gets before it is rebuilt (iOS can leave one stuck), their spacing, and how stale a held sound may be
  bed:{ peak:1, fadeIn:1.6, fadeOut:0.35 },
  // the fewest seconds between two of the same sound: past this they only pile up. Unlisted: 0.03
  gap:{ roar:0.9, cheer:0.6, groan:0.6, long:0.5, horn:0.5, whistle:0.12, post:0.1, tick:0.05, tap:0.04, catch:0.05, bounce:0.05, pass:0.04 },
  // which sound gives way when there are too many: the lowest first, then the oldest. A voice is never cut for a lesser one
  rank:{ whistle:3, long:3, horn:3, roar:2, cheer:2, groan:2, strike:2, post:2, hit:2, kick:2, tackle:2 },
};
// the key every sfx() call uses, and the name on the sound test page, in the page's order
const SOUND_NAMES = {
  whistle:'Pea Whistle', long:'Long Whistle', horn:'Horn', kick:'Kick', strike:'Goal Strike', post:'Post Clang',
  pass:'Pass', catch:'Catch', fumble:'Fumble', bounce:'Ball Bounce', tackle:'Tackle', hit:'Big Hit', whiff:'Whiff', trip:'Trip', whoosh:'Whoosh',
  tick:'Tick', tap:'Menu Tap', roar:'Crowd Roar', cheer:'Cheer', groan:'Groan',
};
let AC = null, NOISE = null, PINK = null, BUS = null, BED = null, soundUnlocked = false, soundWakes = 0, soundWakeAt = -1;
const VOICES = [], soundPend = [], soundLast = {};

/* ---------- the parts every recipe is made of ---------- */
const sndVary = (x, pct) => x*(1 + (Math.random()*2 - 1)*pct);
function sndNoiseMake(a) {                                   // two and a half seconds of white and of pink (warmer: the crowd), made once and looped from a random point
  if (NOISE) return;
  const n = Math.floor(a.sampleRate*2.5), w = a.createBuffer(1, n, a.sampleRate), p = a.createBuffer(1, n, a.sampleRate), wd = w.getChannelData(0), pd = p.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < n; i++) {
    const x = Math.random()*2 - 1;
    wd[i] = x; b0 = 0.99765*b0 + x*0.0990460; b1 = 0.96300*b1 + x*0.2965164; b2 = 0.57000*b2 + x*1.0526913;
    pd[i] = (b0 + b1 + b2 + x*0.1848)*0.2;
  }
  NOISE = w; PINK = p;
}
function sndCeiling() {                                      // straight to the knee, then a bend to the ceiling. An odd length, so silence stays exactly silence
  const [k, c] = SOUND.ceiling, n = 2049, out = new Float32Array(n);
  for (let i = 0; i < n; i++) { const x = i/(n - 1)*2 - 1, m = Math.abs(x); out[i] = Math.sign(x)*(m <= k ? m : k + (c - k)*Math.tanh((m - k)/(c - k))); }
  return out;
}
function sndBus(a) {
  const input = a.createGain(), hp = a.createBiquadFilter(), lp = a.createBiquadFilter(), lim = a.createDynamicsCompressor(), trim = a.createGain(), top = a.createWaveShaper(), L = SOUND.limiter;
  hp.type = 'highpass'; hp.frequency.value = SOUND.highpass; hp.Q.value = 0.5;
  lp.type = 'lowpass'; lp.frequency.value = SOUND.lowpass; lp.Q.value = 0.5;
  lim.threshold.value = L.threshold; lim.knee.value = L.knee; lim.ratio.value = L.ratio; lim.attack.value = L.attack; lim.release.value = L.release;
  trim.gain.value = SOUND.trim; top.curve = sndCeiling();
  input.connect(hp); hp.connect(lp); lp.connect(lim); lim.connect(trim); trim.connect(top); top.connect(a.destination);
  return { input };
}
function sndVoice(a, into, key) {
  const out = a.createGain(), t = a.currentTime + 0.002;
  out.gain.value = (SOUND.level[key] == null ? 1 : SOUND.level[key])*sndVary(1, 0.06); out.connect(into);
  return { a, t, key, out, nodes:[out], srcs:[], end:t, rank:SOUND.rank[key] || 1, born:t };
}
const sndAdd = (V, node) => { V.nodes.push(node); return node; };
function sndRun(V, src, t0, t1, offset) {                    // a source starts and stops on time, and the voice lasts as long as its last one
  if (offset == null) src.start(t0); else src.start(t0, offset);
  src.stop(t1 + 0.02); V.srcs.push(src); V.end = Math.max(V.end, t1 + 0.03);
}
function sndEnv(p, t0, peak, att, dur) {                     // up fast, then the long fall a struck thing makes: 60 dB down by the end of dur
  const top = Math.max(peak, 0.0002);
  p.setValueAtTime(top*0.001, t0); p.linearRampToValueAtTime(top, t0 + att); p.exponentialRampToValueAtTime(top*0.001, t0 + Math.max(dur, att + 0.004));
}
function sndCurve(p, t0, pts, scale) {                       // [seconds, level] by straight lines, and an exponential fall into the last: a swell
  p.setValueAtTime(Math.max(0.0001, pts[0][1]*scale), t0 + pts[0][0]);
  pts.slice(1).forEach(([s, v], i) => { const at = t0 + s, x = Math.max(0.0001, v*scale); if (i === pts.length - 2) p.exponentialRampToValueAtTime(x, at); else p.linearRampToValueAtTime(x, at); });
}
// { type, f, to, glide, at, dur, peak, att, det, dest, curve } one oscillator through its own gain
function sndTone(V, o) {
  const a = V.a, t0 = V.t + (o.at || 0), osc = sndAdd(V, a.createOscillator()), g = sndAdd(V, a.createGain());
  osc.type = o.type || 'sine'; osc.frequency.setValueAtTime(o.f, t0);
  if (o.to) osc.frequency.exponentialRampToValueAtTime(o.to, t0 + (o.glide || o.dur));
  if (o.det) osc.detune.value = o.det;
  if (o.curve) sndCurve(g.gain, t0, o.curve, o.peak); else sndEnv(g.gain, t0, o.peak, o.att || 0.004, o.dur);
  osc.connect(g); g.connect(o.dest || V.out);
  sndRun(V, osc, t0, t0 + o.dur);
  return osc;
}
// { white, kind, f, to, q, at, dur, peak, att, dest, curve } noise through one filter and its own gain
function sndBurst(V, o) {
  const a = V.a, t0 = V.t + (o.at || 0), src = sndAdd(V, a.createBufferSource()), f = sndAdd(V, a.createBiquadFilter()), g = sndAdd(V, a.createGain());
  src.buffer = o.white ? NOISE : PINK; src.loop = true;
  f.type = o.kind || 'bandpass'; f.frequency.setValueAtTime(o.f, t0); f.Q.value = o.q || 0.7;
  if (o.to) f.frequency.exponentialRampToValueAtTime(o.to, t0 + (o.glide || o.dur));
  if (o.curve) sndCurve(g.gain, t0, o.curve, o.peak); else sndEnv(g.gain, t0, o.peak, o.att || 0.002, o.dur);
  src.connect(f); f.connect(g); g.connect(o.dest || V.out);
  sndRun(V, src, t0, t0 + o.dur, Math.random()*2);
}
function sndFilter(V, kind, f, q, dest) { const n = sndAdd(V, V.a.createBiquadFilter()); n.type = kind; n.frequency.value = f; n.Q.value = q; n.connect(dest || V.out); return n; }
function sndLfo(V, type, rate, depth, into, t1) {            // a slow oscillator moving a parameter
  const l = sndAdd(V, V.a.createOscillator()), g = sndAdd(V, V.a.createGain());
  l.type = type; l.frequency.value = rate; g.gain.value = depth; l.connect(g); g.connect(into);
  sndRun(V, l, V.t, t1);
  return l;
}

/* A pea whistle: a tone near 2.8 kHz, with the pea rattling its pitch and level together about 36 times a second, and the breath behind it.
   blasts: [start, length] in seconds. The rattle speeds up as the blast goes, and differs each time. */
function sndPea(V, blasts, level) {
  const a = V.a, t = V.t, f0 = sndVary(2800, 0.03), [lastAt, lastLen] = blasts[blasts.length - 1], t1 = t + lastAt + lastLen;
  const env = sndAdd(V, a.createGain()), body = sndAdd(V, a.createGain()), tone = sndAdd(V, a.createOscillator()), over = sndAdd(V, a.createOscillator()), overG = sndAdd(V, a.createGain());
  body.gain.value = 0.68; body.connect(env); env.connect(V.out);
  tone.type = 'sine'; over.type = 'sine'; over.frequency.value = f0*2.01; overG.gain.value = 0.1;
  tone.connect(body); over.connect(overG); overG.connect(body);
  env.gain.setValueAtTime(0.0001, t);
  tone.frequency.setValueAtTime(f0, t);
  const pea = sndLfo(V, 'triangle', 36, f0*0.042, tone.frequency, t1);
  const am = sndAdd(V, a.createGain()); am.gain.value = 0.32; pea.connect(am); am.connect(body.gain);
  for (const [at, len] of blasts) {
    const s = t + at, e = s + len;
    env.gain.setValueAtTime(0.0001, s); env.gain.linearRampToValueAtTime(level, s + 0.014); env.gain.linearRampToValueAtTime(level*0.86, e - 0.045); env.gain.exponentialRampToValueAtTime(0.0001, e);
    tone.frequency.setValueAtTime(f0*0.94, s); tone.frequency.exponentialRampToValueAtTime(f0, s + 0.03);   // the note scoops up as the breath arrives
    tone.frequency.setValueAtTime(f0, e - 0.05); tone.frequency.exponentialRampToValueAtTime(f0*0.965, e);  // and sags as it goes
    pea.frequency.setValueAtTime(sndVary(33, 0.1), s); pea.frequency.linearRampToValueAtTime(sndVary(42, 0.1), e);
  }
  sndRun(V, tone, t, t1); sndRun(V, over, t, t1);
  // the breath: noise on the same note, through the same envelope
  const br = sndAdd(V, a.createBufferSource()), brF = sndAdd(V, a.createBiquadFilter()), brG = sndAdd(V, a.createGain());
  br.buffer = NOISE; br.loop = true; brF.type = 'bandpass'; brF.frequency.value = f0; brF.Q.value = 3; brG.gain.value = 0.55;
  br.connect(brF); brF.connect(brG); brG.connect(body);
  sndRun(V, br, t, t1, Math.random()*2);
}
/* A crowd: three bands of pink noise and a few low voices through one formant, all under one swell, wavering so it never sits still.
   o: { curve, peak, bands:[[f, to, q, level]], voices:[f, to], formant:[f, to, q], voice, wobble:[rate, depth] } */
function sndCrowd(V, o) {
  const a = V.a, T = o.curve[o.curve.length - 1][0], t1 = V.t + T;
  const swell = sndAdd(V, a.createGain()), waver = sndAdd(V, a.createGain());
  waver.gain.value = 1; waver.connect(swell); swell.connect(V.out);
  sndCurve(swell.gain, V.t, o.curve.map(([s, v], i) => [i && i < o.curve.length - 1 ? s*sndVary(1, 0.06) : s, v]), o.peak);
  sndLfo(V, 'sine', sndVary(o.wobble[0], 0.2), o.wobble[1], waver.gain, t1);
  for (const [f, to, q, level] of o.bands) sndBurst(V, { f:sndVary(f, 0.06), to:to && sndVary(to, 0.06), q, at:0, dur:T, peak:level, att:0.02, dest:waver,
    curve:[[0, 1], [T*0.97, 1], [T, 0.01]] });
  if (o.voices) {
    const form = sndFilter(V, 'bandpass', o.formant[0], o.formant[2], waver);
    form.frequency.setValueAtTime(o.formant[0], V.t); form.frequency.exponentialRampToValueAtTime(o.formant[1], t1);
    const f0 = sndVary(1, 0.05);
    [0.92, 1, 1.09].forEach((m, i) => sndTone(V, { type:'sawtooth', f:o.voices[0]*f0*m, to:o.voices[1]*f0*m, dur:T, peak:o.voice, det:(i - 1)*9, dest:form, curve:[[0, 1], [T*0.97, 1], [T, 0.01]] }));
  }
}
function sndPat(V, at, f, peak) {                            // leather on a hand
  sndTone(V, { f, to:f*0.56, at, dur:0.055, peak });
  sndBurst(V, { white:true, f:1300, q:1.1, at, dur:0.028, peak:peak*0.42 });
}

/* ---------- the recipes. V is the voice, amt how hard (only the bounce uses it) ---------- */
const SND = {
  whistle(V) { sndPea(V, [[0, sndVary(0.3, 0.1)]], 0.13); },
  long(V) { sndPea(V, [[0, 0.17], [0.25, 0.17], [0.5, sndVary(1.05, 0.05)]], 0.13); },
  horn(V) {                                                  // a stadium hooter: two detuned reeds and a fifth, opening up as it sounds
    const f = sndVary(185, 0.02), T = sndVary(1, 0.04), form = sndFilter(V, 'lowpass', 600, 0.9), curve = [[0, 0], [0.07, 1], [T*0.82, 0.86], [T, 0.01]];
    form.frequency.setValueAtTime(600, V.t); form.frequency.exponentialRampToValueAtTime(1500, V.t + 0.14);
    sndTone(V, { type:'sawtooth', f:f*0.97, to:f, glide:0.08, dur:T, peak:0.15, curve, dest:form });
    sndTone(V, { type:'sawtooth', f:f*0.97, to:f, glide:0.08, dur:T, peak:0.15, det:7, curve, dest:form });
    sndTone(V, { type:'sawtooth', f:f*1.455, to:f*1.5, glide:0.08, dur:T, peak:0.09, det:-5, curve, dest:form });
  },
  kick(V) {                                                  // the boot's thump, a knock a small speaker can play, the leather's slap, and air as it leaves
    sndTone(V, { f:sndVary(135, 0.08), to:52, dur:0.16, peak:0.55 });
    sndTone(V, { type:'triangle', f:sndVary(340, 0.08), to:170, dur:0.06, peak:0.5 });
    sndBurst(V, { white:true, f:sndVary(2300, 0.1), q:1.1, dur:0.035, peak:0.32, att:0.001 });
    sndBurst(V, { white:true, f:1400, to:2600, q:0.9, at:0.02, dur:0.16, att:0.02, peak:0.05 });
  },
  strike(V) {                                                // the same with more of everything, and a longer flight away
    sndTone(V, { f:sndVary(115, 0.06), to:44, dur:0.17, peak:0.58 });
    sndTone(V, { type:'triangle', f:sndVary(285, 0.06), to:140, dur:0.08, peak:0.6 });
    sndBurst(V, { white:true, f:sndVary(1900, 0.1), q:0.9, dur:0.05, peak:0.5, att:0.001 });
    sndTone(V, { f:sndVary(720, 0.05), to:640, dur:0.09, peak:0.05 });
    sndBurst(V, { white:true, f:1100, to:2800, q:0.8, at:0.02, dur:0.34, att:0.03, peak:0.07 });
  },
  post(V) {                                                  // a ball's dull thud, then a metal tube ringing: partials that do not line up, the high ones gone first
    const f = sndVary(830, 0.05);
    sndTone(V, { f:190, to:120, dur:0.07, peak:0.24 });
    sndBurst(V, { white:true, f:2800, q:1, dur:0.012, peak:0.12, att:0.001 });
    [[1, 0.2, 0.75], [1.506, 0.12, 0.55], [2.31, 0.07, 0.32], [3.43, 0.035, 0.18]].forEach(([m, peak, dur]) => sndTone(V, { f:f*m*sndVary(1, 0.004), dur:dur*sndVary(1, 0.08), peak, att:0.002 }));
  },
  pass(V) {                                                  // a swish, and the fingers leaving the ball
    sndBurst(V, { white:true, f:sndVary(900, 0.1), to:sndVary(2100, 0.1), q:1.4, dur:0.09, att:0.025, peak:0.11 });
    sndTone(V, { type:'triangle', f:sndVary(560, 0.1), to:380, dur:0.025, peak:0.07 });
  },
  catch(V) {                                                 // the ball into two hands
    sndPat(V, 0, sndVary(260, 0.1), 0.2);
    sndTone(V, { type:'triangle', f:sndVary(520, 0.1), to:330, dur:0.025, peak:0.07 });
  },
  fumble(V) {                                                // patted once, twice, three times, and on to the grass
    const f = sndVary(320, 0.08), g1 = sndVary(0.08, 0.2), g2 = g1 + sndVary(0.09, 0.2);
    sndPat(V, 0, f, 0.18); sndPat(V, g1, f*0.86, 0.15); sndPat(V, g2, f*1.08, 0.12);
    sndTone(V, { f:150, to:85, at:g2 + 0.12, dur:0.09, peak:0.2 });
    sndBurst(V, { kind:'lowpass', f:1500, at:g2 + 0.12, dur:0.03, peak:0.16 });
  },
  bounce(V, amt) {                                           // a hollow ball on grass: a low note falling, its hollow, and the turf's tick. A smaller hop is softer and a little higher
    const h = 0.45 + 0.55*amt, f = sndVary(165, 0.1)*(1 + (1 - amt)*0.25);
    sndTone(V, { f, to:f*0.58, dur:0.09, peak:0.36*h });
    sndTone(V, { type:'triangle', f:f*2.6, to:f*1.9, dur:0.04, peak:0.17*h });
    sndBurst(V, { kind:'lowpass', f:1800, dur:0.03, peak:0.3*h, att:0.001 });
  },
  tackle(V) {                                                // the body, the chest's air, cloth, and the grass scuffed after
    sndTone(V, { f:sndVary(100, 0.08), to:46, dur:0.13, peak:0.46 });
    sndBurst(V, { f:sndVary(420, 0.1), to:260, q:0.9, dur:0.09, peak:0.85 });
    sndBurst(V, { white:true, f:1700, q:0.8, dur:0.04, peak:0.08 });
    sndBurst(V, { white:true, kind:'highpass', f:2400, to:1100, q:0.5, at:0.035, dur:0.2, att:0.02, peak:0.045 });
  },
  hit(V) {                                                   // a Big Hit: more body, a punch, the grass thrown up, and the crowd's breath in
    sndTone(V, { f:sndVary(82, 0.06), to:36, dur:0.24, peak:0.55 });
    sndTone(V, { type:'triangle', f:sndVary(190, 0.08), to:85, dur:0.09, peak:0.36 });
    sndBurst(V, { kind:'lowpass', f:520, dur:0.22, peak:1 });
    sndBurst(V, { white:true, f:2600, to:1200, q:0.6, at:0.05, dur:0.3, att:0.02, peak:0.09 });
    sndBurst(V, { f:620, to:480, q:2, at:0.06, dur:0.6, att:0.12, peak:0.5 });
  },
  whiff(V) {                                                 // arms through air and nothing there
    sndBurst(V, { white:true, f:sndVary(2100, 0.12), to:650, q:1.6, dur:0.14, att:0.03, peak:0.13 });
    sndBurst(V, { kind:'lowpass', f:600, at:0.05, dur:0.1, att:0.02, peak:0.09 });
  },
  trip(V) {                                                  // a tap on the ankle, a scuff, and a foot coming down
    sndTone(V, { type:'square', f:sndVary(620, 0.08), to:380, dur:0.05, peak:0.24 });   // the part a phone speaker can play: it carries the cue
    sndTone(V, { type:'triangle', f:sndVary(440, 0.1), to:240, dur:0.035, peak:0.15 });
    sndBurst(V, { white:true, f:1500, to:800, q:0.9, at:0.015, dur:0.1, att:0.006, peak:0.1 });
    sndTone(V, { f:150, to:90, at:0.06, dur:0.05, peak:0.13 });
  },
  whoosh(V) {                                                // a body going past
    const T = sndVary(0.26, 0.12);
    sndBurst(V, { white:true, f:650, to:sndVary(1700, 0.15), q:1, dur:T, att:T*0.36, peak:0.1 });
    sndBurst(V, { kind:'lowpass', f:900, dur:T*0.8, att:T*0.3, peak:0.16 });
  },
  tick(V) {                                                  // a small bright click: a cue in play
    const f = sndVary(1480, 0.03);
    sndTone(V, { f, dur:0.04, peak:0.08, att:0.001 });      // long enough to be heard, and it is the only sound for several cues in play
    sndTone(V, { f:f*2, dur:0.016, peak:0.03, att:0.001 });
  },
  tap(V) {                                                   // a round soft press: the menus
    sndTone(V, { f:sndVary(760, 0.03), to:560, dur:0.05, peak:0.075, att:0.002 });
    sndBurst(V, { white:true, f:2400, q:1, dur:0.008, peak:0.018, att:0.001 });
  },
  roar(V) {
    sndCrowd(V, { peak:0.9, wobble:[3.4, 0.14], curve:[[0, 0], [0.18, 0.42], [0.52, 1], [1.25, 0.86], [2.1, 0.46], [3.4, 0.012]],
      bands:[[380, 440, 0.6, 0.62], [950, 1100, 0.6, 0.62], [2100, 2300, 0.9, 0.34]], voices:[238, 300], formant:[780, 980, 1.2], voice:0.05 });
  },
  cheer(V) {
    sndCrowd(V, { peak:0.7, wobble:[4.6, 0.16], curve:[[0, 0], [0.12, 0.6], [0.34, 1], [0.92, 0.68], [2.1, 0.012]],
      bands:[[520, 600, 0.6, 0.38], [1150, 1400, 0.7, 0.62], [2300, 2500, 1.2, 0.36]], voices:[300, 372], formant:[1050, 1300, 1.5], voice:0.05 });
  },
  groan(V) {                                                 // falling: the note and the vowel both drop, from "oh" to "ooh"
    sndCrowd(V, { peak:0.75, wobble:[2.6, 0.1], curve:[[0, 0], [0.18, 1], [0.6, 0.74], [1.8, 0.012]],
      bands:[[420, 250, 1, 0.72], [900, 520, 1.4, 0.32]], voices:[218, 150], formant:[520, 340, 1.8], voice:0.11 });
  },
};

/* ---------- playing them ---------- */
const soundLive = () => VOICES.reduce((n, v) => n + v.nodes.length, 0);
function sndKill(v) {
  for (const s of v.srcs) { try { s.stop(); } catch (e) { /* already stopped */ } }
  for (const n of v.nodes) { try { n.disconnect(); } catch (e) { /* already gone */ } }
  const i = VOICES.indexOf(v); if (i >= 0) VOICES.splice(i, 1);
  if (BED === v) BED = null;
}
function soundSweep() {                                      // a voice whose time is up leaves the graph
  if (!AC) return;
  const now = AC.currentTime;
  for (const v of VOICES.slice()) if (now >= v.end) sndKill(v);
}
function sndRoom(rank) {                                     // room for one more: the lowest and oldest give way. False when only as good or better is left, so the new one is dropped
  const over = () => VOICES.length >= SOUND.maxVoices || soundLive() + SOUND.reserve > SOUND.maxNodes;
  while (over()) {
    let pick = null;
    for (const v of VOICES) if (v !== BED && v.rank <= rank && (!pick || v.rank < pick.rank || (v.rank === pick.rank && v.born < pick.born))) pick = v;
    if (!pick) return false;
    sndKill(pick);
  }
  return true;
}
function sndStart(a, into, k, amt) {                         // the one way a recipe becomes a voice, heard or measured
  const V = sndVoice(a, into, k);
  try { SND[k](V, amt == null ? 1 : Math.max(0, Math.min(1, amt))); } catch (e) { sndKill(V); return null; }   // a sound that fails is a silence, never a stopped game
  return V;
}
function soundPlay(k, amt) {
  if (!SND[k]) return;
  const a = ac(); if (!a || document.hidden) return;
  if (a.state !== 'running') {                               // not awake yet (the first tap is often this): held a moment. Scheduled now, they would all go off together when it wakes
    if (soundPend.length < 4) soundPend.push({ k, amt, at:performance.now() });
    return;
  }
  soundSweep();
  const now = a.currentTime, gap = SOUND.gap[k] == null ? 0.03 : SOUND.gap[k];
  if (soundLast[k] != null && now - soundLast[k] < gap) return;
  if (!sndRoom(SOUND.rank[k] || 1)) return;
  soundLast[k] = now;
  const V = sndStart(a, BUS.input, k, amt);
  if (V) VOICES.push(V);
}
function sndWoke() {                                         // the context is running: what was held plays if it is still fresh
  if (!AC || AC.state !== 'running') return;
  soundWakes = 0;
  const fresh = soundPend.splice(0).filter(p => performance.now() - p.at <= SOUND.pendAge*1000);
  for (const p of fresh) soundPlay(p.k, p.amt);
}
function ac() {
  if (!settings.sound) return null;
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;                                   // the tools run with no audio at all: nothing is built and no random number drawn
    if (!AC || AC.state === 'closed') {
      AC = new Ctx(); BUS = null; soundUnlocked = false;
      for (const k of Object.keys(soundLast)) delete soundLast[k];   // a new context's clock starts again
      AC.onstatechange = sndWoke;
    }
    if (!BUS) { sndNoiseMake(AC); BUS = sndBus(AC); }
    if (AC.state !== 'running') { const p = AC.resume(); if (p && p.then) p.then(sndWoke, () => {}); }
    return AC;
  } catch (e) { return null; }
}
function sfx(k, amt) {
  if (globalThis.__sfxSpy) globalThis.__sfxSpy(k, M && M.cut ? M.cut.t : null);   // the tools count sounds
  if (k !== 'tap' && (!M || M.demo || M.headless)) return;   // a menu tap plays over the demo; nothing else does
  soundPlay(k, amt);
}

/* ---------- the crowd under a match ---------- */
function bedBuild(a, into) {                                 // two slow bands of pink noise, each drifting, far under everything else
  const V = sndVoice(a, into, 'bed'), S = SOUND.bed;
  V.end = Infinity; V.rank = Infinity;
  V.out.gain.setValueAtTime(0.0001, V.t); V.out.gain.linearRampToValueAtTime(S.peak, V.t + S.fadeIn);
  [[620, 0.5, 0.032, 0.13, 1], [1500, 0.7, 0.014, 0.31, 0.83]].forEach(([f, q, level, rate, speed]) => {
    const src = sndAdd(V, a.createBufferSource()), g = sndAdd(V, a.createGain()), flt = sndFilter(V, 'bandpass', sndVary(f, 0.05), q, g);
    src.buffer = PINK; src.loop = true; src.playbackRate.value = speed;
    src.connect(flt); g.connect(V.out); g.gain.value = level;
    src.start(V.t, Math.random()*2); V.srcs.push(src);
    const l = sndAdd(V, a.createOscillator()), lg = sndAdd(V, a.createGain());
    l.frequency.value = sndVary(rate, 0.1); lg.gain.value = level*0.3; l.connect(lg); lg.connect(g.gain);
    l.start(V.t); V.srcs.push(l);
  });
  return V;
}
function bedStop() {                                         // fades, then the sweep takes it
  if (!BED) return;
  const v = BED, now = v.a.currentTime, S = SOUND.bed; BED = null;
  v.out.gain.cancelScheduledValues(now); v.out.gain.setTargetAtTime(0, now, S.fadeOut/4);
  for (const s of v.srcs) { try { s.stop(now + S.fadeOut + 0.05); } catch (e) { /* already stopped */ } }
  v.end = now + S.fadeOut + 0.1; v.rank = 0;
}
function bedSync(want) {                                     // called every frame. Never builds a context by itself, and waits for the tap that wakes one
  const on = !!want && !!settings.sound && !document.hidden && !!AC && AC.state === 'running' && !!BUS;
  if (!on) { if (BED) bedStop(); return; }
  if (!BED) { BED = bedBuild(AC, BUS.input); VOICES.push(BED); }
}
function soundFrame(want) { try { soundSweep(); bedSync(want); } catch (e) { /* the frame goes on */ } }

/* ---------- quiet, hidden, off, and waking up ---------- */
function soundQuiet() {                                      // leaving a match: what is sounding fades in a moment, and the crowd with it
  if (!AC) return;
  bedStop();
  const now = AC.currentTime;
  for (const v of VOICES) {
    if (v.end <= now + 0.14) continue;
    v.out.gain.cancelScheduledValues(now); v.out.gain.setTargetAtTime(0, now, 0.03);
    for (const s of v.srcs) { try { s.stop(now + 0.14); } catch (e) { /* already stopped */ } }
    v.end = now + 0.15;
  }
}
function soundCut() {                                        // everything, at once: nothing may be left waiting in a suspended context
  soundPend.length = 0;
  for (const v of VOICES.slice()) sndKill(v);
  BED = null;
}
function soundHidden() {                                     // a hidden page plays nothing and holds nothing
  soundCut();
  if (AC && AC.state === 'running') { const p = AC.suspend(); if (p && p.catch) p.catch(() => {}); }
}
function soundShown() { if (settings.sound && AC && AC.state !== 'running') { const p = AC.resume(); if (p && p.then) p.then(sndWoke, () => {}); } }   // iOS may refuse until the next tap: soundUnlock asks again
function soundOff() { soundCut(); if (AC && AC.state === 'running') { const p = AC.suspend(); if (p && p.catch) p.catch(() => {}); } }   // Sound Off: silent now, and the phone's audio let go
function soundUnlock() {                                     // every tap and key: iOS only starts or restarts audio inside one
  if (!settings.sound) return;
  const a = ac(); if (!a) return;
  if (!soundUnlocked) {                                      // the first tap plays one silent sample, the old iOS unlock
    try { const s = a.createBufferSource(); s.buffer = a.createBuffer(1, 1, a.sampleRate); s.connect(a.destination); s.start(0); soundUnlocked = true; } catch (e) { /* the next tap tries again */ }
  }
  if (a.state === 'running') { soundWakes = 0; return; }
  const now = performance.now()/1000;                        // one tap fires several events: they count once
  if (now - soundWakeAt < SOUND.wakeGap) return;
  soundWakeAt = now;
  if (++soundWakes >= SOUND.wakeTries) {                     // still asleep after a few taps (a phone call or a long time away can do this): start again with a new context
    soundWakes = 0; soundCut(); AC.onstatechange = null;
    try { const c = AC.close(); if (c && c.catch) c.catch(() => {}); } catch (e) { /* it is going anyway */ }
    AC = null; BUS = null;
    ac();
  }
}
for (const type of ['touchend', 'pointerup', 'mousedown', 'keydown', 'click']) document.addEventListener(type, soundUnlock, { capture:true, passive:true });
document.addEventListener('visibilitychange', () => { if (document.hidden) soundHidden(); else soundShown(); });
window.addEventListener('pagehide', soundHidden);
window.addEventListener('pageshow', soundShown);
// A press on anything in the menus. It listens after the button's own handler, so pressing Sound On is heard and Sound Off is not. The match's three action buttons make their own sounds
document.addEventListener('click', e => {
  const b = e.target && e.target.closest ? e.target.closest('button, summary') : null;
  if (b && !b.classList.contains('act')) sfx('tap');
});

/* ---------- measuring: the same recipes through the same bus, into an OfflineAudioContext ---------- */
function sndMeasure(d, rate) {
  let peak = 0, clipped = 0, first = -1, lastAt = -1;
  const floor = Math.pow(10, -60/20);
  for (let i = 0; i < d.length; i++) { const m = Math.abs(d[i]); if (m > peak) peak = m; if (m >= 1) clipped++; if (m > floor) { if (first < 0) first = i; lastAt = i; } }
  let sum = 0; const n = lastAt >= first && first >= 0 ? lastAt - first + 1 : 0;
  for (let i = first; i <= lastAt && n; i++) sum += d[i]*d[i];
  const rms = n ? Math.sqrt(sum/n) : 0, db = x => (x > 0 ? 20*Math.log10(x) : -Infinity);
  return { peak, peakDb:db(peak), rms, rmsDb:db(rms), length:n/rate, clipped };
}
function soundRender(keys, o = {}) {                         // keys: a key, 'bed', or a list struck together. Resolves to its peak, RMS, length and clipped samples
  const Off = window.OfflineAudioContext || window.webkitOfflineAudioContext, rate = o.rate || 48000, secs = o.secs || 4;
  const a = new Off(1, Math.floor(rate*secs), rate);
  sndNoiseMake(a);
  const bus = sndBus(a);
  for (const k of [].concat(keys)) { if (k === 'bed') bedBuild(a, bus.input); else sndStart(a, bus.input, k, o.amt); }
  return a.startRendering().then(buf => {
    const m = sndMeasure(buf.getChannelData(0), rate);
    if (o.samples) m.samples = buf.getChannelData(0);
    return m;
  });
}
function buzz(ms, team) {                                  // the phone's vibration, and the rumble on a team's seat (every seat when no team is given)
  if (!M || M.demo || M.headless) return;
  if (team == null) { for (const s of [0, 1]) rumble(s, ms); } else rumble(seatOfTeam(team), ms);
  if (!navigator.vibrate) return;
  if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return;
  try { navigator.vibrate(ms); } catch (e) { /* unsupported */ }
}
/* =========================================================
   Input
   One slot a seat. Slot 0 is fed by touch, the keyboard and (in one player) every controller; in two player the keyboard is
   split in halves and a controller feeds the seat that claimed it. A button is a bitmask of the sources holding it (1 the
   keyboard, 2 touch, 4 << index a controller), so an idle pad can never let go of a key you are holding. The tools write
   aDown / aPressed directly, as they always have.
   ========================================================= */
const KEYDIR = { KeyW:[0,-1], ArrowUp:[0,-1], PadUp:[0,-1], KeyS:[0,1], ArrowDown:[0,1], PadDown:[0,1], KeyA:[-1,0], ArrowLeft:[-1,0], PadLeft:[-1,0], KeyD:[1,0], ArrowRight:[1,0], PadRight:[1,0] };
const zone = $('zone'), stick = $('stick'), knob = $('knob');
const STICK_R = 52;
function makeInput(seat) {
  const inp = {
    seat, jx:0, jy:0, aDown:false, bDown:false, cDown:false, aPressed:false, bPressed:false, cPressed:false, aCancel:false, bCancel:false, cCancel:false,
    keys:new Set(), held:new Set(), flick:0, pre:null,
    src:{ a:0, b:0, c:0 }, latch:false, padStick:false,   // which sources hold each button; a pad stick latched until it comes back to centre
    // a duel re-centres the stick under the thumb, so a held run doesn't read as a step; a held pad stick is latched the same way
    reanchor() {
      if (!this.pre) this.pre = { x:this.jx, y:this.jy };
      if (this.seat === 0) { if (this.stickId !== null) { this.ox = this.px; this.oy = this.py; placeStick(this.ox, this.oy); } knob.style.transform = ''; }
      if (this.padStick) this.latch = true;
      this.jx = this.jy = 0;
    },
    // and afterwards the thumb's spot reads as the pre-duel direction, so the run carries on
    restore() {
      const pre = this.pre || { x:0, y:0 };
      if (this.seat === 0 && this.stickId !== null) {
        this.ox = this.px - pre.x*STICK_R; this.oy = this.py - pre.y*STICK_R; placeStick(this.ox, this.oy);
        this.jx = pre.x; this.jy = pre.y; knob.style.transform = `translate(${pre.x*STICK_R}px,${pre.y*STICK_R}px)`;
      } else { this.jx = this.jy = 0; if (this.seat === 0) knob.style.transform = ''; }
      this.flick = 0; this.held.clear(); this.pre = null; this.latch = false; this.gest = null;   // and a gesture begun before the close-up can't finish after it
    },
    // keys win over the stick: any key for a direction counts once, so two keys for the same direction still read 1
    world() {
      let x = this.jx, y = this.jy;
      let px = 0, nx = 0, py = 0, ny = 0;
      for (const code of this.keys) { const d = KEYDIR[code]; if (!d) continue; if (d[0] > 0) px = 1; else if (d[0] < 0) nx = 1; if (d[1] > 0) py = 1; else if (d[1] < 0) ny = 1; }
      const kx = px - nx, ky = py - ny;
      if (kx || ky) { const m = hyp(kx, ky); x = kx/m; y = ky/m; }
      const t = stickTurn(this.seat); if (t) { const sx = x; x = -y*t; y = sx*t; }   // a behind view: up is toward the opposition's line, across is across the screen
      const mag = hyp(x, y);
      return { x, y, mag };
    },
    keyX() {                                               // the keys' sideways intent, ignoring any held into a close-up
      let px = 0, nx = 0;
      for (const code of this.keys) { const d = KEYDIR[code]; if (!d || this.held.has(code)) continue; if (d[0] > 0) px = 1; else if (d[0] < 0) nx = 1; }
      return px - nx;
    },
    sideX() {                                              // a duel chooser's sideways intent, -1 0 1: fresh keys, else the stick when it isn't latched. A key or stick held into the cut-in is never a choice
      const kx = this.keyX();
      return kx || (!this.latch && Math.abs(this.jx) >= 0.5 ? Math.sign(this.jx) : 0);
    },
  };
  if (seat === 0) Object.assign(inp, { stickId:null, ox:0, oy:0, px:0, py:0 });   // the touch stick feeds seat 0 only
  return inp;
}
const inputs = [makeInput(0), makeInput(1)];
const input = inputs[0];
function btn(inp, k, bit, down) {                          // one source's edge on one button: Pressed only on a rise from nothing held, Down while any source holds it
  const was = inp.src[k], now = down ? (was | bit) : (was & ~bit);
  if (now === was) return;
  inp.src[k] = now;
  if (!was) inp[k + 'Pressed'] = true;
  inp[k + 'Down'] = now !== 0;
}
let lastDev = 'touch';
function setDev(d) {                                       // the last device that acted: the on-screen hints follow it
  if (d === lastDev) return;
  lastDev = d;
  const b = document.body;
  if (b) { b.classList.toggle('dev-kb', d === 'kb'); b.classList.toggle('dev-pad', d === 'pad'); }
}
function platesFloor() {                                   // the Step Left | Step Right plates never go under the hints card (a thumb a little high on a phone put them under Flick on Gold): its bottom while it is up, else the clock line
  const hc = $('hc0'), r = hc && !hc.hidden && typeof hc.getBoundingClientRect === 'function' ? hc.getBoundingClientRect() : null;
  return Math.max(0.07*window.innerHeight + 6, r ? r.bottom + 6 : 0);
}
function safeInsets() {                                   // --sal and the rest are the safe-area env()s. No layout (the tools) reads as 0, which is today's placement
  let read = null;
  try { const cs = getComputedStyle(document.documentElement); if (cs && cs.getPropertyValue) read = k => cs.getPropertyValue(k); } catch (e) { /* no layout */ }
  const n = k => { if (!read) return 0; const x = parseFloat(read(k)); return Number.isFinite(x) ? x : 0; };
  return { t:n('--sat'), r:n('--sar'), b:n('--sab'), l:n('--sal') };
}
function stickRest(W, H, ins) {                            // the ring is 124px. Insets 0 stays at (96, H-118). A notch on the left moves it in until the ring is 8px clear, still left of the buttons
  ins = ins || { t:0, r:0, b:0, l:0 };
  const R = 62, edge = 8;
  const x = clamp(Math.max(96, ins.l + R + edge), R + edge, Math.max(R + edge, 0.52*W - R - edge));
  const y = clamp(H - Math.max(118, ins.b + R + edge), 64 + R + edge, Math.max(64 + R + edge, H - R - edge));
  return { x, y };
}
function tagBox(ins) {                                     // where an on-pitch tag may sit. Insets 0 is the old box (top 76, left 60, 200px clear of the right edge)
  ins = ins || safeInsets();
  return { top:Math.max(76, ins.t + 68), left:Math.max(60, ins.l + 8), right:Math.max(20, ins.r) + 180 };
}
function placeStick(x, y) {
  stick.style.left = x + 'px'; stick.style.top = y + 'px';
  const pl = $('plates');
  if (pl) { const top = y - 102, ins = safeInsets(); pl.style.left = clamp(x - 82, Math.max(8, ins.l), window.innerWidth/2 - 172) + 'px'; pl.style.top = (top < platesFloor() ? y + 72 : top) + 'px'; }
}
function restStick() { const p = stickRest(window.innerWidth, window.innerHeight, safeInsets()); placeStick(p.x, p.y); }
zone.addEventListener('pointerdown', e => {
  if (demoOn()) return;                                    // Watch How: the pilot has the stick
  if (M && M.cut && ((M.cut.duel && M.cut.after) || (M.cut.kind === 'goal' && (M.cut.after || M.cut.g.watch)))) input.aPressed = true;   // tap to skip the verdict, or a CPU kick
  setDev('touch');
  if (input.stickId !== null) return;
  e.preventDefault();
  input.stickId = e.pointerId; input.ox = input.px = e.clientX; input.oy = input.py = e.clientY; input.latPeak = null;
  try { zone.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
  placeStick(e.clientX, e.clientY); stick.classList.add('on');
  ac();
});
function notePeak(samples) {                               // the largest sideways deflection in this move, from the origin as it was. The run still follows the last sample
  if (!samples || !samples.length) return;
  let best = input.latPeak || 0;
  for (const p of samples) {
    const dx = p.clientX - input.ox, dy = p.clientY - input.oy, m = hyp(dx, dy);
    if (m < 1e-6) continue;
    const t = stickTurn(0), uy = (t ? dx*t : dy)/m*Math.min(1, m/STICK_R);
    if (Math.abs(uy) > Math.abs(best)) best = uy;
  }
  if (Math.abs(best) >= 0.12) input.latPeak = best;
}
function onStickMove(e) {
  if (e.pointerId !== input.stickId) return;
  if (e.getCoalescedEvents) notePeak(e.getCoalescedEvents());
  input.px = e.clientX; input.py = e.clientY;
  let dx = e.clientX - input.ox, dy = e.clientY - input.oy;
  const m = hyp(dx, dy);
  if (m > STICK_R) {
    const ex = m - STICK_R;
    input.ox += dx/m*ex; input.oy += dy/m*ex; placeStick(input.ox, input.oy);
    dx = dx/m*STICK_R; dy = dy/m*STICK_R;
  }
  input.jx = dx/STICK_R; input.jy = dy/STICK_R; input.padStick = false;
  if (hyp(input.jx, input.jy) < 0.12) { input.jx = 0; input.jy = 0; }
  knob.style.transform = `translate(${dx}px,${dy}px)`;
}
zone.addEventListener('pointermove', onStickMove);
zone.addEventListener('pointerrawupdate', onStickMove);   // Chromium delivers this a frame ahead of pointermove. Where it doesn't exist, nothing calls it
const endStick = e => {
  if (!e || e.pointerId !== input.stickId) return;
  input.stickId = null; input.jx = input.jy = 0; input.gest = null; input.latPeak = null;   // a lifted thumb clears the gesture history
  knob.style.transform = ''; stick.classList.remove('on'); restStick();
};
zone.addEventListener('pointerup', endStick);
zone.addEventListener('pointercancel', endStick);
const ACTS = [['btnA', 'a'], ['btnB', 'b'], ['btnC', 'c']];
const HIT_SLOP = 12;                                       // a miss in the 17px gap between B and Sprint lands within this of one circle
function nearestAct(x, y) {                                // the button whose circle, grown by HIT_SLOP, contains the point and whose centre is nearest. Hidden or unlaid-out buttons are not there
  let best = null, bd = Infinity;
  for (const [id, key] of ACTS) {
    const el = $(id);
    if (!el || el.hidden) continue;
    const r = el.getBoundingClientRect();
    if (!(r.width > 0)) continue;
    const cx = r.left + r.width/2, cy = r.top + r.height/2, d = hyp(x - cx, y - cy);
    if (d <= r.width/2 + HIT_SLOP && d < bd) { bd = d; best = { el, key, d }; }
  }
  return best;
}
function beginAct(el, key, e) {
  if (demoOn()) return;
  if (el._held) return; // one finger owns an action until its own release or cancellation
  if (e && e.preventDefault) e.preventDefault();
  try { if (e && e.pointerId != null) el.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
  el._held = true; el._pointerId = e && e.pointerId != null ? e.pointerId : null; el.classList.add('press');
  setDev('touch'); btn(input, key, 2, true);
  ac();
}
function endAct(el, key, cancel, e) {
  if (!el._held || (el._pointerId != null && (!e || e.pointerId !== el._pointerId))) return;
  el._held = false; el._pointerId = null; el.classList.remove('press'); btn(input, key, 2, false);
  if (cancel && !input[key + 'Down']) input[key + 'Cancel'] = true; // cancel this action only when no other source still holds it
}
function bindAct(el, key) {
  el.addEventListener('pointerdown', e => beginAct(el, key, e));
  el.addEventListener('pointerup', e => endAct(el, key, false, e));
  el.addEventListener('pointercancel', e => endAct(el, key, true, e));
  el.addEventListener('contextmenu', e => e.preventDefault());
}
for (const [id, key] of ACTS) bindAct($(id), key);
cv.addEventListener('pointerdown', e => {                 // a tap in the gap falls through to the pitch. If it is within HIT_SLOP of a button, that button takes it
  if (!playing() || $('controls').hidden || demoOn()) return;
  const hit = nearestAct(e.clientX, e.clientY);
  if (hit) beginAct(hit.el, hit.key, e);
});
const endActs = (cancel, e) => { for (const [id, key] of ACTS) endAct($(id), key, cancel, e); };
cv.addEventListener('pointerup', e => endActs(false, e));    // capture sends the release to the button; if it could not, the pitch still lets go
cv.addEventListener('pointercancel', e => endActs(true, e));
function releaseTouch() {                                  // the phone turned, or the stick has to come up: the ring goes home and no button stays pressed
  input.stickId = null; input.jx = input.jy = 0; input.gest = null; input.latPeak = null;
  knob.style.transform = ''; stick.classList.remove('on'); restStick();
  for (const [id, key] of ACTS) { const el = $(id); el._held = false; el._pointerId = null; el.classList.remove('press'); }
  for (const inp of inputs) {
    inp.jx = inp.jy = 0; inp.latPeak = null; inp.gest = null;
    inp.src.a = inp.src.b = inp.src.c = 0;
    inp.aDown = inp.bDown = inp.cDown = false;
    inp.aPressed = inp.bPressed = inp.cPressed = false;
    inp.aCancel = inp.bCancel = inp.cCancel = false;
  }
}

/* ---------- keyboard ----------
   By e.code, so the physical positions hold on any layout. One player (and the lone keyboard seat in two player) has the
   solo map; two seats on one keyboard take a half each: Player 1 on W A S D with F G H, Player 2 on the arrows with / . ,
   (or Numpad 1 2 3). Ctrl, Cmd and Alt are never bound. */
const KB = {
  solo:  { m:['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'], a:['KeyJ', 'Space'], b:['KeyK', 'ShiftLeft', 'ShiftRight'], c:['KeyL'] },
  left:  { m:['KeyW', 'KeyA', 'KeyS', 'KeyD'], a:['KeyF'], b:['KeyG'], c:['KeyH'] },
  right: { m:['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'], a:['Slash', 'Numpad1'], b:['Period', 'Numpad2'], c:['Comma', 'Numpad3'] },
};
// the seats: who sits where. Both start on the keyboard, so a keyboard-only pair has nothing to set up; a controller claims a seat with one press
const two = { on:false, lost:[], swapped:false, seats:[{ dev:'kb', half:'left', pad:null }, { dev:'kb', half:'right', pad:null }] };   // lost: the seat whose pad went, waiting to be claimed back; swapped: Swap Players has put Player 1 on the right half
function seatScheme(s) {
  if (!two.on) return s === 0 ? 'solo' : null;
  const seat = two.seats[s];
  if (seat.dev !== 'kb') return null;
  return two.seats[1 - s].dev === 'kb' ? seat.half : 'solo';   // the lone keyboard seat keeps the keys it already knows
}
const ROUTES = new Map();
function rebuildRoutes() {
  ROUTES.clear();
  for (const s of [0, 1]) { const sch = seatScheme(s); if (!sch) continue; for (const act of ['m', 'a', 'b', 'c']) for (const code of KB[sch][act]) ROUTES.set(code, [s, act]); }
  for (const code of ['KeyP', 'Escape']) ROUTES.set(code, [null, 'pause']);
}
const keyRoute = code => ROUTES.get(code) || null;         // [seat, act] with act one of m a b c pause, or null for an unbound key
function releaseAll() {                                    // a scheme change, or the window losing focus: nothing held can stick
  releaseTouch(); // a lost pointer release must not leave a button owned by an old finger
  for (const inp of inputs) { inp.keys.clear(); inp.held.clear(); inp.src.a = inp.src.b = inp.src.c = 0; inp.aDown = inp.bDown = inp.cDown = false; inp.gest = null; }
  rebuildRoutes();
}
rebuildRoutes();
function setTwo(on) { two.on = !!on; if (!on) two.lost = []; releaseAll(); }
function lightKey(code, on) {                              // the join screen's legend: a keycap lights while its key is held (so it is also the rollover test)
  if ($('s-join').hidden) return;
  for (const el of document.querySelectorAll('#s-join [data-code="' + code + '"]')) el.classList.toggle('on', on);
}
function lightPad(seat, which, on) { for (const el of document.querySelectorAll('#s-join .seat.s' + seat + ' [data-pad="' + which + '"]')) el.classList.toggle('on', on); }
function onKey(e, down) {
  const code = e.code, r = keyRoute(code);
  if (demoOn()) { if (down) demoKeyDown(e, r); return; }   // Watch How: Escape or P skips, and nothing else reaches the slots
  if (practice && (practice.done || practice.ready) && down && code === 'Escape' && !e.repeat) { if (e.preventDefault) e.preventDefault(); practiceChoose(); return; }
  if (e.target && e.target.tagName === 'INPUT') return;    // typing a team name
  if (two.on && r && r[0] != null) lightKey(code, down);
  if (!down) {
    for (const inp of inputs) { inp.keys.delete(code); inp.held.delete(code); }
    if (r && r[0] != null && r[1] !== 'm') btn(inputs[r[0]], r[1], 1, false);
    return;
  }
  if (r) setDev('kb');
  if (!playing()) { if (two.on && r && !e.repeat) navKey(r, e); return; }   // one player keeps the browser's own Tab, Enter and Space on the menus
  if (M.paused && !two.on) { if (!e.repeat && r && r[1] === 'pause') { if (e.preventDefault) e.preventDefault(); resume(); } return; }   // one player: the browser's own Space and Enter on the pause card, as before
  if (r || (two.on && code === 'Quote')) { if (e.preventDefault) e.preventDefault(); }   // Quote opens Firefox's Quick Find
  if (M.paused) { if (!e.repeat && r && r[1] === 'pause') resume(); else if (two.on && r && !e.repeat) navKey(r, e); return; }
  if (two.on && (M.phase === 'menu' || M.phase === 'break')) { if (r && !e.repeat) navKey(r, e); return; }   // the penalty card and the half-time and full-time cards: the keys drive the card, as a pad's buttons do, and never reach the slots
  if (!r) return;
  const [s, act] = r;
  if (act === 'pause') { if (!e.repeat) pause(); return; }
  const inp = inputs[s];
  if (act === 'm') {
    if (M.cut && M.cut.duel && !e.repeat && !inp.held.has(code)) { const d = KEYDIR[code]; if (d[0]) inp.flick = d[0]; }   // a step is a fresh sideways key during a duel
    inp.keys.add(code);
    return;
  }
  if (e.repeat) return;                                    // a repeat never presses
  btn(inp, act, 1, true);
}
function navKey(r, e) {                                    // two player only: the routed keys drive the menus and cards
  const [s, act] = r;
  if (act === 'm') { const d = KEYDIR[e.code]; navMove(s, d[0], d[1]); }
  else if (act === 'a') navPress(s);
  else if (act === 'b' || act === 'pause') navBack(s);
  if (e.preventDefault) e.preventDefault();
}
window.addEventListener('keydown', e => onKey(e, true));
window.addEventListener('keyup', e => onKey(e, false));

/* ---------- controllers ----------
   Nothing runs until the first gamepadconnected, so phones pay nothing. Pads are polled once a frame, before the step loop.
   Buttons are mapped by position (0 bottom, 1 right, 4-7 the shoulders and triggers, 9 Start, 12-15 the d-pad), never by
   letter. In one player every pad drives slot 0; in two player a pad drives the seat it claimed. */
const PADS = new Map();                                    // by gp.index: { b:[], stick, owner, used, std, act, navT, navDir }
let padsOn = false;
const BMAP = { big:0, small:1, start:9, dpad:{ 12:'PadUp', 13:'PadDown', 14:'PadLeft', 15:'PadRight' } };
const isShoulder = i => i >= 4 && i <= 7;
function padOf(gp) {
  let P = PADS.get(gp.index);
  if (!P) { P = { index:gp.index, b:[], stick:false, owner:null, used:false, std:gp.mapping === 'standard', act:null, navT:0, navDir:'' }; PADS.set(gp.index, P); }
  return P;
}
const padSeat = P => (two.on ? P.owner : 0);
const onMenu = () => !playing() || M.paused || M.phase === 'menu' || M.phase === 'break';
function padDown(b, i, was) {                              // triggers count as down at 0.35 and up below 0.25, so a resting trigger never flickers
  const v = b.value != null ? b.value : (b.pressed ? 1 : 0);
  return isShoulder(i) ? (was ? v >= 0.25 : v >= 0.35) : !!(b.pressed || v > 0.5);
}
function padRise(gp, P) {                                  // an unowned pad in two player: any press on 0-7 or 9 claims a seat, and nothing else reaches the game
  let rise = false;
  for (let i = 0; i < Math.min(gp.buttons.length, 10); i++) { const was = !!P.b[i], now = padDown(gp.buttons[i], i, was); P.b[i] = now; if (now && !was && i !== 8) rise = true; }
  return rise;
}
function pollPads() {
  if (!padsOn) return;
  let gps;
  try { gps = navigator.getGamepads ? navigator.getGamepads() : null; } catch (e) { return; }   // Chrome throws on an insecure origin
  if (!gps) return;
  for (const gp of gps) {
    if (!gp || gp.connected === false) continue;
    const P = padOf(gp), bit = 4 << gp.index, menu = onMenu();
    P.act = gp.vibrationActuator || null;
    if (two.on && P.owner == null) { if (padRise(gp, P)) twoClaim(P); continue; }
    if (demoOn()) { demoPad(gp, P); continue; }            // Watch How: Start skips, and nothing else reaches the slots
    const seat = padSeat(P), inp = inputs[seat], join = two.on && !$('s-join').hidden;
    const n = P.std ? Math.min(gp.buttons.length, 16) : Math.min(gp.buttons.length, 2);   // a pad with no standard mapping: axes 0/1 and buttons 0/1 only, best effort
    for (let i = 0; i < n; i++) {
      const was = !!P.b[i], now = padDown(gp.buttons[i], i, was);
      if (now === was) continue;
      P.b[i] = now;
      if (now) { setDev('pad'); if (playing()) P.used = true; }
      // on a menu or a card a rise navigates, and a release still reaches the slot: a button let go there can't stay held into play
      if (i === BMAP.big) { if (now && menu) navPress(seat); else btn(inp, 'a', bit, now); }
      else if (i === BMAP.small) { if (now && menu) { if (M && M.paused) resume(); else navBack(seat); } else btn(inp, 'b', bit, now); }
      else if (isShoulder(i)) { if (!menu || !now) btn(inp, 'c', bit, now); }
      else if (i === BMAP.start) { if (now) padStart(); }
      else if (BMAP.dpad[i]) {
        const code = BMAP.dpad[i], d = KEYDIR[code];
        if (!now) { inp.keys.delete(code); inp.held.delete(code); }
        else if (menu) navMove(seat, d[0], d[1]);
        else { if (M.cut && M.cut.duel && !inp.held.has(code)) { if (d[0]) inp.flick = d[0]; } inp.keys.add(code); }
      }
      if (join) { if (i === BMAP.big) lightPad(seat, 'big', now); else if (i === BMAP.small) lightPad(seat, 'small', now); else if (isShoulder(i)) lightPad(seat, 'sh', now); }
    }
    // the left stick: a 0.20 radial dead zone, rescaled to 0..1; a latched stick writes nothing until it is back inside 0.25
    const ax = gp.axes[0] || 0, ay = gp.axes[1] || 0, m = hyp(ax, ay);
    if (inp.latch && m < 0.25) inp.latch = false;
    if (m >= 0.20 && !inp.latch) { const k = Math.min(1, (m - 0.20)/0.80)/m; inp.jx = ax*k; inp.jy = ay*k; inp.padStick = true; P.stick = true; if (m >= 0.5) setDev('pad'); }
    else if (m < 0.20 && P.stick) { P.stick = false; if (inp.padStick) { inp.jx = inp.jy = 0; inp.padStick = false; } }   // zeroed once, and only if the stick was the last writer
    if (join && (m >= 0.5) !== !!P.stickLit) { P.stickLit = m >= 0.5; lightPad(seat, 'stick', P.stickLit); }
    if (menu) padNav(P, seat, ax, ay, m);
  }
}
function padNav(P, seat, ax, ay, m) {                      // the stick on a menu: a move, then repeats after 400ms and every 150ms while held
  const dir = m < 0.5 ? '' : Math.abs(ax) > Math.abs(ay) ? (ax > 0 ? 'r' : 'l') : (ay > 0 ? 'd' : 'u');
  if (!dir) { P.navDir = ''; return; }
  const now = performance.now();
  if (dir !== P.navDir) { P.navDir = dir; P.navT = now + 400; }
  else if (now < P.navT) return;
  else P.navT = now + 150;
  setDev('pad');
  navMove(seat, dir === 'r' ? 1 : dir === 'l' ? -1 : 0, dir === 'd' ? 1 : dir === 'u' ? -1 : 0);
}
function padStart() {
  if (demoOn()) { demoSkip(); return; }
  if (practice && (practice.done || practice.ready)) return;                                      // Start: pause and resume, and Second Half on the break card
  if (!playing()) return;
  if (M.paused) resume();
  else if (M.phase === 'break') { const go = $('br-go'); if (!$('m-break').hidden && go.click) go.click(); }
  else if (M.phase !== 'menu') pause();
}
function twoClaim(P) {                                     // an unowned pad's first press. Once a seat has lost its pad (two.lost) the press takes that seat back, in any phase; otherwise only the join screen seats a pad: seat 0 if it isn't on one, else seat 1, else nothing (a third pad)
  let s = null;
  if (two.lost.length) { s = two.lost.shift(); if (two.lost.length) seatLost(two.lost[0]); else seatFound(); }   // the seats that lost their pads, in the order they went
  else if (!$('s-join').hidden) s = two.seats[0].dev !== 'pad' ? 0 : two.seats[1].dev !== 'pad' ? 1 : null;
  if (s == null) return;
  const old = two.seats[s].pad != null ? PADS.get(two.seats[s].pad) : null; if (old) old.owner = null;
  two.seats[s] = { dev:'pad', half:two.seats[s].half, pad:P.index }; P.owner = s;
  releaseAll(); seatsChanged();
}
function twoRelease(s) {                                   // back to the keyboard. With both seats on it the halves go by seat, Player 1 on the left (the other way round after Swap Players), whatever a solo spell left stored; a lone keyboard seat keeps its own side
  const o = two.seats[1 - s], left = two.swapped ? 1 : 0, half = s === left ? 'left' : 'right';
  const P = two.seats[s].pad != null ? PADS.get(two.seats[s].pad) : null; if (P) P.owner = null;
  two.seats[s] = { dev:'kb', half, pad:null };
  if (o.dev === 'kb') o.half = half === 'left' ? 'right' : 'left';
  releaseAll(); seatsChanged();
}
function twoSwap() { two.seats.reverse(); two.swapped = !two.swapped; for (const P of PADS.values()) if (P.owner != null) P.owner = 1 - P.owner; releaseAll(); seatsChanged(); }
function resetSeats() { two.seats = [{ dev:'kb', half:'left', pad:null }, { dev:'kb', half:'right', pad:null }]; two.lost = []; two.swapped = false; for (const P of PADS.values()) P.owner = null; }   // a fresh visit to the join screen: the halves in order, every pad back to Press Any Button
function padGone(index) {
  const P = PADS.get(index); if (!P) return;
  const seat = padSeat(P), bit = 4 << index;
  if (seat != null) {
    const inp = inputs[seat];
    for (const k of ['a', 'b', 'c']) btn(inp, k, bit, false);
    if (P.stick && inp.padStick) { inp.jx = inp.jy = 0; inp.padStick = false; }
    for (const code of Object.values(BMAP.dpad)) { inp.keys.delete(code); inp.held.delete(code); }
  }
  PADS.delete(index);
  setDesk();                                               // the home's Two Player button follows the pads actually connected
  if (two.on && P.owner != null) { if (!two.lost.includes(P.owner)) two.lost.push(P.owner); twoRelease(P.owner); if (playing()) { pause(); seatLost(two.lost[0]); } }   // the seat falls back to the keyboard and is held for the next pad press, on the pause card, the half-time card or in play
  else if (P.used && playing()) pause();                   // one player: a pad that was never used this match (one that slept over half time) can't interrupt
}
function seatLost(s) { for (const id of ['pz-seat', 'br-seat']) { const el = $(id); if (el) { el.textContent = 'Player ' + (s + 1) + ' · Press Any Button'; el.hidden = false; el.classList.toggle('s1', s === 1); } } }   // on the pause card and the half-time card alike
function seatFound() { for (const id of ['pz-seat', 'br-seat']) { const el = $(id); if (el) el.hidden = true; } }
function padConnected(gp) {
  padsOn = true;
  if (gp) padOf(gp);
  setDesk();
}
window.addEventListener('gamepadconnected', e => padConnected(e.gamepad));
window.addEventListener('gamepaddisconnected', e => padGone(e.gamepad.index));
function rumble(seat, ms) {                                // Chrome and Edge only; feature-checked, so anywhere else it is a no-op
  if (!padsOn || seat == null) return;
  for (const P of PADS.values()) {
    if (padSeat(P) !== seat || !P.act || !P.act.playEffect) continue;
    try { P.act.playEffect('dual-rumble', { duration:ms, strongMagnitude:0.6, weakMagnitude:0.3 }); } catch (e) { /* unsupported */ }
  }
}

/* ---------- menus and cards from a controller ----------
   A chalk ring (.padfocus) on the current button, moved spatially; the real DOM focus never moves, so a native Enter can't
   double-fire. In one player the keyboard keeps its native Tab, Enter and Space, so nothing changes for today's keyboard players. */
let focusEl = null;
const navLog = [];                                         // the tools read who tried to navigate and whether the layer was his: [fn, seat, owned]
const logNav = (fn, seat) => { navLog.push([fn, seat, navOwner(seat)]); if (navLog.length > 40) navLog.shift(); };
function navLayer() {                                      // the top layer: the pause card over anything (it can sit over the penalty card), then an open card, then the visible screen
  const pg = $('m-gate'); if (pg && !pg.hidden) return pg;   // the grown-up check (kids.js) sits over everything, another card included
  const pz = $('m-pause'); if (pz && !pz.hidden) return pz;
  for (const m of document.querySelectorAll('.modal')) if (!m.hidden) return m;
  for (const s of document.querySelectorAll('.screen')) if (!s.hidden) return s;
  return null;
}
function navCands(layer) {
  const out = [];
  for (const el of layer.querySelectorAll('.btn, .team, .seg button, .sw, .step, summary, .app-action')) {
    if (el.disabled || el.hidden || el.getAttribute('aria-disabled') === 'true' || (el.closest && el.closest('[hidden]'))) continue;
    const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
    out.push(el);
  }
  return out;
}
function setFocus(el) {
  if (focusEl && focusEl !== el) focusEl.classList.remove('padfocus');
  focusEl = el || null;
  if (focusEl) { focusEl.classList.add('padfocus'); if (focusEl.scrollIntoView) focusEl.scrollIntoView({ block:'nearest' }); }
}
const DEFAULT_FOCUS = { 's-home':() => $('b-quick'), 's-join':() => $('j-go'), 'm-pen':() => ($('p-goal').disabled ? $('p-touch') : $('p-goal')), 'm-break':() => $('br-go'), 'm-pause':() => $('pz-resume') };
let navOnly = null;                                        // two player: the one seat that may act on the top layer (the team pick, the penalty card), or null for either
function navOwner(seat) { return (M && M.paused) || navOnly == null || seat == null || seat === navOnly; }   // the pause card is anyone's, whatever card it covers
function navSide(seat) {                                   // the one button a restricted seat may still press: Player 1's Change Team while Player 2 picks
  if (seat === 0 && pickMode === 'two' && twoSel.picking === 1 && !$('s-teams').hidden && !$('t-yours').hidden) return $('t-change');
  return null;
}
function navMove(seat, dx, dy) {                           // the nearest candidate within 60 degrees of the direction: the distance along it plus twice the sideways offset
  logNav('move', seat);
  if (!navOwner(seat)) return null;
  const layer = navLayer(); if (!layer) return null;
  const cands = navCands(layer); if (!cands.length) return null;
  if (!focusEl || !cands.includes(focusEl)) { const d = DEFAULT_FOCUS[layer.id], el = d && d(); setFocus(el && cands.includes(el) ? el : cands[0]); return focusEl; }   // the first press puts the ring on the default button
  if (!dx && !dy) return focusEl;
  const r0 = focusEl.getBoundingClientRect(), cx = r0.left + r0.width/2, cy = r0.top + r0.height/2;
  let best = null, bs = 1e9;
  for (const el of cands) {
    if (el === focusEl) continue;
    const r = el.getBoundingClientRect(), ex = r.left + r.width/2 - cx, ey = r.top + r.height/2 - cy;
    const along = ex*dx + ey*dy, side = Math.abs(ex*dy - ey*dx);
    if (along <= 0 || side > along*1.732) continue;
    const s = along + 2*side;
    if (s < bs) { bs = s; best = el; }
  }
  if (best) setFocus(best);
  return best;
}
function navPress(seat) {
  logNav('press', seat);
  if (!navOwner(seat)) { const el = navSide(seat); if (el && el.click) { el.click(); return true; } return false; }
  const layer = navLayer(); if (!layer) return false;
  if (!focusEl || !navCands(layer).includes(focusEl)) { navMove(seat, 0, 0); return false; }
  if (focusEl.click) focusEl.click();
  return true;
}
function navBack(seat) {
  if (demoOn()) { demoSkip(); return true; }
  if (practice && (practice.done || practice.ready)) { practiceChoose(); return true; }
  logNav('back', seat);
  if (!navOwner(seat)) return false;
  const layer = navLayer(); if (!layer) return false;
  for (const el of layer.querySelectorAll('[data-back]')) if (!el.hidden && !(el.closest && el.closest('[hidden]'))) { if (el.click) el.click(); return true; }
  return false;
}

/* ---------- housekeeping ---------- */
document.addEventListener('pointerdown', () => ac(), true);   // a controller press is not a user activation, so it can't start sound; any key or click can
document.addEventListener('keydown', () => ac(), true);
window.addEventListener('blur', () => { releaseAll(); pause(); });   // a run can't stick after Cmd-Tab
const deskQuery = (() => { try { return matchMedia('(hover: hover) and (pointer: fine)'); } catch (e) { return null; } })();   // the primary pointer, on purpose: any-* would put the button on hybrid tablets
function setDesk() { const b = document.body; if (b) b.classList.toggle('desk', PADS.size > 0 || !!(deskQuery && deskQuery.matches)); }   // a computer, or a controller connected right now: a phone that had a pad goes back to its own layout when it is unplugged
const isDesk = () => !!(document.body && document.body.classList.contains('desk'));
if (deskQuery) { if (deskQuery.addEventListener) deskQuery.addEventListener('change', setDesk); else if (deskQuery.addListener) deskQuery.addListener(setDesk); }

/* =========================================================
   UI
   ========================================================= */
let mode = 'menu';           // 'menu' | 'match'
let pickMode = 'champ', quickPick = null, quickAuto = false;   // quickAuto: Farnham is still the untouched default
let bannerTimer = 0, coachLast = null, coachUntil = 0;   // coachUntil: wall-clock ms until another coach line may speak (one at a time)
const playing = () => mode === 'match' && M && !M.demo;

function showScreen(id) {
  if (typeof offlineScreen === 'function') offlineScreen(id);
  for (const s of document.querySelectorAll('.screen')) s.hidden = s.id !== id;
  setFocus(null);
  if (id === 's-teams') { fitNames(); poolTabShow(); }
  if (id !== 's-home') { const a = document.activeElement; if (a && typeof a.blur === 'function') a.blur(); }   // a focused menu button must not fire on Enter once it is hidden
}
function clearBanner() { clearTimeout(bannerTimer); const el = document.getElementById('banner'); if (el) el.innerHTML = ''; }
function say(text, size, team, grade, low) {
  if (!M || M.demo || M.headless) return;
  const el = $('banner');
  const k = team != null ? showCol(team) : 'var(--flood)';
  el.innerHTML = '';
  el.classList.toggle('cut', !!M.cut);
  el.classList.toggle('lo', !!low);                       // a goal verdict sits under the crossbar while the ball is up at the posts
  const m = document.createElement('div');
  m.className = 'msg' + (size ? ' ' + size : '');
  m.style.setProperty('--k', k);
  if (grade) { const g = document.createElement('span'); g.className = 'grade'; g.textContent = grade; m.appendChild(g); }
  m.appendChild(document.createTextNode(text));
  el.appendChild(m);
  clearTimeout(bannerTimer);
  const ms = size === 'big' ? 1700 : size === 'coach' ? 1600 : size === 'small' ? 900 : 1300;
  bannerTimer = setTimeout(() => { el.innerHTML = ''; }, size === 'coach' ? ms : ms/matchPace());   // a banner lasts as long against the play as it always did. A coach line is for reading, and stays in real time with coachUntil
}

function startDemo() {
  soundQuiet();                                            // every way out of a match or a drill comes through here
  const all = ALL_TEAMS, a = Math.floor(rnd()*all.length); let b = Math.floor(rnd()*(all.length-1)); if (b >= a) b++;
  newMatch(all[a], all[b], { halfLen:1e9, diff:1, auto:true, demo:true });
  mode = 'menu';
  $('hud').hidden = true; $('controls').hidden = true; $('b-pause').hidden = true;
  for (const m of document.querySelectorAll('.modal')) m.hidden = true;
}
function lockLandscape() {
  if (!window.matchMedia('(pointer: coarse)').matches) return;
  try {
    const el = document.documentElement;
    const fs = el.requestFullscreen ? el.requestFullscreen({ navigationUI:'hide' }) : null;
    const lock = () => { try { const p = screen.orientation && screen.orientation.lock && screen.orientation.lock('landscape'); if (p && p.catch) p.catch(() => {}); } catch (e) { /* unsupported */ } };
    if (fs && fs.then) fs.then(lock, () => {}); else lock();
  } catch (e) { /* unsupported */ }
}
function startMatch(u, c, isChamp, o) {
  if (!sidesMeet(teamOf(u), teamOf(c))) return false;        // the team screen never offers this; men's never plays women's
  lockLandscape();
  ac();
  for (const P of PADS.values()) P.used = false;             // a pad unplugged mid-match pauses only if it was used in that match
  const pair = !!(o && o.two);                               // two player: both sides human, each at the level they picked; the seats model routes the keyboard halves and the pads
  setTwo(pair);
  const ease = !pair && settings.diff === 1 && settings.played < EARLY.games;   // counted as the match starts, so quitting does not play the kinder game again
  if (!pair) { settings.played = Math.min(99, settings.played + 1); save(); }
  newMatch(u, c, { halfLen:HALF_SECONDS[settings.half], diff:settings.diff, champ:isChamp, duels:'live', early:ease, arcade:true, kids:!pair && kidsLevel(),   // the switch is gone: a match you play always has duels; Kids is one player's
    humans:pair ? [true, true] : null, levels:pair ? (o.levels || [settings.diff, settings.diff]) : null });
  mode = 'match';
  showScreen(null);
  $('hud').hidden = false; $('controls').hidden = pair; $('b-pause').hidden = false;   // two player: the stick and the three buttons are seat 0's touch controls, and nobody is touching; each player's marks are drawn on the pitch
  $('h-t0').hidden = $('h-t1').hidden = !pair;             // the seat tags either side of the scorebug
  $('h-n0').textContent = M.nat[0].id; $('h-n1').textContent = M.nat[1].id;
  $('h-k0').style.setProperty('--k', showCol(0)); $('h-k1').style.setProperty('--k', showCol(1));
  lastHud = ''; restStick();
  lastStat = null; lastCap = false; $('h-stat').hidden = $('h-cap').hidden = true;
  return true;
}
function exitMatch() {
  if (practice) { practiceLeave(); return; }
  const wasChamp = M && M.champ, wasCareer = M && M.career;
  setTwo(false);                                           // the menus are one player's again; the join screen switches the seats back on
  series = { w:[0, 0], d:0 }; navOnly = null;              // a two-player series ends with the visit to the menu
  startDemo();
  if (wasCareer && career) careerOpen();
  else if (wasChamp && champ) { renderHub(); showScreen('s-hub'); } else goHome();
}

let lastHud = '', lastBtn = '', lastStat = null, lastCap = false;
/* What to do now, as a word and a shape under the clock, for your first matches. A matter of the moment, so nothing about it is stored but the count. */
const STATUS_MATCHES = 5;                                   // finished matches it stays for; always at the Kids level
const STATUS_INK = '#08110b';
const BALL_STATUS = {
  ours:{ word:'Your Ball', icon:`<svg viewBox="0 0 22 14" aria-hidden="true"><ellipse cx="11" cy="7" rx="10" ry="6.5" fill="currentColor"/><path d="M6 7h10M8.5 5v4M11 5v4M13.5 5v4" stroke="${STATUS_INK}" stroke-width="1.3" fill="none"/></svg>` },
  stop:{ word:'Stop Them', icon:`<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M5.5 1h7L17 5.5v7L12.5 17h-7L1 12.5v-7z" fill="currentColor"/><rect x="4" y="7.4" width="10" height="3.2" fill="${STATUS_INK}"/></svg>` },
  loose:{ word:'Get the Ball', icon:`<svg viewBox="0 0 26 18" aria-hidden="true"><ellipse cx="13" cy="10" rx="7" ry="4.6" fill="currentColor"/><path d="M1.5 10h3.2M21.3 10h3.2M4.5 2.8l2.4 2.4M21.5 2.8l-2.4 2.4M13 .8v3" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>` },
};
function statusWanted() {                                   // whose match it shows in: one player's, for a while. The Match Help switch turns it off, except at the Kids level, where it stays
  return !!(M && playing() && !M.two && !M.auto && !practice && (M.kids || (settings.hints && settings.finished < STATUS_MATCHES)));
}
function statusOf() {                                       // which of BALL_STATUS, or null. Pure: it reads the match, and the tools read it too
  if (!statusWanted() || M.cut || M.tut || M.paused || M.over) return null;
  const t = teamOfSeat(0), b = M.ball;
  if (t < 0) return null;
  if (M.phase === 'set') return M.set && M.set.kind === 'ruck' ? (M.set.team === t ? 'ours' : 'stop') : null;   // a ruck has a side: every other stop in play has its own banner
  if (M.phase !== 'play') return null;
  if (b.state === 'held') return b.carrier.team === t ? 'ours' : 'stop';
  if (b.state === 'air') return b.f && b.f.kind === 'pass' ? (b.f.team === t ? 'ours' : 'stop') : 'loose';   // a pass still belongs to a side; a kick is anyone's till it is caught
  return b.state === 'loose' ? 'loose' : null;
}
function statusSync() {
  const key = statusOf();
  if (key !== lastStat) {
    lastStat = key;
    const el = $('h-stat');
    el.hidden = !key;
    if (key) { el.className = 'bstat ' + key; $('h-stat-i').innerHTML = BALL_STATUS[key].icon; $('h-stat-w').textContent = BALL_STATUS[key].word; }
  }
  const cap = careerCaption();
  if (cap !== lastCap) { lastCap = cap; $('h-cap').hidden = !cap; }
}
function cutLabels(c) {
  if (c.kind === 'scrum') return ['Push', null];
  if (c.kind === 'lineout') return ['Jump', null];
  return duelLabels(c);
}

function fmtClock() {
  const mins = M.golden ? 80 + Math.min(M.clock/periodLen(), 1)*10 : (M.half-1)*40 + Math.min(M.clock/M.halfLen, 1)*40;   // extra time runs 80 to 90
  const mm = Math.floor(mins), ss = Math.floor((mins-mm)*60);
  return String(mm).padStart(2,'0') + ':' + String(ss).padStart(2,'0');
}
function updateHud() {
  if (!playing()) return;
  const sub = M.golden ? '<span class="lp">Golden Try</span>' : M.hooter ? '<span class="lp">Last Play</span>' : (M.phaseCount > 0 ? 'Phase ' + M.phaseCount : (M.half === 1 ? '1st Half' : '2nd Half'));
  const fire = M.arcade ? M.fire.map(F => F.t > 0 ? 'on' : String(F.heat)).join('|') : '';
  const key = M.score[0] + '|' + M.score[1] + '|' + fmtClock() + sub + fire;
  if (key !== lastHud) {
    lastHud = key;
    $('h-s0').textContent = M.score[0]; $('h-s1').textContent = M.score[1];
    $('h-sub').innerHTML = fmtClock() + ' · ' + sub;
    for (const t of [0, 1]) { const el = $('h-f' + t), F = M.fire[t]; el.hidden = !M.arcade; el.className = 'heat' + (F.t > 0 ? ' on' : ''); el.style.setProperty('--n', F.t > 0 ? ARCADE.fire.need : F.heat); }   // the run towards On Fire, under each side's code
  }
  const cut = M.phase === 'cut' && M.cut;
  const goal = cut && M.cut.kind === 'goal';
  const ctrl = M.ctrl, ht = ctrl ? ctrl.team : 0, k = M.contact, held = !!(k && ctrl && k.c === ctrl), play = M.phase === 'play';   // seat 0's side: the on-screen buttons are its. held: your carrier is in a tackle
  const ours = ourBall(ht), S0 = sideOf(ht), P0 = S0.pass;
  const b = M.ball;
  let passCharge = 0, passLong = false;
  if (P0 && P0.mode === 'hold' && play && ctrl && b.state === 'held' && b.carrier === ctrl && !ctrl.bind) {
    passCharge = Math.min(1, P0.t / LONG.auto);
    passLong = P0.t >= LONG.arm && !!passAim(ctrl, inputOf(ht).world().y).far;
  }
  let la, lb, cueA, cueB, aAct, bAct;
  const gs = goal ? M.cut.g.stage : '';
  const D = practice && practice.space ? drillLabels() : null;   // a training space sets its own buttons
  if (D) { la = D.a; lb = D.b; cueA = !!D.cueA; cueB = false; aAct = !!D.aOn; bAct = !!D.bOn; }
  else if (goal) { [la, lb, cueA, cueB] = goalLabels(M.cut); aAct = bAct = !M.cut.after && !M.cut.g.out && (M.cut.g.watch || gs === 'aim' || gs === 'power' || gs === 'hold' || gs === 'wait'); }
  else if (cut) { [la, lb] = cutLabels(M.cut); cueA = !!(!M.cut.after && la); cueB = !!(!M.cut.after && lb); aAct = bAct = !M.cut.after; }
  else if (ours) { const carrying = b.state === 'held' && b.carrier === ctrl; la = held && canOffload(k) ? 'Offload' : passLong ? 'Long' : 'Pass'; lb = ctrl ? kickLabel(M.ctrl.team) : 'Kick'; cueA = la === 'Offload'; cueB = false; aAct = play && carrying && (!held || cueA); bAct = play && carrying && !held; }   // own pass in flight: neither action can act; held in a tackle, only an available Offload lights Pass
  else { const tagging = practice && practice.tagOnly; la = tagging ? 'Pull Tag' : 'Tackle'; lb = 'Switch'; cueA = false; cueB = switchUseful(ht); aAct = play && (tagging ? drillCanPull(ctrl) : canDive(ctrl)); bAct = play; }   // Tackle lights up only when a press would dive now. Switch pulses when the man in the ring can still meet the ball and yours is behind it
  const S = M.spr[ht], sprOn = D ? !!D.cOn : !cut && sprintOn(ht), sprCue = sprOn && S.cue > 0;   // Sprint: dim exactly when a press would do nothing (the same test the press makes)
  const duel = cut && M.cut.duel;
  const bk = la + '|' + lb + aAct + bAct + cueA + cueB + (duel ? M.cut.kind + (M.cut.after ? 1 : 0) : '') + gs + '|' + (cut ? 'h' : sprOn ? 'r' : 'i') + sprCue + (passLong ? 'L' : '') + (D ? (D.c ? 'C' : 'c') : '');
  if (bk !== lastBtn) {
    lastBtn = bk;
    $('la').textContent = la || '';
    $('lb').textContent = lb || '';
    $('btnA').hidden = !la;
    $('btnB').hidden = !lb;
    $('btnC').hidden = !!cut || !!(D && !D.c);                                // Sprint is hidden in every close-up and stays in place otherwise, so nothing on screen moves
    $('btnA').classList.toggle('cue', cueA);
    $('btnB').classList.toggle('cue', cueB);
    $('btnC').classList.toggle('cue', sprCue);
    $('btnB').classList.toggle('two', lb === 'Drop Goal');   // two lines inside the small button
    $('plates').hidden = !(duel && M.cut.kind === 'past' && !M.cut.after);
    $('btnA').classList.toggle('idle', !aAct); $('btnB').classList.toggle('idle', !bAct);
    $('btnC').classList.toggle('idle', !sprOn); $('btnC').classList.toggle('ready', sprOn);
    $('hud').classList.toggle('gk', !!goal);   // the clock line hides under a goal close-up
  }
  $('btnB').style.setProperty('--c', S0.charging ? S0.charge.toFixed(3) : goal && gs === 'hold' ? M.cut.g.m.toFixed(3) : 0);   // the ring shows the charge, or a drop's meter
  $('btnC').style.setProperty('--s', S.m.toFixed(3));        // the Sprint ring is the meter
  $('btnA').classList.toggle('hold', passCharge > 0);
  $('btnA').style.setProperty('--p', passCharge.toFixed(3)); // the Pass ring fills while a long pass charges
  syncHints(la, lb);
  coachTick();
  statusSync();
}

/* =========================================================
   Hints and the tutorial (2026-10-17: Gordon's "Close-Ups and Key Moves" and "Pause and Step Through")
   The hints card (#hc0 top-left for Player 1 and one player, #hc1 top-right for Player 2) names the close-up and its one control for
   the device in use, through every duel's slow run-in to the verdict, the scrum to its result, the lineout to the catch, a goal kick or
   drop from the cut-in to the strike, and once a match each in open play (Long Pass, Sprint, Side Step, Dummy, Offload, Drop Goal, 3s
   each, 4s apart). hintFor(seat) is pure: it reads the match and returns the words, or null. syncHints runs from updateHud and writes
   the DOM only when the content changes. The open-play triggers read the labels updateHud already computed (cueOf in two player), so
   dropZone is never run again and nothing random is drawn. The tutorial pauses the first time each moment comes up on this device
   (while that seat's Hints are On): the close-up holds its first frame under a card or two, Next then Play, a tap anywhere or the
   pass key advancing, the match clock and the world frozen; Replay Tutorial on How to Play forgets them all.
   ========================================================= */
const hintShown = [null, null], hintKey = ['', ''], HO = [null, null];   // what each card shows now (the tools read it); the last content key; open-play state per seat
const OPEN_HINTS = ['offload', 'drop', 'long', 'sprint', 'step', 'dummy'], OPEN_SECS = 3.0, OPEN_GAP = 4.0;
const CHIP_LABEL = { a:'Pass', b:'Kick', c:'Sprint', x:'Stick', v:'Stick', back:'Stick' };
const teamOfSeat = s => (M ? M.side.findIndex(x => x.human && x.seat === s) : -1);
const hintsOn = s => (s == null ? false : two.on ? settings.twoHints[two.swapped ? 1 - s : s] : settings.hints);   // two player: per player, stored by keyboard half like twoDiff
function setHints(s, on) {
  if (two.on) settings.twoHints[two.swapped ? 1 - s : s] = !!on; else settings.hints = !!on;
  save(); renderHintSwitches(); if (M) syncHints();
}
function hintReset() { for (const s of [0, 1]) { HO[s] = { shown:new Set(), cur:null, until:-9, last:-99 }; } for (const s of [0, 1]) renderHint(s, null); }
function hintCut() { for (const s of [0, 1]) if (HO[s]) HO[s].cur = null; }   // a close-up ends an open-play card
function hintDev(s) { return two.on ? (seatScheme(s) ? 'kb' : 'pad') : lastDev; }   // one player: the last device that acted; two player: the seat's own
const card = (title, rule, rows, kick) => ({ title, rule, rows, kick:!!kick });
const row = (chips, text) => ({ chips, text });
const chip = (act, label) => ({ act, label:label || CHIP_LABEL[act] });
function hintFor(s) {                                      // the card for seat s now, or null
  if (!M || M.demo || M.auto || !hintsOn(s)) return null;
  const t = teamOfSeat(s); if (t < 0) return null;
  const dev = hintDev(s), kb = dev === 'kb', c = M.cut;
  if (c) {
    if (M.phase !== 'cut') return null;
    if (c.duel) {
      if (c.out != null) return null;
      const own = seatOfTeam(c.own) === s, k = c.kind;
      if (own) return k === 'past' ? card('Get Past', 'To Their Open Side', [row([chip('x')], kb ? 'Step on Gold' : 'Flick on Gold')])
        : k === 'pass' ? card('Key Pass', 'Dummy If They Drift', [row([chip('a', 'Pass'), chip('b', 'Dummy')], 'On Gold')])
        : k === 'tackle' ? card('Tackle', 'They May Step', [row([chip('a', 'Tackle')], 'On Gold')])
        : card('Block', 'They May Dummy', [row([chip('a', 'Block')], 'On Gold')]);
      if (!M.two || c.locked) return null;                   // the chooser's card goes at his lock, as his bottom-bar cue does
      return k === 'past' ? card('Get Past', 'Before Gold', [row([chip('x')], 'Guard a Shoulder')])
        : k === 'pass' ? card('Key Pass', 'Before Gold', [row([chip('x')], 'Drift or Rush')])
        : k === 'tackle' ? card('Tackle', 'Before Gold', [row([chip('x')], 'Step Left or Right')])
        : card('Block', 'Before the Pass', [row([chip('b', 'Dummy')], 'Tap It')]);
    }
    if (c.kind === 'scrum' && practice) return c.result || practice.ready ? null : card('Driving', 'Stay Low in the Green', [row([chip('a', 'Push')], 'Push on Set'), row([chip('a', 'Push')], 'Then Keep Tapping')]);   // the game's own card, and none on its ready card
    if (c.kind === 'scrum') return c.result ? null : card('Scrum', c.feed === t ? 'Your Ball' : 'Steal Their Ball', [row([chip('a', 'Push')], 'Push on Set'), row([chip('a', 'Push')], 'Then Tap Fast')]);
    if (c.kind === 'lineout') return c.outcome != null ? null : card('Lineout', c.team === t ? 'Your Throw' : 'Steal Their Throw', [row([chip('a', 'Jump')], 'Ball Halfway')]);
    if (c.kind === 'goal') {
      const g = c.g;
      if (g.watch || g.team !== t || c.t < CUT_IN || c.after || g.out) return null;
      if (g.type === 'drop') return g.stage === 'wait' || g.stage === 'hold' ? card(null, 'Before They Reach You', [...(M.kids ? [] : [row([chip('x')], 'Steer')]), row([chip('b', 'Kick')], 'Let Go in the Gold')], true) : null;
      return g.stage === 'aim' || g.stage === 'power' ? card(null, 'Let Go in the Gold', [...(M.kids ? [] : [row([chip('x')], 'Steer the Arrow')]), row([chip('a', 'Kick')], 'Hold It')], true) : null;   // Kids sets the aim, so there is nothing to steer
    }
    return null;
  }
  const o = HO[s] && HO[s].cur;
  if (!o) return null;
  return o === 'long' ? card('Long Pass', 'Skips a Player', [row([chip('a', 'Pass')], 'Hold It')])
    : o === 'sprint' ? card('Sprint', '', [row([chip('c', 'Sprint')], 'Hold It')])
    : o === 'step' ? card('Side Step', 'Near a Tackler', [row([chip('v')], kb ? 'Tap Across' : 'Flick Across')])
    : o === 'dummy' ? card('Dummy', 'Fakes the Pass', [row([chip('back')], kb ? 'Tap Back' : 'Pull Back, Push On')])
    : o === 'offload' ? card('Offload', 'As You’re Tackled', [row([chip('a', 'Offload')], 'Tap It')])
    : card('Drop Goal', 'In Range', [row([chip('b', 'Drop Goal')], 'Hold It')]);
}
function hintOpenPick(s, t, la, lb) {                       // which open-play card, if any, is due for seat s now: the first unseen trigger that holds
  const H = HO[s], c = ctrlOf(t), b = M.ball;
  if (!c) return null;
  const carry = b.state === 'held' && b.carrier === c && !c.bind, d = dirOf(t);
  const cands = [];
  if (la === 'Offload') cands.push('offload');
  if (lb === 'Drop Goal') cands.push('drop');
  if (carry && c.hold >= 0.8 && pressure(c) >= 5 && passAim(c, inputOf(t).world().y).far) cands.push('long');
  if (sprintOn(t) && ((carry && gapAhead(c) >= 8) || (b.state === 'held' && b.carrier.team !== t && dist(c, b.carrier) <= 12 && cleanThrough(b.carrier, t)))) cands.push('sprint');
  if (carry) {
    let front = 99, ai = 99;
    for (const q of M.players) { if (q.team === t || !onFeet(q) || (q.x - c.x)*d <= 0.5) continue; const dd = dist(q, c); if (Math.abs(q.y - c.y) < 3) front = Math.min(front, dd); if (!ringed(q)) ai = Math.min(ai, dd); }
    if (front >= 3.5 && front <= 6) cands.push('step');
    if (ai >= 3 && ai <= 7 && shownPass(c).to) cands.push('dummy');
  }
  for (const id of OPEN_HINTS) if (cands.includes(id) && !H.shown.has(id)) return id;
  return null;
}
function hintOpenStep(s, t, la, lb) {
  const H = HO[s]; if (!H) return;
  if (!(M.phase === 'play' && !M.cut && !M.tut && hintsOn(s))) { H.cur = null; return; }
  if (H.cur) { if (M.dclock < H.until) return; H.cur = null; }
  if (M.dclock < H.last + OPEN_GAP || careerCaption()) return;   // and so does the card
  const id = hintOpenPick(s, t, la, lb);
  if (!id) return;
  H.cur = id; H.shown.add(id); H.last = M.dclock; H.until = M.dclock + OPEN_SECS;
}
function syncHints(la, lb) {                               // la, lb: what seat 0's buttons read this frame (one player); two player reads each side's cue
  if (!M) return;
  for (const s of [0, 1]) {
    const t = teamOfSeat(s);
    if (t < 0) { renderHint(s, null); continue; }
    if (M.two) { const cue = cueOf(t); hintOpenStep(s, t, cue === 'Offload' ? 'Offload' : '', cue === 'Drop Goal' ? 'Drop Goal' : ''); }
    else hintOpenStep(s, t, la, lb);
    renderHint(s, hintFor(s));
  }
}
function keycapsFor(s, act) {                             // the keycaps a chip wears on a keyboard: the seat's own keys
  const sch = seatScheme(s) || 'solo', R = sch === 'right', kc = code => (ARROW_KEY[code] ? `<kbd class="kc ar ${ARROW_KEY[code]}"></kbd>` : `<kbd class="kc">${KEYCAP[code]}</kbd>`);
  if (act === 'a' || act === 'b' || act === 'c') return kc(KB[sch][act][0]);
  if (act === 'x') return R ? kc('ArrowLeft') + kc('ArrowRight') : kc('KeyA') + kc('KeyD');
  const behind = stickTurn(s);                             // a behind view: across the run is across the screen, and back is the down key
  if (act === 'v') return behind ? (R ? kc('ArrowLeft') + kc('ArrowRight') : kc('KeyA') + kc('KeyD')) : R ? kc('ArrowUp') + kc('ArrowDown') : kc('KeyW') + kc('KeyS');
  if (behind) return kc(R ? 'ArrowDown' : 'KeyS');
  const d = dirOf(Math.max(0, teamOfSeat(s)));             // back: the key toward his own line
  return kc(R ? (d > 0 ? 'ArrowLeft' : 'ArrowRight') : (d > 0 ? 'KeyA' : 'KeyD'));
}
const PAD_GLYPH = { a:'<i class="pad dia"><b></b><b></b><b class="on"></b><b></b></i>', b:'<i class="pad dia"><b></b><b class="on"></b><b></b><b></b></i>', c:'<i class="pad sh"></i>' };
function chipHtml(s, ch) {
  const dev = hintDev(s), cls = ch.act === 'a' || ch.act === 'b' || ch.act === 'c' ? ch.act : 'x';
  const badge = dev === 'kb' ? keycapsFor(s, ch.act) : dev === 'pad' ? (PAD_GLYPH[ch.act] || '<i class="pad stick"></i>') : '';
  const wide = (badge.match(/<kbd/g) || []).length > 1 ? ' wide' : /pad sh/.test(badge) ? ' mid' : '';   // a two-keycap badge (A D, the arrow pair) or the shoulder glyph hangs over the chip's right end: the chip pads out so the badge never sits on its own label
  return `<span class="chip ${cls}${wide}">${esc(ch.label)}${badge ? '<span class="badges">' + badge + '</span>' : ''}</span>`;
}
function renderHint(s, h) {
  hintShown[s] = h;
  const el = $('hc' + s); if (!el) return;
  const key = h ? JSON.stringify([h.title, h.rule, h.rows, h.kick, hintDev(s), seatScheme(s), teamOfSeat(s), stickTurn(s)]) : '';
  const c = M && M.cut, dim = !!(h && h.kick && c && c.kind === 'goal' && c.g.hcOver);
  el.classList.toggle('dim', dim); el.classList.toggle('two', !!(M && M.two));   // two player: the narrower limit, clear of the seat tags
  if (key === hintKey[s]) return;
  hintKey[s] = key;
  el.hidden = !h;
  if (!h) return;
  const dev = hintDev(s);
  el.classList.toggle('kick', h.kick); el.classList.toggle('notitle', !h.title); el.classList.toggle('badged', dev === 'kb' || dev === 'pad');   // badged: the chips wear keycaps or pad glyphs, which stand 9px above the row, so the rows start lower (the badges sat on the rule line)
  $('hc' + s + '-t').textContent = h.title || ''; $('hc' + s + '-r').textContent = h.rule || '';
  $('ht' + s).hidden = h.kick;                              // kick cards sit inside the stick zone: no tick a steering thumb could hit
  $('hc' + s + '-b').innerHTML = h.rows.map(r => `<div class="hc-row">${r.chips.map(ch => chipHtml(s, ch)).join('<span class="hc-or">or</span>')}<span>${esc(r.text)}</span></div>`).join('');
}
function renderHintSwitches() {                            // the pause card's rows, the join cards' ticks, the penalty card's tick and sublines, Replay Tutorial
  const pair = !!(M && M.two && mode === 'match');
  $('pz-hl0').textContent = pair ? 'Player 1 Hints' : 'Hints'; $('pz-hrow1').hidden = !pair; $('pz-cam').hidden = pair || !!practice;
  for (const s of [0, 1]) { const seg = $('pz-h' + s); if (seg && seg.children) [...seg.children].forEach((b, i) => b.setAttribute('aria-pressed', String((i === 0) === hintsOn(s)))); }
  for (const s of [0, 1]) $('jt' + s).classList.toggle('off', !settings.twoHints[two.swapped ? 1 - s : s]);
  const ps = penCtx && M && M.two ? seatOfTeam(penCtx.team) : 0, on = hintsOn(ps);
  $('m-pen').classList.toggle('nohints', !on); $('ht-pen').classList.toggle('off', !on);
  $('p-goal-s').textContent = $('p-goal').disabled ? 'Out of Range' : '3 Points';
  $('h-replay').disabled = !settings.tut.length;
}
/* the tutorial */
function tutMoment(c) { return c.duel ? c.kind : c.kind === 'goal' ? (c.g.watch || !isHuman(c.g.team) ? null : c.g.type === 'drop' ? 'drop' : 'goal') : c.kind; }
function tutSeatOf(c) {                                    // whose first time it is: the duel's owner, the kicker, the feeding or throwing side's player, else the human in it
  const t = c.duel ? c.own : c.kind === 'goal' ? c.g.team : c.kind === 'scrum' ? c.feed : c.team;
  const s = seatOfTeam(t); return s != null ? s : seatOfTeam(1 - t);
}
function tutStart(c) {
  const id = tutMoment(c); if (!id) return;
  const s = tutSeatOf(c); if (s == null) return;
  if (tutSeen(id)) return;
  tutMark(id);                                             // remembered at its first time whether or not the card shows, so the first-time aids come once
  if (!interactive() || !hintsOn(s)) return;
  M.tut = { id, seat:s, step:0, cut:c };
  renderTut();
}
/* a card's words name the control for the device: on a keyboard every key is a {code} token (KeyJ, Slash), which renderTut draws as a
   keycap through tutHtml, as the hint chips do, so Player 2's / . , never read as punctuation in the sentence and A and D never as words */
function tutHtml(text) { return text.split(/(\{[A-Za-z0-9]+\})/).map(part => (/^\{[A-Za-z0-9]+\}$/.test(part) ? `<kbd class="kc">${esc(KEYCAP[part.slice(1, -1)] || part.slice(1, -1))}</kbd>` : esc(part))).join(''); }
function tutCards(id, s) {
  const dev = hintDev(s), kb = dev === 'kb', pad = dev === 'pad', sch = seatScheme(s) || 'solo', R = sch === 'right';
  const PAD = { a:'Bottom Button', b:'Right Button', c:'Shoulder' };
  const key = act => '{' + KB[sch][act][0] + '}';
  const name = (act, word) => (kb ? key(act) : pad ? 'the ' + PAD[act] : word);   // a keycap, the Bottom Button, or the button's own word
  const flick = kb ? (R ? 'Tap an Arrow' : 'Tap {KeyA} or {KeyD}') : 'Flick the Stick', steer = kb ? (R ? 'the Arrows' : '{KeyA} and {KeyD}') : 'the Stick', aim = M && M.kids ? '' : 'Steer With ' + steer + ', ';   // Kids sets the aim
  switch (id) {
    case 'past': return [['Get Past', 'Beat the Last Defender'], ['Get Past', flick + ' Away From Them When the Ring Turns Gold']];
    case 'pass': return [['Key Pass', 'Two on One'], ['Key Pass', 'Press ' + name('a', 'Pass') + ' on Gold, or ' + name('b', 'Dummy') + ' If They Drift to Your Runner']];
    case 'tackle': return [['Tackle', 'You Are the Last Defender'], ['Tackle', 'Press ' + name('a', 'Tackle') + ' When the Ring Turns Gold. They May Step']];
    case 'block': return [['Block', 'Their Pass Crosses Your Player'], ['Block', 'Press ' + name('a', 'Block') + ' on the Real Release, Not the Dummy']];
    case 'scrum': return [['Scrum', 'Crouch, Bind, Set'], ['Scrum', 'Press ' + name('a', 'Push') + ' on Set, Then Tap It Fast']];
    case 'lineout': return [['Lineout', 'One Jumper Each'], ['Lineout', 'Press ' + name('a', 'Jump') + ' So Your Jumper Is Up When the Ball Arrives']];
    case 'goal': return [['Goal Kick', 'Kick Between the Posts'], ['Goal Kick', aim + 'Hold ' + name('a', 'Kick') + ', Let Go in the Gold']];
    default: return [['Drop Goal', 'Three Points From Open Play'], ['Drop Goal', 'Hold ' + name('b', 'Kick') + ', ' + aim + 'Let Go in the Gold Before They Reach You']];
  }
}
function renderTut() {
  const T = M && M.tut, el = $('m-tut');
  if (!T) { el.hidden = true; return; }
  const [title, text] = tutCards(T.id, T.seat)[T.step], eb = $('tu-eye');
  eb.textContent = M.two ? 'Player ' + (T.seat + 1) + ' · Tutorial' : 'Tutorial'; eb.classList.toggle('p1', M.two && T.seat === 0); eb.classList.toggle('p2', M.two && T.seat === 1);
  $('tu-title').textContent = title; $('tu-text').innerHTML = tutHtml(text);
  $('tu-row').hidden = T.step !== 0; $('tu-play').hidden = T.step === 0;
  setFocus(null); el.hidden = false;
}
function tutAdvance() { if (!M || !M.tut) return; if (M.tut.step === 0) { M.tut.step = 1; renderTut(); } else tutPlay(); }
function tutPlay() {                                        // Play (or Skip): the close-up runs from its first frame
  if (!M || !M.tut) return;
  const c = M.tut.cut; M.tut = null; $('m-tut').hidden = true;
  if (c && c.kind === 'goal' && c.g.type === 'drop' && !c.g.out) { c.g.started = false; c.g.stage = 'hold'; c.g.m = 0; c.g.pt = 0; }   // the thumb still down carries over as at the press; one lifted needs a fresh press
  if (c && c.duel) { c.slowFrom = c.t; c.acc = 0; }
  for (const inp of inputs) { inp.aPressed = inp.bPressed = inp.cPressed = false; inp.flick = 0; }
}
for (const s of [0, 1]) {
  $('ht' + s).addEventListener('click', () => setHints(s, false));
  $('jt' + s).addEventListener('click', () => setHints(s, !hintsOn(s)));
  [...($('pz-h' + s).children || [])].forEach((b, i) => b.addEventListener('click', () => setHints(s, i === 0)));
}
$('ht-pen').addEventListener('click', () => { const s = penCtx && M && M.two ? seatOfTeam(penCtx.team) : 0; setHints(s, !hintsOn(s)); });
$('m-tut').addEventListener('click', e => { if (e.target && e.target.closest && e.target.closest('button')) return; tutAdvance(); });   // a tap anywhere advances; the buttons speak for themselves
$('tu-next').addEventListener('click', tutAdvance);
$('tu-skip').addEventListener('click', tutPlay);
$('tu-play').addEventListener('click', tutPlay);
$('h-replay').addEventListener('click', () => { tutReset(); renderHintSwitches(); });

/* ---------- first-match coach (2026-10-30)
   One short line the first time each open-play move comes up on this device, through say() so it stays a banner (the on-pitch
   tags stay capped at two, and reduced motion already drops the banner's pop). Play is not frozen. One line at a time, and
   none while a game banner is up or two tags are already out. Headless, auto and the menu demo stay quiet.
   The first duel and the first goal kick keep the tutorial card, the hints card and the first-kick path: those already teach
   the moment, so the coach remembers the line and leaves the card and the path to speak. With Hints off and no card up, the
   first duel still gets its one line. A drop goal is the tutorial's own moment. */
function coachClear() { coachLast = null; coachUntil = 0; }
function bannerBusy() { const el = $('banner'); return !!(el && el.innerHTML); }
function coachStepNear(c) {                               // the Side Step hint's window: a standing defender ahead, 3.5–6m off and within 3m across
  const d = dirOf(c.team); let front = 99;
  for (const q of M.players) {
    if (q.team === c.team || !onFeet(q) || (q.x - c.x)*d <= 0.5) continue;
    if (Math.abs(q.y - c.y) < 3) front = Math.min(front, dist(q, c));
  }
  return front >= 3.5 && front <= 6;
}
function coachOpen(t) {                                   // which lines this human's buttons would earn right now
  const due = [], c = ctrlOf(t); if (!c) return due;
  const b = M.ball, k = M.contact, held = b.state === 'held' && b.carrier === c;
  if (held && c.bind && k && k.c === c && (k.tier === 'soft' || k.tier === 'wrap') && canOffload(k)) due.push('offload');
  if (!ourBall(t) && canDive(c)) due.push('tackle');
  if (held && !c.bind) { if (coachStepNear(c)) due.push('step'); due.push('pass'); }
  if (sprintOn(t)) due.push('sprint');
  return due;
}
function coachCut() {                                     // a duel or a place kick. Returns a line to say, or null after remembering one the existing aids already cover
  const c = M.cut; if (!c || c.after) return null;
  if (c.duel && isHuman(c.own) && !tipSeen('duel')) {
    const s = seatOfTeam(c.own);
    if (M.tut || (s != null && hintsOn(s))) { coachMark('duel'); return null; }   // the tutorial card or the hints card already names the gold ring
    if (c.t >= CUT_IN) return 'duel';
  }
  const g = c.kind === 'goal' ? c.g : null;
  if (g && g.type !== 'drop' && !g.watch && isHuman(g.team) && !tipSeen('kick')) {
    const s = seatOfTeam(g.team);
    if (M.tut || g.aid === 'path' || tutSeen('goal') || (s != null && hintsOn(s))) { coachMark('kick'); return null; }   // the first-kick path, the card, or a kick this device has already had
    if (c.t >= CUT_IN && (g.stage === 'aim' || g.stage === 'power')) return 'kick';
  }
  return null;
}
function coachPick() {
  const due = [];
  if (M.phase === 'cut' && M.cut) { const id = coachCut(); if (id) due.push(id); }
  else if (M.phase === 'play' && !M.cut) for (const t of [0, 1]) if (isHuman(t)) due.push(...coachOpen(t));
  for (const id of COACH_IDS) if (due.includes(id) && !tipSeen(id)) return id;
  return null;
}
function coachShow(id) {
  coachMark(id);
  coachLast = COACH_LINE[id];
  say(coachLast, 'coach');
  coachUntil = performance.now() + 1700;
}
function coachTick() {
  if (!settings.coach || !M || !interactive() || M.paused || M.over || M.tut || M.phase === 'menu' || M.phase === 'break') return;
  const id = coachPick();
  if (!id || performance.now() < coachUntil || bannerBusy() || M.tags.length >= 2 || careerCaption()) return;   // one thing to read at a kick-off: the line waits for the caption
  coachShow(id);
}

/* penalty choice: the card's kick is built now, so the card and the kick share one wind */
let penCtx = null;
function openPenalty(team, x, y, dP) {                     // the card for the human side the penalty went to; headless runs choose as the CPU does
  if (M.headless) { cpuPenalty(team, x, y, dP); return; }
  M.phase = 'menu';
  const g = makeGoal(team, penSpot(team, x), y, 'penalty', null);
  penCtx = { team, x, y, g };
  $('p-meta').textContent = Math.round(g.dist) + 'm to the Posts\u00a0· ' + (g.W.mph < KICK.wind.calm ? 'Calm' : 'Wind ' + Math.round(g.W.mph) + ' MPH');   // breaks after the dot, never before it
  $('p-goal').disabled = g.mClear > KICK.range;
  const s = M.two ? seatOfTeam(team) : null, eb = $('p-eyebrow');   // two player: the card names its player, in his colour, and only his seat acts on it (the mouse always can)
  eb.textContent = s == null ? 'Penalty' : 'Penalty · Player ' + (s + 1); eb.classList.toggle('p1', s === 0); eb.classList.toggle('p2', s === 1);
  navOnly = s;
  renderHintSwitches();                                    // the sublines (3 Points, or Out of Range) and the tick, for this player's Hints
  setFocus(null);
  $('m-pen').hidden = false;
}
for (const [id, c] of [['p-goal','goal'],['p-touch','touch'],['p-tap','tap']]) {
  $(id).addEventListener('click', () => { if (!penCtx) return; $('m-pen').hidden = true; navOnly = null; const p = penCtx; penCtx = null; penChoice(p.team, p.x, p.y, c, p.g); });
}

/* half time and full time */
let breakKind = 'half';
function fillScore(prefix) {
  $(prefix + 'n0').textContent = M.nat[0].id; $(prefix + 'n1').textContent = M.nat[1].id;
}
/* Full time only. Every number is one the match already counted: a slash is made of attempted, a dash is a side
   that does not play duels, and Metres Made is ground gained with the ball toward that side's try line. */
function fillMatchStats() {
  const el = $('br-stats');
  if (breakKind !== 'full') { el.hidden = true; return; }
  const S = M.stats, of = (made, att) => made + '/' + att;
  const row = (label, a, b) => `<tr><th scope="row">${label}</th><td>${a}</td><td>${b}</td></tr>`;
  const rows = [row('Conversions', of(S.conv.made[0], S.conv.att[0]), of(S.conv.made[1], S.conv.att[1]))];
  if (S.pen.att[0] + S.pen.att[1]) rows.push(row('Penalty Goals', of(S.pen.made[0], S.pen.att[0]), of(S.pen.made[1], S.pen.att[1])));
  if (S.dg.att[0] + S.dg.att[1]) rows.push(row('Drop Goals', of(S.dg.made[0], S.dg.att[0]), of(S.dg.made[1], S.dg.att[1])));
  rows.push(row('Tackles', of(S.tk.made[0], S.tk.att[0]), of(S.tk.made[1], S.tk.att[1])));
  const duel = t => isHuman(t) ? of(S.duelN.won[t], S.duelN.att[t]) : '\u2013';
  rows.push(row('Duels', duel(0), duel(1)));
  const metres = t => { const n = Math.round(S.gain[t]); return n < 0 ? '\u2212' + (-n) : String(n); };
  rows.push(row('Metres Made', metres(0), metres(1)));
  const head = t => `<th scope="col">${esc(M.nat[t].id)}</th>`;
  el.innerHTML = `<table><thead><tr><th scope="col"></th>${head(0)}${head(1)}</tr></thead><tbody>${rows.join('')}</tbody></table><p class="key">Made / attempted. Metres Made is ground gained with the ball.</p>`;
  el.hidden = false;
}
function showBreak(kind) {
  breakKind = kind;
  fillScore('br-');
  if (two.lost && two.lost.length) seatLost(two.lost[0]); else $('br-seat').hidden = true;
  $('br-eyebrow').textContent = kind === 'half' ? 'Half Time' : 'Full Time';
  $('br-sc').textContent = M.score[0] + ' – ' + M.score[1];
  $('br-tries').textContent = 'Tries ' + M.tries[0] + ' – ' + M.tries[1];
  $('br-pts').hidden = true;
  $('br-go').textContent = kind === 'half' ? 'Second Half' : M.two ? 'Rematch' : 'Continue';
  const pair = kind === 'full' && !!M.two;
  $('br-t0').hidden = $('br-t1').hidden = !M.two;          // the seat tags on the score row: a mirror match has two Farnhams
  if (kind === 'full') {
    const [a, b] = M.score;
    const res = M.two ? (a > b ? 'Player 1 Wins' : a < b ? 'Player 2 Wins' : 'Draw') : a > b ? M.nat[0].name + ' Win' : a < b ? M.nat[1].name + ' Win' : 'Draw';   // two player names the player, since both can be Farnham
    $('br-tries').textContent = res + ' · Tries ' + M.tries[0] + ' – ' + M.tries[1];
    if (M.champ || M.career) {
      const mp = matchPoints(a, b, M.tries[0]);
      $('br-pts').textContent = '+' + mp.p + ' Table ' + (mp.p === 1 ? 'Point' : 'Points') + (mp.why.length ? ' · ' + mp.why.join(', ') : '');
      $('br-pts').hidden = false;
    }
    if (pair) {                                              // two player: the series between the two players, counted once a match, Player 1's wins first
      if (!M.seriesDone) { M.seriesDone = true; if (a > b) series.w[0]++; else if (a < b) series.w[1]++; else series.d++; }
      $('br-series').textContent = 'Series ' + series.w[0] + ' – ' + series.w[1] + (series.d ? ' · ' + series.d + (series.d === 1 ? ' Draw' : ' Draws') : '');
    }
  }
  $('br-series').hidden = !pair || series.w[0] + series.w[1] + series.d < 2; $('br-row').hidden = !pair;   // a series needs two matches
  fillMatchStats();
  setFocus(null);
  $('m-break').hidden = false;
}
function finishMatch() {
  if (!M.two && !practice && settings.finished < 99) { settings.finished++; save(); }   // one player's own matches, played right through: quitting doesn't count
  if (M.champ && champ) recordChampResult();
  if (M.career) careerRecordResult();
  showBreak('full');
}
$('br-go').addEventListener('click', () => {
  $('m-break').hidden = true;
  if (breakKind === 'half') { M.phase = 'set'; secondHalf(); }
  else if (M.two) startTwo();                               // Rematch: the same teams and levels, the series kept
  else exitMatch();
});
$('br-teams').addEventListener('click', () => { $('m-break').hidden = true; startDemo(); openTeams('two'); });   // Change Teams: Player 1's team stays until he changes it, the series kept
$('br-menu').addEventListener('click', () => { $('m-break').hidden = true; exitMatch(); });

/* pause */
function pause() {
  if (demoOn()) { demoStop(); return; }                    // Watch How has no pause card: a hidden app, a lost focus or a turned phone ends it on the ready card, so nothing can stay held or paused
  if (practice && (practice.done || practice.ready)) return;
  if (!playing() || M.over || M.phase === 'break') return;
  M.paused = true;
  $('pz-score').textContent = practice ? practice.name : M.nat[0].name + ' ' + M.score[0] + '\u00a0–\u2060\u00a0' + M.score[1] + ' ' + M.nat[1].name;   // the score never splits across lines (the joiner stops a break after the dash). A Training Ground game is not a match: its own name, and no sides
  $('pz-quit').textContent = practice ? 'Leave Game' : 'Quit Match'; quitArmed = false;
  if (two.lost && two.lost.length) seatLost(two.lost[0]); else $('pz-seat').hidden = true;
  renderHintSwitches(); renderIcons();
  $('pz-cam-note').hidden = true;
  setFocus(null);
  $('m-pause').hidden = false;
}
function resume() {
  if (practice && (practice.done || practice.ready)) return;
  if (!M) return;
  M.paused = false; $('m-pause').hidden = true;
  for (const inp of inputs) { inp.keys.clear(); inp.aPressed = inp.bPressed = inp.cPressed = false; inp.cDown = false; inp.flick = 0; inp.gest = null; }
  clearCharge(); // a Kick released on the pause card must not fire when play resumes
  for (const s of M.side) s.pass = null;
  const c = M.cut;
  if (c && c.duel && !c.after) duelResume(c);
  else if (c && c.kind === 'goal' && !c.after) goalResume(c);
  // scrums and lineouts give the thumb a moment too, without replaying a throw backwards
  else if (c && c.kind === 'lineout' && c.outcome == null) c.t = Math.max(CUT_IN, c.t >= c.throwT ? c.throwT : 0, c.t - 0.6);
  else if (c && c.kind === 'scrum' && !c.engaged) c.t = Math.max(CUT_IN, c.t - 0.6);
}
let quitArmed = false;
$('b-pause').addEventListener('click', pause);
$('pz-resume').addEventListener('click', resume);
$('pz-quit').addEventListener('click', () => {
  if (!quitArmed) { quitArmed = true; $('pz-quit').textContent = (isDesk() ? 'Press Again to ' : 'Tap Again to ') + (practice ? 'Leave' : 'Quit'); return; }
  exitMatch();
});
document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
const uprightPhone = window.matchMedia('(orientation: portrait) and (pointer: coarse)');
function phoneUpright() { pause(); releaseTouch(); }        // the cover pauses the match; the stick and the buttons let go too, so nothing is left held when the phone comes back
function onOrientation() { if (uprightPhone.matches) phoneUpright(); }
if (uprightPhone.addEventListener) uprightPhone.addEventListener('change', onOrientation);
else if (uprightPhone.addListener) uprightPhone.addListener(onOrientation);

/* home. Quick Match is the gold button and the keyboard focus. */
const BOOL = { sound:1, hints:1, coach:1 };
function renderHome() {
  renderCabinet('home-history');
  $('home-cabinet').hidden = !champHistory.length;
  for (const seg of document.querySelectorAll('.seg[data-key]')) {
    const key = seg.dataset.key;
    const val = key === 'pool' ? POOL_TABS.indexOf(settings.pool) : key === 'diff' ? kidsSegIndex() : BOOL[key] ? ((key === 'hints' ? settings.hints || settings.coach : settings[key]) ? 0 : 1) : settings[key];   // Difficulty is Kids | Easy | Normal | Hard (kids.js)
    [...seg.children].forEach((b, i) => b.setAttribute('aria-pressed', String(i === val)));
  }
  const note = $('champ-note');
  const live = champ && champ.teams && champ.teams[champ.user] && champ.round < 5;
  const done = champ && champ.teams && champ.teams[champ.user] && champ.round >= 5;
  if (live) {
    $('b-champ').textContent = 'Continue Championship';
    note.textContent = champNote(champ);
    note.hidden = false;
  } else if (done) {
    $('b-champ').textContent = 'Final Table';
    note.textContent = champNote(champ);
    note.hidden = false;
  } else { $('b-champ').textContent = 'Championship'; note.hidden = true; }
  renderCareerHome();
  renderYourTeam();
  renderIcons();
}
/* Your Team: the side you support, whichever you pick. Its league line and record show only where the list has real
   figures; a team you made or imported has none, so it shows none. The key names no side once a team is deleted or a
   league removed, and then this is the default. */
const myTeamOf = () => { const k = settings.myTeam; return ALL_TEAMS.find(t => t.id === k) || custom.find(t => t.key === k) || (importLeague && importLeague.teams.find(t => t.key === k)) || DEFAULT_TEAM; };
const yourTeamLeague = t => (t.league ? t.league + ' · ' + ordinal(t.place) + ' Last Season' : '');
const yourTeamRecord = t => (t.league ? ['Won ' + t.w, ...(t.d ? ['Drew ' + t.d] : []), 'Lost ' + t.l, t.pf + ' Scored', t.pa + ' Conceded'].join(' · ') : '');
function renderYourTeam() {
  const t = myTeamOf(), league = $('yt-league'), rec = $('yt-record');
  const womens = t.key ? teamSide(t) === 1 : settings.womens === 1;   // a listed side's figures are the men's, so they don't show on Women's; a team you made has its own side
  $('yt-jersey').innerHTML = jersey(t);
  const rated = t.key ? t : sideVersion(t, settings.womens);   // on Women's, a nation's own rating, and none for a nation with no women's side
  $('yt-stars').innerHTML = rated ? teamStars(rated) : '';
  $('yt-name').textContent = t.name;
  $('yt-eyebrow').textContent = womens ? "Your Team · Women's" : 'Your Team';
  league.textContent = womens ? '' : yourTeamLeague(t); league.hidden = !league.textContent;
  rec.textContent = womens ? '' : yourTeamRecord(t); rec.hidden = !rec.textContent;
  $('yt-play').textContent = t.key || sideVersion(t, settings.womens) ? 'Play as ' + t.name : 'Pick a Team';   // on Women's, a nation with no women's side
}
function yourTeamFit() { careerFit($('yt-panel')); }       // once the screen shows: a long name steps down until it fits
$('yt-play').addEventListener('click', () => { ac(); openTeams('quick'); });
$('yt-change').addEventListener('click', () => { ac(); openTeams('my'); });
function goHome() {
  navOnly = null;
  ratingsSync();
  renderHome();
  showScreen('s-home');
  yourTeamFit();
  const b = $('b-quick');
  if (b && typeof b.focus === 'function') b.focus();
}
for (const seg of document.querySelectorAll('.seg[data-key]')) {
  [...seg.children].forEach((btn, i) => btn.addEventListener('click', () => {
    const key = seg.dataset.key;
    if (key === 'diff' && kidsLevel() && i !== 0) { parentGate(() => { kidsSegSet(i); save(); renderHome(); }); return; }   // only a grown-up takes the game off the Kids level; a cancelled check leaves it as it was
    if (key === 'diff') kidsSegSet(i); else if (BOOL[key]) settings[key] = i === 0; else if (key === 'pool') settings.pool = POOL_TABS[i]; else if (key === 'womens') pickSideSet(i); else settings[key] = i;
    if (key === 'hints') settings.coach = settings.hints; // one home switch for control hints and coach tips
    save(); renderHome();
    if (key === 'sound') { if (settings.sound) ac(); else soundOff(); }
    if (key === 'pool') { renderTeams(); $('s-teams').scrollTop = 0; }
  }));
}
$('b-champ').addEventListener('click', () => {
  ac();
  if (champ) { renderHub(); showScreen('s-hub'); }
  else openTeams('champ');
});
$('b-quick').addEventListener('click', () => { ac(); openTeams('quick'); });
/* The camera and the half length: an icon button each, and a press moves to the next choice, with the choice in words on the button. Camera is on the home screen and the
   pause card (renderHintSwitches hides it for Two Player and the Training Ground, where it doesn't apply), and a change there takes effect in that match. Half length is the home screen's only. */
const CAM_WORDS = ['Top', 'Low', 'Mid', 'High'], HALF_WORDS = HALF_SECONDS.map(s => s/60 + ' Min');
function iconWord(id, name, word) { const b = $(id), label = name + ': ' + word; $(id + '-w').textContent = word; b.setAttribute('aria-label', label); b.title = label; }
function renderIcons() {
  for (const id of ['b-cam', 'pz-cam']) iconWord(id, 'Camera', CAM_WORDS[settings.cam]);
  iconWord('b-half', 'Half Length', HALF_WORDS[settings.half]);
}
function camNext() { settings.cam = (settings.cam + 1) % CAM_WORDS.length; settings.camPick = true; save(); renderIcons(); }   // a real choice, so a Top chosen here survives a reload (cleanSettings)
function halfNext() { settings.half = (settings.half + 1) % HALF_WORDS.length; save(); renderIcons(); }
$('b-cam').addEventListener('click', () => { camNext(); BV.peekUntil = performance.now() + BV_DEMO_PEEK; });   // the demo behind the home shows the height just picked for a moment, so the word has a picture
$('pz-cam').addEventListener('click', () => { camNext(); $('pz-cam-note').hidden = !(M && M.cut); });   // a close-up has its own camera: say so, or the press looks as if it did nothing
$('b-half').addEventListener('click', halfNext);
$('b-help').addEventListener('click', () => { renderHintSwitches(); showScreen('s-help'); });   // Replay Tutorial is dim with nothing to replay
$('h-back').addEventListener('click', goHome);
$('t-back').addEventListener('click', () => { if (pickMode === 'two') { navOnly = null; renderJoin(); showScreen('s-join'); return; } goHome(); });
$('t-change').addEventListener('click', () => { if (pickMode === 'two') twoSel.picking = 0; else { quickPick = null; quickAuto = false; } renderTeams(); $('s-teams').scrollTop = 0; });
$('t-default').addEventListener('click', () => pickTeam(myTeamOf()));   // pickTeam makes it the side on screen

/* two player: the join screen (computers only: the home button is desk-only), then the team screen for each player, then the match.
   Both seats start on the keyboard halves, so a keyboard pair has nothing to set up; a controller takes a seat with one press on this
   screen (the seats model is switched on here, so pads can claim), Use Keyboard gives it back, Swap Players swaps the halves and the
   Difficulty that goes with them. Each player's Difficulty is his own and is remembered. Each seat's card carries its legend: the
   keycaps or pad buttons for Run, Pass, Kick and Sprint, lit while held, so a pair learns the keys here and sees a keyboard that can't
   hold them all. Player 1 picks his team first, then Player 2. */
let twoSel = { teams:[DEFAULT_TEAM, null], levels:[1, 1], picking:0 }, series = { w:[0, 0], d:0 };
const KEY_LEGEND = {
  left:[['Run', ['KeyW', 'KeyA', 'KeyS', 'KeyD']], ['Pass', ['KeyF']], ['Kick', ['KeyG']], ['Sprint', ['KeyH']]],
  right:[['Run', ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight']], ['Pass', ['Slash']], ['Kick', ['Period']], ['Sprint', ['Comma']]],
  solo:[['Run', ['KeyW', 'KeyA', 'KeyS', 'KeyD']], ['Pass', ['KeyJ']], ['Kick', ['KeyK']], ['Sprint', ['KeyL']]],
};
const ARROW_KEY = { ArrowUp:'u', ArrowLeft:'l', ArrowDown:'d', ArrowRight:'r' };
function seatDev(s) { return seatScheme(s) ? 'Keyboard' : 'Controller'; }
function legendHtml(s) {                                   // the seat's legend: four cells, Run Pass Kick Sprint, keycaps by the scheme (arrows as CSS triangles, never a glyph) or the pad's glyphs by position
  const cell = (caps, label, four) => `<span class="lg"><span class="caps${four ? ' four' : ''}">${caps}</span><span class="lbl">${label}</span></span>`;
  const sch = seatScheme(s);
  if (!sch) return cell('<i class="pad stick" data-pad="stick"></i>', 'Run') + cell('<i class="pad dia" data-pad="big"><b></b><b></b><b class="on"></b><b></b></i>', 'Pass')
    + cell('<i class="pad dia" data-pad="small"><b></b><b class="on"></b><b></b><b></b></i>', 'Kick') + cell('<i class="pad sh" data-pad="sh"></i>', 'Sprint');
  const kc = code => (ARROW_KEY[code] ? `<kbd class="kc ar ${ARROW_KEY[code]}" data-code="${code}"></kbd>` : `<kbd class="kc" data-code="${code}">${KEYCAP[code]}</kbd>`);
  return KEY_LEGEND[sch].map(([label, codes]) => cell(codes.map(kc).join(''), label, codes.length > 1)).join('');
}
function openJoin() {
  resetSeats(); setTwo(true); navOnly = null;
  twoSel = { teams:[DEFAULT_TEAM, null], levels:settings.twoDiff.slice(), picking:0 }; series = { w:[0, 0], d:0 };
  renderJoin(); showScreen('s-join'); $('s-join').scrollTop = 0;
}
function renderJoin() {
  for (const s of [0, 1]) {
    $('j-dev' + s).textContent = seatDev(s);
    $('j-kb' + s).hidden = two.seats[s].dev !== 'pad';   // its row keeps its height either way, so the two Difficulty rows stay level
    $('j-leg' + s).innerHTML = legendHtml(s);
    [...$('j-diff' + s).children].forEach((b, i) => b.setAttribute('aria-pressed', String(i === twoSel.levels[s])));
  }
  $('j-pad').hidden = two.seats[0].dev === 'pad' && two.seats[1].dev === 'pad';
  renderHintSwitches();                                    // the Hints ticks: by half, so they follow Swap Players and show the saved state when the screen opens
}
function seatsChanged() { if (two.on && !$('s-join').hidden) renderJoin(); }   // a pad claiming a seat, Use Keyboard, Swap Players or a pad unplugged: the join screen follows
function startTwo() { navOnly = null; startMatch(twoSel.teams[0], twoSel.teams[1], false, { two:true, levels:twoSel.levels.slice() }); }
$('b-two').addEventListener('click', () => { ac(); openJoin(); });
$('j-back').addEventListener('click', () => { setTwo(false); goHome(); });
const saveTwoDiff = () => { settings.twoDiff = two.swapped ? twoSel.levels.slice().reverse() : twoSel.levels.slice(); save(); };   // stored by half (left, right): a fresh visit puts the halves back in order
function swapPlayers() { twoSwap(); twoSel.levels.reverse(); saveTwoDiff(); renderJoin(); }   // Swap Players: the device, the half and the Difficulty go with the player
function useKeyboard(s) { twoRelease(s); renderJoin(); }
$('j-swap').addEventListener('click', swapPlayers);
$('j-go').addEventListener('click', () => { ac(); openTeams('two'); });
for (const s of [0, 1]) {
  $('j-kb' + s).addEventListener('click', () => useKeyboard(s));
  [...$('j-diff' + s).children].forEach((b, i) => b.addEventListener('click', () => { twoSel.levels[s] = i; saveTwoDiff(); renderJoin(); }));
}

/* team select */
const esc = v => String(v).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]);
const keyOf = t => t.key || t.id;
function jersey(t, cls) {
  const k = HEX.test(t.kit) ? t.kit : '#888888', tr = HEX.test(t.trim) ? t.trim : '#f2efe6';
  return `<span class="jw ${cls || ''}"><span class="jersey${t.hoops ? ' hoops' : ''}" style="--kit:${k};--trim:${tr}"></span></span>`;
}
/* A side's stars, drawn: five star shapes, the lit ones over the dim, so a half star is half lit and half dim at any size. Inline, like the home's icons, so there is nothing to load. n is starsOf's value, whole or half.
   The picture carries its words for a screen reader, or quiet leaves them out where the same words are already beside it. */
const STAR_SHAPE = (i, half) => {
  const pts = []; for (let k = 0; k <= (half ? 5 : 9); k++) { const r = k % 2 ? 4.5 : 9.8, a = (-90 + (half ? -36 : 36)*k)*Math.PI/180; pts.push((10 + 20*i + r*Math.cos(a)).toFixed(1) + ' ' + (10.6 + r*Math.sin(a)).toFixed(1)); }
  return 'M' + pts.join('L') + 'Z';
};
const STAR_OFF = [0, 1, 2, 3, 4].map(i => STAR_SHAPE(i)).join('');
function starsHtml(n, quiet) {
  const whole = Math.floor(n), on = [0, 1, 2, 3, 4].filter(i => i < whole).map(i => STAR_SHAPE(i)).join('') + (n > whole ? STAR_SHAPE(whole, true) : '');
  return `<svg class="tstars" viewBox="0 0 100 20" ${quiet ? 'aria-hidden="true"' : `role="img" aria-label="${starsWords(n)}"`}><path class="off" d="${STAR_OFF}"/><path class="on" d="${on}"/></svg>`;
}
const teamStars = t => starsHtml(starsOf(t));
const fxName = (t, fit) => `<span class="fx-name"><span${fit ? ' data-fit' : ''}>${esc(t.name)}</span>${teamStars(t)}</span>`;   // a side's name with its stars under it, in a fixture
const jerseyRated = t => jersey(t).replace(/<\/span>$/, `<span class="ovr" aria-label="Overall ${overallOf(t)}">${overallOf(t)}</span></span>`);
function pips(v) { let s = ''; for (let i = 1; i <= 5; i++) s += `<i class="${i <= v ? 'on' : ''}"></i>`; return `<span class="pips" aria-label="${v} of 5">${s}</span>`; }
let teamList = [];
function teamCard(t, i) {
  const picked = pickMode === 'quick' && quickPick && keyOf(quickPick) === keyOf(t);
  const stronger = pickMode === 'quick' && quickPick && !picked && outmatched(quickPick, t);
  const yours = pickMode === 'my' && keyOf(myTeamOf()) === keyOf(t);   // Change Team: your team now is marked and can still be pressed, to keep it
  const btn = `<button class="team${picked || yours ? ' picked' : ''}" data-i="${i}" ${picked ? 'aria-disabled="true"' : ''}${yours ? ' aria-current="true"' : ''}>
      ${jerseyRated(t)}<span class="tid"><span class="tname">${esc(t.name)}</span>${teamStars(t)}</span>
      ${t.league ? `<span class="tline">${ordinal(t.place)} · ${t.pf} Scored · ${t.pa} Conceded</span>` : ''}
      ${stronger ? '<span class="gap">Stronger Side</span>' : ''}
      <span class="stats">${ABILITIES.map(([k, l]) => `<span>${l}</span>${pips(Math.round(abilityOf(t, k)))}`).join('')}</span>
    </button>`;
  return t.custom ? `<div class="tcard">${btn}<button class="btn" data-edit="${i}">Edit</button></div>` : btn;
}
/* The list on a tab, as Men's (0) or Women's (1): International is every nation of that side, strongest first; a club list is the same clubs at the same ratings. */
const poolTeams = (i, g = 0) => (i === IMPORT_POOL ? (importLeague ? importLeague.teams.filter(t => pickMode === 'my' || sidesMeet(t, { g })) : g ? CLUBS.map(womenClub) : CLUBS) : i === 0 ? nationsRanked(g) : g ? POOLS[i].map(womenClub) : POOLS[i]);
/* Men's | Women's is for Quick Match and a Championship, and goes for the whole pick. Two Player has no toggle (Top shows no body difference) and plays men's ratings. */
const pickToggled = () => pickMode === 'quick' || pickMode === 'champ';
const pickG = () => (pickToggled() ? settings.womens : 0);
/* A club tab reads strongest first, as International does, level sides in list order, so England stays in its table order. My League keeps its own table's order. */
const tabTeams = (i, g = 0) => { const l = poolTeams(i, g); return i === IMPORT_POOL || i === 0 ? l : l.slice().sort((a, b) => rateOf(b) - rateOf(a)); };
/* The line under the tabs says where the numbers come from. A women's club has no results of its own here yet. My League's come from your league's table, and the import says so. */
const tabRatingsLine = (i, g = 0) => (i === IMPORT_POOL ? '' : i === 0 ? ratingsLine() : g ? "Club Ratings Use the Men's Results for Now" : "Ratings from Last Season's Table, Scored and Conceded");
const pickFits = t => pickMode === 'my' || sidesMeet(t, { g:pickG() });   // a team you made or imported keeps its side, so it shows only where it can play; Your Team's picker shows them all
/* Your own team keeps its side, so the toggle goes with it: a picked team that has no version on the new side is put down, never left to play the wrong one. */
function pickFollow(t) {
  const s = teamSide(t);
  if (!pickToggled() || s === 'mixed' || settings.womens === s) return;
  settings.womens = s;
  if (quickPick && quickPick !== t) quickPick = sideVersion(quickPick, s);
}
/* The toggle: the team you have picked becomes its own other side (England's women, Farnham's women), or, with none (Georgia, a men's team you made), is put down, and you pick again. */
function pickSideSet(g) {
  if (!pickToggled() || (g !== 0 && g !== 1) || settings.womens === g) return;
  settings.womens = g;
  if (quickPick) { quickPick = sideVersion(quickPick, g); if (!quickPick) quickAuto = false; }
  renderTeams(); $('s-teams').scrollTop = 0;
}
function poolOfTeam(t) {                                   // the tab a side is on: its own list first, Local for a team you made
  if (t.custom) return 1;
  if (importLeague && importLeague.teams.includes(t)) return IMPORT_POOL;
  return allNations().includes(t) ? 0 : Math.max(1, POOLS.findIndex(p => p.includes(t)));
}
function poolTabCue(row) {                                 // a fade on the side with more tabs to swipe to: the scrollbar is hidden, and a tab past the edge would otherwise look gone
  const left = row.scrollLeft, room = row.scrollWidth - row.clientWidth;
  row.classList.toggle('more-l', left > 1);
  row.classList.toggle('more-r', left < room - 1);
}
function poolTabShow() {                                   // the tabs scroll sideways on a narrow screen: keep the one in use in view, without moving the page
  for (const b of document.querySelectorAll('.pool button')) {
    const row = b.parentElement;
    if (!row) continue;
    if (b.getAttribute('aria-pressed') === 'true') {
      const r = b.getBoundingClientRect(), o = row.getBoundingClientRect();
      if (r.left < o.left) row.scrollLeft += r.left - o.left;
      else if (r.right > o.right) row.scrollLeft += r.right - o.right;
    }
    poolTabCue(row);
  }
}
for (const row of document.querySelectorAll('.pool')) row.addEventListener('scroll', () => poolTabCue(row), { passive:true });
function openTeams(m) {
  ratingsSync();                                           // new ratings count from a new pick on
  const mine = m === 'two' ? null : myTeamOf();            // Your Team's tab; Two Player opens on Local
  pickMode = m; settings.pool = mine ? poolOfTeam(mine) : 1;
  if ((m === 'quick' || m === 'champ') && mine.key) pickFollow(mine);
  quickPick = m === 'quick' ? sideVersion(mine, settings.womens) : null; quickAuto = !!quickPick;
  if (m === 'two') twoSel.picking = 0;                     // Player 1 picks first (Change Teams after a match comes back here too)
  renderTeams(); showScreen('s-teams'); $('s-teams').scrollTop = 0;
}
function renderTeams() {
  const quick = pickMode === 'quick', pair = pickMode === 'two', my = pickMode === 'my', p = twoSel.picking, mine = pair ? twoSel.teams[0] : quickPick;   // two player: Player 1 picks first; while Player 2 picks, Player 1's team sits in the bar with Change Team (his own big action presses it); the title and eyebrow are the picker's, in his colour
  const eb = $('t-eyebrow');
  eb.textContent = quick ? 'Quick Match' : pair ? 'Two Player' : my ? 'Your Team' : 'Championship';
  eb.classList.toggle('p1', pair && p === 0); eb.classList.toggle('p2', pair && p === 1);
  $('t-title').textContent = pair ? 'Player ' + (p + 1) + ' Team' : quick && quickPick ? 'Pick Opponent' : 'Pick Your Team';
  if (settings.pool === IMPORT_POOL && importLeague && !importLeague.teams.some(pickFits)) settings.pool = 1;   // the league is all the other side
  [...document.querySelectorAll('.pool button')].forEach((b, i) => b.setAttribute('aria-pressed', String(POOL_TABS[i] === settings.pool)));
  poolTabShow();
  $('t-side').hidden = !pickToggled();
  [...$('t-side').children].forEach((b, i) => b.setAttribute('aria-pressed', String(i === settings.womens)));
  $('t-ratings').textContent = tabRatingsLine(settings.pool, pickG()); $('t-ratings').hidden = !$('t-ratings').textContent;
  const yours = (quick && !!quickPick) || (pair && p === 1);
  $('t-yours').hidden = !yours;
  if (yours) $('t-mine').innerHTML = `${jersey(mine)}<span class="fx-name"><span>${pair ? 'Player 1 · ' : ''}${esc(mine.name)}</span>${teamStars(mine)}</span>`;
  const supported = myTeamOf();                            // a championship's gold button: Your Team, on the tab it plays from, where it has a side to play
  $('t-default').hidden = pickMode !== 'champ' || settings.pool !== poolOfTeam(supported) || !sideVersion(supported, settings.womens);
  $('t-back').textContent = pair ? 'Back to Players' : 'Back to Menu';
  navOnly = pair ? p : null;
  $('t-default').textContent = 'Play as ' + supported.name;
  teamList = [...tabTeams(settings.pool, pickG()), ...custom.filter(pickFits)];   // My League: src/import.js
  let html = teamList.map(teamCard).join('');
  if (custom.length < MAX_CUSTOM) html += `<button class="team create" id="t-create"><span class="plus" aria-hidden="true">+</span><span class="tname">Create Team</span></button>`;
  html += importCard();                                    // Import Club, src/import.js
  $('t-grid').innerHTML = html;
  for (const b of $('t-grid').querySelectorAll('.team[data-i]')) b.addEventListener('click', () => pickTeam(teamList[+b.dataset.i]));
  for (const b of $('t-grid').querySelectorAll('[data-edit]')) b.addEventListener('click', () => openBuilder(teamList[+b.dataset.edit]));
  const cr = $('t-create'); if (cr) cr.addEventListener('click', () => openBuilder(null));
  importBind();
  fitNames();
}
/* A name too long for its card steps down in size until its longest word fits. */
function fitNames() {
  for (const el of $('t-grid').querySelectorAll('.tname')) {
    el.style.fontSize = '';
    let px = parseFloat(getComputedStyle(el).fontSize) || 24;
    while (el.scrollWidth > el.clientWidth + 0.5 && px > 13) { px -= 1; el.style.fontSize = px + 'px'; }
  }
}
/* A championship is your team and five others from the list on screen (champOthers). */
function pickTeam(t) {
  if (pickMode === 'my') { settings.myTeam = keyOf(t); save(); goHome(); return; }
  if (!pickFits(t) && (t.key || pickMode === 'two')) return;   // a side the list on screen would not show
  if (pickMode === 'two') {                                  // Player 1 changing their team comes back to Player 2's pick; Player 2's pick starts the match
    if (twoSel.picking === 0) { twoSel.teams[0] = t; twoSel.picking = 1; renderTeams(); $('s-teams').scrollTop = 0; return; }
    twoSel.teams[1] = t; startTwo(); return;
  }
  t = sideVersion(t, settings.womens);                       // the whole pick is one side
  if (!t) return;
  if (pickMode === 'champ') {
    newChamp(t, champOthers(t, settings.pool, settings.womens)); renderHub(); showScreen('s-hub'); return;
  }
  if (quickPick == null) { quickPick = t; quickAuto = false; renderTeams(); $('s-teams').scrollTop = 0; return; }
  if (keyOf(quickPick) === keyOf(t)) return;   // the picked card can still be reached from the keyboard
  startMatch(quickPick, t, false);
}

/* create team */
let draft = null, editing = null, codeTouched = false, delArmed = false;
let levelChoosing = false, levelNote = '';                 // a new team starts on the level list; the note says what a lower level took off
const spent = d => ABILITIES.reduce((a, [k]) => a + d[k] - 1, 0);
const BD_SIDES = [0, 1, 'mixed'];                            // Men's | Women's | Mixed
/* Setting the level sets the team's ability: a team set at four stars is a four-star team, with nothing more to do. The abilities go through cleanTeam's own cut, so what you see here is what it saves as, and any that came down are named; any points the level has left go on from what the team has now (abilitiesFor), and can be moved about. */
function builderLevel(id) {
  const l = TEAM_LEVELS.find(v => v.id === id); if (!l || !draft) return;
  const cut = cleanTeam({ ...draft, level:id }, 0), down = ABILITIES.filter(([k]) => cut[k] < draft[k]).map(([, n]) => n);
  for (const [k] of ABILITIES) draft[k] = cut[k];
  const room = l.budget - spent(draft);
  if (room > 0) Object.assign(draft, abilitiesFor(draft, ABILITIES.length + l.budget));
  draft.level = id; levelChoosing = false;
  levelNote = down.length ? `${l.name} has ${l.budget} ${l.budget === 1 ? 'point' : 'points'}, so ${down.length > 1 ? down.slice(0, -1).join(', ') + ' and ' + down[down.length - 1] + ' came' : down[0] + ' came'} down.` : room > 0 ? 'Your points are shared out. Take one off an ability to add it to another.' : '';
  renderBuilder(); $('s-build').scrollTop = 0;
}
function buildBuilder() {
  $('bd-level-grid').innerHTML = TEAM_LEVELS.map(l => `<button class="btn lv" data-level="${l.id}"><span class="lv-name">${l.name}</span><span class="lv-sub">${starsHtml(l.stars)}<span>${l.budget} ${l.budget === 1 ? 'Point' : 'Points'}</span></span></button>`).join('');
  for (const b of $('bd-level-grid').querySelectorAll('[data-level]')) b.addEventListener('click', () => builderLevel(b.dataset.level));
  $('bd-level-change').addEventListener('click', () => { levelChoosing = true; renderBuilder(); $('s-build').scrollTop = 0; });
  $('bd-level-keep').addEventListener('click', () => { levelChoosing = false; renderBuilder(); });
  const sw = id => KIT_COLOURS.map(([n, h]) => `<button class="sw" style="--k:${h}" data-c="${h}" aria-label="${n}"></button>`).join('');
  for (const [id, key] of [['bd-kit', 'kit'], ['bd-trim', 'trim']]) {
    $(id).innerHTML = sw();
    for (const b of $(id).querySelectorAll('.sw')) b.addEventListener('click', () => { draft[key] = b.dataset.c; renderBuilder(); });
  }
  $('bd-abs').insertAdjacentHTML('beforeend', ABILITIES.map(([k, l]) => `
    <div class="ab"><span class="lbl">${l}</span>
      <button class="step" data-ab="${k}" data-d="-1" aria-label="Less ${l}">−</button>
      <span id="bd-p-${k}"></span>
      <button class="step" data-ab="${k}" data-d="1" aria-label="More ${l}">+</button>
    </div>`).join(''));
  for (const b of $('bd-abs').querySelectorAll('.step')) b.addEventListener('click', () => {
    const k = b.dataset.ab, d = +b.dataset.d;
    if (d > 0 && (draft[k] >= 5 || spent(draft) >= teamBudget(draft))) return;
    if (d < 0 && draft[k] <= 1) return;
    draft[k] += d; renderBuilder();
  });
  [...$('bd-pat').children].forEach((b, i) => b.addEventListener('click', () => { draft.hoops = i === 1; renderBuilder(); }));
  [...$('bd-side').children].forEach((b, i) => b.addEventListener('click', () => { draft.g = BD_SIDES[i]; renderBuilder(); }));
  $('bd-name').addEventListener('input', () => {
    draft.name = $('bd-name').value;
    if (!codeTouched) $('bd-code').value = autoCode(draft.name.trim() || 'My Team', editing && editing.key);
    renderBuilder();
  });
  $('bd-code').addEventListener('input', () => {
    codeTouched = true;
    const v = $('bd-code').value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3);
    if ($('bd-code').value !== v) $('bd-code').value = v;
  });
  for (const id of ['bd-name', 'bd-code']) $(id).addEventListener('keydown', e => { if (e.key === 'Enter') e.target.blur(); });
  $('bd-save').addEventListener('click', () => {
    const t = { ...draft, name:$('bd-name').value, id:codeFor($('bd-code').value, $('bd-name').value) };
    if (editing) {
      const i = custom.findIndex(c => c.key === editing.key);
      custom[i] = cleanTeam({ ...t, key:editing.key }, i);
      const was = quickPick && keyOf(quickPick) === editing.key;
      if (was) quickPick = custom[i];
      if (was || !quickPick) pickFollow(custom[i]);          // your team's side changed, or nothing is picked: the list follows, so the team stays in view
      if (twoSel.teams[0] && keyOf(twoSel.teams[0]) === editing.key) twoSel.teams[0] = teamSide(custom[i]) === 1 ? DEFAULT_TEAM : custom[i];   // Two Player plays men's sides
    } else {
      custom.push(cleanTeam({ ...t, key:'my' + Date.now().toString(36) }, custom.length));
      const made = custom[custom.length - 1];
      if (pickMode === 'quick' && quickAuto) { quickPick = made; quickAuto = false; pickFollow(made); }   // made it to play as it
      else if (pickMode === 'two' && twoSel.picking === 0 && pickFits(made)) { twoSel.teams[0] = made; twoSel.picking = 1; }   // Player 1 made it to play as it
      else if (pickToggled() && !quickPick) pickFollow(made);   // nothing picked yet: the list follows, so the new team is there
      else if (pickMode === 'my') { settings.myTeam = keyOf(custom[custom.length - 1]); save(); goHome(); return; }   // made it to support it
    }
    save(); renderTeams(); showScreen('s-teams');
  });
  $('bd-back').addEventListener('click', () => { renderTeams(); showScreen('s-teams'); });
  $('bd-del').addEventListener('click', () => {
    if (!delArmed) { delArmed = true; $('bd-del').textContent = 'Confirm Delete'; return; }
    custom = custom.filter(c => c.key !== editing.key);
    if (settings.myTeam === editing.key) settings.myTeam = DEFAULT_TEAM.id;
    if (quickPick && keyOf(quickPick) === editing.key) quickPick = null;
    if (twoSel.teams[0] && keyOf(twoSel.teams[0]) === editing.key) twoSel.teams[0] = DEFAULT_TEAM;
    save(); renderTeams(); showScreen('s-teams');
  });
}
function openBuilder(t) {
  editing = t;
  draft = t ? { ...t } : { name:'', kit:'#2050b0', trim:'#f2efe6', ...Object.fromEntries(ABILITIES.map(([k]) => [k, 1])) };
  codeTouched = !!t;
  $('bd-name').value = draft.name;
  $('bd-code').value = t ? t.id : autoCode('My Team');
  $('bd-eyebrow').textContent = t ? 'Edit Team' : 'Create Team';
  delArmed = false; $('bd-del').textContent = 'Delete Team';
  levelChoosing = !t; levelNote = '';                        // a new team starts by choosing its level; a saved one opens as it is, with no level if it was made before them
  renderBuilder(); showScreen('s-build'); $('s-build').scrollTop = 0;
}
function renderBuilder() {
  $('bd-title').textContent = draft.name.trim() || 'My Team';
  $('bd-jersey').innerHTML = jersey(draft) + (levelChoosing ? '' : teamStars(draft));   // once a level is chosen: what the points spent come to, on the same scale as every other side, and the level's own stars with them all spent
  [...$('bd-pat').children].forEach((b, i) => b.setAttribute('aria-pressed', String(i === (draft.hoops ? 1 : 0))));
  [...$('bd-side').children].forEach((b, i) => b.setAttribute('aria-pressed', String(BD_SIDES[i] === teamSide(draft))));
  for (const [id, key] of [['bd-kit', 'kit'], ['bd-trim', 'trim']])
    for (const b of $(id).querySelectorAll('.sw')) b.setAttribute('aria-pressed', String(b.dataset.c === draft[key]));
  const lv = teamLevelOf(draft), left = teamBudget(draft) - spent(draft);
  $('bd-levels').hidden = !levelChoosing; $('bd-form').hidden = levelChoosing; $('bd-save').hidden = levelChoosing;
  const keep = levelChoosing && !!(lv || editing), del = !levelChoosing && !!editing;   // the row under the screen: Keep This Level or Delete Team beside Back, so the level list fits a phone sideways
  $('bd-level-keep').hidden = !keep; $('bd-del').hidden = !del; $('bd-row').classList.toggle('one', !keep && !del);
  for (const b of $('bd-level-grid').querySelectorAll('[data-level]')) b.setAttribute('aria-pressed', String(!!lv && b.dataset.level === lv.id));
  $('bd-level-name').textContent = lv ? `${lv.name} · ${starsWords(lv.stars)}` : `No Level Set · ${BUDGET} Points`;
  $('bd-level-stars').innerHTML = lv ? starsHtml(lv.stars, true) : '';
  const note = lv && left > 0 ? `Spend ${left} more ${left === 1 ? 'point' : 'points'} to reach ${starsWords(lv.stars)}.` : levelNote;   // points taken off and not put back: why the shirt reads under the level
  $('bd-level-note').textContent = note; $('bd-level-note').hidden = !note;
  $('bd-left').textContent = 'Points Left ' + left; $('bd-left').classList.toggle('spent', left === 0);
  for (const [k] of ABILITIES) {
    $('bd-p-' + k).innerHTML = pips(draft[k]);
    for (const b of $('bd-abs').querySelectorAll(`.step[data-ab="${k}"]`)) b.disabled = +b.dataset.d > 0 ? draft[k] >= 5 || left <= 0 : draft[k] <= 1;
  }
}
buildBuilder();

/* hub */
/* Saved progression uses counted scores for every fixture; detailed counters belong only to played matches. */
function seasonRecord(s) {
  return s.won + ' W · ' + s.drawn + ' D · ' + s.lost + ' L';
}
function recordedStatsHtml(s, label = 'Recorded Match Stats') {
  const pair = (v, made = 'made') => v[made] + '/' + v.att;
  const row = (label, value) => `<tr><th scope="row">${label}</th><td>${value}</td></tr>`;
  return `<table class="saved-stats"><caption>${label} · your team</caption><tbody>${
    row('Conversions', pair(s.conv)) + row('Penalty Goals', pair(s.pen)) + row('Drop Goals', pair(s.dg))
    + row('Tackles', pair(s.tk)) + row('Duels', pair(s.duelN, 'won')) + row('Metres Made', Math.round(s.gain))
  }</tbody></table><p class="stat-note">Made / attempted; duels won / attempted. Metres Made is ground gained with the ball.</p>`;
}
function renderCabinet(id) {
  const history = champHistory.slice().reverse();
  const totals = savedHonours();
  const tally = [['Title', 'Titles', totals.champions], ['Grand Slam', 'Grand Slams', totals.grandSlams], ['Triple Crown', 'Triple Crowns', totals.tripleCrowns]];
  $(id).innerHTML = `<p class="stat-note">Last 10 completed seasons · saved in this browser.</p>`
    + (history.length ? `<p class="cabinet-tally">${tally.map(([singular, plural, n]) => `${n} ${n === 1 ? singular : plural}`).join(' · ')}</p>` + history.map((c, i) => {
      const rows = standings(c), place = rows.findIndex(r => r.i === c.user) + 1, s = seasonSummary(c);
      const awards = honours(c, rows).filter(h => h[1] === c.user).map(h => h[0]);
      return `<article class="season-entry"><p class="eyebrow">${i === 0 ? 'Most Recent' : 'Earlier Season'}</p><h3>${esc(c.teams[c.user].name)} · ${ordinal(place)}</h3><p>${s.played ? seasonRecord(s) : 'No matches played'}</p><p>Points ${s.pointsFor} for / ${s.pointsAgainst} against · Tries ${s.triesFor} for / ${s.triesAgainst} against</p><p class="season-awards">${awards.length ? awards.join(' · ') : 'No honours'}</p></article>`;
    }).join('') : '<p class="stat-note">Complete a championship to record your first season here.</p>');
}
function renderSeasonSummary(c) {
  const s = seasonSummary(c);
  $('hub-summary').innerHTML = `<p class="eyebrow">Your Season · ${s.played} of 5 Played</p><p class="season-record">${s.played ? seasonRecord(s) : 'No matches played'}</p><p>Points ${s.pointsFor} for / ${s.pointsAgainst} against · Tries ${s.triesFor} for / ${s.triesAgainst} against</p>`
    + (s.detailedMatches ? `<details class="season-details"><summary>Recorded Season Stats · ${s.detailedMatches} ${s.detailedMatches === 1 ? 'Match' : 'Matches'}</summary>${recordedStatsHtml(s.stats, 'Recorded Season Totals')}<p class="stat-note">Totals cover ${s.detailedMatches} recorded ${s.detailedMatches === 1 ? 'match' : 'matches'}${s.legacyMatches ? '; older matches have scores and tries only' : ''}.</p></details>` : `<p class="stat-note">${c.round >= 5 ? 'This season has scores and tries only.' : 'Detailed stats appear here after your next played match.'}</p>`);
}
function renderHub() {
  const c = champ; if (!c) return;
  archiveChampionship(c);
  renderSeasonSummary(c); renderCabinet('hub-history');
  const done = c.round >= 5;
  const T = c.teams;
  const rows = standings(c);
  const title = chaseTitle(c, rows);
  $('hub-eyebrow').textContent = 'Championship · ' + T[c.user].name;
  $('hub-title').textContent = title;
  const prize = title === 'Grand Slam' || title === 'Champions' || title === 'Triple Crown';
  $('hub-title').classList.toggle('gold', done && (title === 'Grand Slam' || title === 'Champions'));
  $('hub-chase').textContent = chaseLine(c, rows);
  $('hub-chase').classList.toggle('payoff', (done && prize) || (!done && c.round > 0 && chaseFacts(c, rows).clinched));
  if (!done) {
    const { pair } = userFixture(c);
    const [h, a] = pair;
    const stake = fixtureStake(c, rows);
    const mates = c.fixtures[c.round].filter(p => p !== pair).map(p => esc(T[p[0]].name) + ' v ' + esc(T[p[1]].name));
    const later = [];
    for (let r = c.round + 1; r < 5; r++) {
      const p = c.fixtures[r].find(x => x[0] === c.user || x[1] === c.user);
      later.push('Round ' + (r + 1) + ' · ' + esc(T[p[0] === c.user ? p[1] : p[0]].name));
    }
    const foe = T[h === c.user ? a : h];
    $('hub-next').innerHTML = `
      <div class="stack">
        <div class="fixture">
          <span class="fx-team">${jersey(T[h])}${fxName(T[h])}</span>
          <span class="fx-v">V</span>
          <span class="fx-team r">${fxName(T[a])}${jersey(T[a])}</span>
          ${stake ? `<p class="stake">${stake}</p>` : ''}
        </div>
        ${outmatched(T[c.user], foe) ? '<p class="eyebrow">Stronger Side</p>' : ''}
        <button class="btn primary" id="hub-play">Play Match</button>
        ${mates.length || later.length ? `<div class="path">
          ${mates.length ? `<p class="eyebrow">Also This Round</p><p class="ln">${mates.join(' · ')}</p>` : ''}
          ${later.length ? `<p class="eyebrow">Still to Come</p><p class="ln">${later.join(' · ')}</p>` : ''}
        </div>` : ''}
      </div>`;
    $('hub-play').addEventListener('click', () => { const { opp } = userFixture(champ); startMatch(champ.teams[champ.user], champ.teams[opp], true); });
    $('hub-hon').hidden = true;
  } else {
    $('hub-next').innerHTML = `<button class="btn primary" id="hub-new">New Championship</button>`;
    $('hub-new').addEventListener('click', () => { archiveChampionship(champ); champ = null; save(); openTeams('champ'); });
    $('hub-hon').innerHTML = honours(c, rows).map(([t, i, gold]) => `<div class="hon${gold ? ' gold' : ''}"><span class="eyebrow">${t}</span><b>${esc(T[i].name)}</b></div>`).join('');
    $('hub-hon').hidden = false;
  }
  $('hub-table').innerHTML = rows.map((r, n) => `
    <tr class="${r.i === c.user ? 'me' : ''}">
      <td class="rk">${c.round ? n + 1 : '–'}</td>
      <td class="t"><span class="chip" style="--k:${HEX.test(T[r.i].kit) ? T[r.i].kit : '#888888'};--t:${HEX.test(T[r.i].trim) ? T[r.i].trim : '#f2efe6'}"></span>${esc(T[r.i].name)}${teamStars(T[r.i])}</td>
      <td>${r.P}</td><td>${r.W}</td><td>${r.D}</td><td>${r.L}</td><td>${r.PD > 0 ? '+' : ''}${r.PD}</td><td>${r.BP}</td><td class="pts">${r.Pts}</td>
    </tr>`).join('');
  $('hub-results').innerHTML = c.results.map((rd, k) => ({ rd, k })).reverse().map(({ rd, k }) => `
    <div class="rd"><p class="eyebrow">Round ${k+1}</p>
      ${rd.map(r => { const mine = r.h === c.user || r.a === c.user; return `<div class="result-entry"><div class="res${mine ? ' me' : ''}"><span class="h">${esc(T[r.h].name)}</span><span class="sc">${r.hs} – ${r.as}</span><span>${esc(T[r.a].name)}</span></div>${mine && r.stats ? `<details class="match-details"><summary>Recorded Match Stats</summary>${recordedStatsHtml(r.stats)}</details>` : ''}</div>`; }).join('')}
    </div>`).join('');
  $('hub-reset').textContent = 'Start Fresh'; resetArmed = false;
}
let resetArmed = false;
$('hub-back').addEventListener('click', goHome);
$('hub-reset').addEventListener('click', () => {
  if (!resetArmed) { resetArmed = true; $('hub-reset').textContent = 'Tap Again to Start Fresh'; return; }
  archiveChampionship(champ); champ = null; save(); goHome();
});

/* =========================================================
   Import: paste a Pitchero or tournament link and the game builds your club and its league.

   Three parts, kept apart:
   - importUrl and importParse: text in, plain data out. No DOM, no network. Each source is one adapter in
     IMPORT_SOURCES, reading the page through importDoc (its JSON scripts, meta tags, tables and links).
   - importFetch: the Try Line app only, through Capacitor's native HTTP. The pasted page, then at most two pages it
     links to on the same site (a league table, then fixtures): three requests in all, a plain "TryLineRugby"
     User-Agent and nothing else about the device. The web build never fetches. Pitchero sends no CORS header, so a
     browser on another site could not read its pages anyway.
   - The Import Club card and its card (#m-import) on the team screen, and the My League list.

   Safeguarding. Only club and team names, shirt colours and table numbers ever leave a parser. The Pitchero adapter
   reads named fields only (the club's name and colours, the table's team cells and numbers, each fixture's
   opponent). Anything that walks a page skips every subtree under a key that can hold people (IMPORT_SKIP), reads a
   table of rows only under a key that names a standings table (IMPORT_TABLE_KEY), and takes a club's name from a page
   title only when it says it is a club. Every name passes importName, which drops anything that looks like a person,
   an email, a phone number or a link. The structure does the work: the first-name list in importPersonal is a last
   net, not the defence. Nothing about a person, the link itself or the page is kept.
   ========================================================= */
const IMPORT_MAX_SIDES = 16;                      // league opponents saved
const IMPORT_MAX_ROWS = 24;                       // rows or names a parser returns
const IMPORT_MAX_REQUESTS = 3;                    // the pasted page, a league table, fixtures
const IMPORT_TIMEOUT = 12000;                     // ms one request may take
const IMPORT_UA = 'TryLineRugby';
const IMPORT_MAX_HTML = 4000000;                  // characters of a page read: Next.js puts its data at the very end
const IMPORT_MSG = {
  url:'Paste a link that starts with https.',
  net:'Couldn’t open that page. Check the link.',
  timeout:'That page took too long. Try again.',
  empty:'No club or table on that page.',
  full:'Delete a team to make room for this club.',
};

/* ---------- what the parsers look for: data, so a new page shape is a table edit ---------- */
/* Keys whose whole subtree can hold people or their pictures: never walked. */
const IMPORT_SKIP = /^(?:players?|squads?|members?|membership|staff|officials?|coach(?:es)?|managers?|captains?|contacts?|contactpoint|authors?|users?|profiles?|people|persons?|athletes?|employees?|founders?|scorers?|try_?scorers?|lineups?|team_?sheets?|motm|man_?of_?the_?match|player_?of_?the_?match|comments?|reports?|match_?reports?|news|articles?|posts?|blogs?|galler(?:y|ies)|photos?|images?|image_?url|avatars?|logos?|crests?|emails?|phones?|telephone|mobile|address(?:es)?|welfare|committee|officers?|volunteers?|parents?|guardians?|statistics|leaders|leaderboards?|rankings?|individuals?|awards?|sponsors?|videos?|media|socials?|social_?links)$/i;
const IMPORT_KEYS = {
  name:['team_name', 'teamName', 'team', 'club', 'clubName', 'club_name', 'name', 'title', 'displayName', 'display_name', 'shortName', 'short_name'],
  played:['played', 'p', 'pl', 'pld', 'gp', 'mp', 'gamesPlayed', 'games_played', 'matchesPlayed', 'matches_played'],
  won:['won', 'w', 'wins'],
  drawn:['drawn', 'drew', 'd', 'draws', 'drawn_games'],
  lost:['lost', 'l', 'losses'],
  points:['points', 'pts', 'pt', 'totalPoints', 'total_points', 'league_points'],
  kit:['primary_colour', 'primaryColour', 'primary_color', 'primaryColor', 'colour1', 'color1', 'kitColour', 'kit_colour', 'shirtColour', 'shirt_colour'],
  trim:['secondary_colour', 'secondaryColour', 'secondary_color', 'secondaryColor', 'colour2', 'color2', 'trimColour', 'trim_colour'],
  own:['is_highlighted', 'isHighlighted', 'isCurrentTeam', 'is_current_team', 'isOwnTeam'],
  opponent:['opponent', 'opponentName', 'opponent_name', 'opposition', 'oppositionName', 'opposition_name'],
  sides:['homeSide', 'awaySide', 'homeTeam', 'awayTeam', 'home_team', 'away_team'],
  club:/^(?:club|clubinfo|club_info|organisation|organization)$/i,
};
/* The only keys a JSON table of rows is read under, letters only and lower case (leagueTable, league_table): a
   standings table names itself. A leaderboard, a ranking or a list of records is a list of people, and is never read. */
const IMPORT_TABLE_KEY = /^(?:(?:league|pool|group|division|competition|conference)?(?:standings?|tables?|ladders?|positions)|(?:league|pool|group|division|competition|conference|standings?|table)?rows|leagues?|teams|clubs)$/;
/* A page title or og:title names the club only in a part that says it is one: Arlo Smith's page is never a club. */
const IMPORT_TITLE_CLUB = /\b(?:r\.?u?\.?f\.?c|rugby|club|f\.?c)\b/i;
/* A standings table's header cells, and a fixtures table's. A player table (Player, Apps, Tries, Pts) has no team
   column and no W or L, so it never passes. */
const IMPORT_COLS = {
  name:['team', 'teams', 'club', 'clubs', 'side', 'team name', 'club name'],
  played:['p', 'pl', 'pld', 'played', 'gp', 'mp'],
  won:['w', 'won', 'wins'],
  drawn:['d', 'drawn', 'drew', 'draws'],
  lost:['l', 'lost', 'losses'],
  points:['pts', 'points', 'pt', 'tp'],
  home:['home', 'home team', 'team 1', 'team a'],
  away:['away', 'away team', 'team 2', 'team b'],
};
const IMPORT_STATS = ['played', 'won', 'drawn', 'lost', 'points'];
const IMPORT_NONE = ['#cccccc', '#999999'];       // Pitchero's grey pair for a club it has no colours for
const IMPORT_SUFFIX = /\s+(?:r\.?u\.?f\.?c\.?|r\.?f\.?c\.?|rugby union football club|rugby football club|rugby union club|rugby club|rugby union|rugby|f\.?c\.?)$/i;
/* A side's own label, not a club: U10s, 1st XV, U9 & U10 Girls, Academy U18 1XV. Every word must be one of these. */
const IMPORT_LABEL = /^(?:u\d{1,2}s?|under|\d{1,2}s?|minis?|juniors?|colts|youth|ladies|women|womens|girls|boys|mixed|vets|veterans|academy|development|dev|seniors?|first|second|third|fourth|\d{1,2}(?:st|nd|rd|th)|xv|xvs|\d?xv|sevens|7s|team|squad|[a-d]|&|and|\+)$/i;
/* A side's label says who plays, read from the whole name before any of it is shortened away. In this order: U11 and under (the lever, MIXED_THROUGH),
   Minis or Mixed is mixed; Girls, Ladies, Women or Womens is women's; everything else is men's, U12 and above included, and U12 and above with Girls is women's.
   Where a label gives more than one age (U11 & U12), the oldest counts. */
function importSideOf(name) {
  const s = String(name || '').toLowerCase().replace(/['\u2019]/g, ''), ages = [...s.matchAll(/\b(?:u|under)[\s-]*(\d{1,2})s?\b/g)].map(m => +m[1]);
  if (/\b(?:minis?|mixed)\b/.test(s) || (ages.length && Math.max(...ages) <= MIXED_THROUGH)) return 'mixed';
  return /\b(?:girls|ladies|women|womens)\b/.test(s) ? 1 : 0;
}
/* The club's side: its own name, then its row in the league table, then a label in the page's title (Under 10s | Riverside RFC). */
function importClubSide(data) {
  const own = data && (data.league || []).find(r => r.own);
  return (data && data.club && importSideOf(data.club.name)) || (own && importSideOf(own.name)) || (data && importSideOf(data.label)) || 0;
}
const IMPORT_NOT_TEAM = /\b(?:festival|tournament|training|session|tbc|tba|tbd|bye|cancelled|postponed|to be confirmed|friendly|friendlies|winners?|losers?|runners?[- ]up|(?:pool|group) [a-h1-8]|(?:semi|quarter)[- ]?finals?|finals?|play[- ]?offs?)\b/i;
const IMPORT_PLATFORMS = /^(?:pitchero|tournify|leaguerepublic|league republic|spond|teamapp|team app|teamer|sportlomo|england rugby|rfu|google|facebook|instagram|twitter|youtube|wordpress|wix|squarespace|home|homepage|welcome|fixtures?|results?|fixtures (?:and|&) results|league tables?|tables?|standings|news|teams?|clubs?)$/i;

/* ---------- names and colours ---------- */
/* Common first names. A two or three word name that starts with one and has no club word in it reads as a person
   (Jamie Smith), so it is dropped: losing a rare team called that costs less than showing a child's name. */
const IMPORT_FIRST = new Set(('jack harry oliver charlie george noah leo arthur oscar alfie freddie archie theo thomas james william henry jacob joshua ' +
  'max finley ethan samuel sam isaac lucas joseph joe daniel dan alexander alex ben benjamin adam luke liam ryan owen jamie callum lewis kieran ' +
  'matthew matt michael mike david tom tommy rory reuben toby louis elliot harvey jake jayden dylan tyler logan mason riley morgan casey jordan ' +
  'taylor robin quinn harper avery cameron charlie sophie olivia amelia isla ava emily mia grace lily ella evie poppy freya ruby chloe jessica ' +
  'lucy holly ellie hannah sarah emma katie megan amy laura rebecca rachel charlotte alice florence isabella isabelle millie daisy phoebe ' +
  'scarlett matilda rosie erin niamh caitlin ciara aoife sean conor cian oisin ewan fraser euan angus hamish alexandra').split(' '));
const IMPORT_CLUB_WORD = /\b(?:r\.?u?\.?f\.?c|rugby|club|united|city|town|athletic|rovers|wanderers|saints|old|st|park|school|college|academy|sharks|tigers|lions|bears|eagles|hawks|wolves|falcons|chiefs|pirates|knights|blues|reds|xv|minis|juniors|colts|u\d+)\b/i;
/* Pitchero's advice for juniors is "Joe S" or "J Smith". A name shaped like that, or like Firstname Surname, or holding
   an email, a link, a phone number or a role, is never kept. Bath A to Bath D stay: those are second teams. */
function importPersonal(s) {
  s = String(s || '').trim();
  if (/@|https?:|www\.|mailto|tel:|\.(?:com|co\.uk|org|net)\b/i.test(s)) return true;
  if ((s.match(/\d/g) || []).length >= 7) return true;
  if (/^[A-Z]\.?\s+[A-Z][a-z'’-]+$/.test(s)) return true;
  if (/^[A-Z][a-z'’-]+\s+(?:[E-Z]|[A-Z]\.)$/.test(s)) return true;
  if (/\b(?:captain|coach|manager|chair(?:man|person|woman)?|secretary|treasurer|welfare|president|referee|physio|player of|man of the match|motm|mr|mrs|ms|miss|dr)\b/i.test(s)) return true;
  const w = s.split(/\s+/);
  if (w.length >= 2 && w.length <= 3 && IMPORT_FIRST.has(w[0].toLowerCase()) && w.every(x => /^\p{Lu}/u.test(x)) && !IMPORT_CLUB_WORD.test(s)) return true;
  return false;
}
const IMPORT_ENT = { amp:'&', lt:'<', gt:'>', quot:'"', apos:"'", nbsp:' ', ndash:'-', mdash:'-', rsquo:'’', lsquo:'‘', ldquo:'"', rdquo:'"', hellip:'...', copy:'', reg:'', trade:'' };
const importChar = n => n > 31 && n < 0x110000 && !(n >= 0xd800 && n < 0xe000) ? String.fromCodePoint(n) : '';
/* Each <...> as a space, in one pass: from a '<' with no '>' after it nothing more is a tag, so the rest is kept as it
   stands (as /<[^>]*>/g would, without rescanning to the end from every later '<'). */
function importUntag(s) {
  let out = '', i = 0;
  for (;;) {
    const lt = s.indexOf('<', i); if (lt < 0) break;
    const gt = s.indexOf('>', lt + 1); if (gt < 0) break;
    out += s.slice(i, lt) + ' '; i = gt + 1;
  }
  return out + s.slice(i);
}
function importText(h) {
  return importUntag(String(h).replace(/<br\s*\/?>/gi, ' '))
    .replace(/&(#x[0-9a-f]{1,6}|#\d{1,7}|[a-z]{2,8});/gi, (m, e) => e[0] === '#' ? importChar(/x/i.test(e[1]) ? parseInt(e.slice(2), 16) : +e.slice(1)) : (IMPORT_ENT[e.toLowerCase()] ?? m))
    .replace(/\s+/g, ' ').trim();
}
const importLabel = s => { const w = String(s).toLowerCase().split(/[\s/]+/).filter(Boolean); return w.length > 0 && w.every(x => IMPORT_LABEL.test(x)); };
/* A club or team name as it may be shown, or '' for anything that is not one. */
function importName(v) {
  if ((typeof v !== 'string' && typeof v !== 'number') || String(v).length > 500) return '';   // no name is that long, and the checks below stay cheap
  if (importPersonal(importText(String(v)))) return '';
  const s = importText(String(v))
    .replace(/[\u0000-\u001f\u007f-\u009f​-‏‪-‮⁦-⁩﻿]|\p{Extended_Pictographic}/gu, '')
    .replace(/\s*[([][^)\]]*[)\]]\s*$/, '')        // a trailing (H), (A) or [Hosts]
    .replace(/\s+/g, ' ').trim();
  if (s.length < 2 || s.length > 60 || !/\p{L}/u.test(s)) return '';
  if (importPersonal(s) || importLabel(s) || IMPORT_NOT_TEAM.test(s) || IMPORT_PLATFORMS.test(s)) return '';
  return s.slice(0, 40).trim();
}
const importKey = s => String(s || '').toLowerCase().replace(IMPORT_SUFFIX, '').replace(/[^\p{L}\p{N}]/gu, '');
/* The club a side belongs to: Bracknell for Bracknell RFC, Bracknell U16 or Bracknell A. */
function importBase(s) {
  const w = String(s || '').replace(IMPORT_SUFFIX, '').split(/\s+/).filter(Boolean);
  while (w.length > 1 && IMPORT_LABEL.test(w[w.length - 1])) w.pop();
  return importKey(w.join(' '));
}
const importSame = (a, b) => { const x = importBase(a); return !!x && x === importBase(b); };
/* Shortened to fit a team card: the rugby suffix goes first, then whole words from the end. A word that only leads into the name (Old, St, Bishop's) is
   no name by itself and doesn't end one, so where whole words would leave that the name keeps its letters up to the limit: Old Wimbledonian, not Old. */
const IMPORT_LEADING = /^(?:old|st|st\.|saint|the|new|royal|north|south|east|west|upper|lower|great|little|port|mount|\p{L}+['\u2019]s)$/iu;
function importShort(name, max = 16) {
  let s = String(name || '').replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  const bare = s.replace(IMPORT_SUFFIX, '').trim();
  if (bare.length <= max && bare.length >= 3) return bare;
  if (bare.length >= 3) s = bare;
  const cut = s.slice(0, max + 1), sp = cut.lastIndexOf(' ');
  const out = (sp >= 3 ? cut.slice(0, sp) : s.slice(0, max)).trim();
  const words = out.replace(/(?:\s+(?:&|and|of|the|on|in|at|-))+$/i, '').trim().split(' ');   // never ends on a joining word
  while (words.length > 1 && IMPORT_LEADING.test(words[words.length - 1])) words.pop();
  return words.length === 1 && IMPORT_LEADING.test(words[0]) ? s.slice(0, max).trim() : words.join(' ');
}
/* A name for a card that no side already in the league has (taken holds their importKeys), or '' to leave the side
   out. Where shortening makes two sides the same (Sevenoaks Minis A and B, Tunbridge Wells and Tunbridge Wells II), a
   side whose name ends in a label keeps it, the words in front shortened instead (Sevenoaks A, Sevenoaks B, Tunbridge
   II): first when label says its short name is shared, else when the short name is taken. Never with no real word in
   front (Old II). */
function importFit(name, taken, label) {
  const s = importShort(name), w = String(name || '').replace(/\s+/g, ' ').trim().split(' '), tail = w.length > 1 ? w[w.length - 1] : '';
  let kept = '';
  if (tail && tail.length <= 6 && (IMPORT_LABEL.test(tail) || /^[ivx]{1,4}$/i.test(tail))) {
    const head = importShort(w.slice(0, -1).join(' '), 16 - tail.length - 1);
    if (/\p{L}{4}/u.test(head) && (w.slice(0, -1).join(' ') + ' ').startsWith(head + ' ')) kept = head + ' ' + tail;   // whole words in front, or not at all
  }
  for (const c of label ? [kept, s] : [s, kept]) if (c && !taken.has(importKey(c))) return c;
  return '';
}
function importHex(v) {
  if (typeof v !== 'string') return null;
  const s = v.trim().toLowerCase();
  let m = s.match(/^#?([0-9a-f]{6})$/); if (m) return '#' + m[1];
  m = s.match(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/); if (m) return '#' + m[1] + m[1] + m[2] + m[2] + m[3] + m[3];
  m = s.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*[,)]/);
  if (m && m.slice(1, 4).every(x => +x <= 255)) return '#' + m.slice(1, 4).map(x => (+x).toString(16).padStart(2, '0')).join('');
  return null;
}
/* A shirt and trim, or nulls: Pitchero's grey placeholder is no colour, and a trim too close to its shirt is dropped. */
function importPair(kit, trim) {
  let k = importHex(kit), t = importHex(trim);
  if (k === IMPORT_NONE[0] && (t === IMPORT_NONE[1] || !t)) k = t = null;
  if (!k) return [null, null];
  if (t && colorDist(k, t) < 60) t = null;
  return [k, t];
}
const importContrast = kit => colorDist(kit, '#f2efe6') >= 150 ? '#f2efe6' : '#1c1c1c';
function importNum(v) {
  const n = typeof v === 'number' ? v : typeof v === 'string' && /^\s*[-+]?\d{1,4}\s*$/.test(v) ? +v : NaN;
  return Number.isFinite(n) && Math.abs(n) <= 9999 ? Math.round(n) : null;
}
function importHash(s) { let h = 2166136261; for (const c of String(s).toLowerCase()) h = Math.imul(h ^ c.codePointAt(0), 16777619); return h >>> 0; }

/* ---------- reading a page ---------- */
function importAttrs(s) {
  const a = {};
  for (const m of String(s).matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
    const k = m[1].toLowerCase();
    if (!(k in a)) a[k] = importText(m[2] ?? m[3] ?? m[4] ?? '');
  }
  return a;
}
function importJson(s) { try { const v = JSON.parse(s); return v && typeof v === 'object' ? v : null; } catch (e) { return null; } }
/* The JSON value opening at s[i] ({ or [), as text, or ''. room.left is what one page may scan in all, shared by
   every call for it, so blobs inside blobs cost no more than the page itself. */
function importBalanced(s, i, room) {
  if (s[i] !== '{' && s[i] !== '[') return '';
  let depth = 0, str = false;
  for (let j = i; j < s.length; j++) {
    if (room.left-- <= 0) return '';
    const c = s[j];
    if (str) { if (c === '\\') j++; else if (c === '"') str = false; continue; }
    if (c === '"') str = true;
    else if (c === '{' || c === '[') depth++;
    else if ((c === '}' || c === ']') && --depth === 0) return s.slice(i, j + 1);
  }
  return '';
}
/* Each <tag ...> in s as its attributes, in one pass: a tag with no '>' after it ends the search (no later one can
   close either), rather than rescanning the page from every later start. */
function importTags(s, tag, max) {
  const out = [], open = new RegExp('<' + tag + '\\b', 'gi');
  while (out.length < max && open.exec(s)) {
    const gt = s.indexOf('>', open.lastIndex); if (gt < 0) break;
    out.push(s.slice(open.lastIndex, gt));
    open.lastIndex = gt + 1;
  }
  return out;
}
/* Each <tag ...>...</tag> in s as [attributes, inner], in one pass in the same way: a tag left open or a missing close
   ends the search, so no page, however broken, can stall the import. */
function importBlocks(s, low, tag, max) {
  const out = [], open = new RegExp('<' + tag + '\\b', 'gi'), close = '</' + tag;
  while (out.length < max && open.exec(s)) {
    const gt = s.indexOf('>', open.lastIndex); if (gt < 0) break;
    const end = low.indexOf(close, gt + 1); if (end < 0) break;
    out.push([s.slice(open.lastIndex, gt), s.slice(gt + 1, end)]);
    open.lastIndex = end + close.length;
  }
  return out;
}
/* A table's rows, each as the text after its <tr ...> up to the next row or </tr>, in one pass. */
function importRows(inner, max) {
  const out = [], open = /<tr\b/gi;
  let m = open.exec(inner);
  while (m && out.length < max) {
    const gt = inner.indexOf('>', open.lastIndex); if (gt < 0) break;
    open.lastIndex = gt + 1;
    const next = open.exec(inner), body = inner.slice(gt + 1, next ? next.index : inner.length), e = body.search(/<\/tr\b/i);
    out.push(e < 0 ? body : body.slice(0, e));
    m = next;
  }
  return out;
}
const importLow = s => s.replace(/[A-Z]+/g, x => x.toLowerCase());   // ASCII only, so every index still matches the page
/* The page without comments, scripts, styles and inline pictures, in one pass. */
function importStrip(s, low) {
  const re = /<!--|<(script|style|noscript|template|svg)\b/gi;
  let out = '', i = 0, m;
  while ((m = re.exec(s))) {
    out += s.slice(i, m.index) + ' ';
    const close = m[1] ? '</' + m[1].toLowerCase() : '-->', end = low.indexOf(close, re.lastIndex);
    if (end < 0) return out;
    const gt = m[1] ? s.indexOf('>', end) : end + 2;
    if (gt < 0) return out;
    i = re.lastIndex = gt + 1;
  }
  return out + s.slice(i);
}
/* A page as the parsers see it: JSON blobs (Next.js __NEXT_DATA__, other JSON scripts, app-router flight data, a
   window.__STATE__ handed to the page), JSON-LD, meta tags, the title, tables as rows of cell text, and links. */
function importDoc(html) {
  const src = typeof html === 'string' ? html.slice(0, IMPORT_MAX_HTML) : '', low = importLow(src);
  const doc = { blobs:[], ld:[], meta:{}, title:'', tables:[], links:[] }, room = { left:IMPORT_MAX_HTML };
  const blob = (id, json) => { if (json && doc.blobs.length < 200) doc.blobs.push({ id, json }); };
  /* Each JSON value after a match of re in body, the search going on after the value, so a blob that holds more of the
     same is read once, never again from each match inside it. A broken one ends the search. */
  const values = (body, re, fn) => {
    let m;
    while ((m = re.exec(body))) {
      const at = m.index + m[0].length, text = importBalanced(body, at, room); if (!text) break;
      fn(text); re.lastIndex = at + text.length;
    }
  };
  for (const [attrs, inner] of importBlocks(src, low, 'script', 600)) {
    const a = importAttrs(attrs), type = (a.type || '').toLowerCase(), body = inner.trim();
    if (type === 'application/ld+json') { const j = importJson(body); if (j && doc.ld.length < 20) doc.ld.push(j); continue; }
    if (a.id === '__NEXT_DATA__' || type === 'application/json') { blob(a.id || 'json', importJson(body)); continue; }
    let flight = '';
    values(body, /self\.__next_f\.push\(/g, text => { const arr = importJson(text); if (Array.isArray(arr) && typeof arr[1] === 'string') flight += arr[1]; });
    for (const line of flight.split('\n')) { const p = line.indexOf(':'); if (p > 0 && /^[[{]/.test(line.slice(p + 1))) blob('flight', importJson(line.slice(p + 1))); }
    values(body, /(?:window|self)\.__[A-Za-z_]+__\s*=\s*(?=[{[])/g, text => blob('state', importJson(text)));
  }
  const page = importStrip(src, low), plow = importLow(page);
  for (const attrs of importTags(page, 'meta', 400)) {
    const a = importAttrs(attrs), k = (a.property || a.name || '').toLowerCase();
    if (k && a.content && !(k in doc.meta)) doc.meta[k] = a.content;
  }
  const t = importBlocks(page, plow, 'title', 1)[0]; if (t) doc.title = importText(t[1].slice(0, 1000));   // a title is a line, not a page
  for (const [, inner] of importBlocks(page, plow, 'table', 40)) {
    const rows = [];
    for (const r of importRows(inner, 201)) {
      const cells = [];
      for (const part of r.split(/(?=<t[hd]\b)/i).slice(0, 60)) {
        const c = part.match(/^<(t[hd])\b([^>]*)>([\s\S]*)$/i); if (!c) continue;
        const th = c[1].toLowerCase() === 'th', span = Math.min(8, Math.max(1, parseInt(importAttrs(c[2]).colspan, 10) || 1));
        cells.push({ th, text:importText(c[3]) });
        for (let i = 1; i < span; i++) cells.push({ th, text:'', span:true });
      }
      if (cells.length) rows.push(cells);
    }
    if (rows.length) doc.tables.push(rows);
  }
  for (const [attrs, inner] of importBlocks(page, plow, 'a', 400)) { const a = importAttrs(attrs); if (a.href) doc.links.push({ href:a.href, text:importText(inner) }); }
  return doc;
}
/* Every object and array under a JSON value, depth first, skipping any subtree under a person key. visit gets the
   value, its key, and its nearest key that is not a number (tables:{ 3100:[...] } is under tables). */
function importWalk(root, visit) {
  const stack = [[root, '', 0, '']];
  let n = 0;
  while (stack.length && n++ < 100000) {
    const [v, key, depth, named] = stack.pop();
    if (!v || typeof v !== 'object' || depth > 40 || IMPORT_SKIP.test(key)) continue;
    visit(v, key, named);
    const entries = Array.isArray(v) ? v.map((c, i) => [String(i), c]) : Object.entries(v);
    for (let i = entries.length - 1; i >= 0; i--) {
      const [k, c] = entries[i];
      if (c && typeof c === 'object') stack.push([c, k, depth + 1, /^\d+$/.test(k) ? named : k]);
    }
  }
}
const importPick = (o, keys) => { if (o && typeof o === 'object') for (const k of keys) if (o[k] != null && o[k] !== '') return o[k]; return null; };
/* One standings row from an object: a team name, W or L, and at least three of P W D L Pts. Pitchero keeps the values
   in column_values by column key; others nest them under stats or record. A player (name, played, points) never passes. */
function importRowOf(o) {
  if (!o || typeof o !== 'object' || Array.isArray(o)) return null;
  const cv = Array.isArray(o.column_values) ? Object.fromEntries(o.column_values.filter(c => c && typeof c.key === 'string').map(c => [c.key, c.value])) : null;
  const src = [o, cv, o.stats, o.record, o.totals, o.standing].filter(x => x && typeof x === 'object' && !Array.isArray(x));
  const get = keys => { for (const s of src) for (const k of keys) if (s[k] != null && s[k] !== '') return s[k]; return null; };
  let name = get(IMPORT_KEYS.name);
  if (name && typeof name === 'object') name = importPick(name, IMPORT_KEYS.name);
  if (typeof name !== 'string' && typeof name !== 'number') return null;
  const row = { name:String(name) };
  for (const k of IMPORT_STATS) row[k] = importNum(get(IMPORT_KEYS[k]));
  if ((row.won == null && row.lost == null) || IMPORT_STATS.filter(k => row[k] != null).length < 3) return null;
  row.kit = get(IMPORT_KEYS.kit); row.trim = get(IMPORT_KEYS.trim);
  if (get(IMPORT_KEYS.own) === true) row.own = true;
  return row;
}
/* What a JSON tree offers: standings tables (only under a key that names one), fixture opponents and club objects
   with colours. */
function importScan(json, out) {
  importWalk(json, (v, key, named) => {
    if (Array.isArray(v)) {
      if (v.length >= 2 && v.length <= 200 && IMPORT_TABLE_KEY.test(named.toLowerCase().replace(/[^a-z]/g, ''))) {
        const rows = v.map(importRowOf).filter(Boolean);
        if (rows.length >= 2 && rows.length * 2 >= v.length) out.tables.push(rows);
      }
      return;
    }
    const side = o => typeof o === 'string' ? { name:o } : o && typeof o === 'object' ? { name:importPick(o, IMPORT_KEYS.name), kit:importPick(o, IMPORT_KEYS.kit), trim:importPick(o, IMPORT_KEYS.trim) } : null;
    const opp = importPick(v, IMPORT_KEYS.opponent);
    if (opp) out.opponents.push(side(opp));
    for (const k of IMPORT_KEYS.sides) if (v[k]) out.opponents.push(side(v[k]));
    if (IMPORT_KEYS.club.test(key) && typeof v.name === 'string') {
      const c = v.colours || v.colors || v.theme || v;
      out.clubs.push({ name:v.name, kit:importPick(c, ['primary', ...IMPORT_KEYS.kit]), trim:importPick(c, ['secondary', ...IMPORT_KEYS.trim]) });
    }
  });
}
const importNorm = s => String(s).toLowerCase().replace(/[^a-z ]/g, '').replace(/\s+/g, ' ').trim();
function importCols(cells) {
  const col = {};
  cells.forEach((c, i) => { const h = importNorm(c.text); for (const [k, names] of Object.entries(IMPORT_COLS)) if (col[k] == null && names.includes(h)) col[k] = i; });
  return col;
}
/* Standings tables (a team column, W or L, three of P W D L Pts) and the names in fixtures tables (Home and Away). */
function importTables(doc) {
  const standings = [], names = [];
  for (const rows of doc.tables) {
    const h = rows.slice(0, 3).findIndex(r => { const c = importCols(r); return c.name != null || (c.home != null && c.away != null); });
    if (h < 0) continue;
    const col = importCols(rows[h]);
    const cell = (r, i) => { for (let j = i; j < r.length && j < i + 3; j++) { if (j > i && !r[j].span && rows[h][j] && rows[h][j].text) break; if (r[j].text) return r[j].text; } return ''; };   // a team cell spans its crest
    if (col.name != null && (col.won != null || col.lost != null) && IMPORT_STATS.filter(k => col[k] != null).length >= 3) {
      const out = [];
      for (const r of rows.slice(h + 1)) {
        const name = cell(r, col.name); if (!name || /^\d+$/.test(name)) continue;
        const row = { name };
        for (const k of IMPORT_STATS) row[k] = col[k] == null || !r[col[k]] ? null : importNum(r[col[k]].text);
        out.push(row);
      }
      if (out.length) standings.push(out);
    } else if (col.home != null && col.away != null) {
      for (const r of rows.slice(h + 1)) for (const i of [col.home, col.away]) { const name = r[i] && cell(r, i); if (name) names.push({ name }); }
    }
  }
  return { standings, names };
}
const importHas = (rows, club) => !!club && rows.some(r => importSame(r.name, club));
/* The club a page names: a club object in its JSON, a JSON-LD sports team, og:site_name, then the part of og:title or
   the title that says it is a club (Riverside RFC in "U16 Spring Cup | Riverside RFC"). A title with no club word is
   no club: on a person's page it is that person's name. Nor is any title read on a page whose path is about people. */
function importClubName(doc, href, extra) {
  let path = ''; try { path = new URL(href).pathname; } catch (e) { /* no link */ }
  const personal = /\/[\w-]*(?:players?|profiles?|people|persons?|staff|members?|contacts?|officials?|coach(?:es)?|users?|squads?|athletes?)[\w-]*(?:\/|$)/i.test(path);
  const seg = t => String(t || '').slice(0, 300).split(/\s+[|\-\u2013\u2014\u00b7:]+\s+/).map(s => s.trim()).find(p => IMPORT_TITLE_CLUB.test(p)) || '';
  const cands = [...extra, doc.meta['og:site_name'], doc.meta['application-name']];
  if (!personal) cands.push(seg(doc.meta['og:title']), seg(doc.title));
  for (const c of cands) { const n = importName(c); if (n) return n; }
  return '';
}

/* ---------- the adapters, one a source ---------- */
/* Any page: standings tables in its HTML, then in its JSON; fixtures tables, JSON-LD events and JSON opponents for the
   other sides; the club from its JSON, JSON-LD or meta tags, its colour from a club object or theme-color. */
function importGeneric(doc, href) {
  const scan = { tables:[], opponents:[], clubs:[] }, ldClubs = [], ldTeams = [];
  for (const b of doc.blobs) importScan(b.json, scan);
  const ldType = v => [].concat(v['@type'] || []).join(' '), ldEvents = [];
  for (const root of doc.ld.flatMap(r => [].concat(r, r && r['@graph'] || []))) {   // the page's own entities: a team in an event or a league is not the club
    if (root && typeof root === 'object' && /\bSports(?:Team|Organization|Club)\b/.test(ldType(root)) && typeof root.name === 'string') ldClubs.push(root.name);
  }
  importWalk(doc.ld, v => { if (!Array.isArray(v) && /\bSportsEvent\b/.test(ldType(v))) ldEvents.push(v); });
  for (const node of ldEvents) {
    for (const k of ['homeTeam', 'awayTeam', 'competitor']) for (const t of [].concat(node[k] || [])) {
      if (typeof t === 'string') ldTeams.push({ name:t });
      else if (t && typeof t.name === 'string' && !/\bPerson\b/.test([].concat(t['@type'] || []).join(' '))) ldTeams.push({ name:t.name });
    }
  }
  const clubObj = scan.clubs.find(c => importName(c.name));
  const name = importClubName(doc, href, [clubObj && clubObj.name, ...ldClubs]);
  const theme = doc.meta['theme-color'] || doc.meta['msapplication-tilecolor'];
  const club = name ? { name, kit:clubObj && importSame(clubObj.name, name) && importHex(clubObj.kit) ? clubObj.kit : theme, trim:clubObj && importSame(clubObj.name, name) ? clubObj.trim : null } : null;
  const html = importTables(doc);
  const tables = [...html.standings, ...scan.tables];
  const league = tables.find(t => importHas(t, name)) || tables.slice().sort((a, b) => b.length - a.length)[0] || [];
  return { club, league, teams:[...html.names, ...ldTeams, ...scan.opponents] };
}
/* Pitchero club sites are server-rendered Next.js with every fact in __NEXT_DATA__ (pitchero-findings v1.0):
   the club at props.club (name, colours.primary and .secondary); each season's table for the team at
   props.initialReduxState.teams.leagueTable.tables[teamId], picked by props.pageProps.seasonId, rows by rank, values
   by column key, is_highlighted on the club's own row; fixtures keyed by id at ...teams.fixtures.fixtures[teamId],
   each with its opponent and the colours of the side it played as. A page without these falls back to importGeneric. */
function importPitchero(doc, href) {
  const nd = (doc.blobs.find(b => b.id === '__NEXT_DATA__') || {}).json || {};
  const props = nd.props && typeof nd.props === 'object' ? nd.props : {}, pp = props.pageProps && typeof props.pageProps === 'object' ? props.pageProps : {};
  const club = [props.club, pp.club].find(c => c && typeof c === 'object' && typeof c.name === 'string');
  const ref = importPitcheroRef(href);
  const teamId = String(pp.teamId ?? (nd.query && nd.query.teamId) ?? (ref && ref.team) ?? '');
  const st = props.initialReduxState && props.initialReduxState.teams || {};
  const out = { club:null, league:[], teams:[] };
  if (club) { const c = club.colours && typeof club.colours === 'object' ? club.colours : {}; out.club = { name:club.name, kit:c.primary, trim:c.secondary }; }
  const byTeam = st.leagueTable && st.leagueTable.tables;
  if (byTeam && typeof byTeam === 'object') {
    const list = [].concat(teamId && byTeam[teamId] ? byTeam[teamId] : teamId ? [] : Object.values(byTeam).flat()).filter(t => t && typeof t === 'object' && Array.isArray(t.rows));
    const table = list.find(t => t.season_id != null && String(t.season_id) === String(pp.seasonId)) || list[list.length - 1];
    if (table) out.league = table.rows.slice(0, 200).sort((a, b) => (importNum(a && a.rank) ?? 999) - (importNum(b && b.rank) ?? 999)).map(importRowOf).filter(Boolean);
  }
  const fx = st.fixtures && st.fixtures.fixtures;
  if (fx && typeof fx === 'object') {
    const own = teamId ? fx[teamId] : Object.assign({}, ...Object.values(fx).filter(v => v && typeof v === 'object'));
    const games = Object.values(own && typeof own === 'object' ? own : {}).filter(g => g && typeof g === 'object').slice(0, 200);
    games.sort((a, b) => String(a.dateTime || '').localeCompare(String(b.dateTime || '')));
    for (const g of games) {
      const side = g.ha === 'h' ? g.awaySide : g.ha === 'a' ? g.homeSide : null;
      out.teams.push({ name:typeof g.opponent === 'string' ? g.opponent : side && side.name, kit:side && side.primaryColour, trim:side && side.secondaryColour });
    }
  }
  if (!out.league.length && !out.teams.length && !out.club) return importGeneric(doc, href);
  if (!out.club && ref && ref.folder) out.club = { name:importGeneric(doc, href).club?.name || ref.folder.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) };
  return out;
}
/* A Pitchero link: /clubs/{folder}[/teams/{teamId}[/{tab}]], or /teams/{teamId} on a club's own domain. A locale
   prefix (/en_GB/clubs/...) is dropped. */
function importPitcheroRef(href) {
  let u; try { u = new URL(href); } catch (e) { return null; }
  const path = u.pathname.replace(/^\/[a-z]{2}_[a-z]{2}(?=\/)/i, '');
  let m = path.match(/^\/clubs\/([a-z0-9_-]+)(?:\/teams\/(\d+)(?:\/([a-z-]+))?)?/i);
  if (m) return { base:u.origin + '/clubs/' + m[1], folder:m[1].toLowerCase(), team:m[2] || null, tab:m[3] || null };
  m = path.match(/^\/teams\/(\d+)(?:\/([a-z-]+))?/i);
  return { base:u.origin, folder:null, team:m ? m[1] : null, tab:m ? m[2] || null : null };
}
const importPitcheroShape = doc => doc.blobs.some(b => b.id === '__NEXT_DATA__' && b.json.props && b.json.props.club && typeof b.json.props.club === 'object' && 'folder' in b.json.props.club && 'colours' in b.json.props.club);
/* The pages worth one more request when the first had no league: the team's league table, then its fixtures. From a
   club's home page, the first team with a league table tab (its 1st XV, as a rule), else the first with fixtures.
   Each source's next reads the page as importDoc already read it, so no page is read twice. */
function importPitcheroNext(doc, href) {
  const ref = importPitcheroRef(href); if (!ref) return [];
  const nd = (doc.blobs.find(b => b.id === '__NEXT_DATA__') || {}).json || {};
  const club = nd.props && nd.props.club || {};
  const teams = (Array.isArray(club.sections) ? club.sections : []).flatMap(s => s && Array.isArray(s.teams) ? s.teams : []).filter(t => t && t.id != null);
  const tabs = t => Array.isArray(t.navigationItems) ? t.navigationItems : [];
  let team = ref.team;
  if (!team) { const t = teams.find(x => tabs(x).includes('league_table')) || teams.find(x => tabs(x).includes('fixtures')); if (t) team = String(t.id); }
  if (!team || !/^\d{1,12}$/.test(team)) return [];
  const here = importUrl(href);
  return [['league', '/league-table'], ['fixtures', '/fixtures-results']].map(([kind, tab]) => ({ kind, href:ref.base + '/teams/' + team + tab })).filter(s => importUrl(s.href) !== here);
}
function importGenericNext(doc, href) {
  const out = [];
  for (const [kind, re] of [['league', /standings|league[\s_-]*tables?|\btables?\b|ladder/i], ['fixtures', /fixtures|schedule|matches|results/i]]) {
    for (const l of doc.links) {
      let abs; try { abs = new URL(l.href, href).href; } catch (e) { continue; }
      if (re.test(l.text + ' ' + l.href) && importUrl(abs) && importUrl(abs) !== importUrl(href)) { out.push({ kind, href:importUrl(abs) }); break; }
    }
  }
  return out;
}
/* One entry a source: how to spot its pages, its parser, the pause between requests to it (Pitchero's robots.txt asks
   for 5 seconds) and the pages it may read next. Checked in order; generic takes anything. */
const IMPORT_SOURCES = [
  { id:'pitchero', test:(href, doc) => /(^|\.)pitchero\.com$/.test(importHost(href)) || importPitcheroShape(doc), parse:importPitchero, gap:5000, next:importPitcheroNext },
  { id:'generic', test:() => true, parse:importGeneric, gap:1000, next:importGenericNext },
];
function importHost(href) { try { return new URL(href).hostname; } catch (e) { return ''; } }

/* ---------- the parse result ---------- */
/* What leaves a parser, and nothing else: { source, club:{ name, kit, trim } | null, teams:[{ name, kit, trim }],
   league:[{ name, played, won, drawn, lost, points, kit, trim, own? }] }. club is the page's own club. league is its
   standings table in order, with own:true on the club's row. teams are the other sides it names (fixture opponents,
   tournament entrants), not the club's own sides. A colour is #rrggbb or null, a number an integer or null. */
function importSafe(source, raw, href) {
  let club = null;
  const name = raw.club ? importName(raw.club.name) : '';
  if (name) { const [kit, trim] = importPair(raw.club.kit, raw.club.trim); club = { name, kit, trim }; }
  const own = n => !!club && importSame(n, club.name);
  const league = [], seen = new Set();
  for (const r of raw.league || []) {
    const n = importName(r && r.name), k = importKey(n);
    if (!n || seen.has(k)) continue;
    seen.add(k);
    const [kit, trim] = importPair(r.kit, r.trim), row = { name:n };
    for (const s of IMPORT_STATS) row[s] = importNum(r[s]);
    Object.assign(row, { kit, trim });
    if (r.own === true || own(n)) row.own = true;
    league.push(row);
    if (league.length >= IMPORT_MAX_ROWS) break;
  }
  const teams = [], tseen = new Set();
  for (const t of raw.teams || []) {
    const n = importName(t && t.name), k = importKey(n);
    if (!n || own(n) || tseen.has(k) || league.some(r => r.own && importSame(r.name, n))) continue;
    tseen.add(k);
    const [kit, trim] = importPair(t.kit, t.trim);
    teams.push({ name:n, kit, trim });
    if (teams.length >= IMPORT_MAX_ROWS) break;
  }
  return { source, club, teams, league };
}
/* A link someone pasted, made safe to request: http or https only (sent as https), a real host name (no IP address,
   localhost or local network name, no login, no odd port), no fragment and no tracking parameters. A link inside a
   shared message is found. Anything else is null. */
function importUrl(text) {
  if (typeof text !== 'string') return null;
  let s = text.trim();
  if (!s || s.length > 2048) return null;
  const found = s.match(/(?:^|[\s(<"'])(https?:\/\/[^\s<>"')]+)/i);   // a link inside a shared message, never one inside another scheme (blob:https://...)
  if (found) s = found[1];
  else if (/\s/.test(s)) return null;
  else if (/^[a-z][a-z0-9+.-]*:/i.test(s) && !/^[a-z0-9.-]+:\d+(?:[/?#]|$)/i.test(s)) return null;   // another scheme: javascript:, data:, file:, mailto:
  else s = 'https://' + s.replace(/^\/+/, '');
  let u; try { u = new URL(s); } catch (e) { return null; }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
  if (u.username || u.password || (u.port && u.port !== '80' && u.port !== '443')) return null;
  const host = u.hostname.toLowerCase().replace(/\.$/, '');
  if (!/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z]{2,63}|xn--[a-z0-9-]{1,59})$/.test(host) || /(?:^|\.)(?:localhost|local|internal|lan|home|test|invalid|example)$/.test(host)) return null;
  u.protocol = 'https:'; u.port = ''; u.hash = ''; u.hostname = host;
  for (const k of [...u.searchParams.keys()]) if (/^(?:utm_|fbclid$|gclid$|dclid$|msclkid$|mc_cid$|mc_eid$|igshid$|_ga$|_gl$)/i.test(k)) u.searchParams.delete(k);
  return u.href;
}
/* A page's club, league and other sides. Pure: html and the link in, the result above out. */
function importParse(html, url) { return importRead(importDoc(html), url); }
function importRead(doc, url) {
  const href = importUrl(String(url || '')) || '';
  const src = IMPORT_SOURCES.find(s => s.test(href, doc)), out = importSafe(src.id, src.parse(doc, href), href);
  const label = [doc.meta && doc.meta['og:title'], doc.title].flatMap(t => String(t || '').slice(0, 300).split(/\s+[|\-\u2013\u2014\u00b7:]+\s+/)).map(s => s.trim()).find(s => s && importLabel(s));
  if (label) out.label = label;                            // only ever a label's own words: U10s, Ladies
  const level = importLevelFrom([doc.meta && doc.meta['og:title'], doc.title, ...importDivisions(doc)]);
  if (level) out.level = level;                            // only ever a level's id, not the page's words
  return out;
}
/* The league's name on a Pitchero page, for the level: the fixtures' division, the competitions, a table's own name. */
function importDivisions(doc) {
  const out = [];
  for (const b of doc.blobs || []) {
    const st = b.id === '__NEXT_DATA__' && b.json.props && b.json.props.initialReduxState && b.json.props.initialReduxState.teams; if (!st) continue;
    importWalk([st.fixtures, st.leagueTable], v => { for (const k of ['division', 'name', 'competition', 'league', 'title']) if (!Array.isArray(v) && typeof v[k] === 'string' && out.length < 400) out.push(v[k]); });
  }
  return out;
}
function importMerge(a, b) {
  const teams = [...a.teams];
  for (const t of b.teams) if (teams.length < IMPORT_MAX_ROWS && !teams.some(x => importKey(x.name) === importKey(t.name)) && !(a.club && importSame(t.name, a.club.name))) teams.push(t);
  const league = a.league.some(r => !r.own) || !b.league.length ? a.league : b.league;
  const out = { source:a.source, club:a.club || b.club, teams, league }, label = a.label || b.label, level = a.level || b.level;
  if (label) out.label = label;
  if (level) out.level = level;
  return out;
}

/* ---------- fetching, in the app only ---------- */
/* Capacitor's native HTTP when the game runs inside the Try Line app, else null: the web build never fetches. */
function importHttp() {
  const C = typeof window !== 'undefined' ? window.Capacitor : null;
  try { if (!C || typeof C.isNativePlatform !== 'function' || !C.isNativePlatform()) return null; } catch (e) { return null; }
  const H = C.Plugins && C.Plugins.CapacitorHttp;
  return H && typeof H.get === 'function' ? H : null;
}
/* A response header, whatever case the platform gives its name in. */
function importHeader(headers, name) {
  if (!headers || typeof headers !== 'object') return '';
  for (const [k, v] of Object.entries(headers)) if (k.toLowerCase() === name) return typeof v === 'string' ? v : Array.isArray(v) && typeof v[0] === 'string' ? v[0] : '';
  return '';
}
/* The pasted page, then, while it has no league, its league table and then its fixtures: at most three requests,
   all to the pasted page's site, a pause between them, each with a timeout. Only the User-Agent header names the
   game; nothing about the player or the device is sent.
   Redirects are never followed by the platform (disableRedirects): each one is followed here, its Location checked by
   importUrl as a pasted link is (so never an IP address or a local name), and counted as one of the three requests.
   A platform that follows one anyway is held to the same rule: a page whose final address importUrl refuses is a
   failed import, never read as if it came from the link asked for. opts.cancelled() true stops the run before its next
   pause or request (Back while it imports). opts.sleep, opts.gap and opts.timeout are for the tests. */
async function importFetch(url, opts = {}) {
  const href = importUrl(url);
  if (!href) return { ok:false, error:'url', requests:0 };
  const http = importHttp();
  if (!http) return { ok:false, error:'web', requests:0 };
  const sleep = opts.sleep || (ms => new Promise(r => setTimeout(r, ms)));
  const timeout = opts.timeout ?? IMPORT_TIMEOUT;
  const stopped = () => typeof opts.cancelled === 'function' && !!opts.cancelled();
  let requests = 0;
  const one = async u => {
    if (stopped()) throw Error('cancelled');
    if (requests >= IMPORT_MAX_REQUESTS) throw Error('budget');
    requests++;
    let timer = 0;
    try {
      return await Promise.race([
        http.get({ url:u, headers:{ 'User-Agent':IMPORT_UA, Accept:'text/html,application/json' }, responseType:'text', connectTimeout:timeout, readTimeout:timeout, disableRedirects:true }),
        new Promise((_, no) => { timer = setTimeout(() => no(Error('timeout')), timeout); }),
      ]);
    } finally { clearTimeout(timer); }
  };
  const get = async (u, gap) => {
    if (stopped()) throw Error('cancelled');
    if (requests && gap) await sleep(gap);
    for (;;) {
      const res = await one(u);
      if (stopped()) throw Error('cancelled');
      if (!res || typeof res !== 'object') throw Error('net');
      if (res.status >= 300 && res.status < 400) {
        let next = null;
        try { const loc = importHeader(res.headers, 'location'); next = loc ? importUrl(new URL(loc, u).href) : null; } catch (e) { next = null; }
        if (!next) throw Error('net');
        u = next; continue;
      }
      if (!(res.status >= 200 && res.status < 300)) throw Error('net');
      const final = typeof res.url === 'string' && res.url ? importUrl(res.url) : u;
      if (!final) throw Error('net');
      let body = res.data;
      if (body && typeof body === 'object') body = '<script type="application/json">' + JSON.stringify(body).replace(/</g, '\\u003c') + '</script>';
      return { html:String(body || '').slice(0, IMPORT_MAX_HTML), href:final };
    }
  };
  try {
    const first = await get(href, 0), doc = importDoc(first.html);
    let data = importRead(doc, first.href);
    const src = IMPORT_SOURCES.find(s => s.id === data.source), host = importHost(first.href);
    for (const step of src.next(doc, first.href)) {
      if (requests >= IMPORT_MAX_REQUESTS || data.league.some(r => !r.own)) break;
      if (step.kind === 'fixtures' && data.teams.length) continue;
      if (importHost(step.href) !== host) continue;
      try { const page = await get(step.href, opts.gap ?? src.gap); data = importMerge(data, importParse(page.html, page.href)); }
      catch (e) { if (stopped()) throw e; /* a missing tab: the first page stands */ }
    }
    return { ok:true, data, requests };
  } catch (e) { return { ok:false, error:e && (e.message === 'timeout' || e.message === 'cancelled') ? e.message : 'net', requests }; }
}

/* ---------- saving ---------- */
/* The league as saved: the table's other sides (the club's own row left out), else the fixture opponents, at most 16,
   each with a name no other side in it has (importFit). Ratings are made up and count every ability in ABILITIES, at the level
   chosen for the club: a table's leader totals the level's rating and its foot one point an ability less, not under the floor; fixture opponents, with no table to go on,
   fall between the two by name. With nothing chosen and nothing known the level is the best Local club's (importTop), so a league you add sits with the Local list, under the professional lists.
   Colours are the page's where it gave them, else a shirt and trim picked from KIT_COLOURS
   by the name, so a side keeps its colours from one import to the next. Codes skip every built-in side's and yours. */
const importTop = () => Math.max(...CLUBS.filter(t => t.league !== 'English Premiership').map(rateOf));   // Twickenham is a Premiership side: the Local list's own top is Farnham, at 58
/* A page's own words for its league, read to a level. The levels between (Counties 4, Counties 2) take the level under them. Null when the words say nothing. */
const IMPORT_LEVEL_WORDS = [[/\bcounties\s*[45]\b/, 'c5'], [/\bcounties\s*[23]\b/, 'c3'], [/\bcounties\s*1\b/, 'c1'], [/\bregional\s*2\b/, 'r2'], [/\bregional\s*1\b/, 'r1'], [/\bnational league\b|\bchamp rugby\b|\b(?:rfu|english) championship\b/, 'nat'], [/\b(?:english premiership|premiership rugby|prem rugby|top 14|united rugby championship|super rugby)\b/, 'top']];
function importLevelFrom(texts) {
  for (const t of texts) { const s = String(t || '').toLowerCase().slice(0, 300), hit = IMPORT_LEVEL_WORDS.find(([re]) => re.test(s)); if (hit) return hit[1]; }
  return null;
}
const importLevelDefault = () => TEAM_LEVELS.find(l => sumOfOverall(l.overall) === importTop()) || TEAM_LEVELS[4];
/* The level an import is set at: the one chosen, else what its page says, else the Local list's best. */
const importLevel = (data, id) => TEAM_LEVELS.find(l => l.id === id) || TEAM_LEVELS.find(l => data && l.id === data.level) || importLevelDefault();
function importSides(data, levelId) {
  if (!data) return [];
  const clubG = importClubSide(data);                      // a side with nothing in its name to say otherwise plays as the club does
  const table = data.league || [], rows = table.filter(r => !r.own), fromTable = rows.length > 0;
  const n = ABILITIES.length, top = sumOfOverall(importLevel(data, levelId).overall), foot = Math.max(n, top - n);
  const used = new Set([...ALL_TEAMS, ...custom].map(t => t.id)), names = new Set(), out = [], list = fromTable ? rows : data.teams || [];
  const shared = new Map();                                // how many sides each short name stands for
  for (const t of list) { const k = importKey(importShort(t.name)); shared.set(k, (shared.get(k) || 0) + 1); }
  for (const t of list) {
    if (out.length >= IMPORT_MAX_SIDES) break;
    const name = importFit(t.name, names, shared.get(importKey(importShort(t.name))) > 1); if (!name) continue;
    const h = importHash(name), id = importCode(name, used);
    const total = fromTable ? Math.round(top - (top - foot)*table.indexOf(t)/Math.max(1, table.length - 1)) : Math.min(top, foot + 1 + h % Math.max(1, top - foot - 1));
    const side = cleanSide(importSpread({ key:'lg-' + id, id, name, g:importSideOf(t.name) || clubG, ...importColours(t, h) }, total, ABILITIES.map((_, i) => ABILITIES[(i + h) % n][0])));
    if (!side) continue;
    names.add(importKey(name)); used.add(id); out.push(side);
  }
  return out;
}
function importColours(t, h) {
  if (t.kit) return { kit:t.kit, trim:t.trim || importContrast(t.kit), hoops:false };
  const n = KIT_COLOURS.length, kit = KIT_COLOURS[h % n][1];
  for (let j = 0; j < n; j++) { const trim = KIT_COLOURS[((h >>> 8) + j) % n][1]; if (colorDist(kit, trim) >= 150) return { kit, trim, hoops:(h >>> 16) % 4 === 0 }; }
  return { kit, trim:importContrast(kit), hoops:false };
}
/* total ability points over every ability in ABILITIES, as evenly as they go: the odd points to the first of order
   (ability keys), then the rest in ABILITIES order. */
function importSpread(t, total, order) {
  const keys = ABILITIES.map(([k]) => k), n = keys.length, base = Math.floor(total/n), extra = total % n;
  const rank = [...order.filter(k => keys.includes(k)), ...keys.filter(k => !order.includes(k))];
  for (const k of keys) t[k] = clamp(base + (rank.indexOf(k) < extra ? 1 : 0), 1, 5);
  return t;
}
function importCode(name, used) {
  const L = String(name).toUpperCase().replace(/[^A-Z]/g, '') || 'LGE', AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let j = 1; j < L.length; j++) for (let k = j + 1; k < L.length; k++) { const c = L[0] + L[j] + L[k]; if (!used.has(c)) return c; }
  for (const a of AZ) for (const b of AZ) { const c = L[0] + a + b; if (!used.has(c)) return c; }
  return 'XXX';
}
/* A saved league, read back: each side through cleanSide, a name that fits a card, passes importName and no other side
   in it has, a code no built-in side uses and no other side in it, at most 16. Anything broken is dropped; an empty
   league is null. */
function cleanImportLeague(v) {
  if (!v || typeof v !== 'object' || Array.isArray(v) || !Array.isArray(v.teams)) return null;
  const teams = [], ids = new Set(ALL_TEAMS.map(t => t.id)), names = new Set(), mine = settings.myTeam;   // mine: as the save has it, because a side's new key can be another's old one
  for (const raw of v.teams.slice(0, 64)) {
    const t = cleanSide(raw), name = t && importName(t.name), fit = name && importFit(name, names);
    if (!fit) continue;
    t.name = fit; names.add(importKey(fit));
    delete t.home; delete t.custom;
    if (ids.has(t.id)) {                                   // a code a new built-in list has taken: Your Team follows its side to the new one
      const was = t.key; t.id = importCode(t.name, ids);
      if (was && mine === was) settings.myTeam = 'lg-' + t.id;
    }
    ids.add(t.id);
    t.key = 'lg-' + t.id;
    teams.push(t);
    if (teams.length >= IMPORT_MAX_SIDES) break;
  }
  return teams.length ? { teams } : null;
}
/* One of your teams with the club's name, or null. */
const importMine = data => { if (!data || !data.club) return null; const k = importKey(importShort(data.club.name)); return custom.find(t => importKey(t.name) === k) || null; };
/* Is there a place for the club among your teams: one of yours has its name, or there is room for another. */
const importRoom = data => !!importMine(data) || custom.length < MAX_CUSTOM;
/* Save: the club joins your teams through cleanTeam, unless one of yours already has its name (re-importing keeps your
   edits), set at the level chosen with all of that level's points spent evenly over every ability (the odd points to pace and handling),
   so it starts with the top of its league and can move them about, and the colours picked. Its league replaces any saved before; an import with no league leaves the old one. */
function importSave(data, draft) {
  let club = importMine(data), added = false;
  const level = importLevel(data, draft && draft.level);
  if (data.club && !club && custom.length < MAX_CUSTOM) {
    const name = importShort(data.club.name);
    club = cleanTeam(importSpread({ key:'imp' + Date.now().toString(36), id:autoCode(name), name, g:importClubSide(data), kit:draft.kit, trim:draft.trim, hoops:false, level:level.id }, sumOfOverall(level.overall), ['pace', 'handling']), custom.length);
    custom.push(club); added = true;
  }
  const sides = importSides(data, level.id);
  if (sides.length) importLeague = { teams:sides };
  save();
  return { club, added, sides:sides.length };
}

/* ---------- My League on the team screen ---------- */
const importTeams = () => importLeague ? importLeague.teams : CLUBS;
/* A championship is six sides, yours and five others (newChamp). From My League the five are drawn at random from the
   league, leaving out the team you picked and any side of the same name. A league of fewer than five is topped up
   with Local clubs, drawn the same way, so a three-team league plays your club, its three and two Local clubs. Only sides that meet
   the pick's (g, men's or women's): a league's other side stays out, and the Local clubs top up as that side. */
function importOthers(t, g = teamSide(t) === 1 ? 1 : 0) {
  const same = o => keyOf(o) === keyOf(t) || importKey(o.name) === importKey(t.name), fits = o => { const s = teamSide(o); return s === 'mixed' || s === g; };
  const five = shuffle(importTeams().filter(o => fits(o) && !same(o))).slice(0, 5);
  if (five.length < 5) five.push(...shuffle(CLUBS.filter(o => !same(o) && !five.some(f => importKey(f.name) === importKey(o.name)))).slice(0, 5 - five.length).map(o => (g ? womenClub(o) : o)));
  return five;
}
/* The Import Club card: beside Create Team while there is room for a team, and kept with four made while a league is
   saved, as the way to refresh it or remove it. */
function importCard() { return custom.length < MAX_CUSTOM || importLeague ? `<button class="team create" id="t-import"><span class="plus link" aria-hidden="true"></span><span class="tname">Import Club</span></button>` : ''; }
function importBind() {
  $('t-league').hidden = !(importLeague && importLeague.teams.some(pickFits));   // a league all of the other side waits on its own side's view
  const b = $('t-import'); if (b) b.addEventListener('click', importOpen);
}

/* ---------- the Import Club card ----------
   web: the app is needed. link: paste, then Import (a grown-up check first). busy: fetching. preview: the club, its
   colours and the league's size, then Save. The card hides while the grown-up check is up, so the two never stack. */
let importUi = { step:'link', data:null, draft:null, pick:false, err:'', armed:false, token:0 };
const importCanPaste = () => typeof navigator !== 'undefined' && !!navigator.clipboard && typeof navigator.clipboard.readText === 'function';
const importTouch = () => typeof matchMedia === 'function' && !!matchMedia('(pointer: coarse)').matches;
/* The control a step starts on: the link field (on a touch screen Import, so no keyboard springs up over the card),
   the primary in the preview, Back while it imports and on the web. button: a button only, for a controller's ring. */
function importFocusEl(button) {
  const s = importUi.step;
  if (s === 'link') return !button && !importTouch() ? $('im-url') : button && !$('im-paste').hidden ? $('im-paste') : $('im-go');
  return s === 'preview' ? $('im-go') : $('im-back');
}
function importFocus() {
  const el = importFocusEl(false);
  if (!$('m-import').hidden && el && typeof el.focus === 'function') el.focus();
}
DEFAULT_FOCUS['m-import'] = () => importFocusEl(true);
function importOpen() {
  importUi = { step:importHttp() ? 'link' : 'web', data:null, draft:null, pick:false, err:'', armed:false, token:importUi.token + 1 };
  $('im-url').value = '';
  importRender();
  $('m-import').hidden = false;
  importFocus();
}
function importClose() { importUi.token++; $('m-import').hidden = true; renderTeams(); }
let importGateHook = null;                               // the tests' stand-in for the grown-up check
function importGate(go, cancel) {
  if (importGateHook) importGateHook(go, cancel);
  else if (typeof parentGate === 'function') parentGate(go, cancel);   // src/kids.js: a check a young child can't pass
  else go();
}
function importGo() {
  const u = importUi;
  if (u.step === 'preview') { importCommit(); return; }
  if (u.step !== 'link') return;
  u.armed = false;
  const href = importUrl($('im-url').value);
  if (!href) { u.err = IMPORT_MSG.url; importRender(); return; }
  if (!importHttp()) { u.step = 'web'; importRender(); return; }
  const token = ++u.token;
  $('m-import').hidden = true;
  importGate(() => { if (token === importUi.token) importRun(href, token); }, () => { if (token === importUi.token) { $('m-import').hidden = false; importFocus(); } });
}
async function importRun(href, token, opts) {
  const u = importUi;
  u.step = 'busy'; u.err = ''; u.armed = false; importRender(); $('m-import').hidden = false; importFocus();
  const r = await importFetch(href, { ...opts, cancelled:() => token !== importUi.token });   // Back, or another link: no more requests
  if (token !== importUi.token) return;                   // closed, or another link, while it fetched
  const full = r.ok && !!r.data.club && !importRoom(r.data), data = full ? { ...r.data, club:null } : r.data;   // four teams made: the league can come in, the club can't
  const empty = r.ok && !data.club && !importSides(data).length;
  if (!r.ok || empty) { u.step = 'link'; u.err = IMPORT_MSG[!r.ok ? r.error : full ? 'full' : 'empty'] || IMPORT_MSG.net; importRender(); importFocus(); return; }
  const c = data.club, mine = importMine(data);
  u.data = data; u.pick = !!c && !c.kit && !mine;
  u.level = importLevel(data, mine && mine.level).id;   // preset: your own team's level on a re-import, else what the page says, else the Local list's best
  u.draft = mine ? { kit:mine.kit, trim:mine.trim, hoops:mine.hoops } : c ? { kit:c.kit || '#2050b0', trim:c.trim || importContrast(c.kit || '#2050b0'), hoops:false } : null;
  u.step = 'preview'; importRender(); importFocus();
}
function importCommit() {
  const u = importUi; if (u.step !== 'preview' || !u.data) return;
  const res = importSave(u.data, { ...(u.draft || {}), level:u.level });
  if (res.added) {                                         // as Save Team: a club made from Quick Match or Player 1's pick is the one played as
    if (pickMode === 'quick' && quickAuto) { quickPick = res.club; quickAuto = false; pickFollow(res.club); }
    else if (pickMode === 'two' && twoSel.picking === 0 && pickFits(res.club)) { twoSel.teams[0] = res.club; twoSel.picking = 1; }
    else if (pickMode === 'my') { settings.myTeam = keyOf(res.club); save(); importClose(); goHome(); return; }   // Change Team: the club you added is your team
  }
  importClose();
  if (res.sides) { if (!quickPick) pickFollow(importLeague.teams[0]); settings.pool = IMPORT_POOL; renderTeams(); $('s-teams').scrollTop = 0; }   // straight to the new league, from the top
}
function importRender() {
  const u = importUi, s = u.step, web = s === 'web', busy = s === 'busy', pre = s === 'preview';
  const c = pre && u.data.club, sides = pre ? importSides(u.data, u.level) : [], n = sides.length;
  $('im-title').textContent = web ? 'Import Works in the Try Line App' : pre ? (c ? importShort(c.name) : 'My League') : 'Paste Your Link';
  $('im-line').hidden = !web;
  $('im-field').hidden = web || pre;
  $('im-url').disabled = busy;
  $('im-paste').hidden = !importCanPaste(); $('im-paste').disabled = busy;
  $('im-err').hidden = !u.err || pre; $('im-err').textContent = u.err;
  $('im-jersey').hidden = !c; $('im-jersey').innerHTML = c ? jersey(u.draft) : '';
  $('im-league').hidden = !n;
  $('im-league').innerHTML = n ? sides.slice(0, 12).map(t => jersey(t, 'mini')).join('') + `<span class="lbl">My League · ${n} Team${n === 1 ? '' : 's'}</span>` : '';
  $('im-cols').hidden = !(c && u.pick);
  const mine = c ? importMine(u.data) : null;               // re-importing keeps your team as you made it (importSave): the level is only its league's, and the screen says so
  const lv = pre && (n || !mine) ? importLevel(u.data, u.level) : null, li = lv ? TEAM_LEVELS.indexOf(lv) : 0;
  $('im-level').hidden = !lv;
  $('im-level-lbl').textContent = mine || !c ? 'League' : 'Level';
  $('im-kept').hidden = !mine;
  $('im-kept').textContent = mine ? `${mine.name} stays as you made it.${n ? ' This sets its league.' : ''}` : '';
  $('im-lv-name').textContent = lv ? `${lv.name} · ${starsWords(lv.stars)}` : '';
  $('im-lv-stars').innerHTML = lv ? starsHtml(lv.stars, true) : '';
  $('im-lv-down').disabled = li <= 0; $('im-lv-up').disabled = li >= TEAM_LEVELS.length - 1;
  for (const [id, key] of [['im-kit', 'kit'], ['im-trim', 'trim']]) for (const b of $(id).querySelectorAll('.sw')) b.setAttribute('aria-pressed', String(!!u.draft && b.dataset.c === u.draft[key]));
  $('im-go').hidden = web; $('im-go').disabled = busy;
  $('im-go').textContent = busy ? 'Importing' : pre ? (c && !mine ? 'Save Club' : 'Save League') : 'Import';
  const alt = pre ? 'Change Link' : importLeague && !busy ? (u.armed ? 'Confirm Remove' : 'Remove League') : '';
  $('im-alt').hidden = !alt; $('im-alt').textContent = alt; $('im-alt').classList.toggle('warn', !pre);
  $('im-row').classList.toggle('one', !alt);
}
function importAlt() {
  const u = importUi;
  if (u.step === 'preview') { u.step = 'link'; u.data = null; u.err = ''; u.armed = false; u.token++; importRender(); importFocus(); return; }
  if (!importLeague) return;
  if (!u.armed) { u.armed = true; importRender(); return; }
  importLeague = null; u.armed = false;
  if (settings.pool === IMPORT_POOL) settings.pool = 1;
  save(); importRender(); importFocus();                   // Remove League has gone: focus to the step's own control
}
function importLevelStep(d) {
  const u = importUi; if (u.step !== 'preview') return;
  const l = TEAM_LEVELS[TEAM_LEVELS.indexOf(importLevel(u.data, u.level)) + d];
  if (l) { u.level = l.id; importRender(); }
}
$('im-lv-down').addEventListener('click', () => importLevelStep(-1));
$('im-lv-up').addEventListener('click', () => importLevelStep(1));
for (const [id, key] of [['im-kit', 'kit'], ['im-trim', 'trim']]) {
  $(id).innerHTML = KIT_COLOURS.map(([n, h]) => `<button class="sw" style="--k:${h}" data-c="${h}" aria-label="${n}"></button>`).join('');
  for (const b of $(id).querySelectorAll('.sw')) b.addEventListener('click', () => { if (importUi.draft) { importUi.draft[key] = b.dataset.c; importRender(); } });
}
$('im-go').addEventListener('click', importGo);
$('im-alt').addEventListener('click', importAlt);
$('im-back').addEventListener('click', importClose);
$('im-url').addEventListener('input', () => { if (importUi.err) { importUi.err = ''; importRender(); } });
$('im-url').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); importGo(); } });
$('im-paste').addEventListener('click', async () => {
  try { const t = await navigator.clipboard.readText(); if (t) { $('im-url').value = t.trim().slice(0, 2048); importUi.err = ''; importRender(); } } catch (e) { /* refused or empty */ }
});
/* =========================================================
   Kids: a level below Easy for 6 to 10 year olds, and the
   grown-up check in front of anything that leaves the game.
   ========================================================= */
/* How the level is stored: settings.kids, a flag layered on Easy (settings.diff stays 0). Every lever table in the engine (DIFF,
   KICK's fill and band, SPRINT, CONTACT.contact, the duel windows, COVER, MOVES.dummy.bite) is an array by level 0..2, and the save
   keeps diff as 0..2. A fourth level would need a fourth entry in every one of them, or would shift what a saved 0..2 means. As a
   flag, a saved diff means what it always did, an old save (no flag) loads exactly as it was, and anything that reads settings.diff
   or levelOf sees Easy, the nearest level. The flag counts only with diff 0, so a hand-edited kids:true on Hard is just Hard.
   The levers below act only in a match newMatch was asked to play as Kids (opts.kids, which startMatch passes): one player, on
   Easy, never AI v AI, the demo, practice or two player. Every one reads M.kids, so the sims, the demo and the balance tools run
   the same numbers and the same random draws as before. */
const KIDS = {
  diff:{ ...DIFF[0], cpuSpeed:0.92, cpuTackle:0.45, cpuIntercept:0.05, turnover:-0.05, scrumCpu:0.45, lineSigma:0.28, lineContest:0.35 },   // Easy's row with the other side slower, weaker in the tackle, less often intercepting or turning the ball over, and soft at scrum and lineout
  tackle:0.10,             // your ringed man's own tackles (his contact tackle and his dive) are this much surer
  hands:0.1,               // your side's catches knock on a tenth as often
  jolt:0.15,               // your carrier in a tackle has the ball jolted loose about a seventh as often
  offload:0.95,            // an offload you press gets away
  passErr:0.4,             // your passes stray less than half as far
  duelWin:0.20,            // the gold ring stays open 0.2s longer. A close-up is never lost (kidsDuel): in the gold it is a Perfect
  kick:{ band:2, bandMax:0.34, fill:1.6, rush:0.65 },   // goal kicks: the gold band twice as wide (at most 0.34 of the meter), the meter 1.6x slower, the aim set for you, a release in the gold struck true; drop-goal chargers at 65% pace
  switchHold:0.5,          // defending, the ring moves to your best defender once it has stayed put this long
  rest:0.15,               // a stick under this is let go: your ringed defender chases the ball on his own
  chase:0.80,              // at this share of his pace, so the other side can still get away and score now and then
  scrum:0.25,              // your pack's own shove, so a few taps win your scrum
  reach:0.12,              // your lineout jumper's reach, so a rough Jump still takes your throw
};
const kidsLevel = () => !!settings.kids && settings.diff === 0;
/* The home Difficulty row is Kids | Easy | Normal | Hard: button 0 is the flag, buttons 1-3 are diff 0-2. */
const kidsSegIndex = () => (kidsLevel() ? 0 : settings.diff + 1);
function kidsSegSet(i) { settings.kids = i === 0; settings.diff = clamp(i - 1, 0, 2); }

/* ---------- the levers the engine calls (each caller checks M.kids first) ---------- */
function kidsDuel(c, res) {                                // a close-up is never lost: early, late or the wrong way it still comes off, and a press in the gold is a Perfect
  if (res !== 'perfect') res = 'ok';
  const right = c.kind === 'past' ? c.open : c.kind === 'pass' ? (c.drift ? 'dummy' : 'pass') : 1;
  return [res, right];
}
function kidsDuelAct(c, inp) {                             // any press counts: Pass or Kick in a Get Past, Kick in a Tackle or Block
  if (!(inp.aPressed || inp.bPressed || inp.flick)) return null;
  if (c.kind === 'past') return inp.flick || c.open;
  if (c.kind === 'pass') return inp.bPressed ? 'dummy' : 'pass';
  return 1;
}
function kidsBand(g) {                                     // after bandOf: the band widens about its centre and the meter slows
  const w = Math.min(g.w*KIDS.kick.band, KIDS.kick.bandMax);
  g.w = w; g.lo = g.ctr - w/2; g.hi = Math.min(1, g.ctr + w/2);
  g.fill *= KIDS.kick.fill;
}
const kidsStrike = (g, m) => (M && M.kids && isHuman(g.team) && m >= g.lo && m <= g.hi ? g.ctr : m);   // a release in the gold strikes the band's centre, which the set aim puts between the posts
function kidsSwitch(t) {                                   // defending, the ring goes to the man who can make the tackle: the nearest chaser when yours is down or another is well nearer, else the man in front when yours is beaten
  if (!M.kids || !isHuman(t) || M.phase !== 'play' || M.cut || ourBall(t) || sideOf(t).ctrlT < KIDS.switchHold) return;
  const cur = ctrlOf(t);
  if (cur && cur.bind) return;                             // never off a man bound in a tackle: how it ends (Big Hit, Tripped, Ankle Tap) is his to see
  const q = sprintPick(t) || (switchUseful(t) ? switchTarget(t) : null);
  if (q && q !== cur) { setCtrl(t, q); st('kidsSwitch'); }
}
function kidsChase(p, inp, dt) {                           // the stick let go while defending: the ringed man chases the carrier, or runs to a kicked or loose ball or to where their pass will land, as his teammates do
  if (!M.kids || inp.world().mag >= KIDS.rest || M.phase !== 'play' || p.offside > 0) return false;   // a retiring tackler stays out, as his teammates do
  const b = M.ball;
  let x, y;
  if (b.state === 'held' && b.carrier.team !== p.team) { const c = b.carrier, lead = clamp(dist(p, c)/9, 0, 0.7); x = c.x + c.vx*lead; y = c.y + c.vy*lead; }
  else if (b.state === 'air' && b.f && (b.f.kind !== 'pass' || b.f.team !== p.team)) { x = b.f.x1; y = b.f.y1; }
  else if (b.state === 'loose') { x = b.x; y = b.y; }
  else return false;
  seek(p, x, y, maxSpeed(p)*KIDS.chase, 15, dt, true);
  return true;
}

/* ---------- the grown-up check ----------
   parentGate(onPass, onCancel): a card a young child cannot get past, in the Apple Kids-category style. It asks a multiplication
   written out in words, a teen times six to nine with a three-figure answer (seventeen times six), typed on its own number keys.
   A wrong answer clears and asks a new one. A second wrong answer in a row rests the keys (10s, then 20s, 40s and 60s at most until
   a right answer), so tapping a pattern cannot cycle through the questions until one comes out; the rest outlives the card, so
   shutting it and opening it again does not skip it. Touch, the keyboard (the figures, Backspace, Escape, and Tab inside the card:
   the rest of the page is inert while it is open) and a controller (the card is the nav layer, Back is Cancel) all reach it. Only a
   right answer calls onPass. */
const KIDS_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const KIDS_GATE = { tries:2, rest:10000, restMax:60000 };   // wrong answers in a row before the keys rest; the first rest (ms), doubling to restMax
const KIDS_ASKS = [];                                      // [a, b]: 13 to 19 times 6 to 9 with a three-figure answer, 102 to 171 (22 questions), past the times tables a child knows
for (let a = 13; a <= 19; a++) for (let b = 6; b <= 9; b++) if (a*b >= 100) KIDS_ASKS.push([a, b]);
let kidsGate = null;                                       // the open check: { a, b, answer, typed, onPass, onCancel, back, inert }
let kidsGateMiss = 0, kidsGateRests = 0, kidsGateRest = null;   // wrong answers in a row; rests since the last right answer; the rest under way ({ until, ms }) or null
function kidsPick(n) {                                     // 0..n-1 from the browser's crypto, so the check never draws on the match's Math.random
  try { const u = new Uint32Array(1); crypto.getRandomValues(u); return u[0] % n; } catch (e) { return Math.floor(Math.random()*n); }
}
function kidsAsk() {
  const g = kidsGate, q = KIDS_ASKS[kidsPick(KIDS_ASKS.length)];
  g.a = q[0]; g.b = q[1]; g.answer = String(g.a*g.b); g.typed = '';
  $('pg-q').textContent = 'What is ' + KIDS_WORDS[g.a] + ' times ' + KIDS_WORDS[g.b] + '?';
}
function kidsGateShow(wrong) {
  const el = $('pg-ans'), rest = !!kidsGateRest;
  el.textContent = rest ? 'Wait' : kidsGate.typed || (wrong ? 'Try Again' : '');
  el.classList.toggle('wrong', rest || !!wrong);
  $('m-gate').classList.toggle('rest', rest);              // the keys dim and a bar runs down the answer box (styles.css)
  if (rest) el.style.setProperty('--pg-rest', Math.max(0, kidsGateRest.until - Date.now()) + 'ms');
}
function kidsGateSleep() {                                 // the second wrong answer in a row: the keys rest
  const ms = Math.min(KIDS_GATE.restMax, KIDS_GATE.rest*2**kidsGateRests);
  kidsGateRests++; kidsGateMiss = 0;
  const r = kidsGateRest = { until:Date.now() + ms, ms };
  setTimeout(() => kidsGateWake(r), ms);
}
function kidsGateWake(r) {                                 // r: the rest its timer was set for, so a stale timer never ends a later one (the tools call it bare)
  if (!kidsGateRest || (r && r !== kidsGateRest)) return;
  kidsGateRest = null;
  if (kidsGate) kidsGateShow(false);
}
function parentGate(onPass, onCancel) {
  if (kidsGate) kidsGateClose(false);                      // one check at a time: an older one is cancelled
  const pad = lastDev === 'pad', act = document.activeElement || null;
  kidsGate = { onPass, onCancel, typed:'', back:act, inert:[] };
  kidsAsk(); kidsGateShow(false);
  const m = $('m-gate'), body = document.body;
  if (pad && act && act.blur) act.blur();                  // a controller works by the chalk ring, and the DOM focus would draw a second outline on another key
  if (body && body.children) for (const el of body.children) if (el !== m && el.id !== 'rotate' && !el.inert) { el.inert = true; kidsGate.inert.push(el); }   // Turn Your Phone Sideways stays live: it covers the card upright, and an inert overlay would let a tap through to the keys under it
  m.hidden = false;
  if (pad) setFocus($('pg-k1'));                           // the ring starts on 1
  else { setFocus(null); const first = $('pg-k1'); if (first && first.focus) first.focus(); }   // the keyboard's Tab and the screen reader start there
}
function kidsGateClose(passed) {
  const g = kidsGate; if (!g) return;
  kidsGate = null;
  $('m-gate').hidden = true; setFocus(null);
  for (const el of g.inert) el.inert = false;
  if (g.back && g.back.focus && !(g.back.closest && g.back.closest('[hidden]'))) g.back.focus();
  if (passed) { kidsGateMiss = 0; kidsGateRests = 0; }
  const fn = passed ? g.onPass : g.onCancel;
  if (typeof fn === 'function') fn();
}
function kidsGateType(d) {
  const g = kidsGate; if (!g || kidsGateRest) return;      // resting keys do nothing
  g.typed = (g.typed + d).slice(0, 3);
  if (g.typed.length < g.answer.length) { kidsGateShow(false); return; }
  if (g.typed === g.answer) { kidsGateClose(true); return; }
  kidsAsk();
  if (++kidsGateMiss >= KIDS_GATE.tries) kidsGateSleep();
  kidsGateShow(true);
}
function kidsGateDelete() { if (kidsGate && !kidsGateRest) { kidsGate.typed = kidsGate.typed.slice(0, -1); kidsGateShow(false); } }
for (const n of '1234567890') $('pg-k' + n).addEventListener('click', () => kidsGateType(n));
$('pg-del').addEventListener('click', kidsGateDelete);
$('pg-cancel').addEventListener('click', () => kidsGateClose(false));
$('m-gate').hidden = true;                                 // closed until asked for (the test harness's stand-in elements start open)
DEFAULT_FOCUS['m-gate'] = () => $('pg-k1');
window.addEventListener('keydown', e => {                  // while the check is open no key reaches the game; the figures, Backspace and Escape answer it, and every other key keeps the browser's own meaning (Tab, Enter and Space on the card's buttons)
  if (!kidsGate) return;
  if (e.stopPropagation) e.stopPropagation();
  const k = e.key;
  if (/^[0-9]$/.test(k)) kidsGateType(k);
  else if (k === 'Backspace' || k === 'Delete') kidsGateDelete();
  else if (k === 'Escape') kidsGateClose(false);
  else return;
  if (e.preventDefault) e.preventDefault();
}, true);
/* =========================================================
   Training Ground drills.
   Tag Chase, Bouncy Egg, Pass Around the Circle, Cones, Tackling and Ball Back each run in a training space of their own: a practice field (drawn in
   render-drill.js) and the controls of a match with none of its flow. While practice.space is set, update() skips matchUpdate and the drill moves
   the men and the ball itself (M.phase reads 'drill', so nothing in the HUD or the hints takes it for open play). Kicking
   and Driving use the match's own goal-kick and scrum close-ups; Defend a Breakaway and Create a Two-on-One restage open
   play. Every engine hook checks `practice` first, so matches, AI v AI, the demo and the balance tools never reach any of it,
   and nothing here draws a random number outside a drill.
   ========================================================= */
const DRILL_PACE = { live:0.75 };                           // the Training Ground's one speed lever: a live drill's dt is scaled by this, so its windows, meters and clocks all stretch together. Matches never read it
const drillRate = () => (!practice ? 1 : practice.demo ? practice.demo.rate : DRILL_PACE.live);   // this step's scale: a match is 1, a live drill the lever, Watch How its own slow motion (drill-demo.js)
const DRILL_RUN = { acc:16, secs:3, refill:4.5, floor:0.2 };   // a training space's run: pick-up (m/s²), the Sprint meter's seconds of burst, its refill, the least it needs to start
const drillStarsOf = (score, cuts) => cuts.filter(c => score >= c).length;   // stars: one for each threshold met, 0 to 3
const drillLerp = (a, b, u) => a + (b - a)*u;
function drillPlace(p, x, y, fx, fy) {
  p.x = x; p.y = y; p.hx = x; p.hy = y; p.vx = p.vy = 0; p.down = 0; p.tcd = 0; p.offside = 0; p.bind = null; p.drawFrom = null;
  p.fx = fx == null ? dirOf(p.team) : fx; p.fy = fy || 0; p.sprint = 0; p.sprinting = false; p.stumble = 0; p.wf = 0; p.boost = 0; p.fend = 0;
}
function drillFace(p, x, y) { const dx = x - p.x, dy = y - p.y, m = hyp(dx, dy); if (m > 1e-3) { p.fx = dx/m; p.fy = dy/m; } }
function drillSpace(x, y, zoom) {                          // a training space: no match flow, a still camera (closer in where the space is small), the ball dead at the spot until the drill takes it
  practice.space = true; practice.cam = { x, y }; practice.zoom = zoom || 1;
  M.phase = 'drill'; M.set = null; M.cut = null; M.goal = null; M.contact = null; M.tags = []; M.fx = [];
  placeBall(x, y);
  const S = M.spr[0]; S.m = 1; S.spent = false; S.p = null;
}
function drillHold(p) {                                    // the ball in p's hands
  const b = M.ball;
  b.state = 'held'; b.carrier = p; b.f = null; b.x = p.x + p.fx*0.55; b.y = p.y + p.fy*0.55; b.z = 1.0; b.vx = b.vy = b.vz = 0;
}
function drillSprint(p, dt, moving) {                      // the Sprint meter in a training space: held Sprint while moving is a burst paid from the meter, which refills once the burst has eased out
  const inp = inputOf(0), S = M.spr[0], R = DRILL_RUN;
  if (!inp.cDown) S.spent = false;
  const go = inp.cDown && moving && !S.spent && (p.sprinting || S.m >= R.floor);
  if (go) {
    if (!p.sprinting) { sfx('whoosh'); st('drillSprints'); }
    p.sprinting = true; p.sprint = SPRINT.fade; S.m -= dt/R.secs;
    if (S.m <= 0) { S.m = 0; S.spent = true; p.sprinting = false; }
  } else {
    p.sprinting = false;
    if (p.sprint > 0) p.sprint = Math.max(0, p.sprint - dt); else S.m = Math.min(1, S.m + dt/R.refill);
  }
  return p.sprinting;
}
function drillRun(p, dt, box, sprint, slide) {              // the human's own run: the stick steers; Sprint (when the drill allows it) is a burst from the meter, with less grip to turn on if the drill says (slide). box: [x0, y0, x1, y1]
  const j = inputOf(0).world();
  if (sprint) drillSprint(p, dt, j.mag > 0.2); else { p.sprinting = false; p.sprint = 0; }
  const ms = maxSpeed(p);
  const cur = hyp(p.vx, p.vy), turning = slide && p.sprinting && cur > 1 && j.mag > 0.2 && (p.vx*j.x + p.vy*j.y)/(cur*j.mag) < 0.87;   // only the turn: a sprinter gathers speed in a straight line as anyone does
  steer(p, j.x*ms, j.y*ms, turning ? slide : DRILL_RUN.acc, dt);
  const x = clamp(p.x + p.vx*dt, box[0], box[2]), y = clamp(p.y + p.vy*dt, box[1], box[3]);
  if (x !== p.x + p.vx*dt) p.vx = 0;
  if (y !== p.y + p.vy*dt) p.vy = 0;
  p.x = x; p.y = y;
  const sp = hyp(p.vx, p.vy); if (sp > 0.6) { p.fx = p.vx/sp; p.fy = p.vy/sp; }
  return sp;
}
function drillTag(text, x, y) { M.tags.push({ text, x, y, t:0 }); while (M.tags.length > 2) M.tags.shift(); }   // a word on the pitch in a drill: the drills' own words, kept apart from the match's fixed list
function drillTap() { const inp = inputOf(0), a = inp.aPressed; inp.aPressed = inp.bPressed = inp.cPressed = false; return a; }   // a training space reads its own presses
const drillKey = act => (lastDev === 'pad' ? { a:'Bottom Button', b:'Right Button', c:'Shoulder', m:'Stick' }[act] : seatKey(0, act));   // what this player presses: the pad's own button once a pad is what they last used, else the keyboard's key
function drillName(word, act) { return word + (lastDev === 'touch' ? '' : ' (' + drillKey(act) + ')'); }   // a button's name, with its key on a keyboard or a controller: the one namer for cards, live cues and Watch How
const drillIsKeys = () => lastDev === 'kb';
const drillMove = () => (drillIsKeys() ? 'Press ' + drillKey('m') : 'Push the stick');   // moving, in the words of the device in hand
const drillSide = what => (drillIsKeys() ? 'Press A or D ' + what : 'Push the stick ' + what);   // a left or right choice. what: 'for the tick', 'towards your team'
function drillCue(objective, cue) {                        // the in-play line, written only when it changes (it is a polite live region)
  const key = objective + '|' + (cue || '');
  if (practice.cueKey === key) return;
  practice.cueKey = key;
  $('pr-objective').textContent = objective; $('pr-cue').textContent = cue || '';
  $('practice-cue').hidden = !objective;
}

/* ---------- Bouncy Egg: a thrower and a catcher ----------
   The thrower faces you and, after the same short wind-up every time, spins the ball into the ground so it tumbles away in hops
   at odd angles, passes it flat, or throws it high and long. The first three throws are one of each, named as thrown; after that
   you only know which at the release. Catch it cleanly: within reach and below head height, and a bounce pass only once it has
   hit the ground, then on any hop until it stops (so every Bounce Pass really bounces). A flat pass stays low from the hands to
   the catch, so running at it meets it anywhere on its way. A flat pass or a high ball that lands untouched costs a heart and
   hops away; so does a bounce pass that stops untouched. Running to meet the ball scores double what waiting for it does: that
   is the habit the game is after. The throws get quicker and wilder as the run goes on. You can come no nearer the thrower than
   six metres (box): every throw leaves the thrower's hands within reach of a catcher standing close, so closer would catch the
   lot with no reactions at all. named: while the first three are named the line at the top of the screen is up, so they keep clear of it. */
const DRILL_EGG = { throws:12, lives:3, reach:1.15, lo:0.35, hi:2.4, wind:[1.0, 0.55], gap:0.6, miss:1.3, box:[51, 24, 73, 46], at:[60, 35], from:[45, 35], cam:[55, 35], zoom:1.45,
  first:['bounce', 'flat', 'high'], names:{ bounce:'Bounce Pass', flat:'Flat Pass', high:'High Ball' }, lines:{ bounce:'Catch it on any hop.', flat:'Run to meet it before it lands.', high:'Get under it. Watch the ball in.' },
  named:7, flatTop:1.8, meet:1.5, points:[1, 2], pop:[4.6, 7.0], hopOut:[2.2, 4.7], keep:[0.6, 0.74], turn:[0.45, 1.3], slow:0.72, stop:1.15, roll:3.5, still:0.4, stars:[8, 14, 20] };
function eggStage(E, stage) { E.stage = stage; E.t = 0; }
function eggReady(E) {                                     // the ball back in the thrower's hands and the wind-up begins, a little shorter each throw
  const u = Math.min(1, E.n/(DRILL_EGG.throws - 2));
  E.wind = drillLerp(DRILL_EGG.wind[0], DRILL_EGG.wind[1], u);
  eggStage(E, 'wind');
  E.aim = null;
  M.ball.tumble = null;
  drillHold(E.tw);
}
function eggThrow(E) {
  const b = M.ball, me = E.me, tw = E.tw, K = DRILL_EGG, u = Math.min(1, E.n/(K.throws - 2)), wild = 0.6 + 1.6*u;
  const kinds = ['bounce', 'flat', 'high'];
  let kind = kinds[Math.floor(rnd()*3)];
  if (kind === E.hist[0] && kind === E.hist[1]) kind = kinds[(kinds.indexOf(kind) + 1 + Math.floor(rnd()*2)) % 3];   // never three the same in a row
  if (E.n < K.first.length) kind = K.first[E.n];           // the first three: one of each, in the order Watch How shows them
  E.hist.unshift(kind); E.hist.length = Math.min(E.hist.length, 2);
  E.kind = kind; E.n++; E.bounced = false; E.rolling = false; E.hops = []; E.hopV = 0; E.g = 9.8;
  b.state = 'loose'; b.carrier = null; b.f = null; b.last = 1; b.kickInfo = null;
  b.x = tw.x + tw.fx*0.6; b.y = tw.y + tw.fy*0.6; b.z = 1.6; b.tumble = 0;
  E.spin = (rnd() < 0.5 ? -1 : 1)*(kind === 'high' ? 5 : kind === 'flat' ? 2 : 8);   // end over end: see drawBall
  if (E.n <= K.first.length) drillTag(K.names[kind], tw.x, tw.y);
  let tx, ty, T, zEnd;
  if (kind === 'flat') {                                   // a flat pass, chest high from the hands to you, to one side of you: see below for how it stays low
    tx = me.x + (rnd() - 0.5)*1.2*wild; ty = me.y + (rnd() - 0.5)*3.2*wild; zEnd = 1.3;
    T = Math.max(0.35, hyp(tx - b.x, ty - b.y)/(10 + 6*u));
  } else if (kind === 'high') {                            // up and long: it comes down a few metres away; the gold ring shows where
    const a = rnd()*2*Math.PI, r = 2.5 + rnd()*(2 + 3*u);
    tx = clamp(me.x + Math.cos(a)*r, K.box[0] + 1, K.box[2] - 1); ty = clamp(me.y + Math.sin(a)*r, K.box[1] + 1, K.box[3] - 1); zEnd = 1.2;
    T = 2.0 - 0.45*u;
  } else {                                                 // spun into the ground short of you: it tumbles off at an odd angle
    const d = hyp(me.x - b.x, me.y - b.y) || 1, back = 1.5 + rnd()*1.5;
    tx = me.x - (me.x - b.x)/d*back + (rnd() - 0.5)*1.5*wild; ty = me.y - (me.y - b.y)/d*back + (rnd() - 0.5)*1.5*wild; zEnd = 0;
    T = 0.5 + 0.2*(1 - u);
  }
  const B = K.box;                                         // never out of reach: every throw comes down inside the area you can run in. A bounce may land short of it, between the thrower and you (its hop carries it in); pulling it into the area would send it past you at chest height instead
  tx = kind === 'bounce' ? clamp(tx, tw.x + 3, B[2] - 3) : clamp(tx, B[0] + 1, B[2] - 3); ty = clamp(ty, E.n <= K.first.length ? B[1] + K.named : B[1] + 3, B[3] - 3);
  E.aim = { x:tx, y:ty };                                  // the gold ring on the grass: where this throw comes down to you. A flat pass and a high ball are at catching height there, and a bounce pass lands there
  b.vx = (tx - b.x)/T; b.vy = (ty - b.y)/T; b.vz = (zEnd - b.z + 4.9*T*T)/T;
  if (kind === 'flat') {                                   // same time in the air, but its top is K.flatTop whatever the range: a long pass under full gravity would lob over the catch limit. The speed is the fall this flight needs
    const up = K.flatTop - b.z, drop = b.z - zEnd, s = (Math.sqrt(2*up) + Math.sqrt(2*up + 2*drop))/T;
    E.g = s*s; b.vz = Math.sqrt(2*E.g*up);
  }
  eggStage(E, 'fly');
  sfx('pass');
}
function eggMove(E, dt) {                                  // the ball through the air, then along the ground once its hops are done. True the step it lands
  const b = M.ball, K = DRILL_EGG;
  b.tumble = (b.tumble || 0) + E.spin*dt;
  if (E.rolling) { const f = Math.exp(-K.roll*dt); b.vx *= f; b.vy *= f; b.x += b.vx*dt; b.y += b.vy*dt; b.z = 0; b.vz = 0; E.spin *= f; return false; }
  b.vz -= E.g*dt; b.x += b.vx*dt; b.y += b.vy*dt; b.z += b.vz*dt;
  if (b.z > 0) return false;
  b.z = 0; E.g = 9.8;                                      // whatever it was thrown as, its hops are real ones
  return true;
}
function eggHop(E) {                                       // off the ground again, at an odd angle, each hop smaller than the last. Too small a hop and it rolls
  const b = M.ball, K = DRILL_EGG, B = K.box, u = Math.min(1, (E.n - 1)/(K.throws - 2)), first = !E.hops.length;
  const vz = first ? K.pop[0] + rnd()*(K.pop[1] - K.pop[0]) : E.hopV*(K.keep[0] + rnd()*(K.keep[1] - K.keep[0]));
  const sp = first ? K.hopOut[0] + rnd()*(K.hopOut[1] - K.hopOut[0]) : hyp(b.vx, b.vy)*K.slow;
  if (vz < K.stop) { E.rolling = true; b.vz = 0; E.aim = { x:b.x + b.vx/K.roll, y:b.y + b.vy/K.roll }; return; }   // the ring moves to where it will roll to a stop
  const dir = Math.atan2(b.vy, b.vx) + (rnd() < 0.5 ? -1 : 1)*(K.turn[0] + rnd()*(K.turn[1] - K.turn[0] + 0.5*u));
  const air = 2*vz/9.8;                                    // and it comes down inside the area: as it goes, else turned back, else aimed at the nearest spot in it
  b.vx = eggPop(b.x, Math.cos(dir)*sp, air, B[0] + 1.5, B[2] - 1.5); b.vy = eggPop(b.y, Math.sin(dir)*sp, air, E.n <= K.first.length ? B[1] + K.named : B[1] + 1.5, B[3] - 1.5); b.vz = vz;
  E.aim = { x:b.x + b.vx*air, y:b.y + b.vy*air };          // the ring moves to where this hop comes down
  E.hopV = vz; E.hops.push(vz); E.spin = -E.spin*1.1;
  sfx('bounce', Math.min(1, vz/K.pop[1]));                  // each hop smaller than the last, and softer
}
function eggMiss(E) {
  const b = M.ball;
  E.lives--; st('eggMiss');
  eggStage(E, 'missed');
  drillTag('Missed', b.x, b.y); sfx('groan');
}
function eggMeeting(E) {                                   // running at the ball as it arrives, rather than standing and waiting for it
  const b = M.ball, me = E.me, sp = hyp(me.vx, me.vy), d = hyp(b.x - me.x, b.y - me.y);
  return sp >= DRILL_EGG.meet && (d < 0.6 || me.vx*(b.x - me.x) + me.vy*(b.y - me.y) >= -0.35*sp*d);   // on to it, across to it or right under it; only running away from it does not count
}
function eggFly(E, dt) {
  const b = M.ball, me = E.me, K = DRILL_EGG, landed = eggMove(E, dt);
  if (hyp(me.x - b.x, me.y - b.y) < K.reach && (E.kind === 'bounce' ? E.bounced : b.z >= K.lo) && b.z < K.hi) {   // within reach and below head height, and a bounce pass only once it has hit the ground: a clean catch
    const met = eggMeeting(E);
    E.caught++; E.score += K.points[met ? 1 : 0]; if (met) E.met++; st('eggCatch'); if (met) st('eggMet');
    b.tumble = null; drillHold(me); eggStage(E, 'caught');
    drillTag(met ? 'Met It' : 'Caught', me.x, me.y); sfx('catch'); buzz(20, 0);
    return;
  }
  if (E.kind === 'bounce') {
    if (landed) { E.bounced = true; eggHop(E); }
    else if (E.rolling && hyp(b.vx, b.vy) < K.still) eggMiss(E);   // it stopped before anyone got to it
    return;
  }
  if (landed) { eggMiss(E); eggHop(E); }                   // it landed untouched, and hops away
}
function eggPop(p, v, air, lo, hi) {
  const at = p + v*air, back = p - v*air;
  return at >= lo && at <= hi ? v : back >= lo && back <= hi ? -v : (clamp(at, lo, hi) - p)/air;
}
function eggEnd(E) {
  const stars = drillStarsOf(E.score, DRILL_EGG.stars);
  practiceFinish(stars > 0, E.caught + (E.caught === 1 ? ' Catch' : ' Catches'), stars);
}
const drillEgg = {
  setup(own, cpu) {
    const me = own[0], tw = cpu[0];
    M.players = [me, tw];
    drillSpace(DRILL_EGG.cam[0], DRILL_EGG.cam[1], DRILL_EGG.zoom);
    drillPlace(me, DRILL_EGG.at[0], DRILL_EGG.at[1], -1, 0); drillPlace(tw, DRILL_EGG.from[0], DRILL_EGG.from[1], 1, 0);
    setCtrl(0, me);
    const E = practice.egg = { g:9.8, me, tw, n:0, caught:0, met:0, score:0, lives:DRILL_EGG.lives, stage:'wind', t:0, wind:DRILL_EGG.wind[0], kind:null, hist:[], bounced:false, rolling:false, hops:[], hopV:0, spin:0, aim:null };
    eggReady(E);
  },
  tick(dt) {
    const E = practice.egg;
    drillTap();
    drillRun(E.me, dt, DRILL_EGG.box, false);
    drillFace(E.tw, E.me.x, E.me.y);
    E.t += dt;
    if (E.stage === 'wind') { drillHold(E.tw); if (E.t >= E.wind) eggThrow(E); }
    else if (E.stage === 'fly') eggFly(E, dt);
    else if (E.stage === 'caught') { drillHold(E.me); if (E.t >= DRILL_EGG.gap) this.next(E); }
    else if (E.stage === 'missed') { if (eggMove(E, dt)) eggHop(E); if (E.t >= DRILL_EGG.miss) this.next(E); }
  },
  next(E) { if (E.lives <= 0 || E.n >= DRILL_EGG.throws) eggEnd(E); else eggReady(E); },
  timeUp() { eggEnd(practice.egg); },
  labels() { return { a:null, b:null, c:false }; },
  hud() { const E = practice.egg; return { lives:[E.lives, DRILL_EGG.lives], num:String(E.score), icon:'ball' }; },
  cue() { const E = practice.egg, K = DRILL_EGG; return E.stage === 'fly' && E.n <= K.first.length ? [K.names[E.kind], K.lines[E.kind]] : null; },   // the first three throws, named as they come
  howTo() { return 'The gold ring shows where the ball comes down. Run to meet it and catch it.'; },
  tip() { const E = practice.egg; return E.met*2 >= E.caught && E.caught ? 'Running to meet the ball scored double.' : 'Run to meet the ball. It scores double.'; },
  result() { return { skill:'handling' }; },
};

/* ---------- Pass Around the Circle ----------
   A ring of six. The runner passes, then runs round the outside and must be home before the ball has been passed all the
   way round. A small ring is easiest for a runner and a large one for a passer, so the Runner's ring grows a metre a round and
   the Passer's shrinks a metre a round. Runner: you run (hold the stick, Sprint from the meter) and the passers speed up.
   Passer: you make every pass with a timed tap as the closing ring meets the gold one, the hands finishing at the catcher's
   chest: on the gold is a Chest pass and quickest, an early tap goes over their head and is fumbled, a late one drops low and
   hangs. The runner speeds up. Either way the first pass of a round is timed on the same ring: to the chest and the passer's
   hands are free at once (the Runner gets away already moving, the Passer's ball is quicker). Stars by rounds survived. */
const DRILL_CIRCLE = { n:6, r0:5, grow:1, rounds:5, out:1.6, acc:10, runF:[1.30, 1.05, 0.93, 0.915, 0.89], cpuPass:14, passG:[3.0, 1.45, 1.0, 0.8, 0.54],
  fast:16, good:12, slow:8, ready:0.6, perfect:0.1, ok:0.25, fumble:1.1, late:0.5, growT:0.8, endT:1.1, at:[60, 35], zoom:1.35, stars:[1, 3, 5], beat:1.2, chestAt:0.9, rolling:0.8, follow:0.2, offLine:0.5, words:{ Perfect:'Chest', Good:'Good', Early:'Too High', Late:'Too Low' } };
const circleRadius = (role, round) => DRILL_CIRCLE.r0 + DRILL_CIRCLE.grow*(role === 'passer' ? DRILL_CIRCLE.rounds - round : round - 1);   // this round's ring: the Runner's small to large, the Passer's large to small
const circleStartE = C => ((C.t - DRILL_CIRCLE.chestAt + DRILL_CIRCLE.beat/2 + 2*DRILL_CIRCLE.beat) % DRILL_CIRCLE.beat) - DRILL_CIRCLE.beat/2;   // the round's first pass: seconds off the gold, the ring closing over and over until you tap
const circleAngle = i => -Math.PI/2 + i*2*Math.PI/DRILL_CIRCLE.n;
function circleSpot(i, R) { const a = circleAngle(i); return { x:DRILL_CIRCLE.at[0] + R*Math.cos(a), y:DRILL_CIRCLE.at[1] + R*Math.sin(a) }; }
function circleLap(R) { const K = DRILL_CIRCLE; return 2*K.out + 2*Math.PI*(R + K.out); }   // the runner's lap: out from his spot, round the outside, back in
function circleRunAt(R, s) {                               // where the runner is, s metres into his lap
  const K = DRILL_CIRCLE, a0 = circleAngle(0), arc = 2*Math.PI*(R + K.out);
  let r, a;
  if (s < K.out) { r = R + s; a = a0; }
  else if (s < K.out + arc) { r = R + K.out; a = a0 + (s - K.out)/(R + K.out); }
  else { r = R + K.out - Math.min(K.out, s - K.out - arc); a = a0; }
  return { x:K.at[0] + r*Math.cos(a), y:K.at[1] + r*Math.sin(a), a, r };
}
function circleChord(R) { return 2*R*Math.sin(Math.PI/DRILL_CIRCLE.n); }
function circleSetRound(C) {                               // this round's race: the ring's size, the CPU's pace, and everyone on his spot
  const K = DRILL_CIRCLE, k = C.round - 1;
  C.R = circleRadius(C.role, C.round); C.L = circleLap(C.R);
  const chord = circleChord(C.R), n = K.n;
  if (C.role === 'runner') {                               // the ball's lap against a runner at top speed with no Sprint: a slower lap early, a quicker one later
    const v = maxSpeed(C.men[0]), ref = C.L/v + v/(2*K.acc), T = ref*K.runF[k];
    C.cpuHold = Math.max(0.12, (T - n*chord/K.cpuPass)/(n - 1));
  } else {                                                 // the runner's lap against your passes: room for a few slow ones early, Perfect passes needed late
    const first = chord/K.good, perfect = first + (n - 1)*(K.ready + chord/K.fast), good = n*chord/K.good + (n - 1)*K.ready;
    const T = perfect + (good - perfect)*K.passG[k];
    const disc = Math.max(0, T*T - 2*C.L/K.acc);
    C.cpuV = K.acc*(T - Math.sqrt(disc));
  }
  C.men.forEach((p, i) => { const s = circleSpot(i, C.R); drillPlace(p, s.x, s.y); drillFace(p, K.at[0], K.at[1]); });
  C.s = 0; C.v = 0; C.home = false; C.fly = null; C.hold = null; C.ballHome = false;
  drillHold(C.men[0]);
  setCtrl(0, C.men[0]);                                   // the ring starts on the runner, who holds the ball
  C.stage = 'start'; C.t = 0;
}
function circlePass(C, from, speed, rushed) {
  const K = DRILL_CIRCLE, to = (from + 1) % K.n, a = C.men[from], spot = circleSpot(to, C.R);
  const T = Math.max(0.12, hyp(spot.x - a.x, spot.y - a.y)/speed);
  C.fly = { from, to, t:0, T, x0:a.x + a.fx*0.55, y0:a.y + a.fy*0.55, x1:spot.x, y1:spot.y, rushed:!!rushed };
  C.hold = null;
  const b = M.ball; b.state = 'loose'; b.carrier = null; b.f = null;
  if (C.role === 'passer' && to !== 0) setCtrl(0, C.men[to]);
  sfx('pass');
}
function circleGo(C) {                                     // the runner passes, then sets off: already moving off a pass to the chest
  const K = DRILL_CIRCLE, chest = Math.abs(circleStartE(C)) <= K.ok;
  if (chest) { C.chest++; st('circleChest'); drillTag('Chest', C.men[0].x, C.men[0].y); }
  circlePass(C, 0, chest && C.role === 'passer' ? K.fast : K.good, false);
  C.stage = 'race'; C.t = 0; C.s = 0; C.v = chest && C.role === 'runner' ? maxSpeed(C.men[0])*K.rolling : 0;
  st('circleRounds');
}
function circleWay(C) {                                    // the way the lap goes from here: on the ground, the direction the stick has to follow
  const a = circleRunAt(C.R, C.s), b = circleRunAt(C.R, C.s + 0.25), m = hyp(b.x - a.x, b.y - a.y) || 1;
  return { x:(b.x - a.x)/m, y:(b.y - a.y)/m };
}
function circleRunner(C, dt) {
  const K = DRILL_CIRCLE, p = C.men[0];
  let vt;
  if (C.role === 'runner') {
    const j = inputOf(0).world(), run = j.mag > 0.25, way = circleWay(C), onLine = (j.x*way.x + j.y*way.y)/(j.mag || 1) >= K.follow;
    drillSprint(p, dt, run && onLine);
    vt = !run ? 0 : onLine ? maxSpeed(p) : maxSpeed(p)*K.offLine;   // the thumb goes round with the man: a stick pushed some other way only shuffles
  } else vt = C.cpuV;
  C.v += clamp(vt - C.v, -20*dt, K.acc*dt);
  const x0 = p.x, y0 = p.y;
  C.s = Math.min(C.L, C.s + C.v*dt);
  const at = circleRunAt(C.R, C.s);
  p.x = at.x; p.y = at.y; p.vx = (p.x - x0)/dt; p.vy = (p.y - y0)/dt;
  const sp = hyp(p.vx, p.vy); if (sp > 0.3) { p.fx = p.vx/sp; p.fy = p.vy/sp; }
  if (C.s >= C.L) { C.home = true; drillPlace(p, circleSpot(0, C.R).x, circleSpot(0, C.R).y); drillFace(p, K.at[0], K.at[1]); }
}
function circleBall(C, dt, tap) {
  const K = DRILL_CIRCLE, b = M.ball;
  if (C.fly) {
    const f = C.fly; f.t += dt;
    const u = Math.min(1, f.t/f.T);
    b.x = drillLerp(f.x0, f.x1, u); b.y = drillLerp(f.y0, f.y1, u); b.z = 1.1 + 2*u*(1 - u)*(f.rushed ? 0.3 : 0.9);
    b.vx = (f.x1 - f.x0)/f.T; b.vy = (f.y1 - f.y0)/f.T; b.vz = 0;
    if (u < 1) return;
    C.fly = null;
    if (f.to === 0) { C.ballHome = true; return; }
    C.hold = { i:f.to, t:0, fumble:f.rushed ? K.fumble : 0, tc:(f.rushed ? K.fumble : 0) + K.ready };
    if (f.rushed) drillTag('Fumble', C.men[f.to].x, C.men[f.to].y);
  }
  if (!C.hold) return;
  const H = C.hold, p = C.men[H.i];
  drillHold(p); H.t += dt;
  if (C.role === 'runner') { if (H.t >= C.cpuHold + H.fumble) circlePass(C, H.i, K.cpuPass, false); return; }
  if (tap && H.t >= H.fumble) {                            // your timed tap (not while he is still gathering a fumble): on the gold is Perfect and quickest; early is fumbled at the next man
    const e = H.t - H.tc, a = Math.abs(e);
    const grade = a <= K.perfect ? 'Perfect' : a <= K.ok ? 'Good' : e < 0 ? 'Early' : 'Late';
    st('circle' + grade); if (grade === 'Perfect') C.chest++;
    drillTag(K.words[grade], p.x, p.y);
    circlePass(C, H.i, grade === 'Perfect' ? K.fast : grade === 'Early' ? K.slow : K.good, grade === 'Early');
    if (grade === 'Perfect') buzz(15, 0);
  } else if (H.t >= H.tc + K.late) { st('circleLate'); drillTag(K.words.Late, p.x, p.y); circlePass(C, H.i, K.good, false); }
}
function circleSettle(C) {                                 // whoever is home first takes the round
  if (!C.home && !C.ballHome) return;
  const runnerFirst = C.home && !C.ballHome;
  const won = C.role === 'runner' ? runnerFirst : !runnerFirst;
  if (C.home) { C.fly = null; drillHold(C.men[0]); }
  else { const b = M.ball, s = circleSpot(0, C.R); b.state = 'loose'; b.x = s.x; b.y = s.y; b.z = 0.2; }
  if (won) {
    C.survived = C.round; st('circleWon');
    say(C.role === 'runner' ? 'Home First' : 'Beat the Runner', 'small', 0); sfx('cheer');
    if (C.round >= DRILL_CIRCLE.rounds) { C.stage = 'end'; C.t = 0; return; }
    C.stage = 'grow'; C.t = 0; C.from = C.men.map(p => ({ x:p.x, y:p.y }));
    C.round++;
  } else {
    say(C.role === 'runner' ? 'The Ball Won' : 'The Runner Won', 'small', 1); sfx('groan');
    C.stage = 'end'; C.t = 0;
  }
}
function circleEnd(C) {
  const n = C.survived || 0, stars = drillStarsOf(n, DRILL_CIRCLE.stars);
  practiceFinish(stars > 0, n === DRILL_CIRCLE.rounds ? 'All ' + n + ' Rounds' : n + (n === 1 ? ' Round' : ' Rounds'), stars);
}
const CIRCLE_CHEST = [0.62, 0.82];                         // the gold band on the catcher in the corner picture, as shares of their height
function circleChestBox(W, H) { const h = Math.max(92, H*0.3); return { x:Math.max(10, W*0.015), y:Math.max(52, H*0.15), w:h*0.8, h }; }   // above the touch stick's resting place, clear of it at 844x390 and 667x375
const drillCircle = {
  setup(own) {
    M.players = own.slice(0, DRILL_CIRCLE.n);
    drillSpace(DRILL_CIRCLE.at[0], DRILL_CIRCLE.at[1], DRILL_CIRCLE.zoom);
    const C = practice.circle = { role:practice.role || 'runner', round:1, survived:0, chest:0, men:M.players, stage:'start', t:0 };
    circleSetRound(C);
  },
  role(r) { const C = practice.circle; practice.role = C.role = r === 'passer' ? 'passer' : 'runner'; circleSetRound(C); },
  tick(dt) {
    const C = practice.circle, K = DRILL_CIRCLE, tap = drillTap();
    C.t += dt;
    if (C.stage === 'start') {
      drillHold(C.men[0]); if (C.role === 'runner') drillSprint(C.men[0], dt, false);
      if (tap) circleGo(C);
    } else if (C.stage === 'race') {
      if (!C.home) circleRunner(C, dt);
      circleBall(C, dt, tap);
      circleSettle(C);
    } else if (C.stage === 'grow') {                       // the ring steps out a metre for a Runner, in a metre for a Passer
      const u = Math.min(1, C.t/K.growT), R = circleRadius(C.role, C.round);
      C.men.forEach((p, i) => { const s = circleSpot(i, R); p.x = drillLerp(C.from[i].x, s.x, u); p.y = drillLerp(C.from[i].y, s.y, u); });
      drillHold(C.men[0]);
      if (C.role === 'runner') drillSprint(C.men[0], dt, false);
      if (u >= 1) circleSetRound(C);
    } else if (C.stage === 'end') { if (C.t >= K.endT) circleEnd(C); }
  },
  timeUp() { circleEnd(practice.circle); },
  labels() {
    const C = practice.circle, start = C.stage === 'start';
    if (C.role === 'runner') return { a:start ? 'Pass' : null, aOn:start, cueA:start, b:null, c:true, cOn:C.stage === 'race' && !C.home && (M.spr[0].p || M.spr[0].m >= DRILL_RUN.floor) && !M.spr[0].spent };
    return { a:'Pass', aOn:start || !!C.hold, cueA:start, b:null, c:false };
  },
  hud() {
    const C = practice.circle, pips = [];
    for (let i = 1; i <= DRILL_CIRCLE.rounds; i++) pips.push(i <= (C.survived || 0) ? 'got' : i === C.round && C.stage !== 'end' ? 'now' : 'todo');
    return { pips };
  },
  drawScreen() {                                           // the catcher, side on: the ball comes down past the head and the chest; tap as it meets the gold
    const C = practice.circle, K = DRILL_CIRCLE; if (!C || (C.role !== 'passer' && C.stage !== 'start') || (C.stage !== 'start' && !(C.hold && C.stage === 'race'))) return;
    const e = C.stage === 'start' ? circleStartE(C) : C.hold.t - C.hold.tc, B = circleChestBox(V.W, V.H), Hp = B.h*0.8, y0 = B.y + B.h - 4, x = B.x + B.w*0.46, k = Hp/1.8;
    ctx.save();
    ctx.fillStyle = 'rgba(8,14,10,.72)'; rrect(B.x, B.y, B.w, B.h, 6); ctx.fill();
    ctx.fillStyle = 'rgba(255,207,61,.55)'; ctx.fillRect(B.x + 4, y0 - Hp*(CIRCLE_CHEST[1]), B.w - 8, Hp*(CIRCLE_CHEST[1] - CIRCLE_CHEST[0]));
    if (!dvManAt(x, y0, k, C.men[C.stage === 'start' ? 1 : C.hold.i] || C.men[1], 'catch', 0, 2)) tackleBody(x, y0, k, M.kit[0], { dir:1 });
    const u = clamp((CIRCLE_CHEST[0] + CIRCLE_CHEST[1])/2 - e*0.75, 0.05, 1.12), by = y0 - Hp*u;
    ctx.fillStyle = '#f6f3ea'; ctx.strokeStyle = '#3b2f22'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(x + B.w*0.3, by, 8, 5, 0, 0, 7); ctx.fill(); ctx.stroke();
    ctx.restore();
  },
  howTo() { return 'Runner: pass, then run round the outside and beat the ball home. Passer: tap ' + drillName('Pass', 'a') + ' as the white ring meets the gold.'; },
  tip() { const C = practice.circle; return C.chest ? 'Passes to the chest are the easiest to catch.' : 'Time your pass to reach the chest.'; },
  cue() {
    const C = practice.circle;
    if (C.stage !== 'start' || C.round > 1) return null;
    return C.role === 'runner' ? ['Runner', 'Tap ' + drillName('Pass', 'a') + ', then ' + (drillIsKeys() ? 'press the way you run. ' : 'push the stick the way you run. ') + drillName('Sprint', 'c') + ' goes faster.'] : ['Passer', 'Tap ' + drillName('Pass', 'a') + ' as the white ring meets the gold.'];
  },
  result() { const role = practice.role === 'passer' ? 'passer' : 'runner'; return { role, skill:role === 'runner' ? 'stamina' : 'handling' }; },
};

/* ---------- Cones: an obstacle course against the clock ----------
   Out through a zig-zag of gates, round the flag, and a sprint back through a straight line of gates to the finish. A missed
   gate adds two seconds and a clipped cone one. The Sprint meter lasts three seconds: spend it on the straights, because a
   sprinter has less grip to turn on (slide) and goes wide. A clean line through the middle of a gate is the short way round.
   Stars by time.
   The course stays left of the Sprint button, and the finish (line) right of the touch stick's resting place at 667x375 too. */
const DRILL_CONES = { start:[24, 30], gates:[[32, 29], [38.5, 33], [45, 29], [51.5, 33], [58, 29], [58, 46], [49, 46], [40, 46]], out:5, turn:[66, 37], half:1.7, clip:0.5,
  hit:1, miss:2, startLine:26, line:35, box:[20, 22, 72, 52], cam:[50, 37], times:[11.5, 16], slide:6.5, clean:1.0 };
function conesCones() {                                    // every cone: each gate's pair, then the flag
  const K = DRILL_CONES, out = [];
  K.gates.forEach(([x, y], i) => { out.push({ x, y:y - K.half, g:i }, { x, y:y + K.half, g:i }); });
  out.push({ x:K.turn[0], y:K.turn[1], g:-1 });
  return out;
}
function conesTime(Q) { return practice.elapsed + Q.pen; }
function conesEnd(Q, finished) {
  const t = conesTime(Q), K = DRILL_CONES;
  const stars = !finished ? 0 : t <= K.times[0] ? 3 : t <= K.times[1] ? 2 : 1;
  practiceFinish(stars > 0, finished ? t.toFixed(1) + ' Seconds' : 'Out of Time', stars);
}
const drillCones = {
  setup(own) {
    const me = own[0], K = DRILL_CONES;
    M.players = [me];
    drillSpace(K.cam[0], K.cam[1]);
    drillPlace(me, K.start[0], K.start[1], 1, 0);
    setCtrl(0, me); placeBall(-30, -30);                   // no ball: this is running, and a carrier's Sprint is shorter
    practice.cones = { me, pass:K.gates.map(() => 0), hit:new Set(), pen:0, turned:false, px:me.x, py:me.y, cones:conesCones(), done:false, clean:0 };
  },
  tick(dt) {
    const Q = practice.cones, K = DRILL_CONES, me = Q.me;
    drillTap();
    Q.px = me.x; Q.py = me.y;
    drillRun(me, dt, K.box, true, K.slide);
    K.gates.forEach(([gx, gy], i) => {                     // through a gate: crossing the line between its cones
      if (Q.pass[i]) return;
      if ((Q.px - gx)*(me.x - gx) <= 0 && Q.px !== me.x) {
        const y = Q.py + (me.y - Q.py)*(gx - Q.px)/(me.x - Q.px);
        if (Math.abs(y - gy) <= K.half) { Q.pass[i] = 1; st('conesGate'); sfx('tick'); if (Math.abs(y - gy) <= K.clean) { Q.clean++; drillTag('Clean', gx, gy); } return; }
      }
      const back = i >= K.out;
      if ((!back && me.x > gx + 1.5) || (back && Q.turned && me.x < gx - 1.5)) { Q.pass[i] = -1; Q.pen += K.miss; st('conesMiss'); drillTag('Missed', gx, gy); sfx('groan'); }   // ran past it
    });
    for (let i = 0; i < Q.cones.length; i++) {             // a clipped cone
      const c = Q.cones[i];
      if (Q.hit.has(i) || hyp(me.x - c.x, me.y - c.y) > K.clip) continue;
      Q.hit.add(i); Q.pen += K.hit; st('conesHit'); drillTag('+' + K.hit, c.x, c.y); sfx('trip');
    }
    if (!Q.turned && me.x >= K.turn[0] + 0.4) { Q.turned = true; sfx('whoosh'); }
    if (Q.turned && me.x <= K.line) {                      // home: any gate never run through still costs
      K.gates.forEach((g, i) => { if (!Q.pass[i]) { Q.pass[i] = -1; Q.pen += K.miss; } });
      conesEnd(Q, true);
    }
  },
  timeUp() { conesEnd(practice.cones, false); },
  labels() { const S = M.spr[0]; return { a:null, b:null, c:true, cOn:(!!S.p || S.m >= DRILL_RUN.floor) && !S.spent }; },
  hud() { const Q = practice.cones; return { pips:Q.pass.map(v => v > 0 ? 'got' : v < 0 ? 'miss' : 'todo'), num:conesTime(Q).toFixed(1), icon:'clock' }; },
  howTo() { return 'Run through every gate, round the flag and back. Missed gates and cones add time.'; },
  tip() { const Q = practice.cones; return Q.pen === 0 && Q.clean >= 5 ? 'Clean lines through the gates beat running wide.' : 'A clean line through each gate. Sprint on the straights.'; },
  result() { return { skill:'pace' }; },
};

/* ---------- Tackling: position, height, timing, power, squeeze ----------
   One runner a rep. On the pitch, get into his path on short steps, feet balanced (Set). Then a front-on look: he is stepping to one side,
   and your head goes behind him, away from where he is going (Head, the second safety point). Then a side-on close-up, so
   height reads: aim at his thighs with the stick (too high is always a fail, the safety point, and its verdict says why; too
   low and he steps out), hold Tackle to load power and let go as he steps on the gold (Timing, Power), then Squeeze with taps
   or a hold to bring him down. Each rep names how every element went. Stars by good reps. The aim moves at half a height a second (aim): a child seeing the
   bracket 0.4 s late with the stick pushed all the way still stops it inside the green, which is a quarter of his height. */
const DRILL_TACKLE = { reps:5, jog:4.2, from:20, lane:[2.5, 5.5], at:[52, 35], setAt:6.5, inLine:1.0, still:4.5, side:6, run:3.2, zone:[1.0, 2.6], late:0.55, fill:0.55, power:0.6,
  aim:0.5, aim0:0.7, height:[0.28, 0.52], lunge:0.22, squeeze:1.3, tap:0.25, holdRate:1.4, show:2.0, box:[40, 23, 70, 47], cam:[60, 35], zoom:1.25, stars:[1, 2, 4], headT:1.5, headGap:0.3, headStick:0.5 };
const TACKLE_PARTS = [['pos', 'Position'], ['head', 'Head'], ['height', 'Height'], ['time', 'Timing'], ['power', 'Power'], ['squeeze', 'Squeeze']];
const TACKLE_WHY = {                                        // what the verdict says under the word: the reason, in a few words
  'Off Line':'Get in Their Path First', 'Not Set':'Short Steps, Feet Balanced',
  'Wrong Side':'Put Your Head Behind Them', 'No Side':'Put Your Head Behind Them',
  'Too High':'That Can Hurt. Aim for the Legs.', 'Too Low':'They Stepped Out. Aim at the Thighs.',
  Early:'Let Go on the Gold', Late:'Let Go on the Gold', Weak:'Hold Longer for More Drive', Loose:'Wrap and Squeeze With Your Arms',
};
function tackleVerdict(T) {                                // the rep in a word and a reason: a high tackle is always named first
  const marks = TACKLE_PARTS.map(([k]) => T.marks[k]).filter(m => m && m.ok === false);
  const bad = marks.find(m => m.word === 'Too High') || marks[0];
  return T.good ? { word:'Great Tackle', why:'' } : bad ? { word:bad.word, why:TACKLE_WHY[bad.word] || '' } : { word:'Try Again', why:'' };
}
function tackleRep(K) {                                    // the next runner, jogging down a lane a few metres off yours
  const T = practice.tackle, side = rnd() < 0.5 ? -1 : 1, lane = K.at[1] + side*(K.lane[0] + rnd()*(K.lane[1] - K.lane[0]));
  T.rep++; T.lane = lane; T.stage = 'approach'; T.t = 0; T.marks = {}; T.fail = null; T.d = K.side; T.h = K.aim0; T.charge = 0; T.wasDown = false; T.sq = 0; T.down = 0; T.lungeT = 0; T.drift = rnd() < 0.5 ? -1 : 1; T.safe = -T.drift; T.pick = null;
  drillPlace(T.me, K.at[0], K.at[1], 1, 0);
  drillPlace(T.ru, K.at[0] + K.from, lane, -1, 0);
  drillHold(T.ru);
  inputOf(0).aPressed = false;
}
function tackleMark(T, part, ok, word) { T.marks[part] = { ok, word }; }
function tackleJudge(T) {                                  // the commit: height, timing and power, the safety point first
  const K = DRILL_TACKLE;
  const h = T.h < K.height[0] ? 'low' : T.h > K.height[1] ? 'high' : 'ok';
  tackleMark(T, 'height', h === 'ok', h === 'ok' ? 'Height' : h === 'high' ? 'Too High' : 'Too Low');
  const tm = T.d > K.zone[1] ? 'early' : T.d < K.zone[0] ? 'late' : 'ok';
  tackleMark(T, 'time', tm === 'ok', tm === 'ok' ? 'Timing' : tm === 'early' ? 'Early' : 'Late');
  tackleMark(T, 'power', T.charge >= K.power, T.charge >= K.power ? 'Power' : 'Weak');
  const head = T.marks.head && T.marks.head.ok === false;   // the head on the wrong side fails the rep too, whatever the rest did
  T.fail = h === 'high' ? 'high' : head ? 'head' : h === 'low' ? 'low' : tm !== 'ok' ? tm : T.charge < K.power ? 'weak' : null;
  if (h === 'high') st('tackleHigh');
}
function tackleShow(T, good) {
  T.stage = 'show'; T.t = 0; T.good = good;
  for (const [k] of TACKLE_PARTS) if (!T.marks[k]) T.marks[k] = { ok:null, word:TACKLE_PARTS.find(p => p[0] === k)[1] };
  T.results.push(good);
  if (good) { T.made++; st('tackleGood'); sfx('cheer'); }
  else { sfx('groan'); }
}
function tackleEnd(T) {
  const stars = drillStarsOf(T.made, DRILL_TACKLE.stars);
  practiceFinish(stars > 0, T.made + (T.made === 1 ? ' Good Tackle' : ' Good Tackles'), stars);
}
const drillTackle = {
  setup(own, cpu) {
    const me = own[0], ru = cpu[0], K = DRILL_TACKLE;
    M.players = [me, ru];
    drillSpace(K.cam[0], K.cam[1], K.zoom);
    setCtrl(0, me);
    practice.tackle = { me, ru, rep:0, made:0, results:[], stage:'approach', t:0, marks:{} };
    tackleRep(K);
  },
  tick(dt) {
    const T = practice.tackle, K = DRILL_TACKLE, inp = inputOf(0), me = T.me, ru = T.ru;
    T.t += dt;
    if (T.stage === 'approach') {                          // on the pitch: into his path, slowing to short steps by the time he is close
      drillTap();
      const sp = drillRun(me, dt, K.box, false);
      ru.x -= K.jog*dt; ru.vx = -K.jog; ru.fx = -1; ru.fy = 0; drillHold(ru);
      if (ru.x - me.x <= K.setAt) {
        const inLine = Math.abs(me.y - T.lane) <= K.inLine, set = sp <= K.still;
        tackleMark(T, 'pos', inLine && set, !inLine ? 'Off Line' : !set ? 'Not Set' : 'Position');
        if (inLine && set) { T.stage = 'head'; T.t = 0; T.d = K.side; T.armed = inp.world().mag < K.headStick; me.vx = me.vy = 0; drillFace(me, ru.x, ru.y); inp.aPressed = false; }
        else { T.stage = 'past'; T.t = 0; st('tackleOffLine'); }
      }
    } else if (T.stage === 'head') {                       // front on: they step to one side and your head goes behind them, away from where they are going
      drillTap();
      const j = inp.world();
      T.armed = T.armed || Math.abs(j.x) < K.headStick;     // a thumb still pushing from getting in their path is not a choice
      if (T.armed && T.pick == null && Math.abs(j.x) >= K.headStick) {
        T.pick = Math.sign(j.x); T.t = Math.max(T.t, K.headT - K.headGap);
        tackleMark(T, 'head', T.pick === T.safe, T.pick === T.safe ? 'Head' : 'Wrong Side');
        if (T.pick === T.safe) sfx('tick'); else st('tackleWrongSide');
      }
      if (T.t >= K.headT) {
        if (T.pick == null) { tackleMark(T, 'head', false, 'No Side'); st('tackleWrongSide'); }
        T.stage = 'side'; T.t = 0; inp.aPressed = false; T.wasDown = inp.aDown;
      }
    } else if (T.stage === 'past') {                       // he jogs on past you
      drillTap();
      ru.x -= K.jog*dt; drillHold(ru); drillRun(me, dt, K.box, false);
      if (T.t >= 0.9) tackleShow(T, false);
    } else if (T.stage === 'side') {                       // the close-up: aim, load, let go on the gold
      const j = inp.world();
      T.h = clamp(T.h - j.y*K.aim*dt, 0.06, 0.95);
      if (inp.aDown && !T.wasDown) T.charge = 0;           // a fresh press starts the load
      if (inp.aDown) T.charge = Math.min(1, T.charge + dt/K.fill);
      const released = T.wasDown && !inp.aDown && T.charge > 0;
      T.wasDown = inp.aDown; inp.aPressed = false;
      T.d -= K.run*dt;
      if (released) { tackleJudge(T); T.stage = 'lunge'; T.t = 0; T.dc = T.d; sfx('whoosh'); }
      else if (T.d <= K.late) { tackleMark(T, 'time', false, 'Late'); T.fail = 'late'; T.stage = 'lunge'; T.t = 0; T.dc = T.d; }
    } else if (T.stage === 'lunge') {
      T.d -= K.run*dt*(T.fail ? 1 : 0.4);
      if (T.t >= K.lunge) {
        if (T.fail) { T.stage = 'missed'; T.t = 0; sfx(T.fail === 'weak' ? 'tackle' : 'whiff'); }
        else { T.stage = 'squeeze'; T.t = 0; T.sq = 0; inp.aPressed = false; T.wasDown = inp.aDown; sfx('tackle'); buzz(30, 0); }
      }
    } else if (T.stage === 'squeeze') {                    // wrap and squeeze: quick taps or a hold
      if (inp.aPressed) T.sq += K.tap;
      if (inp.aDown && T.wasDown) T.sq += K.holdRate*dt;
      T.wasDown = inp.aDown; inp.aPressed = false;
      if (T.sq >= 1) { tackleMark(T, 'squeeze', true, 'Squeeze'); T.stage = 'down'; T.t = 0; sfx('hit'); buzz(45, 0); }
      else if (T.t >= K.squeeze) { tackleMark(T, 'squeeze', false, 'Loose'); T.fail = 'loose'; T.stage = 'missed'; T.t = 0; sfx('whiff'); }
    } else if (T.stage === 'missed') {
      drillTap(); T.d -= K.run*dt*1.4;
      if (T.t >= 0.8) tackleShow(T, false);
    } else if (T.stage === 'down') {
      drillTap();
      if (T.t >= 0.7) tackleShow(T, true);
    } else if (T.stage === 'show') {
      drillTap();
      if (T.t >= K.show) { if (T.rep >= K.reps) tackleEnd(T); else tackleRep(K); }
    }
  },
  timeUp() { tackleEnd(practice.tackle); },
  labels() {
    const T = practice.tackle, s = T.stage;
    if (s === 'side') return { a:'Tackle', aOn:true, cueA:false, b:null, c:false };
    if (s === 'squeeze') return { a:'Squeeze', aOn:true, cueA:true, b:null, c:false };
    return { a:null, b:null, c:false };
  },
  hud() { const T = practice.tackle, pips = []; for (let i = 0; i < DRILL_TACKLE.reps; i++) pips.push(i < T.results.length ? (T.results[i] ? 'got' : 'miss') : i === T.results.length ? 'now' : 'todo'); return { pips }; },
  cue() {
    const s = practice.tackle.stage;
    return s === 'approach' ? ['Set', 'Get in their path on short steps.'] : s === 'head' ? ['Head Side', 'Put your head behind them: the tick.'] : s === 'side' ? ['Aim and Tackle', 'Aim at their thighs. Hold ' + drillName('Tackle', 'a') + ', let go on the gold.']
      : s === 'squeeze' ? ['Squeeze', 'Tap or hold ' + drillName('Squeeze', 'a') + '.'] : null;
  },
  drawScreen() { tackleDraw(practice.tackle); },
  howTo() { return 'Get in their path on short steps. Head behind them, aim at their thighs, hold ' + drillName('Tackle', 'a') + ' and let go on the gold, then ' + drillName('Squeeze', 'a') + '.'; },
  tip() { const T = practice.tackle; return T.made ? 'Head behind them, low and strong, arms round. That is a good tackle.' : 'Set your feet, head behind them, then aim low.'; },
  result() { return { skill:'power' }; },
};
function tackleBody(x, y0, k, kit, o) {                    // a side-on player: o.dir faces (+1 right), o.lean (radians), o.crouch (0..1), o.phase (the running stride), o.down (0..1 fallen)
  const H = 1.8*k, dir = o.dir;
  ctx.save(); ctx.translate(x, y0);
  if (o.down) ctx.rotate((o.fwd ? 1 : -1)*dir*o.down*Math.PI/2*0.92);   // the runner goes down backwards, the tackler forwards
  const hip = H*(0.5 - 0.18*(o.crouch || 0)), sh = H*(0.82 - 0.3*(o.crouch || 0)), lean = o.lean || 0;
  const hx = 0, hy = -hip, sx = hx + dir*Math.sin(lean)*(sh - hip), sy = -hip - Math.cos(lean)*(sh - hip);
  ctx.lineCap = 'round'; ctx.strokeStyle = C.outline;
  const leg = (ph, shade) => {                             // thigh and shin
    const a = Math.sin(ph)*0.6, kx = hx + dir*Math.sin(a)*H*0.26, ky = hy + Math.cos(a)*H*0.26, fx = kx + dir*Math.sin(a - 0.5*Math.abs(a) - 0.1)*H*0.26, fy = Math.min(0, ky + H*0.26);
    ctx.strokeStyle = shade; ctx.lineWidth = H*0.11; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(kx, ky); ctx.lineTo(fx, fy); ctx.stroke();
  };
  leg((o.phase || 0) + Math.PI, '#1d2a21'); leg(o.phase || 0, kit.trim);
  ctx.fillStyle = kit.fill; ctx.strokeStyle = C.outline; ctx.lineWidth = Math.max(1.5, H*0.02);
  ctx.beginPath(); ctx.moveTo(hx - H*0.09, hy); ctx.lineTo(sx - H*0.1, sy); ctx.lineTo(sx + H*0.1, sy); ctx.lineTo(hx + H*0.09, hy); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.head; ctx.beginPath(); ctx.arc(sx + dir*H*0.03, sy - H*0.08, H*0.075, 0, 7); ctx.fill();
  if (o.ball) { ctx.fillStyle = '#f6f3ea'; ctx.strokeStyle = '#3b2f22'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(sx + dir*H*0.1, sy + H*0.12, H*0.08, H*0.05, dir*0.4, 0, 7); ctx.fill(); ctx.stroke(); }
  ctx.restore();
}
function drillMark(x, y, r, good) {                         // a tick for the right choice, a cross for the wrong one: the same on every screen
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const [w, col] of [[Math.max(5, r*0.5), 'rgba(8,14,10,.9)'], [Math.max(2.5, r*0.26), '#ffffff']]) {
    ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath();
    if (good) { ctx.moveTo(x - r*0.8, y + r*0.05); ctx.lineTo(x - r*0.2, y + r*0.65); ctx.lineTo(x + r*0.85, y - r*0.6); }
    else { ctx.moveTo(x - r*0.65, y - r*0.65); ctx.lineTo(x + r*0.65, y + r*0.65); ctx.moveTo(x + r*0.65, y - r*0.65); ctx.lineTo(x - r*0.65, y + r*0.65); }
    ctx.stroke();
  }
  ctx.restore();
}
function tackleHeadDraw(T) {                               // the front-on look: the runner stepping to one side, and the two places for your head, the green one behind them
  const W = V.W, H = V.H, y0 = H*0.8, Hp = H*0.42, cx = W/2 + T.drift*clamp(T.t/DRILL_TACKLE.headT, 0, 1)*H*0.16, kit = M.kit[1];
  ctx.save();
  dvStage(y0);
  ctx.lineCap = 'round';
  if (dvManAt(cx, y0, Hp/1.8, T.ru, 'carry', Math.floor(M.rt*10) & 7, 4, false, T.drift*0.12)) dvHeld(cx, y0, Hp/1.8, T.ru);
  else {
    const lean = T.drift*Hp*0.08, hipY = y0 - Hp*0.48, shY = y0 - Hp*0.82;
    ctx.strokeStyle = '#1d2a21'; ctx.lineWidth = Hp*0.1;    // legs, then a body tipped the way they are going
    ctx.beginPath(); ctx.moveTo(cx - Hp*0.07, hipY); ctx.lineTo(cx - Hp*0.1 + Math.sin(M.rt*11)*Hp*0.03, y0); ctx.moveTo(cx + Hp*0.07, hipY); ctx.lineTo(cx + Hp*0.1 - Math.sin(M.rt*11)*Hp*0.03, y0); ctx.stroke();
    ctx.fillStyle = kit.fill; ctx.strokeStyle = C.outline; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx - Hp*0.12, hipY); ctx.lineTo(cx - Hp*0.17 + lean, shY); ctx.lineTo(cx + Hp*0.17 + lean, shY); ctx.lineTo(cx + Hp*0.12, hipY); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.head; ctx.beginPath(); ctx.arc(cx + lean*1.3, shY - Hp*0.1, Hp*0.085, 0, 7); ctx.fill();
    ctx.fillStyle = '#f6f3ea'; ctx.strokeStyle = '#3b2f22'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(cx - T.drift*Hp*0.16, hipY - Hp*0.14, Hp*0.05, Hp*0.08, 0, 0, 7); ctx.fill(); ctx.stroke();
  }
  const ax = cx + T.drift*Hp*0.34, ay = y0 - Hp*0.1;       // the way they are going
  ctx.strokeStyle = '#ffcf3d'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax + T.drift*Hp*0.3, ay); ctx.moveTo(ax + T.drift*Hp*0.2, ay - Hp*0.08); ctx.lineTo(ax + T.drift*Hp*0.3, ay); ctx.lineTo(ax + T.drift*Hp*0.2, ay + Hp*0.08); ctx.stroke();
  const spot = side => W/2 + side*Hp*0.72, sy = y0 - Hp*0.58, r = Hp*0.13;
  for (const side of [-1, 1]) {                            // the green place behind them, the red one in their way
    const safe = side === T.safe, sel = T.pick === side;
    ctx.fillStyle = safe ? (sel ? 'rgba(98,214,128,.95)' : 'rgba(98,214,128,.4)') : (sel ? 'rgba(255,132,102,.95)' : 'rgba(255,132,102,.28)');
    ctx.strokeStyle = safe ? '#62d680' : '#ff8466'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(spot(side), sy, r, 0, 7); ctx.fill(); ctx.stroke();
    if (sel) { ctx.fillStyle = C.head; ctx.beginPath(); ctx.arc(spot(side), sy, r*0.55, 0, 7); ctx.fill(); }
    drillMark(spot(side), sy, r*0.62, safe);               // a shape as well as a colour, so the safe side reads for a colour-blind child
  }
  ctx.restore();
  tackleChips(T);
}
function tackleDraw(T) {                                   // the side-on close-up: height on the runner reads as red, green and amber bands
  if (T && T.stage === 'head') { tackleHeadDraw(T); return; }
  if (!T || !['side', 'lunge', 'squeeze', 'missed', 'down', 'show'].includes(T.stage) || (T.stage === 'show' && !T.marks.height)) {
    if (T && T.stage === 'show') tackleChips(T);
    return;
  }
  const K = DRILL_TACKLE, W = V.W, H = V.H, y0 = H*0.8, k = H*0.40/1.8, Hp = 1.8*k, tx = W*0.32;
  ctx.save();
  dvStage(y0);                                              // a still, side-on view: the field behind, so only the two read
  ctx.fillStyle = 'rgba(255,207,61,.55)'; ctx.fillRect(tx + K.zone[0]*k, y0, (K.zone[1] - K.zone[0])*k, 10);   // the gold: let go as his front foot lands here
  const rx = tx + Math.max(0.35, T.d)*k + H*0.04, run = T.stage === 'side' || T.stage === 'lunge' || T.stage === 'missed';
  const fall = T.stage === 'down' || (T.stage === 'show' && T.good) ? clamp(T.stage === 'down' ? T.t/0.45 : 1, 0, 1) : 0;
  if (T.stage === 'side' || T.stage === 'lunge') {         // the bands on him: too high, right, too low
    const bx = rx - H*0.12, bw = H*0.26;
    ctx.globalAlpha = 0.22;
    ctx.fillStyle = '#ff8466'; ctx.fillRect(bx, y0 - Hp, bw, Hp*(1 - K.height[1]));
    ctx.fillStyle = '#62d680'; ctx.fillRect(bx, y0 - Hp*K.height[1], bw, Hp*(K.height[1] - K.height[0]));
    ctx.fillStyle = '#ffcf3d'; ctx.fillRect(bx, y0 - Hp*K.height[0], bw, Hp*K.height[0]);
    ctx.globalAlpha = 1;
  }
  const drawRunner = () => {
    if (fall ? dvManAt(rx, y0, k, T.ru, 'land', fall < 0.35 ? 0 : fall < 0.8 ? 1 : 2, 6) : dvManAt(rx, y0, k, T.ru, 'carry', run ? Math.floor(M.rt*10) & 7 : 0, 6)) { if (!fall) dvHeld(rx, y0, k, T.ru); else cutBall(rx + (fall < 0.35 ? -0.1 : fall < 0.8 ? 0.15 : 0.5)*k, y0 - (fall < 0.35 ? 1.0 : fall < 0.8 ? 0.62 : 0.28)*k, k*DV_BALL, 0.6); }
    else tackleBody(rx, y0, k, M.kit[1], { dir:-1, phase:run ? M.rt*11 : 0, lean:run ? 0.15 : 0, ball:true, down:fall });
  };
  const zone = T.h > K.height[1] ? '#ff8466' : T.h < K.height[0] ? '#ffcf3d' : '#62d680';
  const contact = T.stage === 'squeeze' || T.stage === 'down' || (T.stage === 'show' && T.good);
  if (!contact) drawRunner();                              // in the tackle the runner is drawn last: your head goes behind them, in the picture too, and never on the ball
  const lungeU = T.stage === 'lunge' ? clamp(T.t/K.lunge, 0, 1) : contact ? 1 : T.stage === 'missed' && T.fail !== 'late' ? 1 : 0;
  const reach = T.fail === 'early' ? (T.dc - K.zone[1] + 0.6)*k : 0;
  const mx = drillLerp(tx, rx - H*0.12, lungeU) - (T.fail === 'early' ? reach*lungeU : 0);
  const crouch = clamp((0.62 - T.h)/0.5, 0, 1);
  { const miss = T.stage === 'missed' && T.fail !== 'high', clip = miss ? 'fall' : contact ? (T.stage === 'squeeze' ? 'tackle' : 'lying') : lungeU > 0 && T.fail !== 'high' ? 'tackle' : 'crouch';   // set, low and looking at them; then the lunge and the wrap; a miss goes to ground
    const frame = miss ? Math.min(2, Math.floor(T.t/0.14)) : contact ? (T.stage === 'squeeze' ? 1 : 0) : clip === 'tackle' ? 0 : T.h > 0.62 ? 0 : T.h > 0.42 ? 1 : 2;
    if (!dvManAt(mx, y0, k, T.me, clip, frame, 2)) tackleBody(mx, y0, k, M.kit[0], { dir:1, fwd:true, crouch, lean:0.35 + 0.9*lungeU, phase:0, down:T.stage === 'missed' && T.fail !== 'high' ? clamp(T.t/0.3, 0, 1)*0.9 : contact ? 0.55 : 0 }); }
  if (contact) drawRunner();
  if (T.stage === 'side') {                                // the aim: a bracket across him at the height you have chosen, coloured by the band
    const ay = y0 - T.h*Hp;
    ctx.strokeStyle = zone; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(rx - H*0.16, ay - 8); ctx.lineTo(rx - H*0.16, ay); ctx.lineTo(rx + H*0.14, ay); ctx.lineTo(rx + H*0.14, ay - 8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(tx + H*0.1, ay); ctx.lineTo(rx - H*0.2, ay); ctx.setLineDash([6, 6]); ctx.lineWidth = 2; ctx.stroke(); ctx.setLineDash([]);
    const pm = tackleMeterBox(W, H);                       // the power meter: fills while Tackle is held; the notch is enough
    ctx.fillStyle = 'rgba(8,14,10,.8)'; ctx.fillRect(pm.x - 2, pm.y - 2, pm.w + 4, pm.h + 4);
    ctx.fillStyle = T.charge >= K.power ? '#62d680' : '#ffcf3d'; ctx.fillRect(pm.x, pm.y, pm.w*T.charge, pm.h);
    ctx.fillStyle = '#f1eee4'; ctx.fillRect(pm.x + pm.w*K.power - 1, pm.y - 4, 3, pm.h + 8);
  }
  if (T.stage === 'squeeze') {                             // the squeeze: a ring that fills
    const cx = rx - H*0.06, cy = y0 - Hp*0.4, r = H*0.11;
    ctx.strokeStyle = 'rgba(241,238,228,.35)'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke();
    ctx.strokeStyle = '#ffcf3d'; ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI/2, -Math.PI/2 + 2*Math.PI*clamp(T.sq, 0, 1)); ctx.stroke();
  }
  ctx.restore();
  tackleChips(T);
}
const tackleChipTop = H => Math.max(96, H*0.27);          // the top of the five chips (28px tall)
function tackleMeterBox(W, H) {                            // the power meter: a bar over the tackler's head, between it and the chips, so the thumb on the touch stick never covers it
  const y0 = H*0.8, Hp = 0.4*H, w = H*0.24, h = 8;          // the close-up's ground line and a man's height, as tackleDraw has them; his head's top is 0.96 of that, standing
  return { x:W*0.32 - w/2, y:(tackleChipTop(H) + 28 + y0 - Hp*0.96)/2 - h/2, w, h };
}
function tackleChips(T) {                                  // the five elements, a word each: green right, red wrong, grey not reached yet
  const W = V.W, top = tackleChipTop(V.H), gap = 6, n = TACKLE_PARTS.length, w = Math.min(112, (W - 120 - gap*(n - 1))/n), x0 = W/2 - (w*n + gap*(n - 1))/2;
  ctx.save();
  ctx.font = `800 15px 'Big Shoulders Display', Impact, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  TACKLE_PARTS.forEach(([k, label], i) => {
    const m = T.marks[k], x = x0 + i*(w + gap);
    ctx.fillStyle = !m || m.ok == null ? 'rgba(16,27,20,.85)' : m.ok ? 'rgba(46,140,74,.95)' : 'rgba(186,64,44,.95)';
    rrect(x, top, w, 28, 5); ctx.fill();
    ctx.fillStyle = !m || m.ok == null ? 'rgba(241,238,228,.55)' : '#f1eee4';
    ctx.fillText((m ? m.word : label).toUpperCase(), x + w/2, top + 14.5);
  });
  if (T.stage === 'show') {                                // the verdict under the chips: the rep, or the first thing to put right
    const v = tackleVerdict(T);
    ctx.font = `900 34px 'Big Shoulders Display', Impact, sans-serif`; ctx.lineJoin = 'round'; ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(8,14,10,.9)';
    ctx.fillStyle = T.good ? '#62d680' : '#ff8466';
    const word = v.word.toUpperCase();
    ctx.strokeText(word, W/2, top + 62); ctx.fillText(word, W/2, top + 62);
    if (v.why) { ctx.font = `800 19px 'Big Shoulders Display', Impact, sans-serif`; ctx.lineWidth = 4; ctx.fillStyle = '#f1eee4'; ctx.strokeText(v.why.toUpperCase(), W/2, top + 90); ctx.fillText(v.why.toUpperCase(), W/2, top + 90); }
  }
  ctx.restore();
}

/* ---------- Kicking: a run of five goal kicks ----------
   The first is close and in front with no wind; each one after is further out and wider, with a strong wind across it, so the
   arrow has to allow for it: an unaimed run loses about a star. Stars by kicks made. */
const DRILL_KICKS = { spots:[[100, 35, 0], [95, 27, 16], [92, 44, 19], [88, 24, 21], [85, 48, 22]], stars:[2, 3, 5] };
function kickNext(K) {
  const [x, y, mph] = DRILL_KICKS.spots[K.i];
  M.wind = { ...M.wind, mph, a:(rnd() < 0.5 ? 1 : -1)*Math.PI/2 };   // always across the kick, so the arrow has to allow for it: a wind along the line would leave a kick needing no aim
  goalKick(0, x, y, 'conversion');
}
const drillKick = {
  setup() {
    M.wind = { ...M.wind, mph:0 };
    practice.kick = { i:0, made:0, shots:[] };
    kickNext(practice.kick);
  },
  onGoal(g) {                                              // a judged kick: count it, then the next spot, or the result
    const K = practice.kick;
    K.shots.push(!!g.ok); if (g.ok) K.made++;
    K.i++;
    if (K.i < DRILL_KICKS.spots.length) { kickNext(K); return true; }
    const stars = drillStarsOf(K.made, DRILL_KICKS.stars);
    practiceFinish(stars > 0, K.made + ' of ' + K.shots.length + ' Kicks', stars);
    return true;
  },
  timeUp() { const K = practice.kick, stars = drillStarsOf(K.made, DRILL_KICKS.stars); practiceFinish(stars > 0, K.made + ' of ' + DRILL_KICKS.spots.length + ' Kicks', stars); },
  hud() { const K = practice.kick, pips = []; for (let i = 0; i < DRILL_KICKS.spots.length; i++) pips.push(i < K.shots.length ? (K.shots[i] ? 'got' : 'miss') : i === K.shots.length ? 'now' : 'todo'); return { pips }; },
  howTo() { return 'Five kicks, each further out and windier. Aim the arrow with your run controls, hold ' + drillName('Kick', 'a') + ' and let go in the gold.'; },
  tip() { return practice.kick.made >= 3 ? 'Aiming first and letting go in the gold did it.' : 'Aim first, then let go in the gold. No rush.'; },
  result() { return { skill:'kicking' }; },
};

/* ---------- Driving: three scrums, each pack a little stronger ----------
   The match's own scrum, as it is: Crouch, Bind, Set, a Good Hit on Set, then tap Push to drive; only here, your body shape counts
   too. The stick holds you low and strong in the green (hips lower than your shoulders), and you rise out of it as you
   push. Out of the green, standing up or going too low, your pack shoves far less, however fast you tap: shape and timing beat
   tapping alone. A drive is won when your pack gains half a metre or more. Stars by drives won. */
const DRILL_DRIVE = { scrums:3, cpu:[0.35, 0.8, 1.0], gain:0.5, at:[60, 35], stars:[1, 2, 3], shape:{ from:0.9, band:[0.38, 0.66], rate:0.6, rise:0.15, wave:0.1, bad:0.22 } };
function driveShape(c, dt, eff) {                          // the Driving drill's one hook in updateScrum: the stick moves your body, and a body out of the green pushes less
  const K = DRILL_DRIVE.shape, j = inputOf(0).world();
  if (c.shape == null) { c.shape = K.from; c.shapeIn = 0; c.shapeAll = 0; }
  c.shape = clamp(c.shape + (K.rise + K.wave*Math.sin(c.t*2.1 + c.wave) - j.y*K.rate)*dt, 0, 1);
  const good = c.shape >= K.band[0] && c.shape <= K.band[1];
  if (c.t < SCRUM_SET) return;
  c.shapeAll += dt; if (good) c.shapeIn += dt; else eff[0] *= K.bad;
  const R = practice.drive; if (R) { R.all += dt; if (good) R.good += dt; }
}
function driveGaugeBox(W, H) { const h = Math.max(100, H*0.34), w = h*0.62; return { x:W - w - 18, y:Math.max(72, H*0.2), w, h }; }   // top right, under Pause and above Push, clear of the packs, the scrum's hint card and the touch stick
function driveNext(D) {
  startScrum({ team:0, x:DRILL_DRIVE.at[0], y:DRILL_DRIVE.at[1] });
  if (M.cut && M.cut.kind === 'scrum') M.cut.base[1] *= DRILL_DRIVE.cpu[D.i];   // the other pack's strength for this scrum
}
const drillDrive = {
  setup() { practice.drive = { i:0, won:0, res:[], all:0, good:0 }; driveNext(practice.drive); },
  onScrum(c) {
    const D = practice.drive, won = c.result === 'dom0' || (c.result === 'win0' && c.pos >= DRILL_DRIVE.gain);
    D.res.push(won); if (won) D.won++;
    say(won ? 'Drive Won' : c.pos < 0 ? 'Pushed Back' : 'Held', won ? '' : 'small', won ? 0 : 1); sfx(won ? 'cheer' : 'groan');
    finishCut(() => {
      if (!practice) return;
      D.i++;
      if (D.i < DRILL_DRIVE.scrums) { M.phase = 'play'; driveNext(D); return; }
      const stars = drillStarsOf(D.won, DRILL_DRIVE.stars);
      practiceFinish(stars > 0, D.won + (D.won === 1 ? ' Drive Won' : ' Drives Won'), stars);
    }, 0.8);
    return true;
  },
  timeUp() { const D = practice.drive, stars = drillStarsOf(D.won, DRILL_DRIVE.stars); practiceFinish(stars > 0, D.won + (D.won === 1 ? ' Drive Won' : ' Drives Won'), stars); },
  hud() { const D = practice.drive, pips = []; for (let i = 0; i < DRILL_DRIVE.scrums; i++) pips.push(i < D.res.length ? (D.res[i] ? 'got' : 'miss') : i === D.res.length ? 'now' : 'todo'); return { pips }; },
  drawScreen() {                                           // your shape, side on, beside a band: the green is low and strong
    const c = M.cut; if (!c || c.kind !== 'scrum' || c.shape == null || c.result) return;
    const K = DRILL_DRIVE.shape, B = driveGaugeBox(V.W, V.H), good = c.shape >= K.band[0] && c.shape <= K.band[1], bar = 10, y1 = B.y + B.h - 6, Hb = B.h - 12, y = u => y1 - Hb*u;
    ctx.save();
    ctx.fillStyle = 'rgba(8,14,10,.72)'; rrect(B.x, B.y, B.w, B.h, 6); ctx.fill();
    ctx.fillStyle = 'rgba(241,238,228,.18)'; ctx.fillRect(B.x + 6, B.y + 6, bar, Hb);
    ctx.fillStyle = '#62d680'; ctx.fillRect(B.x + 6, y(K.band[1]), bar, y(K.band[0]) - y(K.band[1]));
    ctx.fillStyle = '#f1eee4'; ctx.fillRect(B.x + 3, y(c.shape) - 2, bar + 6, 4);
    { const low = c.shape < K.band[0], up = c.shape > K.band[1], kk = (Hb/1.8)*0.8, me = M.players.find(p => p.team === 0);   // high, in the green, too low
      if (!dvManAt(B.x + B.w*(good || low ? 0.4 : 0.56), y1, kk*(good || low ? 0.78 : 1), me, up ? 'crouch' : low ? 'tackle' : 'bind', up ? (c.shape > 0.8 ? 0 : 1) : low ? 2 : 1, 2)) tackleBody(B.x + B.w*0.56, y1, kk, M.kit[0], { dir:1, crouch:clamp(1.25*(1 - c.shape), 0, 1), lean:0.15 + 1.55*(1 - c.shape) }); }
    ctx.font = `800 15px 'Big Shoulders Display', Impact, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom'; ctx.fillStyle = good ? '#62d680' : '#ff8466';
    ctx.fillText((good ? 'Strong' : c.shape > K.band[1] ? 'Get Low' : 'Too Low').toUpperCase(), B.x + B.w/2, B.y - 2);
    ctx.restore();
  },
  cue() { const c = M.cut; return c && c.kind === 'scrum' && !c.result && !c.engaged ? ['Get Low', 'Stay in the green and tap ' + drillName('Push', 'a') + ' on Set.'] : c && c.kind === 'scrum' && !c.result ? ['Drive', 'Stay in the green and keep tapping ' + drillName('Push', 'a') + '.'] : null; },
  howTo() { return 'Stay low in the green with ' + (drillIsKeys() ? 'W and S' : 'the stick') + '. Tap ' + drillName('Push', 'a') + ' on Set, then keep tapping.'; },
  tip() { const R = practice.drive; return R.all && R.good/R.all >= 0.6 ? 'Low and strong: that is what moved them.' : 'Get low and strong, and stay in the green.'; },
  result() { return { skill:'power' }; },
};

/* ---------- the two open-play scenarios, as before; stars by how quickly they are done ---------- */
const DRILL_QUICK = { defend:[7, 11], pass:[10, 15], draw:6.5 };    // seconds for three stars, then two; any later win is one. draw: a pass only draws the defender with them this near
const drillQuickStars = (id, won) => !won ? 0 : practice.elapsed <= DRILL_QUICK[id][0] ? 3 : practice.elapsed <= DRILL_QUICK[id][1] ? 2 : 1;
const drillPassDrawn = () => practice.drawAt != null && practice.drawAt <= DRILL_QUICK.draw;   // Two-on-One: the moment of the pass is what scores
const drillPassStars = () => (!drillPassDrawn() ? 1 : practice.elapsed <= DRILL_QUICK.pass[1] ? 3 : 2);
const DRILL_WHIFF = { t:0.45, mul:0.55 };                  // a Tackle or Pull Tag pressed with nothing in reach in Defend: a stumble this long, at this share of speed
function drillWhiff(q) { if (!q) return; q.stumble = DRILL_WHIFF.t; q.stumbleMul = DRILL_WHIFF.mul; st('drillWhiff'); drillTag('Too Far', q.x, q.y); sfx('whiff'); }
const drillCanPull = q => { const b = M.ball, c = b.state === 'held' ? b.carrier : null; return !!(q && c && c.team !== q.team && onFeet(q) && dist(q, c) <= DRILL_TAG.pull.reach); };
function drillTagPull(q) {                                 // the Kids level and the Minis: a press pulls the tag, in reach, and nobody goes to ground
  if (!drillCanPull(q)) { drillWhiff(q); return; }
  sfx('tick'); buzz(20, 0); drillTag('Got It', q.x, q.y); st('drillPulled');
  const k = drillKit(); if (k && k.onPull) k.onPull(q);
}
function drillTagCheck(c) {                                // the Kids level and the Minis, in place of the automatic tackle: nobody commits. In Two-on-One a defender reaching the carrier ends the run with a tag
  if (practice.id === 'pass' && c.team === 0 && M.players.some(q => q.team === 1 && dist(q, c) < 1.5)) { st('drillTagged'); practiceFinish(false, 'Tagged. Pass before they reach you.', 0); return true; }
  return false;
}
const drillDefend = {
  onPull(q) { const won = practice.switched && q === ctrlOf(0); practiceFinish(won, won ? 'You got across and pulled the tag.' : 'Switch to the defender ahead of the ball, then get across to the runner.', drillQuickStars('defend', won)); },
  setup(own, cpu) {
    M.players = [own[0], own[1], cpu[0]];
    drillPlace(cpu[0], 49, 35); drillPlace(own[0], 56, 35); drillPlace(own[1], 36, 39);
    setCarrier(cpu[0]); setCtrl(0, own[0]); practice.initialCtrl = own[0];
    practice.cam = null; M.cam.x = 44; M.cam.y = 35;
  },
  tick() { if (ctrlOf(0) !== practice.initialCtrl) practice.switched = true; },
  onTackle(c, q) {                                         // any made tackle on the runner, the one that jolts the ball loose included
    if (c.team !== 1) return false;
    const won = practice.switched && q === ctrlOf(0);
    practiceFinish(won, won ? 'You got across and stopped the runner.' : 'Switch to the defender ahead of the ball, then get across to the runner.', drillQuickStars('defend', won));
    return true;
  },
  hud() { return { bar:1 - practice.elapsed/practice.limit }; },
  result() { return { skill:'pace' }; },
};
const drillPass = {
  setup(own, cpu) {
    M.players = [own[0], own[1], cpu[0]];
    drillPlace(own[0], 83, 31); drillPlace(own[1], 80, 42); drillPlace(cpu[0], 94, 31);
    setCarrier(own[0]); practice.firstCarrier = own[0];
    M.cam.x = 91; M.cam.y = 35;
  },
  tick() {
    const b = M.ball;
    if (practice.drawAt == null && M.stats.passes > 0) { const def = M.players.find(p => p.team === 1); practice.drawAt = def ? dist(practice.firstCarrier, def) : 99; }   // how near the defender was when the ball left your hands
    if (b.state === 'held' && b.carrier.team === 0 && b.carrier !== practice.firstCarrier && M.stats.passes > 0) practice.completedPass = true;
    if ((b.state === 'held' && b.carrier.team === 1) || M.phase === 'set') practiceFinish(false, 'Keep the defender with the ball carrier, then pass before contact. Try again.', 0);
  },
  hud() { return { bar:1 - practice.elapsed/practice.limit }; },
  result() { return { skill:'handling' }; },
};

/* ---------- Tag Chase: pull the tag, keep yours, no contact ----------
   Everyone wears two tags, one on each hip. The reps take turns. Keep: you carry the ball for the line and a
   tagger stays in front of you, wherever you run, until you are close. Then they go for you, in a straight line: change direction
   as they go and they run past. Keep on the line you were on and they have you, wide or straight. Pull: a carrier runs for your line. Get to a hip, and tap
   Pull Tag: from the front you can't reach a hip, and a bump is No Contact and the rep is gone. Stars by reps won. */
const DRILL_TAG = { reps:6, box:[44, 27, 76, 43], cam:[60, 35], zoom:1.3, show:1.1, limit:8, stars:[2, 4, 6],
  keep:{ at:[46, 35], them:[63, 35], line:74, jog:0.25, shadow:0.85, chase:0.6, acc:12, trigger:13, lungeV:0.35, lungeT:1.5, rest:0.5, reach:1.25, grab:0.04, read:0.7, track:2 },
  pull:{ at:[52, 35], them:[74, 35], lane:4, line:46, pace:0.68, acc:9, weave:1.4, reach:1.9, close:0.45, front:0.7, whiff:0.45, dodge:5, step:2.6 } };
const TAG_WHY = { Pulled:'Change Direction as They Go', Bumped:'Tag Has No Contact. No Bumps.', Past:'Reach a Hip, Then Pull' };
const tagMode = T => (T.rep % 2 ? 'keep' : 'pull');        // rep 1 keeps, rep 2 pulls, and so on
function tagRep(K) {
  const T = practice.tag, me = T.me, them = T.them;
  T.rep++; T.stage = 'play'; T.t = 0; T.grab = 0; T.whiff = 0; T.lunge = null; T.rest = 0; T.dodged = false; T.stepT = 0; T.lost = null; T.lat = 0;
  if (tagMode(T) === 'keep') {
    const Q = K.keep;
    drillPlace(me, Q.at[0], Q.at[1], 1, 0); drillPlace(them, Q.them[0], Q.them[1] + (rnd() - 0.5)*2, -1, 0);
    drillHold(me);
  } else {
    const Q = K.pull;
    drillPlace(me, Q.at[0], Q.at[1], 1, 0); drillPlace(them, Q.them[0], Q.them[1] + (rnd() - 0.5)*2*Q.lane, -1, 0);
    drillHold(them);
  }
  inputOf(0).aPressed = false;
}
function tagOver(T, won, word, why) {                      // the rep's verdict, a word on the pitch and a moment to read it
  T.stage = 'show'; T.t = 0; T.results.push(won); T.word = word; T.why = why || '';
  if (won) { T.won++; st('tagWon'); sfx('cheer'); if (tagMode(T) === 'keep') T.kept++; else T.pulled++; } else sfx('groan');
  drillTag(word, T.me.x, T.me.y);
}
function tagCanPull(T) {                                   // in reach of a hip: at the carrier's side or behind them, never in front, and not so close you bump
  const K = DRILL_TAG.pull, me = T.me, c = T.them, dx = me.x - c.x, dy = me.y - c.y, d = hyp(dx, dy), sp = hyp(c.vx, c.vy) || 1;
  return d <= K.reach && d >= K.close && (c.vx*dx + c.vy*dy)/(sp*(d || 1)) < K.front;
}
function tagEnd(T) { const stars = drillStarsOf(T.won, DRILL_TAG.stars); practiceFinish(stars > 0, T.won + ' of ' + DRILL_TAG.reps, stars); }
const drillChase = {
  setup(own, cpu) {
    const me = own[0], them = cpu[0], K = DRILL_TAG;
    M.players = [me, them];
    drillSpace(K.cam[0], K.cam[1], K.zoom);
    setCtrl(0, me);
    practice.tag = { me, them, rep:0, won:0, kept:0, pulled:0, results:[], stage:'play', t:0 };
    tagRep(K);
  },
  tick(dt) {
    const T = practice.tag, K = DRILL_TAG, me = T.me, them = T.them, inp = inputOf(0), tap = drillTap();
    T.t += dt;
    if (T.stage === 'show') {
      if (T.t >= K.show) { if (T.rep >= K.reps) tagEnd(T); else tagRep(K); }
      return;
    }
    drillRun(me, dt, K.box, false);
    const v = maxSpeed(me);
    if (tagMode(T) === 'keep') {
      const Q = K.keep;
      drillHold(me);
      const gap = dist(me, them);
      if (T.lunge) {                                       // they have gone for you, in a straight line to where you were heading: change direction now and they go past
        T.lunge.t += dt;
        steer(them, T.lunge.x*v*Q.lungeV, T.lunge.y*v*Q.lungeV + clamp((me.y - them.y)*2, -Q.track, Q.track), 40, dt);   // they lean after you as they come: a slow drift or a wiggle stays in reach, and only a real change of direction beats them
        if (T.lunge.t >= Q.lungeT) { T.lunge = null; T.rest = Q.rest; }
      } else if (T.rest > 0) { T.rest -= dt; steer(them, 0, 0, Q.acc, dt); }
      else if (them.x > me.x) {                            // in front of you they shadow you across the pitch, so running wide early gets you nowhere, and go for you once you are close
        steer(them, -v*Q.jog, clamp((me.y - them.y)*3, -v*Q.shadow, v*Q.shadow), Q.acc, dt);
        T.lat += (me.vy - T.lat)*Math.min(1, dt/Q.read);       // the way you have really been drifting: they read that, so a wiggle made before they go earns nothing, and only a change of direction after they have gone gets you past
        if (gap <= Q.trigger) {
          const tc = gap/(v + v*Q.lungeV), tx = me.x + me.vx*tc - them.x, ty = me.y + T.lat*tc - them.y, m = hyp(tx, ty) || 1;
          T.lunge = { t:0, x:tx/m, y:ty/m }; st('tagLunge'); sfx('whoosh');
        }
      } else { const m = gap || 1; steer(them, (me.x - them.x)/m*v*Q.chase, (me.y - them.y)/m*v*Q.chase, Q.acc, dt); }   // you got past: they can't catch you now
      them.x += them.vx*dt; them.y += them.vy*dt; drillFace(them, me.x, me.y);
      if (dist(me, them) <= Q.reach) T.grab += dt; else T.grab = 0;
      if (T.grab >= Q.grab) { st('tagLost'); T.lost = 'me'; tagOver(T, false, 'Pulled', TAG_WHY.Pulled); return; }
      if (me.x >= Q.line) { tagOver(T, true, 'Kept', ''); return; }
    } else {
      const Q = K.pull;
      drillHold(them);
      let vy = Math.sin(T.t*1.7)*Q.weave;                  // down the pitch with a weave, and one step away as you close in
      if (!T.dodged && dist(me, them) < Q.dodge && me.x < them.x) { T.dodged = true; T.step = me.y >= them.y ? -1 : 1; T.stepT = 0.5; }
      if (T.stepT > 0) { T.stepT -= dt; vy += T.step*Q.step; }
      steer(them, -v*Q.pace, vy, Q.acc, dt);
      them.x += them.vx*dt; them.y = clamp(them.y + them.vy*dt, K.box[1] + 1, K.box[3] - 1); drillFace(them, them.x + them.vx, them.y + them.vy);
      T.whiff = Math.max(0, T.whiff - dt);
      if (tap && !T.whiff) {
        if (tagCanPull(T)) { st('tagPulled'); T.lost = 'them'; sfx('tick'); buzz(20, 0); tagOver(T, true, 'Got It', ''); return; }
        T.whiff = Q.whiff; st('tagWhiff'); sfx('whiff');
      }
      if (dist(me, them) < Q.close) { st('tagBump'); tagOver(T, false, 'No Contact', TAG_WHY.Bumped); return; }
      if (them.x <= Q.line) { tagOver(T, false, 'Too Late', TAG_WHY.Past); return; }
    }
    if (T.t >= K.limit) tagOver(T, false, 'Too Slow', tagMode(T) === 'keep' ? '' : TAG_WHY.Past);
  },
  timeUp() { tagEnd(practice.tag); },
  labels() { const T = practice.tag; if (tagMode(T) !== 'pull' || T.stage !== 'play') return { a:null, b:null, c:false }; const on = tagCanPull(T); return { a:'Pull Tag', aOn:on, cueA:on, b:null, c:false }; },
  hud() { const T = practice.tag, pips = []; for (let i = 0; i < DRILL_TAG.reps; i++) pips.push(i < T.results.length ? (T.results[i] ? 'got' : 'miss') : i === T.results.length ? 'now' : 'todo'); return { pips }; },
  cue() {
    const T = practice.tag;
    if (T.stage === 'show') return T.why ? [T.word, T.why] : null;
    return tagMode(T) === 'keep' ? ['Keep Your Tags', 'Run for the line. Change direction as they go for you.'] : ['Pull the Tag', 'Reach a hip and tap ' + drillName('Pull Tag', 'a') + '. No bumps.'];
  },
  howTo() { return 'Keep your tags and pull theirs. No bumps.'; },
  tip() { const T = practice.tag; return T.kept >= T.pulled ? 'A quick change of direction keeps your tags.' : 'Go for a hip and pull, with no bumps.'; },
  result() { return { skill:'pace' }; },
};

/* ---------- Ball Back: being tackled, and keeping the ball for your team ----------
   A close-up, side on, as Tackling has. A tackler is coming: tap Both Hands in the gold, before they reach you. You are going
   down: pick the safe landing, bottom then shoulder, not a hand out to break the fall. On the ground: your team arrives on
   one side, so push the stick that way and the ball goes back to them. Each part is timed. Stars by good reps. */
const DRILL_BACK = { reps:5, from:6, close:2.4, gold:[1.0, 2.2], contact:0.7, land:1.7, place:1.6, grace:0.25, stickAt:0.5, show:2.0, stars:[1, 3, 5], clear:0.45 };   // clear: in the landing picture the tackler stands this many of the art's metres further off, so the head is beside the carrier and clear of the ball
const BACK_PARTS = [['hands', 'Both Hands'], ['land', 'Landing'], ['place', 'Ball Back']];
const BACK_WHY = {
  'One Hand':'Two Hands Keep the Ball Safe', 'Hand Out':'A Hand Can Get Hurt. Bottom, Then Shoulder.', 'Slow Landing':'Bottom, Then Shoulder',
  'Wrong Way':'Place It Towards Your Team', 'Too Slow':'Place It Towards Your Team',
};
function backRep() {
  const T = practice.back;
  T.rep++; T.stage = 'run'; T.t = 0; T.d = DRILL_BACK.from; T.marks = {}; T.good = false; T.tapped = false; T.pick = null; T.placed = null;
  T.safe = rnd() < 0.5 ? -1 : 1; T.team = rnd() < 0.5 ? -1 : 1;
  inputOf(0).aPressed = false;
}
function backMark(T, part, ok, word) { T.marks[part] = { ok, word }; }
function backVerdict(T) {
  const bad = BACK_PARTS.map(([k]) => T.marks[k]).find(m => m && m.ok === false);
  return T.good ? { word:'Ball Back', why:'' } : bad ? { word:bad.word, why:BACK_WHY[bad.word] || '' } : { word:'Try Again', why:'' };
}
function backEnd(T) { const stars = drillStarsOf(T.made, DRILL_BACK.stars); practiceFinish(stars > 0, T.made + (T.made === 1 ? ' Ball Back' : ' Balls Back'), stars); }
const drillBack = {
  setup(own, cpu) {
    const me = own[0], them = cpu[0];
    M.players = [me, them];
    drillSpace(60, 35, 1.25);
    drillPlace(me, 56, 35, 1, 0); drillPlace(them, 64, 35, -1, 0);
    setCtrl(0, me); drillHold(me);
    practice.back = { me, them, mates:[own[1], own[2]], rep:0, made:0, results:[], stage:'run', t:0, marks:{} };
    backRep();
  },
  tick(dt) {
    const T = practice.back, K = DRILL_BACK, inp = inputOf(0), tap = drillTap(), j = inp.world();
    T.t += dt;
    if (T.stage === 'run') {                               // Both Hands, in the gold, before they reach you
      T.d -= K.close*dt;
      if (tap && !T.tapped) {
        T.tapped = true;
        const ok = T.d <= K.gold[1] && T.d >= K.gold[0];
        backMark(T, 'hands', ok, ok ? 'Both Hands' : 'One Hand');
        if (ok) sfx('tick');
      }
      if (T.d <= K.contact) {
        if (!T.tapped) backMark(T, 'hands', false, 'One Hand');
        T.stage = 'land'; T.t = 0; T.armed = Math.abs(j.x) < K.stickAt; sfx('tackle'); buzz(25, 0);
      }
    } else if (T.stage === 'land') {                       // going down: the safe landing, or a hand out
      T.armed = T.armed || Math.abs(j.x) < K.stickAt;       // a choice is a fresh push: a thumb left on the stick never makes one
      if (T.armed && T.t >= K.grace && T.pick == null && Math.abs(j.x) >= K.stickAt) {
        T.pick = Math.sign(j.x);
        const ok = T.pick === T.safe;
        backMark(T, 'land', ok, ok ? 'Landing' : 'Hand Out');
        if (ok) sfx('tick');
      }
      if (T.pick != null || T.t >= K.land) {
        if (T.pick == null) backMark(T, 'land', false, 'Slow Landing');
        T.stage = 'place'; T.t = 0; T.armed = Math.abs(j.x) < K.stickAt; sfx('hit');
      }
    } else if (T.stage === 'place') {                      // on the ground: towards your team
      T.armed = T.armed || Math.abs(j.x) < K.stickAt;       // the thumb that chose the landing lets go first: it has not seen where the team is yet
      if (T.armed && T.t >= K.grace && T.placed == null && Math.abs(j.x) >= K.stickAt) {
        T.placed = Math.sign(j.x);
        const ok = T.placed === T.team;
        backMark(T, 'place', ok, ok ? 'Ball Back' : 'Wrong Way');
      }
      if (T.placed != null || T.t >= K.place) {
        if (T.placed == null) backMark(T, 'place', false, 'Too Slow');
        T.good = BACK_PARTS.every(([k]) => T.marks[k] && T.marks[k].ok);
        T.results.push(T.good); if (T.good) { T.made++; st('backGood'); sfx('cheer'); } else sfx('groan');
        T.stage = 'show'; T.t = 0;
      }
    } else if (T.stage === 'show') {
      if (T.t >= K.show) { if (T.rep >= K.reps) backEnd(T); else backRep(); }
    }
  },
  timeUp() { backEnd(practice.back); },
  labels() { const T = practice.back; if (T.stage !== 'run') return { a:null, b:null, c:false }; const K = DRILL_BACK, gold = T.d <= K.gold[1] && T.d >= K.gold[0]; return { a:'Both Hands', aOn:!T.tapped, cueA:gold && !T.tapped, b:null, c:false }; },
  hud() { const T = practice.back, pips = []; for (let i = 0; i < DRILL_BACK.reps; i++) pips.push(i < T.results.length ? (T.results[i] ? 'got' : 'miss') : i === T.results.length ? 'now' : 'todo'); return { pips }; },
  cue() {
    const s = practice.back.stage;
    return s === 'run' ? ['Both Hands', 'Tap ' + drillName('Both Hands', 'a') + ' on the gold.'] : s === 'land' ? ['Landing', drillSide('for the tick') + ': bottom, then shoulder.'] : s === 'place' ? ['Ball Back', drillSide('towards your team') + '.'] : null;
  },
  drawScreen() { backDraw(practice.back); },
  howTo() { return 'Both hands on the ball, land safely, and put it back towards your team.'; },
  tip() { const T = practice.back; return T.made ? 'Both hands, a safe landing, ball back to your team.' : 'Bottom, then shoulder. Never a hand out.'; },
  result() { return { skill:'handling' }; },
};
function backDraw(T) {                                     // side on, as Tackling's close-up: you with the ball, the tackler arriving, then the ground
  if (!T) return;
  const K = DRILL_BACK, W = V.W, H = V.H, y0 = H*0.8, k = H*0.4/1.8, Hp = 1.8*k, tx = W*0.42;
  ctx.save();
  dvStage(y0);
  const s = T.stage, run = s === 'run';
  const fall = s === 'land' ? clamp(T.t/K.land, 0, 0.75) : s === 'place' || s === 'show' ? 1 : 0;
  if (run) { ctx.fillStyle = 'rgba(255,207,61,.55)'; ctx.fillRect(tx + K.gold[0]*k, y0, (K.gold[1] - K.gold[0])*k, 10); }   // the gold: tap as the tackler's foot lands here
  const rx = tx + Math.max(0.5, T.d)*k + H*0.04;
  const side0 = T.placed != null ? T.placed : T.team, away = s === 'place' || s === 'show' ? tx - side0*1.5*k : s === 'land' ? rx + K.clear*k : rx;   // on the ground they roll away from your team's side, so they are not in the way of the ball
  if (!dvManAt(away, y0, k, T.them, run ? 'sprint' : s === 'land' ? 'tackle' : 'lying', run ? Math.floor(M.rt*10) & 7 : s === 'land' ? 1 : 0, s === 'place' || s === 'show' ? (side0 > 0 ? 2 : 6) : 6)) tackleBody(rx, y0, k, M.kit[1], { dir:-1, phase:run ? M.rt*11 : 0, lean:0.35, crouch:0.5, down:fall*0.8, fwd:true });
  const both = T.marks.hands && T.marks.hands.ok, hand = T.pick != null && T.pick !== T.safe;
  { const side = T.placed != null ? T.placed : T.team, d8 = side < 0 ? 2 : 6, u = s === 'land' ? clamp(T.t/K.land, 0, 1) : 0;   // your head goes towards your team, so the ball goes back to them
    const clip = run ? (both ? 'carry' : 'run') : s === 'land' ? (hand ? 'fall' : 'land') : hand && s !== 'show' ? 'fall' : 'place';
    const frame = run ? Math.floor(M.rt*10) & 7 : s === 'land' ? (hand ? 1 : T.pick != null ? 1 + (u > 0.5 ? 1 : 0) : 0) : clip === 'fall' ? 2 : T.placed != null ? 1 : 0;
    if (dvManAt(tx, y0, k, T.me, clip, frame, clip === 'place' ? d8 : 2)) {
      if (clip === 'carry') dvHeld(tx, y0, k, T.me);
      else if (run) cutBall(tx + 0.22*k, y0 - 1.0*k, k*DV_BALL, 0.7);          // in one hand, at the side: not yet safe
      else if (clip === 'land') cutBall(tx + (frame ? -0.02 : 0.1)*k, y0 - (frame === 2 ? 0.34 : frame ? 0.68 : 1.02)*k, k*DV_BALL, 0.6);
      else if (clip === 'fall') cutBall(tx + 0.9*k, y0 - 0.05*k, k*DV_BALL, 0);
      else if (clip === 'place' && (s !== 'show' || !T.good) && T.placed == null) cutBall(tx - (d8 === 2 ? 0.25 : -0.25)*k, y0 - 0.36*k, k*DV_BALL, 0.2);
    } else {
      tackleBody(tx, y0, k, M.kit[0], { dir:1, phase:run ? M.rt*11 : 0, lean:run ? 0.15 : 0, ball:s !== 'show' || !T.good, down:fall*(s === 'place' || s === 'show' ? 1 : 0.8) });
      if (both && run) { ctx.strokeStyle = C.head; ctx.lineWidth = Hp*0.05; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(tx - H*0.01, y0 - Hp*0.6); ctx.lineTo(tx + Hp*0.11, y0 - Hp*0.66); ctx.moveTo(tx + Hp*0.02, y0 - Hp*0.74); ctx.lineTo(tx + Hp*0.11, y0 - Hp*0.7); ctx.stroke(); }
    }
  }
  const label = (text, x, y, col, mark) => { ctx.font = `800 17px 'Big Shoulders Display', Impact, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; const w = ctx.measureText ? (ctx.measureText(text.toUpperCase()) || {}).width || 90 : 90; ctx.fillStyle = 'rgba(8,14,10,.85)'; rrect(x - w/2 - 10, y - 16, w + 20, 32, 6); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.stroke(); ctx.fillStyle = col; ctx.fillText(text.toUpperCase(), x, y + 1); if (mark != null) drillMark(x - w/2 - 24, y, 12, mark); };
  const lx = W*0.5 - W*0.24, ly = H*0.42, rx2 = W*0.5 + W*0.24;
  if (s === 'land') {                                      // the two landings, either way round
    const at = side => (side < 0 ? lx : rx2);
    label('Bottom, Then Shoulder', at(T.safe), ly, '#62d680', true);
    label('Hand Out', at(-T.safe), ly, '#ff8466', false);
  } else if (s === 'place' || (s === 'show' && T.marks.place)) {   // your team, arriving on one side
    const px = T.team < 0 ? tx - Hp*0.8 : tx + Hp*1.1;
    const face = T.team < 0 ? 2 : 6, f0 = Math.floor(M.rt*9) & 7;   // they run in
    if (!dvManAt(px + (T.team < 0 ? -Hp*0.3 : Hp*0.3), y0, k*0.92, T.mates[1], 'run', (f0 + 3) & 7, face)) tackleBody(px + (T.team < 0 ? -Hp*0.3 : Hp*0.3), y0, k*0.92, M.kit[0], { dir:-T.team, lean:0.5, crouch:0.5, phase:M.rt*8 });
    if (!dvManAt(px, y0, k, T.mates[0], 'run', f0, face)) tackleBody(px, y0, k, M.kit[0], { dir:-T.team, lean:0.5, crouch:0.5, phase:M.rt*8 + 1 });
    if (s === 'place') label('Your Team', px, ly, '#f1eee4');
    if ((s === 'show' || s === 'place') && T.placed != null) { const bx = tx + T.placed*(artReady() ? 1.28*k : Hp*0.45); cutBall(bx, y0 - 6, k*DV_BALL, 0); }   // at arm's length, on the grass, towards whichever side it went
  }
  ctx.restore();
  const top = tackleChipTop(H), gap = 6, n = BACK_PARTS.length, w = Math.min(124, (W - 120 - gap*(n - 1))/n), x0 = W/2 - (w*n + gap*(n - 1))/2;
  ctx.save();
  ctx.font = `800 15px 'Big Shoulders Display', Impact, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  BACK_PARTS.forEach(([p, name], i) => {
    const m = T.marks[p], x = x0 + i*(w + gap);
    ctx.fillStyle = !m ? 'rgba(16,27,20,.85)' : m.ok ? 'rgba(46,140,74,.95)' : 'rgba(186,64,44,.95)';
    rrect(x, top, w, 28, 5); ctx.fill();
    ctx.fillStyle = !m ? 'rgba(241,238,228,.55)' : '#f1eee4';
    ctx.fillText((m ? m.word : name).toUpperCase(), x + w/2, top + 14.5);
  });
  if (s === 'show') {
    const v = backVerdict(T);
    ctx.font = `900 34px 'Big Shoulders Display', Impact, sans-serif`; ctx.lineJoin = 'round'; ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(8,14,10,.9)'; ctx.fillStyle = T.good ? '#62d680' : '#ff8466';
    ctx.strokeText(v.word.toUpperCase(), W/2, top + 62); ctx.fillText(v.word.toUpperCase(), W/2, top + 62);
    if (v.why) { ctx.font = `800 19px 'Big Shoulders Display', Impact, sans-serif`; ctx.lineWidth = 4; ctx.fillStyle = '#f1eee4'; ctx.strokeText(v.why.toUpperCase(), W/2, top + 90); ctx.fillText(v.why.toUpperCase(), W/2, top + 90); }
  }
  ctx.restore();
}

const DRILL_KIT = { tag:drillChase, back:drillBack, egg:drillEgg, circle:drillCircle, cones:drillCones, tackle:drillTackle, kick:drillKick, scrum:drillDrive, defend:drillDefend, pass:drillPass };
const drillKit = () => (practice ? DRILL_KIT[practice.id] : null);
/* the engine's hooks: each returns true when the drill has taken the moment */
function practiceTackle(c, q) { const k = drillKit(); return !!(k && k.onTackle && k.onTackle(c, q)); }
function practiceGoal(g) { const k = drillKit(); return !!(k && k.onGoal && k.onGoal(g)); }
function practiceScrum(c) { const k = drillKit(); return !!(k && k.onScrum && k.onScrum(c)); }
function practiceTry(p) {                                  // a try inside a drill ends it: only the two-on-one is won that way
  if (practice.id === 'pass' && p.team === 0 && practice.completedPass) { practiceFinish(true, drillPassDrawn() ? 'You drew the defender, then passed. That made the try.' : 'You scored, but you passed early. Run at the defender first.', drillPassStars()); return; }
  practiceFinish(false, p.team === 0 ? 'Draw the defender, then pass to your supporting runner before scoring.' : 'The runner got through. Switch into cover and run towards the ball.', 0);
}
function drillLabels() { const k = drillKit(); return (k && k.labels && k.labels()) || { a:null, b:null, c:false }; }
function drillDrawScreen() { const k = drillKit(); if (k && k.drawScreen) k.drawScreen(); }
let drillHudKey = '';
const DRILL_HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.2 0 3.6 1.3 5.3 3.2 1.7-1.9 3.1-3.2 5.3-3.2 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>';
function drillHudSync() {                                  // the drill bar: pips, hearts, a count and a draining bar; rewritten only when it changes, and never a live region
  const k = drillKit(); if (!k || !k.hud) return;
  const h = k.hud(), key = JSON.stringify(h);
  if (key === drillHudKey) return;
  drillHudKey = key;
  let html = '';
  if (h.lives) for (let i = 0; i < h.lives[1]; i++) html += `<i class="dh-life${i < h.lives[0] ? '' : ' lost'}">${DRILL_HEART}</i>`;
  if (h.pips) html += h.pips.map(s => `<i class="dh-pip ${s}"></i>`).join('');
  $('dh-pips').innerHTML = html;
  $('dh-num').textContent = h.num == null ? '' : h.num;
  $('dh-num').hidden = h.num == null;
  $('dh-num').className = h.icon ? 'ic-' + h.icon : '';
  $('dh-bar').hidden = h.bar == null;
  if (h.bar != null) $('dh-bar').style.setProperty('--t', clamp(h.bar, 0, 1).toFixed(3));
}

/* ---------- the drill cards' pictures: line drawings, no image files ---------- */
const DRILL_ICONS = {
  egg:'<path d="M5 33q5-14 10 0q4-9 8 0" class="dash"/><ellipse cx="28" cy="13" rx="8" ry="5" transform="rotate(-30 28 13)" class="acc"/><path d="M24.5 15.5l7-5" class="seam"/>',
  circle:'<circle cx="20" cy="20" r="12" class="dash"/>' + [0, 1, 2, 3, 4, 5].map(i => { const a = -Math.PI/2 + i*Math.PI/3; return `<circle cx="${(20 + 12*Math.cos(a)).toFixed(1)}" cy="${(20 + 12*Math.sin(a)).toFixed(1)}" r="3.2" class="${i ? 'man' : 'acc'}"/>`; }).join(''),
  cones:'<path d="M4 34q6-10 12-4t12-4" class="dash"/><path d="M8 31l3-9 3 9z" class="cone"/><path d="M19 25l3-9 3 9z" class="cone"/><path d="M29 31l3-9 3 9z" class="cone"/>',
  tackle:'<circle cx="27" cy="7" r="3"/><path d="M27 10v11M27 21l-3 13M27 21l4 13M27 14l-4 4"/><path d="M27 23h-3" class="band"/><ellipse cx="15" cy="24" rx="9" ry="3.6" class="acc" transform="rotate(-10 15 24)"/>',
  kick:'<path d="M12 4v32M28 4v32M12 22h16"/><ellipse cx="20" cy="13" rx="4" ry="2.6" class="acc"/>',
  scrum:'<rect x="3" y="13" width="14" height="14" rx="4" class="man"/><rect x="23" y="13" width="14" height="14" rx="4"/><ellipse cx="20" cy="33" rx="3.4" ry="2.2" class="acc"/>',
  defend:'<path d="M20 4l12 4v10c0 8-5.5 13-12 16C13.5 31 8 26 8 18V8z"/><path d="M15 19l4 4 7-8" class="acc-line"/>',
  tag:'<circle cx="20" cy="8" r="4"/><path d="M20 12v13M20 25l-5 11M20 25l5 11M20 16l-8 5M20 16l8 5"/><path d="M12 24l-5 7" class="acc-line"/><path d="M28 24l5 7" class="acc-line"/>',
  back:'<path d="M5 33h30"/><ellipse cx="24" cy="27" rx="7" ry="4.4" class="acc"/><path d="M15 27H5M9 23l-4 4 4 4" class="acc-line"/><circle cx="33" cy="9" r="3"/>',
  pass:'<circle cx="8" cy="28" r="4" class="man"/><circle cx="32" cy="28" r="4" class="man"/><path d="M11 23q9-16 18 0" class="dash"/><ellipse cx="20" cy="13" rx="3.6" ry="2.4" class="acc"/>',
};
const drillIconSvg = id => `<svg viewBox="0 0 40 40" aria-hidden="true">${DRILL_ICONS[id] || ''}</svg>`;
const DRILL_STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.4l-6.1 3.5 1.5-6.8L2.2 9.5l6.9-.7z"/></svg>';
function drillStarsHtml(n) { let s = ''; for (let i = 0; i < 3; i++) s += `<i class="${i < n ? 'on' : ''}">${DRILL_STAR}</i>`; return s; }
/* =========================================================
   Training Ground: the drill picker, the ready and result card, and the rules every drill keeps.
   No championship result, played count or tutorial memory is written here. The drills themselves are in training.js.
   practiceStart(id, { onDone, leaveLabel? }) runs a drill for a caller (the career): every way out of it (the card's Back to
   Career, or leaveLabel; Back or Escape on the card; Pause then Quit) restores the settings exactly as leaving does, shows the
   home screen, then calls onDone({ id, stars, success, skill, role? }) once. It reports the best finished run of the visit, so
   Try Again never costs what was won; a visit with no finished run reports quit: true and 0 stars.
   ========================================================= */
const PRACTICE_DRILLS = [                                   // tag and handling first; contact marks the games under Contact Games (U9 and Up), which the Kids level and a career's Minis never reach
  { id:'tag', name:'Tag Chase', objective:'Keep Your Tags, Pull Theirs', limit:70 },
  { id:'egg', name:'Bouncy Egg', objective:'Catch the Ball', limit:75 },
  { id:'circle', name:'Pass Around the Circle', objective:'Beat the Ball Home', limit:110, roles:true },
  { id:'cones', name:'Cones', objective:'Beat the Clock', limit:45 },
  { id:'pass', name:'Create a Two-on-One', objective:'Draw the Defender, Then Pass', cue:'Run towards the defender to draw them in. Pass to the dashed-ringed runner, then run for the try line.', limit:22 },
  { id:'kick', name:'Kicking', objective:'Five Goal Kicks', cue:'Aim the arrow with your run controls. Hold Kick and let go in the gold band.', limit:150 },
  { id:'defend', name:'Defend a Breakaway', objective:'Get Across and Stop the Runner', tagObjective:'Get Across and Pull the Tag', tackles:true, cue:'Your first defender is beaten. Press Switch, run across to the carrier and Tackle. Sprint helps you close the gap.', tagCue:'Your first defender is beaten. Press Switch, run across to the carrier and Pull Tag. Sprint helps you close the gap.', limit:18 },
  { id:'tackle', name:'Tackling', objective:'Set, Aim, Tackle, Squeeze', limit:90, contact:true },
  { id:'scrum', name:'Driving', objective:'Win the Drive', limit:60, contact:true },
  { id:'back', name:'Ball Back', objective:'Hands, Landing, Ball Back', limit:60, contact:true },
];
const PRACTICE_COACH = 'Learn Real Tackling With a Club Coach. Not One to Try at Home.';
const practiceYoung = () => kidsLevel() || !!(career && career.stage === 0);   // the youngest: the Kids level, or a saved career still in the Minis, in free play as much as on the career's own list
function practiceBarred(id) {                              // the one rule, for every route in: no contact game for the youngest
  const d = PRACTICE_DRILLS.find(x => x.id === id);
  return !!(d && d.contact && practiceYoung());
}
function practiceNextId(id) {                              // Next Game: the next one this player may play
  const n = PRACTICE_DRILLS.length, i = PRACTICE_DRILLS.findIndex(d => d.id === id);
  for (let k = 1; k <= n; k++) { const d = PRACTICE_DRILLS[(i + k) % n]; if (!practiceBarred(d.id)) return d.id; }
  return id;
}
function practiceGroups() {                                // the picker as this player sees it, the grown-ups' panel shut
  $('pr-contact').hidden = practiceYoung();
  $('pr-games').hidden = false; $('pr-grownups').hidden = true;
}
function practiceInstructions(id) {
  const name = drillName;
  if (id === 'defend') return 'Your first defender is beaten. Press ' + name('Switch', 'b') + ', run across to the carrier and ' + name(practiceYoung() ? 'Pull Tag' : 'Tackle', 'a') + '. ' + name('Sprint', 'c') + ' helps you close the gap.';
  if (id === 'pass') return 'Run towards the defender to draw them in. ' + name('Pass', 'a') + ' to the dashed-ringed runner, then run for the try line.';
  const kit = DRILL_KIT[id];
  return kit && kit.howTo ? kit.howTo() : '';
}
function practiceRestore() {
  if (!practice) return;
  if (practice.demo) demoClean();
  const snapshot = practice.settings;
  for (const key of Object.keys(settings)) delete settings[key];
  Object.assign(settings, snapshot);
  practice = null;
  $('practice-cue').hidden = true; $('m-practice').hidden = true; $('drill-hud').hidden = true;
  for (const id of ['m-pause', 'm-break', 'm-tut', 'm-pen']) $(id).hidden = true;
  releaseAll(); clearBanner();
}
function practiceResult(p) {                               // a run as a caller hears it: the stars shown on its result card, or quit when it was left unfinished
  const kit = DRILL_KIT[p.id], done = !!p.done;
  return { id:p.id, stars:done ? p.stars : 0, success:done && !!p.won, ...(kit && kit.result ? kit.result() : {}), ...(done ? {} : { quit:true }) };
}
const practiceBest = (a, b) => (!a ? b : !b ? a : b.stars >= a.stars ? b : a);   // a caller's better finished run: more stars, the later on a tie
function practiceHandBack() {                              // a caller's drill ends: settings back as leaving puts them, the home screen up, then its onDone, once, with the visit's best finished run
  const p = practice, fn = p.opts.onDone;
  const res = p.best || practiceResult(p);
  p.opts = null;
  practiceRestore(); exitMatch();
  fn(res);
}
function practiceLeave() { if (practice && practice.opts) { practiceHandBack(); return; } practiceRestore(); exitMatch(); }
function practiceChoose() {
  if (practice && practice.opts) { practiceHandBack(); return; }
  practiceRestore();
  setTwo(false); startDemo();
  $('hud').hidden = $('controls').hidden = $('b-pause').hidden = true;
  practiceGroups();
  showScreen('s-practice');
}
/* The two sides on a drill's pitch play at these ability sums, whatever their clubs are rated this season: a drill's timing and its stars are the drill's, and don't move when a league's band does. */
const DRILL_SUMS = [13, 8];
function practiceStart(id, opts, noDemo) {                 // noDemo: Watch How rebuilding its own drill
  const drill = PRACTICE_DRILLS.find(d => d.id === id); if (!drill || practiceBarred(id)) return;
  const tagOnly = practiceYoung();                         // read before the run's own settings: for the youngest, no open-play game ever ends in a tackle (training.js)
  const kit = DRILL_KIT[id];
  const keep = opts && typeof opts.onDone === 'function' ? opts : null;
  practiceRestore(); releaseAll(); setTwo(false); lockLandscape(); ac();
  const firstTime = !settings.drillSeen.includes(id) && !noDemo;   // Watch How plays the first time this device opens the drill, until it has really been seen (demoMark)
  practice = { ...drill, tagOnly, ...(tagOnly && drill.tagCue ? { cue:drill.tagCue } : {}), opts:keep, best:null, settings:JSON.parse(JSON.stringify(settings)), elapsed:0, done:false, switched:false, completedPass:false, stars:0, won:false, space:false, cam:null, cueKey:'', role:null };
  // Existing hints remain available; first-time tutorial cards and coach memory belong to normal matches.
  settings.tut = TUT_IDS.slice(); settings.coach = false;
  newMatch({ ...DEFAULT_TEAM, ...abilitiesFor(TEAM_FLAVOUR.get(DEFAULT_TEAM.id), DRILL_SUMS[0]) }, { ...CLUBS[1], ...abilitiesFor(TEAM_FLAVOUR.get(CLUBS[1].id), DRILL_SUMS[1]) }, { halfLen:120, diff:0, duels:'off', humans:[true, false] });
  M.practice = id; M.phase = 'play'; M.set = null; M.cut = null; M.goal = null; M.kit = DV_KITS;
  const own = M.players.filter(p => p.team === 0), cpu = M.players.filter(p => p.team === 1);
  kit.setup(own, cpu);
  if (practice.cam) { M.cam.x = practice.cam.x; M.cam.y = practice.cam.y; }
  mode = 'match'; showScreen(null);
  $('hud').hidden = true; $('controls').hidden = false; $('b-pause').hidden = false;   // a drill shows its own bar, not the scorebug
  $('h-t0').hidden = $('h-t1').hidden = true;
  $('h-n0').textContent = M.nat[0].id; $('h-n1').textContent = M.nat[1].id;
  $('h-k0').style.setProperty('--k', showCol(0)); $('h-k1').style.setProperty('--k', showCol(1));
  $('pr-objective').textContent = (tagOnly && drill.tagObjective) || drill.objective; $('pr-cue').textContent = practiceInstructions(id);
  $('practice-cue').hidden = true; $('drill-hud').hidden = true; drillHudKey = ''; lastHud = ''; lastBtn = ''; restStick();
  practice.ready = true; M.paused = true;
  $('pr-icon').innerHTML = drillIconSvg(id);
  $('pr-result').textContent = drill.name; $('pr-feedback').textContent = practiceInstructions(id);
  $('pr-stars').hidden = true; $('pr-tip').hidden = true; $('pr-coach').hidden = !(drill.contact || (drill.tackles && !tagOnly));
  $('pr-roles').hidden = !drill.roles; $('pr-retry').hidden = !!drill.roles;
  $('pr-watch').hidden = false; $('pr-go').classList.toggle('one', !!drill.roles);
  $('pr-retry').textContent = 'Play'; $('pr-next').hidden = true;
  practiceLeaveLabel();
  $('m-practice').hidden = false; $('controls').hidden = true; $('b-pause').hidden = true;
  const first = drill.roles ? $('pr-runner') : $('pr-retry');
  if (first.focus) first.focus();
  if (firstTime) demoStart();
}
function practiceLeaveLabel() {                            // Back to Games on its own row, or beside Next Game; a caller's drill goes Back to Career unless it names its own
  $('pr-select').textContent = practice.opts ? (practice.opts.leaveLabel || 'Back to Career') : 'Back to Games';
  $('pr-row').classList.toggle('one', !!$('pr-next').hidden);
}
function practiceGo() {                                    // the ready card's Start: the drill runs
  practice.ready = false; M.paused = false; releaseAll();
  demoMark();                                              // started by hand: no demo on its next open
  for (const inp of inputs) inp.aPressed = inp.bPressed = inp.cPressed = false;
  $('m-practice').hidden = true; $('controls').hidden = false; $('b-pause').hidden = false;
  $('practice-cue').hidden = !(practice.id === 'defend' || practice.id === 'pass');
  $('drill-hud').hidden = false; drillHudKey = ''; drillHudSync();
}
function practiceFinish(won, feedback, stars) {
  if (!practice || practice.done) return;
  if (practice.demo) { demoEnd(!!won); return; }           // Watch How records nothing: no stars, no best, no card
  stars = stars == null ? (won ? 3 : 0) : clamp(Math.round(stars), 0, 3);
  practice.ready = false; practice.done = true; practice.won = !!won; practice.stars = stars; M.paused = true;
  if (practice.opts) practice.best = practiceBest(practice.best, practiceResult(practice));   // taken now, while the run (its role included) is as shown
  $('pr-retry').textContent = 'Try Again'; $('pr-retry').hidden = false; $('pr-roles').hidden = true;
  $('pr-watch').hidden = true; $('pr-go').classList.add('one');
  $('pr-next').hidden = !!practice.opts;                   // a caller picks the next drill itself
  practiceLeaveLabel();
  $('pr-result').textContent = won ? 'Well Played' : 'Have Another Go';
  $('pr-stars').innerHTML = drillStarsHtml(stars); $('pr-stars').setAttribute('aria-label', stars + (stars === 1 ? ' Star' : ' Stars')); $('pr-stars').hidden = false;
  $('pr-feedback').textContent = feedback;
  { const kit = DRILL_KIT[practice.id], tip = kit && kit.tip ? kit.tip() : ''; $('pr-tip').textContent = tip; $('pr-tip').hidden = !tip; }   // a short line on what worked
  $('m-practice').hidden = false; $('practice-cue').hidden = true; $('drill-hud').hidden = true;
  $('controls').hidden = true; $('b-pause').hidden = true;
  releaseAll(); setFocus(null);
  if ($('pr-retry').focus) $('pr-retry').focus();
}
function practiceTick(dt) {
  if (!practice || practice.done || !M || M.paused) return;
  practice.elapsed += dt;
  const kit = DRILL_KIT[practice.id];
  if (kit.tick) kit.tick(dt);
  if (!practice || practice.done) return;
  if (kit.cue && !practice.demo) { const c = kit.cue(); if (c) drillCue(c[0], c[1]); else drillCue('', ''); }
  if (practice.elapsed >= practice.limit) {
    if (kit.timeUp) kit.timeUp();
    else practiceFinish(false, 'Try again: ' + practice.cue, 0);
  }
  if (practice && !practice.done) drillHudSync();
}
$('b-practice').addEventListener('click', practiceChoose);
$('pr-home').addEventListener('click', goHome);
for (const d of PRACTICE_DRILLS) { $('pr-' + d.id).addEventListener('click', () => practiceStart(d.id)); $('pi-' + d.id).innerHTML = drillIconSvg(d.id); }
$('pr-retry').addEventListener('click', () => {
  if (!practice) return;
  if (!practice.ready) { const best = practice.best; practiceStart(practice.id, practice.opts); if (practice && practice.opts) practice.best = best; return; }   // a caller keeps the best run so far
  practiceGo();
});
for (const role of ['runner', 'passer']) $('pr-' + role).addEventListener('click', () => {   // Pass Around the Circle: the role is the start
  if (!practice || !practice.ready || !practice.roles) return;
  DRILL_KIT[practice.id].role(role);
  practiceGo();
});
$('pr-watch').addEventListener('click', () => { if (practice && practice.ready) demoStart(); });
$('pr-next').addEventListener('click', () => practiceStart(practiceNextId(practice.id), practice.opts));
$('pr-grown').addEventListener('click', () => { $('pr-games').hidden = true; $('pr-grownups').hidden = false; setFocus(null); const b = $('pr-grown-back'); if (b.focus) b.focus({ preventScroll:true }); $('s-practice').scrollTop = 0; });   // opens at its top, with Back to Games a key press away
$('pr-grown-back').addEventListener('click', () => { $('pr-games').hidden = false; $('pr-grownups').hidden = true; setFocus(null); const b = $('pr-grown'); if (b.focus) b.focus(); });
$('pr-select').addEventListener('click', practiceChoose);
/* =========================================================
   Watch How: the game plays a drill itself, in slow motion, and shows the real controls being used.
   It runs the real drill: a small scripted pilot, one a drill, writes the stick and the buttons on the same input object a
   thumb or a key writes (btn() with its own source bit), so it can't drift from the rules, and it draws no random number of
   its own. It plays one good rep or round, then rebuilds the drill and ends on the ready card, so Start Drill is a clean run.
   Nothing is recorded: practiceFinish stops here, and the stats it wrote go with the thrown-away match. Real input is ignored.
   There is no pause: a hidden app, a lost focus or a turned phone drops to the ready card, so nothing can stay held or paused.
   The one automatic play is used up only by DEMO.seen seconds of watching, its end, Skip, or Start Drill: an interruption before that leaves it for the next open.
   ========================================================= */
const DEMO = { rate:0.4, slow:0.25, ease:5, cap:75, tap:0.22, linger:1.2, seen:4, bit:1 << 20 };   // the pace and the slow pace at the moment that matters; rate's easing a second; the wall-clock cap; a tap's and the closing hold's real seconds; real seconds of watching that use up the automatic play; this source's bit in inp.src
let demoLast = null;                                       // how the last one ended, for the tools: { id, ok, why, wall, marks }
const demoOn = () => !!(practice && practice.demo);
const demoName = drillName, demoMove = drillMove;          // one namer for the cards, the live cues and these captions (training.js)
function demoStart() {
  if (!practice || !practice.ready) return;
  practice.ready = false; M.paused = false; releaseAll();
  practice.demo = { rate:DEMO.rate, wall:0, began:0, tries:1, cap:DEMO.cap, x:0, y:0, want:{ a:false, b:false, c:false }, tapT:{ a:0, b:0, c:0 }, slow:false, out:null, left:0, title:'', line:'', marks:{}, n:{},
    step(title, line) { this.title = title; this.line = line; }, go(x, y) { const m = hyp(x, y), t = stickTurn(0), sx = t ? y*t : x, sy = t ? -x*t : y; this.x = m > 1 ? sx/m : sx; this.y = m > 1 ? sy/m : sy; }, hold(k) { this.want[k] = true; }, tap(k) { if (this.tapT[k] <= 0) this.tapT[k] = DEMO.tap; }, mark(k) { if (this.marks[k] == null) this.marks[k] = this.rate; }, end(ok) { demoEnd(ok); } };
  $('m-practice').hidden = true; $('controls').hidden = false; $('b-pause').hidden = true; $('drill-hud').hidden = true; $('practice-cue').hidden = true;
  $('controls').classList.add('demo'); if (document.body) document.body.classList.add('drill-demo');
  $('drill-demo').hidden = false; $('demo-skip').hidden = false; $('demo-step').textContent = ''; $('demo-cap').textContent = '';
  $('demo-coach').hidden = !(practice.contact || (practice.tackles && !practice.tagOnly));   // a first open plays this before any card: the coach line goes with the pictures
  setFocus(null); lastBtn = ''; restStick();
  const skip = $('demo-skip'); if (skip.focus) skip.focus();
  demoStep(0);
}
function demoMark() {                                      // this device has seen this drill's demo. save() stands down in a drill, so the snapshot, the settings it puts back, is what is written
  const p = practice, s = p.settings;
  if (s.drillSeen.includes(p.id)) return;
  s.drillSeen = DRILL_IDS.filter(d => d === p.id || s.drillSeen.includes(d));
  saveWith(s);
}
function demoStep(raw) {                                   // a real step, before the world's: true holds the world still
  const D = practice.demo;
  if (raw && uprightPhone.matches) return true;            // opened with the phone upright: it waits behind the Turn Your Phone cover
  D.wall += raw;
  if (D.wall >= DEMO.seen) demoMark();
  if (D.out) {                                             // the good rep is done: hold the picture a moment
    D.left -= raw; demoCaption(D);
    if (D.wall >= D.cap) demoFinish(false, 'cap');
    else if (D.left <= 0) { if (D.out.ok) demoFinish(true, 'end'); else demoAgain(D); }
    return true;
  }
  if (D.wall >= D.cap) { demoFinish(false, 'cap'); return true; }
  D.x = D.y = 0; D.want.a = D.want.b = D.want.c = false; D.slow = false;
  DEMO_PILOT[practice.id](D, Math.max(raw, STEP)*D.rate);
  if (!practice.demo || D.out) { demoRelease(D); demoSync(); return true; }
  D.rate += ((D.slow ? DEMO.slow : DEMO.rate) - D.rate)*(1 - Math.exp(-raw*DEMO.ease));
  input.jx = D.x; input.jy = D.y;
  for (const k of ['a', 'b', 'c']) { if (D.tapT[k] > 0) D.tapT[k] -= raw; btn(input, k, DEMO.bit, D.want[k] || D.tapT[k] > 0); }
  demoCaption(D); demoSync();
  return false;
}
function demoCaption(D) {                                  // written only when it changes (it is a polite live region)
  if ($('demo-step').textContent !== D.title) $('demo-step').textContent = D.title;
  if ($('demo-cap').textContent !== D.line) $('demo-cap').textContent = D.line;
}
function demoSync() {                                      // the ghost: the real stick's knob where the input says, with a thumb on it; each real button lit with a finger on it for exactly as long as it is down
  const x = input.jx, y = input.jy, moved = hyp(x, y) > 0.01;
  knob.style.transform = moved ? `translate(${x*STICK_R}px,${y*STICK_R}px)` : '';
  knob.classList.toggle('lit', moved); stick.classList.toggle('on', moved);
  for (const [id, key] of ACTS) $(id).classList.toggle('lit', !!input[key + 'Down']);
}
function demoRelease(D) { input.jx = input.jy = 0; D.tapT.a = D.tapT.b = D.tapT.c = 0; for (const k of ['a', 'b', 'c']) btn(input, k, DEMO.bit, false); }
function demoEnd(ok) {                                     // the pilot is done, or the drill ended itself: let go and hold the picture
  const D = practice.demo; if (!D || D.out) return;
  demoRelease(D);
  D.out = { ok }; D.left = DEMO.linger; D.step(ok ? 'Now Play It' : 'Missed', ok ? 'That is how the game goes.' : 'Even good players miss. One more look.');
  demoCaption(D); demoSync();
}
function demoAgain(D) {                                    // the rules said no (a dive is never certain): the same drill freshly built, and the pilot goes again until the cap
  const p = practice, best = p.best, wall = D.wall, tries = D.tries + 1;
  practiceStart(p.id, p.opts, true);
  if (!practice) return;
  practice.best = best;
  demoStart();
  if (practice.demo) { practice.demo.wall = practice.demo.began = wall; practice.demo.tries = tries; }   // began: a retry shows its steps at the pace the first try did
}
function demoFinish(ok, why) {                             // back to a freshly built drill on its ready card
  const p = practice, D = p.demo; if (!D) return;
  demoLast = { id:p.id, ok:!!ok, why, wall:D.wall, tries:D.tries, marks:D.marks };
  if (why !== 'stop') demoMark();
  const best = p.best;
  practiceStart(p.id, p.opts, true);
  if (practice) practice.best = best;
}
function demoSkip() { if (demoOn()) demoFinish(false, 'skip'); }   // the player said no more: Skip, Escape, or Start on a pad
function demoStop() { if (demoOn()) demoFinish(false, 'stop'); }   // the phone or the browser interrupted: that is not having seen it
$('demo-skip').addEventListener('click', demoSkip);
function demoClean() {                                     // every way out goes through here (practiceRestore): the overlay, the ghost and anything the pilot held
  practice.demo = null;
  $('drill-demo').hidden = true; $('demo-skip').hidden = true;
  $('controls').classList.remove('demo'); if (document.body) document.body.classList.remove('drill-demo');
  knob.classList.remove('lit'); knob.style.transform = ''; stick.classList.remove('on');
  for (const [id] of ACTS) $(id).classList.remove('lit');
  for (const inp of inputs) { inp.flick = 0; inp.pre = null; inp.latch = false; inp.held.clear(); }
  releaseAll(); lastBtn = '';
}
function demoKeyDown(e, r) {
  if (r) setDev('kb');
  if (e.code === 'Escape' || e.code === 'KeyP') { if (e.preventDefault) e.preventDefault(); if (!e.repeat) demoSkip(); }
  else if (r && e.preventDefault) e.preventDefault();      // Space can't press the focused Skip
}
function demoPad(gp, P) {                                  // the pad's edges are still tracked, so a button held through it can't fire afterwards. Only Start skips: a caption names every other button, and a child copying it must not lose the demo. A pad with no Start plays it through
  const n = P.std ? Math.min(gp.buttons.length, 16) : Math.min(gp.buttons.length, 2);
  let skip = false;
  for (let i = 0; i < n; i++) {
    const was = !!P.b[i], now = padDown(gp.buttons[i], i, was);
    if (now === was) continue;
    P.b[i] = now;
    if (now) { setDev('pad'); if (i === BMAP.start) skip = true; }
  }
  if (skip) demoSkip();
}

/* ---------- the pilots ----------
   Each reads the drill as a player reads the screen and says, step by step, what the thumb and the fingers do. dt is the drill
   time this step will take. A rep that goes wrong just rolls on to the drill's next rep; a drill with only one (Defend, Two-on-One)
   is built afresh and goes again. Its rules are never bent: a dive is about two in three, for the pilot as for anyone. */
function demoEggSpot(E) {                                  // where to run: the first point on the ball's flight within reach in time, or where this hop lands. t: how long until the ball is there
  const b = M.ball, me = E.me, K = DRILL_EGG, v = maxSpeed(me)*0.8, lo = E.bounced ? 0.05 : E.kind === 'bounce' ? 99 : K.lo + 0.1;   // a Bounce Pass can't be caught before it lands, so run to where it lands
  let x = b.x, y = b.y, z = b.z, vz = b.vz;
  if (E.rolling) return { x:b.x + b.vx*0.3, y:b.y + b.vy*0.3, t:0 };
  for (let t = 0; t < 3.5; t += 1/60) {
    vz -= E.g/60; x += b.vx/60; y += b.vy/60; z += vz/60;
    if (z <= 0) return { x, y, t };
    if (z > lo && z < K.hi - 0.1 && hyp(x - me.x, y - me.y) - K.reach*0.6 <= v*t) return { x, y, t };
  }
  return { x, y, t:3.5 };
}
const demoMissed = () => !!M.stats.tier_broken;              // Defend: the dive went in and the runner broke it
const demoToward = (D, me, x, y, near) => { const dx = x - me.x, dy = y - me.y, m = hyp(dx, dy); if (m > (near || 0.15)) D.go(dx/m*Math.min(1, m/0.8), dy/m*Math.min(1, m/0.8)); };
const DEMO_PILOT = {
  egg(D) {                                                 // the three throws, one of each, named as they come: it ends after the third, however that one went
    const E = practice.egg, K = DRILL_EGG, me = E.me, b = M.ball, name = K.names[E.kind];
    if (E.n >= K.first.length && E.stage !== 'fly' && E.stage !== 'wind') { D.step(name, E.stage === 'caught' ? 'Caught on the run. That is all three.' : 'That is all three.'); if (E.t >= 0.3) D.end(true); return; }
    if (E.stage === 'caught') { D.step(name, 'Caught on the run. Moving to the ball scores double.'); return; }
    if (E.stage === 'missed') { D.step(name, 'Missed. Even good players miss.'); return; }
    if (E.stage !== 'fly') { { const left = K.first.length - E.n; D.step('Watch', left === 3 ? 'Watch the thrower. Three throws are coming.' : left === 2 ? 'Two more to come.' : 'One more to come.'); } return; }
    const at = demoEggSpot(E), far = hyp(at.x - me.x, at.y - me.y), v = maxSpeed(me);
    D.step(name, E.kind === 'bounce' ? 'It hops at odd angles. Run to it and catch it on any hop.' : E.kind === 'flat' ? 'Run to meet it before it lands.' : 'Up high. Run under it and watch the ball in.');
    if (hyp(me.x - b.x, me.y - b.y) < 5) D.slow = true;
    if (E.kind === 'bounce' && E.hops.length < 2) {        // let it hop first, so the hops can be seen: stay just out of its reach
      const dx = me.x - b.x, dy = me.y - b.y, m = hyp(dx, dy) || 1, B = K.box;
      if (m < 2.6) { let ax = dx/m, ay = dy/m; if ((me.x <= B[0] + 0.5 && ax < 0) || (me.x >= B[2] - 0.5 && ax > 0)) ax = 0; if ((me.y <= B[1] + 0.5 && ay < 0) || (me.y >= B[3] - 0.5 && ay > 0)) ay = 0; if (!ax && !ay) ay = me.y < (B[1] + B[3])/2 ? 1 : -1; D.go(ax, ay); }
      return;
    }
    if (D.n.go !== E.n && (far - K.reach*0.7)/v + 0.3 >= at.t - 0.12) D.n.go = E.n;   // set off so as to arrive moving, not to stand and wait
    if (D.n.go === E.n) { const dx = at.x - me.x, dy = at.y - me.y, m = hyp(dx, dy) || 1; D.go(dx/m, dy/m); }
  },
  circle(D, dt) {
    const C = practice.circle;
    if (C.role === 'runner') {
      if (C.survived >= 1) {                               // the round is won: now the same round as the passer
        D.step('Runner', 'Home first. Now the passer.');
        if (C.t >= 0.5) { C.round = 1; C.survived = 0; DRILL_KIT.circle.role('passer'); }
        return;
      }
      if (C.stage === 'start') { D.slow = true; D.step('Runner', 'Tap ' + demoName('Pass', 'a') + ' on the gold: a pass to the chest.'); if (C.t >= DRILL_CIRCLE.chestAt) D.tap('a'); return; }
      if (C.stage !== 'race' || C.home) return;
      const at = circleRunAt(C.R, C.s);                    // the thumb goes round with the runner
      D.go(-Math.sin(at.a), Math.cos(at.a));
      if (C.s > C.L*0.6) { D.hold('c'); D.step('Runner', 'Hold ' + demoName('Sprint', 'c') + ' to go faster.'); }
      else D.step('Runner', demoMove() + ' to run round the outside.');
      return;
    }
    if (C.survived >= 1) { D.step('Passer', 'You beat the runner.'); D.end(true); return; }
    if (C.stage === 'start') { D.slow = true; D.step('Passer', 'Tap ' + demoName('Pass', 'a') + ' on the gold to start.'); if (C.t >= DRILL_CIRCLE.chestAt) D.tap('a'); return; }
    D.step('Passer', 'Tap ' + demoName('Pass', 'a') + ' as the rings meet: a pass to the chest.');
    if (C.hold) { D.slow = true; if (C.hold.t + dt >= C.hold.tc) D.tap('a'); }
  },
  cones(D) {
    const Q = practice.cones, K = DRILL_CONES, me = Q.me;
    const route = D.route || (D.route = [...K.gates.slice(0, K.out).map(([x, y]) => [x + 0.5, y]), [K.turn[0] + 2, K.turn[1] - 3], [K.turn[0] + 2, K.turn[1] + 2], ...K.gates.slice(K.out).map(([x, y]) => [x - 0.5, y]), [K.line - 3, 46]]);
    let i = D.i || 0;
    if (i < route.length - 1 && hyp(route[i][0] - me.x, route[i][1] - me.y) < 1.2) i = D.i = i + 1;
    const dx = route[i][0] - me.x, dy = route[i][1] - me.y, m = hyp(dx, dy) || 1;
    D.go(dx/m, dy/m);
    if (i > K.out + 1) { D.hold('c'); D.step('Sprint', 'Hold ' + demoName('Sprint', 'c') + ' on the straight home.'); }
    else if (i >= K.out) D.step('The Flag', 'Run round the flag.');
    else D.step('The Gates', demoMove() + ' for a clean line through every gate.');
  },
  tackle(D, dt) {
    const T = practice.tackle, K = DRILL_TACKLE, me = T.me, aim = (K.height[0] + K.height[1])/2;
    const s = T.stage;
    if (T.made) { D.step('Great Tackle', 'Set, head behind them, aim, let go on the gold, squeeze.'); if (s === 'show' && T.t >= 1) D.end(true); return; }
    if (s === 'approach' || s === 'past') {
      D.step('Set', demoMove() + ' to get in the runner’s path. Short steps, feet balanced.');
      const dy = T.lane - me.y;
      if (Math.abs(dy) > 0.15) D.go(0, Math.max(-1, Math.min(1, dy*0.7)));
    } else if (s === 'head') {
      D.slow = true; D.mark('head');
      D.step('Head Side', drillSide('for the tick') + ': your head goes behind them.');
      if (T.t >= 0.35 && T.pick == null) D.go(T.safe, 0);
    } else if (s === 'side') {
      D.slow = true;
      const aimed = Math.abs(T.h - aim) <= 0.015;
      if (!aimed) D.go(0, T.h > aim ? 1 : -1);
      if (aimed || T.d < 3.4) D.n.pressed = true;
      if (!D.n.pressed) D.step('Aim', (drillIsKeys() ? 'Press S' : 'Push the stick down') + ' to aim at the thighs.');
      else {
        D.step('Hold and Let Go on the Gold', 'Hold ' + demoName('Tackle', 'a') + '. Let go on the gold.');
        if (T.d - K.run*dt > (K.zone[0] + K.zone[1])/2) D.hold('a'); else D.mark('release');
      }
    } else if (s === 'lunge') { D.slow = true; D.step('Hold and Let Go on the Gold', 'Let go. Now the tackle.'); }
    else if (s === 'squeeze') {
      D.slow = true; D.n.pressed = false; D.mark('squeeze');
      D.step('Squeeze', 'Hold ' + demoName('Squeeze', 'a') + ' to bring them down.');
      if (T.t >= 0.08) D.hold('a');
    } else { D.n.pressed = false; if (s === 'down') { D.slow = true; D.step('Squeeze', 'They are down.'); } }
  },
  kick(D, dt) {
    const c = M.cut, g = c && c.kind === 'goal' ? c.g : null;
    if (!g || g.watch) return;
    if (g.judged) { if (g.ok) { D.step('Over', 'Over the bar.'); D.end(true); } else D.step('Wide', 'Another one.'); D.n.steer = 0; return; }
    if (c.t <= CUT_IN) { D.step('Aim', 'Line up the arrow with the posts.'); return; }
    if (g.stage === 'aim') {
      const ideal = aimFor(g, g.ctr), steer = D.n.steer || 0, want = steer === 0 ? ideal + 0.07 : ideal, err = want - g.aim;   // a calm first kick needs no aim, so the thumb shows it anyway: out a little, and back on line
      D.step('Aim', demoMove() + ' to steer the arrow to the posts.');
      if (Math.abs(err) >= 0.004) { D.go(Math.sign(err)*Math.max(0.2, Math.min(1, Math.abs(err)/0.05)), 0); return; }
      D.n.steer = steer + 1;
      if (steer) { D.slow = true; D.hold('a'); }
    } else if (g.stage === 'power') {
      D.slow = true;
      D.step('Kick', 'Hold ' + demoName('Kick', 'a') + '. Let go in the gold.');
      if (g.pt + dt < g.ctr*g.fill) D.hold('a'); else D.mark('release');
    } else D.step('Kick', 'Watch it fly.');
  },
  scrum(D) {
    const R = practice.drive, c = M.cut;
    if (R.won) { D.end(true); return; }
    if (!c || c.kind !== 'scrum' || c.result) return;
    if (c.shape != null) { const B = DRILL_DRIVE.shape.band; if (c.shape > B[1] - 0.07) D.go(0, 1); else if (c.shape < B[0] + 0.05) D.go(0, -1); }   // the thumb keeps the body in the green
    if (c.t < SCRUM_SET - 0.3) { D.step('Get Low', 'Get low into the green. Wait for Set.'); return; }
    if (c.t < SCRUM_SET + 0.12 && !c.hit[0]) { D.slow = true; D.mark('set'); D.step('On Set', 'Tap ' + demoName('Push', 'a') + ' on Set.'); if (c.t >= SCRUM_SET - 0.02) D.tap('a'); return; }
    D.step('Drive', 'Stay in the green and keep tapping ' + demoName('Push', 'a') + '.');
    if (c.t >= (D.n.next || 0)) { D.tap('a'); D.n.next = c.t + 1/7; }
  },
  defend(D) {
    const me = ctrlOf(0), b = M.ball, c = b.state === 'held' ? b.carrier : null, tagging = practice.tagOnly, press = tagging ? 'Pull Tag' : 'Tackle';
    if (!practice.switched) { D.slow = true; D.step('Switch', 'Tap ' + demoName('Switch', 'b') + ' to pick the defender in front.'); if (D.wall - D.began >= 1.5) D.tap('b'); return; }
    if (demoMissed()) { D.end(false); return; }
    if (!me || !c || c.team !== 1) return;
    demoToward(D, me, c.x + c.vx*0.25, c.y + c.vy*0.25, 0.05);   // to where the runner is going
    if (dist(me, c) < 6) D.slow = true;
    if ((tagging ? drillCanPull(me) : canDive(me)) && dist(me, c) < 1.5) { D.mark('tackle'); D.step(press, 'Tap ' + demoName(press, 'a') + (tagging ? ' to pull the tag.' : ' once you are close.')); D.tap('a'); }
    else {
      D.step('Run', tagging && dist(me, c) < 6 ? 'Get close, then tap ' + demoName('Pull Tag', 'a') + '.' : demoMove() + ' to the runner. Hold ' + demoName('Sprint', 'c') + ' to catch them.');
      D.hold('c');
    }
  },
  tag(D) {                                                 // one Keep and one Pull
    const T = practice.tag, K = DRILL_TAG, me = T.me, them = T.them;
    if (T.kept && T.pulled) { D.step('Now Play It', 'Keep your tags and pull theirs.'); if (T.stage === 'show' && T.t >= 0.6) D.end(true); return; }
    if (T.stage !== 'play') { D.slow = true; D.step(T.word, T.why || 'Well done.'); return; }
    if (tagMode(T) === 'keep') {
      const ahead = them.x > me.x;
      if (T.lunge && !D.n.side) D.n.side = me.y >= K.cam[1] ? -1 : 1;   // towards the middle, where there is room
      if (!ahead) D.n.side = 0;
      if (T.lunge || (D.n.side && T.rest > 0)) { D.slow = true; D.go(0.45, D.n.side*0.9); D.step('Keep', demoMove() + ' to change direction as they go for you.'); }
      else if (ahead) { D.go(1, 0); D.step('Keep', 'Run at them. Wait for them to go.'); }
      else { D.go(1, 0); D.step('Keep', 'They went past. Run for the line.'); }
      return;
    }
    const side = me.y >= them.y ? 1 : -1, tx = them.x + them.vx*0.35, ty = them.y + them.vy*0.35 + side*1.15, dx = tx - me.x, dy = ty - me.y, m = hyp(dx, dy) || 1;   // to a spot at their hip
    if (m > 0.2) D.go(dx/m*Math.min(1, m/0.8), dy/m*Math.min(1, m/0.8));
    D.step('Pull', 'Go for a hip, not the front.');
    if (dist(me, them) < 5) D.slow = true;
    if (tagCanPull(T)) { D.mark('pull'); D.step('Pull', 'Tap ' + demoName('Pull Tag', 'a') + ' to take the tag.'); D.tap('a'); }
  },
  back(D) {                                                // one good rep, each part named
    const T = practice.back, K = DRILL_BACK, s = T.stage;
    if (T.made) { D.step('Ball Back', 'Both hands, a safe landing, ball back to your team.'); if (s === 'show' && T.t >= 1) D.end(true); return; }
    if (s === 'run') {
      D.step('Both Hands', 'Tap ' + demoName('Both Hands', 'a') + ' on the gold.');
      if (T.d < K.gold[1] + 1) D.slow = true;
      if (!T.tapped && T.d <= (K.gold[0] + K.gold[1])/2) { D.mark('hands'); D.tap('a'); }
    } else if (s === 'land') {
      D.slow = true; D.step('Landing', drillSide('for the tick') + ': bottom, then shoulder.');
      if (T.t >= K.grace + 0.2) D.go(T.safe, 0);
    } else if (s === 'place') {
      D.slow = true; D.step('Ball Back', drillSide('towards your team') + '.');
      if (T.t >= K.grace + 0.3) D.go(T.team, 0);
    }
  },
  pass(D) {
    const me = ctrlOf(0), b = M.ball, def = M.players.find(p => p.team === 1);
    if (practice.completedPass) {
      D.step('Score', demoMove() + ' to run for the try line.');
      if (me && def) { D.go(1, dist(me, def) < 6 && def.x >= me.x - 1 ? (me.y >= def.y ? 0.7 : -0.7) : 0); D.hold('c'); }   // round the defender, then straight home
      return;
    }
    if (b.state !== 'held') { D.slow = true; D.go(1, 0); D.step('Pass', 'The ball goes to the runner with the dashed ring.'); return; }
    if (b.carrier !== me || !def) return;
    D.go(1, 0);
    if (dist(me, def) > 5) { D.step('Draw', demoMove() + ' to run at the defender and draw them in.'); return; }
    D.slow = true; D.mark('pass');
    D.step('Pass', 'Tap ' + demoName('Pass', 'a') + ' before they reach you.');
    D.tap('a');
  },
};
/* =========================================================
   Career screens: the new player, the hub, training, the table and the season's end.
   The rules are in src/career.js; nothing here draws a random number except through it.
   ========================================================= */
const CAREER_COL = { pace:'#5fb8ff', power:'#ff6b5a', handling:'#5fd38a', kicking:'#ff9f43', stamina:'#c58cff' };   // a colour per skill, always beside its name
let careerDraft = null, careerResetArmed = false, careerRestartArmed = false;
const careerStageName = i => CAREER_STAGES[i].name;
const careerSeasonNo = cr => cr.history.filter(h => h.stage === cr.stage).length + 1;
const careerPosWord = pos => (pos === 'F' ? 'Forward' : 'Back');
function careerShirt(t, num, cls) {                  // the kit with your number on it
  return `<span class="cr-shirt${cls ? ' ' + cls : ''}">${jersey(t)}<b>${num}</b></span>`;
}
/* A name too long for its box steps down in size until its longest word fits, as fitNames does on the team cards. Run once the screen shows.
   A label (International on a narrow Hall of Fame) gives up most of its letter spacing first, and may go down to 10px. */
function careerFit(root) {
  for (const el of root.querySelectorAll('[data-fit]')) {
    el.style.fontSize = ''; el.style.letterSpacing = '';
    const over = () => el.scrollWidth > el.clientWidth + 0.5, lbl = el.classList.contains('lbl');
    if (lbl && over()) el.style.letterSpacing = '.04em';
    let px = parseFloat(getComputedStyle(el).fontSize) || 20;
    while (over() && px > (lbl ? 10 : 12)) { px -= 1; el.style.fontSize = px + 'px'; }
  }
}
function careerShow(id) { showScreen(id); const s = $(id); s.scrollTop = 0; careerFit(s); }
function careerNote(cr) {
  const c = cr.season, st = careerStageName(cr.stage);
  if (!c) return st;
  if (c.round < 5) return st + ' · ' + c.teams[c.user].name + ' · Round ' + (c.round + 1) + ' of 5';
  return st + ' · ' + (careerOutcome(cr).final ? 'Career Over' : 'Season Over');
}
function renderCareerHome() {
  const b = $('b-career'), note = $('career-note');
  if (!career) { b.textContent = 'Career'; note.hidden = true; return; }
  b.textContent = 'Continue Career'; note.textContent = careerNote(career); note.hidden = false;
}

/* ---------- the new player ---------- */
const careerClubs = () => [...CLUBS, ...custom];     // the Local list and the teams you made (an imported club is one of those)
const CAREER_BUILDS = [0.92, 1, 1.12];                // Small | Medium | Big: one of the art's three builds each
function careerNewOpen() {
  careerDraft = { i:Math.max(0, careerClubs().indexOf(myTeamOf())), pos:'B', num:CAREER_POS.B[0], numsFor:null, look:{ ...CAREER_LOOK } };   // your club starts on Your Team, when it is one of these
  $('cn-name').value = '';
  $('cn-clubs').innerHTML = careerClubs().map((t, i) => `<button class="team cr-club" data-i="${i}">${jersey(t)}<span class="tid"><span class="tname" data-fit>${esc(t.name)}</span>${teamStars(t)}</span></button>`).join('');
  for (const b of $('cn-clubs').querySelectorAll('[data-i]')) b.addEventListener('click', () => { careerDraft.i = +b.dataset.i; renderCareerNew(); });
  renderCareerNew(); careerShow('s-career-new');
  const art = ART.state === 'idle' ? artLoad() : ART.state === 'loading' ? ART.promise : null;   // the real sprite when it can be had; the shirt stands in until then, or if it never comes
  if (art && art.then) art.then(() => { if (careerDraft && !$('s-career-new').hidden) careerLookShow(); });
}
function careerLookSet(key, v) { careerDraft.look[key] = v; renderCareerNew(); }
function careerLookShow() {
  const cv = $('cn-look'), d = careerDraft;
  cv.hidden = !artPreview(cv, careerClubs()[d.i], d.look);
}
/* The picks change in place, so a controller's ring stays on the button it pressed; the numbers are redrawn only for a new position. */
function renderCareerNew() {
  const d = careerDraft, clubs = careerClubs();
  if (d.i >= clubs.length) d.i = 0;
  for (const b of $('cn-clubs').querySelectorAll('[data-i]')) { const on = +b.dataset.i === d.i; b.classList.toggle('picked', on); b.setAttribute('aria-pressed', String(on)); }
  [...$('cn-pos').children].forEach((b, i) => b.setAttribute('aria-pressed', String((i === 0) === (d.pos === 'F'))));
  if (d.numsFor !== d.pos) {
    d.numsFor = d.pos;
    $('cn-num').innerHTML = CAREER_POS[d.pos].map(n => `<button data-n="${n}">${n}</button>`).join('');
    for (const b of $('cn-num').querySelectorAll('[data-n]')) b.addEventListener('click', () => { careerDraft.num = +b.dataset.n; renderCareerNew(); });
  }
  for (const b of $('cn-num').querySelectorAll('[data-n]')) b.setAttribute('aria-pressed', String(+b.dataset.n === d.num));
  $('cn-shirt').innerHTML = careerShirt(clubs[d.i], d.num, 'big');
  const L = d.look;
  [...$('cn-g').children].forEach((b, i) => b.setAttribute('aria-pressed', String(i === L.g)));
  [...$('cn-build').children].forEach((b, i) => b.setAttribute('aria-pressed', String(CAREER_BUILDS[i] === L.b)));
  [...$('cn-skin').children].forEach((b, i) => b.setAttribute('aria-pressed', String(i === L.skin)));
  [...$('cn-hair').children].forEach((b, i) => b.setAttribute('aria-pressed', String(i === L.hair)));
  [...$('cn-style').children].forEach((b, i) => b.setAttribute('aria-pressed', String(i === L.style)));
  careerLookShow();
}
const CAREER_HAIR_NAMES = ['Black', 'Dark Brown', 'Brown', 'Light Brown', 'Blonde', 'Red'];
$('cn-skin').innerHTML = LOOK_SKIN.map((h, i) => `<button class="sw" style="--k:${h}" aria-label="Skin ${i + 1}"></button>`).join('');
$('cn-hair').innerHTML = LOOK_HAIR.map((h, i) => `<button class="sw" style="--k:${h}" aria-label="${CAREER_HAIR_NAMES[i]}"></button>`).join('');
for (const [id, key, of] of [['cn-g', 'g', i => i], ['cn-build', 'b', i => CAREER_BUILDS[i]], ['cn-skin', 'skin', i => i], ['cn-hair', 'hair', i => i], ['cn-style', 'style', i => i]])
  [...$(id).children].forEach((b, i) => b.addEventListener('click', () => careerLookSet(key, of(i))));
[...$('cn-pos').children].forEach((b, i) => b.addEventListener('click', () => {
  const pos = i === 0 ? 'F' : 'B';
  if (careerDraft.pos !== pos) { careerDraft.pos = pos; careerDraft.num = CAREER_POS[pos][0]; }
  renderCareerNew();
}));
$('cn-name').addEventListener('keydown', e => { if (e.key === 'Enter') e.target.blur(); });
function careerNewGo() {
  const d = careerDraft, club = careerClubs()[d.i];
  if (!careerStart({ name:$('cn-name').value, pos:d.pos, num:d.num, club, look:d.look })) return false;
  careerOpen();
  return true;
}
$('cn-go').addEventListener('click', careerNewGo);
$('cn-back').addEventListener('click', goHome);

/* ---------- the hub ---------- */
function careerOpen() {
  ratingsSync();
  if (!career) { careerNewOpen(); return; }
  if (!career.season) { careerNewSeason(career); save(); }   // a broken season was dropped on load: a new draw for the same stage
  if (career.season.round >= 5) { if (careerSettle(career)) save(); renderCareerEnd(); careerShow('s-career-end'); return; }
  renderCareer(); careerShow('s-career');
}
function careerCardHtml(cr, team) {
  const ovr = careerOverall(cr.skills), g = (careerLast && careerLast.gains) || {};
  return `<div class="cr-id">${careerShirt(team, cr.num)}
      <div class="cr-who"><p class="eyebrow">${careerPosWord(cr.pos)} · No. ${cr.num}</p><h3 data-fit>${esc(cr.name || team.name)}</h3></div>
      <span class="cr-ovr" aria-label="Overall ${ovr}"><b>${ovr}</b><span>Overall</span></span></div>
    <div class="cr-skills">${careerSkills().map(([k, l]) => {
      const v = cr.skills[k];
      return `<div class="cr-sk" style="--k:${CAREER_COL[k] || 'var(--chalk)'}"><span class="lbl">${l}</span><span class="bar" aria-hidden="true"><i style="width:${v}%"></i></span><b>${v}</b>${g[k] ? `<em>+${g[k]}</em>` : '<em></em>'}</div>`;
    }).join('')}</div>`;
}
function careerFixtureHtml(c) {
  const { pair } = userFixture(c), [h, a] = pair, T = c.teams;
  return `<div class="fixture"><span class="fx-team">${jersey(T[h])}${fxName(T[h], true)}</span><span class="fx-v">V</span><span class="fx-team r">${fxName(T[a], true)}${jersey(T[a])}</span></div>`;
}
function careerLine(cr) {
  const c = cr.season, st = CAREER_STAGES[cr.stage];
  const place = c.round ? ordinal(careerPlace(c)) : '';
  const goal = st.bar == null ? '' : 'Top Two or Overall ' + st.bar + ' to Go Up';
  return [place, goal].filter(Boolean).join(' · ');
}
function careerGainText(g) { return careerSkills().filter(([k]) => g[k]).map(([k, l]) => '+' + g[k] + ' ' + l).join(' · '); }
function renderCareer() {
  const cr = career, c = cr.season, team = c.teams[c.user];
  $('cr-card').innerHTML = careerCardHtml(cr, team);
  $('cr-eyebrow').textContent = careerStageName(cr.stage) + ' · Season ' + careerSeasonNo(cr);
  $('cr-title').textContent = 'Round ' + (c.round + 1) + ' of 5';
  $('cr-line').textContent = careerLine(cr); $('cr-line').hidden = !$('cr-line').textContent;
  const gain = careerLast ? careerGainText(careerLast.gains) : '';
  $('cr-gain').textContent = gain; $('cr-gain').hidden = !gain;
  $('cr-next').innerHTML = careerFixtureHtml(c);
  const can = careerCanTrain(cr) && careerDrills(cr).length > 0;
  $('cr-train').textContent = cr.trained ? 'Trained' : 'Train'; $('cr-train').disabled = !can;
  $('cr-reset').textContent = 'Start Fresh'; careerResetArmed = false;
}
$('b-career').addEventListener('click', () => { ac(); careerOpen(); });
$('cr-play').addEventListener('click', () => { careerLast = null; careerPlay(); });
$('cr-train').addEventListener('click', () => { if (careerCanTrain(career)) { renderCareerTrain(); careerShow('s-career-train'); } });
$('cr-table').addEventListener('click', () => { renderCareerTable(); careerShow('s-career-table'); });
$('cr-back').addEventListener('click', goHome);
$('cr-reset').addEventListener('click', () => {
  if (!careerResetArmed) { careerResetArmed = true; $('cr-reset').textContent = 'Tap Again to Start Fresh'; return; }
  careerEnd(); goHome();
});

/* ---------- training ---------- */
function careerChips(keys) {
  const label = Object.fromEntries(careerSkills());
  return keys.map(k => `<span class="cr-chip" style="--k:${CAREER_COL[k] || 'var(--chalk)'}">${label[k] || k}</span>`).join('');
}
function renderCareerTrain() {
  $('ct-list').innerHTML = careerDrills(career).map(d => `<button class="btn cr-drill" data-drill="${d.id}"><span class="nm">${esc(d.name).replace(/\S*-\S*/g, w => `<span class="nw">${w}</span>`)}</span><span class="cr-chips">${careerChips(d.skills)}</span></button>`).join('');
  for (const b of $('ct-list').querySelectorAll('[data-drill]')) b.addEventListener('click', () => careerTrain(b.dataset.drill));
  $('ct-coach').hidden = !careerDrills(career).some(d => PRACTICE_DRILLS.find(p => p.id === d.id).contact);
}
$('ct-back').addEventListener('click', careerOpen);

/* ---------- the table ---------- */
function careerTableRows(cr) {
  const c = cr.season, T = c.teams, up = CAREER_STAGES[cr.stage].bar != null;
  return standings(c).map((r, n) => `
    <tr class="${r.i === c.user ? 'me' : ''}${up && c.round && n < CAREER_UP ? ' up' : ''}">
      <td class="rk">${c.round ? n + 1 : '–'}</td>
      <td class="t"><span class="chip" style="--k:${HEX.test(T[r.i].kit) ? T[r.i].kit : '#888888'};--t:${HEX.test(T[r.i].trim) ? T[r.i].trim : '#f2efe6'}"></span>${esc(T[r.i].name)}${teamStars(T[r.i])}</td>
      <td>${r.P}</td><td>${r.W}</td><td>${r.D}</td><td>${r.L}</td><td>${r.PD > 0 ? '+' : ''}${r.PD}</td><td>${r.BP}</td><td class="pts">${r.Pts}</td>
    </tr>`).join('');
}
function renderCareerTable() {
  const cr = career, c = cr.season, T = c.teams;
  $('cl-eyebrow').textContent = careerStageName(cr.stage) + ' · Season ' + careerSeasonNo(cr);
  $('cl-table').innerHTML = careerTableRows(cr);
  $('cl-results').innerHTML = c.results.map((rd, k) => ({ rd, k })).reverse().map(({ rd, k }) => `<div class="rd"><p class="eyebrow">Round ${k + 1}</p>${rd.map(r => {
    const mine = r.h === c.user || r.a === c.user;
    return `<div class="res${mine ? ' me' : ''}"><span class="h">${esc(T[r.h].name)}</span><span class="sc">${r.hs} – ${r.as}</span><span>${esc(T[r.a].name)}</span></div>`;
  }).join('')}</div>`).join('');
}
$('cl-back').addEventListener('click', careerOpen);

/* ---------- the season's end, and the end of the career ---------- */
function careerTile(label, value, extra) { return `<div class="cr-tile"><span class="lbl" data-fit>${label}</span>${extra || ''}<b data-fit>${value}</b></div>`; }
function renderCareerEnd() {
  const cr = career, c = cr.season, out = careerOutcome(cr), team = c.teams[c.user];
  const title = $('ce-title'), body = $('ce-body'), act = $('ce-act');
  $('ce-shirt').innerHTML = careerShirt(team, cr.num, 'big');
  if (out.final) {                                   // the International season is the last: the honours
    const best = CAREER_STAGES.map((st, i) => {
      const places = cr.history.filter(h => h.stage === i).map(h => h.place).concat(i === cr.stage ? [out.place] : []);
      return places.length ? careerTile(st.name, ordinal(Math.min(...places))) : '';
    }).filter(Boolean);
    const titles = cr.history.filter(h => h.place === 1).length + (out.place === 1 ? 1 : 0);
    $('ce-eyebrow').textContent = (cr.name ? cr.name + ' · ' : '') + careerPosWord(cr.pos) + ' · No. ' + cr.num;
    title.textContent = 'Hall of Fame'; title.classList.add('gold');
    $('ce-line').textContent = team.name + ' finish ' + ordinal(out.place);
    body.innerHTML = `<div class="cr-tiles" style="--n:5">${careerTile('Overall', out.ovr)}${careerTile('Seasons', cr.seasons)}${careerTile('Matches', cr.totals.matches)}${careerTile('Tries', cr.totals.tries)}${careerTile('Titles', titles)}</div><div class="cr-tiles cr-best" style="--n:${best.length}">${best.join('')}</div>`;
    act.innerHTML = `<button class="btn primary" id="ce-go">Start New Career</button>`;
    careerRestartArmed = false;
    $('ce-go').addEventListener('click', careerRestart);
    return;
  }
  const next = out.promoted ? cr.stage + 1 : cr.stage;
  $('ce-eyebrow').textContent = careerStageName(cr.stage) + ' · Season ' + careerSeasonNo(cr);
  title.textContent = out.place === 1 ? 'Champions' : out.promoted ? (next === 4 ? 'Called Up' : 'Promoted') : 'One More Season';
  title.classList.toggle('gold', out.promoted);
  $('ce-line').textContent = team.name + ' finish ' + ordinal(out.place) + (out.promoted && !out.top ? ' · Overall ' + out.ovr : '');
  const tiles = careerTile('Place', ordinal(out.place)) + careerTile('Overall', out.ovr);
  if (out.promoted && next === 4) {                  // called up: the country is the choice, and the choice starts the season
    body.innerHTML = `<div class="cr-tiles">${tiles}${careerTile('Next', careerStageName(next))}</div><p class="lbl cr-pick">Pick Your Country</p>
      <div class="cr-nations">${nationsRanked(careerFemale(cr) ? 1 : 0).map(t => `<button class="team cr-club" data-n="${t.id}">${jerseyRated(t)}<span class="tid"><span class="tname" data-fit>${esc(t.name)}</span>${teamStars(t)}</span></button>`).join('')}</div>`;
    for (const b of body.querySelectorAll('[data-n]')) b.addEventListener('click', () => { careerAdvance(b.dataset.n); careerOpen(); });
    act.innerHTML = '';
    return;
  }
  const nextTeam = out.promoted ? careerTeamFor(cr, next) : team;
  body.innerHTML = `<div class="cr-tiles">${tiles}${careerTile(out.promoted ? 'Next' : 'Again', careerStageName(next), `<span class="cr-next">${jersey(nextTeam)}${fxName(nextTeam, true)}</span>`)}</div>`;
  act.innerHTML = `<button class="btn primary" id="ce-go">Next Season</button>`;
  $('ce-go').addEventListener('click', () => { careerAdvance(); careerOpen(); });
}
/* Start New Career on the Hall of Fame wipes the career and its honours, so it takes a second tap, as Start Fresh does. */
function careerRestart() {
  if (!careerRestartArmed) { careerRestartArmed = true; $('ce-go').textContent = 'Tap Again to Start New Career'; return false; }
  careerRestartArmed = false; careerEnd(); careerNewOpen();
  return true;
}
$('ce-back').addEventListener('click', goHome);

/* the first controller press lands on the screen's main action */
Object.assign(DEFAULT_FOCUS, { 's-career-new':() => $('cn-go'), 's-career':() => $('cr-play'), 's-career-train':() => $('ct-list').querySelector('.btn'), 's-career-end':() => $('ce-go') || $('ce-body').querySelector('.team') });
/* Optional browser installation and cached play. No automatic reloads. */
const offlineApp = { started:false, home:false, ready:false, readinessRequest:0, prompt:null, waiting:null, requested:false, requestedWorker:null, changed:false, reloaded:false };
function offlineRender() {
  const bar = $('app-tools'), install = $('b-install'), update = $('b-update'), status = $('offline-status');
  if (!bar || !install || !update || !status) return;
  install.hidden = !offlineApp.prompt;
  update.hidden = !offlineApp.waiting && !offlineApp.requested;
  update.disabled = offlineApp.requested;
  update.textContent = offlineApp.requested ? 'Updating…' : 'Update Game';
  status.hidden = !offlineApp.ready;
  bar.hidden = !offlineApp.home || (install.hidden && update.hidden && status.hidden);
}
function offlineReload() {
  if (!offlineApp.home || !offlineApp.requested || !offlineApp.changed || offlineApp.reloaded) return;
  offlineApp.reloaded = true;
  window.location.reload();
}
function offlineScreen(id) {
  // Leaving home while activation is pending defers the reload until home returns.
  offlineApp.home = id === 's-home';
  offlineRender();
  offlineReload();
}
function offlineReady(worker) {
  if (!worker || typeof MessageChannel === 'undefined') return;
  const request = ++offlineApp.readinessRequest;
  const channel = new MessageChannel();
  const timer = setTimeout(() => { channel.port1.close(); }, 4000);
  channel.port1.onmessage = event => {
    clearTimeout(timer); channel.port1.close();
    if (request === offlineApp.readinessRequest && event.data && event.data.type === 'OFFLINE_READY' && typeof event.data.ready === 'boolean') {
      offlineApp.ready = event.data.ready; offlineRender();
    }
  };
  try { worker.postMessage({ type:'OFFLINE_STATUS' }, [channel.port2]); }
  catch (e) { clearTimeout(timer); channel.port1.close(); }
}
function offlineRegistration(registration) {
  const refresh = () => {
    offlineApp.waiting = registration.waiting || null;
    offlineRender();
    offlineReady(registration.active);
  };
  const watch = worker => {
    if (!worker || typeof worker.addEventListener !== 'function') return;
    worker.addEventListener('statechange', () => {
      if (worker.state === 'installed' || worker.state === 'activated') refresh();
    });
  };
  refresh(); watch(registration.installing); watch(registration.waiting);
  registration.addEventListener('updatefound', () => watch(registration.installing));
}
function offlineStart() {
  if (offlineApp.started) return;
  offlineApp.started = true;
  const install = $('b-install'), update = $('b-update');
  if (install) install.addEventListener('click', () => {
    const go = async () => {
      const prompt = offlineApp.prompt;
      if (!prompt) return;
      offlineApp.prompt = null; offlineRender();
      try { await prompt.prompt(); await prompt.userChoice; } catch (e) { /* browser dismissed or unavailable */ }
    };
    if (typeof parentGate === 'function') parentGate(go); else go();   // a grown-up check first (kids.js): installing hands over to the browser
  });
  if (update) update.addEventListener('click', () => {
    if (!offlineApp.home || !offlineApp.waiting || offlineApp.requested) return;
    offlineApp.requested = true; offlineApp.requestedWorker = offlineApp.waiting; offlineApp.changed = false; offlineRender();
    try { offlineApp.waiting.postMessage({ type:'SKIP_WAITING' }); }
    catch (e) { offlineApp.requested = false; offlineRender(); }
  });
  if (typeof window.addEventListener === 'function') {
    window.addEventListener('beforeinstallprompt', event => {
      if (typeof event.preventDefault !== 'function' || typeof event.prompt !== 'function') return;
      event.preventDefault(); offlineApp.prompt = event; offlineRender();
    });
    window.addEventListener('appinstalled', () => { offlineApp.prompt = null; offlineRender(); });
  }
  if (!window.isSecureContext || typeof navigator === 'undefined' || !navigator.serviceWorker || typeof navigator.serviceWorker.register !== 'function') return;
  const workers = navigator.serviceWorker;
  workers.addEventListener('controllerchange', () => {
    if (offlineApp.requested && workers.controller === offlineApp.requestedWorker) { offlineApp.changed = true; offlineReload(); }
    offlineReady(workers.controller);
  });
  try {
    Promise.resolve(workers.register('./sw.js')).then(offlineRegistration).catch(() => {});
  } catch (e) { /* online play remains available */ }
}
/* =========================================================
   Loop and boot
   ========================================================= */
let last = performance.now(), acc = 0, gapOwed = 0, demoOwed = 0, pauseKey = '', pauseDraws = 0;
const DEMO_FRAME = 1/31;                                    // the demo behind the menus draws at about 30 a second: it is dim, and a phone on a menu has no need to run flat out
const PAUSE_DRAWS = 20;                                     // a change under the pause card: enough frames for the men's pictures to tint (ART_BAKES a frame)
document.addEventListener('visibilitychange', () => { pauseKey = ''; });   // a phone may drop a hidden page's canvas: draw it again when it comes back
/* A step is always 1/60 of a simulated second, so below pace 1 a 60Hz screen gets a frame with no step about one time in eight (at 0.75, one in four) and the world would hitch.
   The picture blends the last step instead, a step behind the sim. Drawing only: every position goes back before anything else reads it, so the sim never sees this. A close-up draws from its clocks, so those blend the same way: what is judged reads them after they have gone back. */
const PACE_KEEP = { M:null, was:[], now:[], cut:null, cutWas:[], cutNow:[] }, PACE_JUMP = 1.5;   // PACE_JUMP: metres in one step that can only be a teleport (a restart, a set piece): that man is drawn where he is
const PACE_CUT = ['t', 'acc', 'exit', 'pos'], PACE_KICK = ['st', 'm', 'aim'], PACE_LEAP = 0.2;   // what a close-up's picture moves with: the scene clock and its slow-motion fraction, the slide out, the scrum's shove; a kick's run-up, meter and aim. PACE_LEAP: a change in one step that can only be a new stage: drawn as it is
function paceKeep() {                                       // the world before the step about to run
  if (matchPace() === 1) { PACE_KEEP.M = null; return; }
  const K = PACE_KEEP, w = K.was, b = M.ball, c = M.cut; let i = 0;
  for (const p of M.players) { w[i++] = p.x; w[i++] = p.y; }
  w[i++] = b.x; w[i++] = b.y; w[i] = b.z;
  K.M = M; K.cut = c;
  if (c) { i = 0; for (const k of PACE_CUT) K.cutWas[i++] = c[k]; if (c.g) for (const k of PACE_KICK) K.cutWas[i++] = c.g[k]; }
}
function renderCutPaced(dt) {
  const K = PACE_KEEP, c = M.cut, g = c.g, u = clamp(acc/STEP, 0, 1), was = K.cutWas, now = K.cutNow;
  let i = 0;
  const blend = (o, keys) => { for (const k of keys) { const a = was[i], v = o[k]; now[i++] = v; if (typeof a === 'number' && typeof v === 'number' && Math.abs(v - a) < PACE_LEAP) o[k] = a + (v - a)*u; } };
  const back = (o, keys) => { for (const k of keys) { const v = now[i++]; if (typeof v === 'number') o[k] = v; } };
  blend(c, PACE_CUT); if (g) blend(g, PACE_KICK);
  try { render(dt); }
  finally { i = 0; back(c, PACE_CUT); if (g) back(g, PACE_KICK); }
}
function renderPaced(dt) {
  const K = PACE_KEEP;
  if (K.M !== M || M.stop > 0 || M.paused || M.phase === 'break' || M.phase === 'menu') { render(dt); return; }
  if (M.cut) { if (K.cut === M.cut) renderCutPaced(dt); else render(dt); return; }   // the frame a close-up opens has nothing to blend from
  const u = clamp(acc/STEP, 0, 1), w = K.was, n = K.now, P = M.players, b = M.ball;
  let i = 0;
  for (const p of P) {
    n[i] = p.x; n[i + 1] = p.y;
    if (hyp(p.x - w[i], p.y - w[i + 1]) < PACE_JUMP) { p.x = w[i] + (p.x - w[i])*u; p.y = w[i + 1] + (p.y - w[i + 1])*u; }
    i += 2;
  }
  const bx = b.x, by = b.y, bz = b.z;
  if (hyp(bx - w[i], by - w[i + 1]) < PACE_JUMP) { b.x = w[i] + (bx - w[i])*u; b.y = w[i + 1] + (by - w[i + 1])*u; b.z = w[i + 2] + (bz - w[i + 2])*u; }
  try { render(dt); }
  finally {
    i = 0;
    for (const p of P) { p.x = n[i]; p.y = n[i + 1]; i += 2; }
    b.x = bx; b.y = by; b.z = bz;
  }
}
function frameDraw(dt, sized) {
  if (M && M.demo) {
    demoOwed += dt;
    if (demoOwed < DEMO_FRAME && !sized) return;             // a resize has just blanked the canvas, so that frame always draws
    const d = demoOwed; demoOwed = 0;
    renderPaced(d*matchPace());                              // its strides and fading tags at the pace of its play; DEMO_FRAME above stays real time
    return;
  }
  demoOwed = 0;
  if (M && M.paused && !$('m-pause').hidden) {               // behind the pause card nothing moves: the picture stands until the camera, the size or the art changes it
    const key = V.W + 'x' + V.H + 'x' + V.dpr + 'x' + settings.cam + ART.state;
    if (sized || key !== pauseKey) { pauseKey = key; pauseDraws = PAUSE_DRAWS; }
    if (pauseDraws <= 0) return;
    pauseDraws--;
  } else pauseKey = '';
  renderPaced(dt*(practice ? drillRate() : matchPace()));    // the strides, the camera and the fading tags keep the pace of the play
}
const matchBedWanted = () => !!(playing() && !M.headless && !practice && !M.paused && !M.over && !M.tut && M.phase !== 'break' && M.phase !== 'menu');   // the crowd under a match you are playing: not the demo, a drill, the pause card, a tutorial card, half time or full time
function frame(now) {
  const dt = Math.min(0.05, (now-last)/1000); last = now;
  soundFrame(matchBedWanted());
  pollPads();
  let sized = false;
  if (window.innerWidth !== V.W || window.innerHeight !== V.H || Math.min(dprMax(), window.devicePixelRatio || 1) !== V.dpr) { resize(); sized = true; if (input.stickId === null) restStick(); }
  if (M && M.demo && uprightPhone.matches) { acc = 0; updateHud(); requestAnimationFrame(frame); return; }   // under Turn Your Phone Sideways nobody can see the demo: it waits
  if (M && !M.paused && M.phase !== 'break' && M.phase !== 'menu') {
    if (M.stop > 0) { M.stop -= dt; acc = 0; }               // your Big Hit's hit-stop: the world holds for a few frames, in real time
    else {
      const pace = matchPace();
      acc += dt*pace; gapOwed += dt; let n = 0;              // the one place the pace meets the sim: STEP and update() don't change
      while (acc >= STEP && n < 5) { paceKeep(); if (pace < 1) { stepGap = gapOwed; gapOwed = 0; } update(STEP); acc -= STEP; n++; }   // stepGap: how long the thumb has really had since the last step, for the Side Step's window
      stepGap = STEP; if (pace === 1) gapOwed = 0;
      if (n >= 5) acc = 0;
    }
  }
  frameDraw(dt, sized);
  updateHud();
  requestAnimationFrame(frame);
}

/* Headless AI-vs-AI runs, used to balance the engine. */
function simulate(n, half, diff) {
  const keep = M, out = [];
  for (let i = 0; i < n; i++) {
    const a = i % 6, b = (i + 1 + (i % 5)) % 6 === a ? (a + 1) % 6 : (i + 1 + (i % 5)) % 6;
    newMatch(a, b, { halfLen:half || 240, diff:diff == null ? 1 : diff, auto:true, headless:true });
    let steps = 0;
    while (!M.over && steps < 400000) { update(STEP); steps++; }
    out.push({ teams:[NATIONS[a].id, NATIONS[b].id], score:M.score.slice(), tries:M.tries.slice(), stats:M.stats, steps });
  }
  M = keep;
  return out;
}
window.__tryline = { practice:{ start:practiceStart, choose:practiceChoose, leave:practiceLeave, state:() => practice, finish:practiceFinish }, simulate, newMatch, update, input, inputs, STEP, scrum, lineout, forceDuel, pollPads, onKey, keyRoute, navMove, navPress, navBack,
  sides:{ side:sideOf, isHuman, inputOf, ctrlOf, setCtrl, isCtrl:ringed, levelOf, seatOfTeam, anyCharging, ourBall, userActive, humanSlots },
  debug:{ pr, stage:stageDuel, startDuel, duelGate, applyDuel, settings:() => settings, endSprint, collide, view:(W, H) => { V.W = W; V.H = H; V.dpr = 1; }, drawCut, goalKick, openPenalty:(x, y, dP) => openPenalty(0, x, y, dP), openPenaltyFor:openPenalty, penalty, resume, interactive, setRM:v => { RM = !!v; },
    duelCam, duelPose, camAt, startMatch, exitMatch, pickOwner,
    render, updateHud, setMode:v => { mode = v; }, keyDown:e => onKey(e, true), keyUp:e => onKey(e, false), frameStep:dt => { if (M.stop > 0) { M.stop -= dt; return 0; } update(STEP); return 1; },
    setTwo, two:() => two, seatScheme, twoClaim, twoRelease, twoSwap, resetSeats, pads:() => PADS, padsOn:() => padsOn, padConnected, padGone, releaseAll, setDev, lastDev:() => lastDev, focus:() => focusEl, pause, paused:() => !!(M && M.paused),
    openJoin, renderJoin, seatDev, legendHtml, seatKey, swapPlayers, useKeyboard, navLog, navLayer, twoSel:() => twoSel, series:() => series, startTwo, openTeams, renderTeams, renderHub, pickTeam, pickMode:() => pickMode, showBreak, breakKind:() => breakKind, navOnly:() => navOnly, navOwner, cueOf, cutCues, DUEL_LOCK, TWO, SCRUM_LEVEL, LINE_LEVEL, SCRUM_DOM, goHome, exitMatch, setDesk, isDesk,
    DUEL_SLOW, TDUEL, cutRate, CUT_IN, hintFor, hintShown:() => hintShown, hintOpen:() => HO, hintsOn, setHints, syncHints, hintDev, chipHtml, keycapsFor, renderHintSwitches, tutCards, tutHtml, tutStart, tutAdvance, tutPlay, tut:() => (M ? M.tut : null), tutSeen, tutMark, tutReset, tutMoment, tutSeatOf, TUT_IDS, OPEN_HINTS, placeStick, platesFloor, safeInsets, stickRest, tagBox, nearestAct, releaseTouch, phoneUpright, coachTick, coachClear, coachLast:() => coachLast, COACH_IDS, COACH_LINE },
  contact:{ matchMild, CONTACT, RUCK, SPRINT, commitTackle, resolveContact, contactStep, releaseBind, joinTackle, tackle, resolveRuck, tackleChecks, userTackle, canDive, canOffload, offload, looseInContact, collide, moveAll, wrongFoot, tackleChance,
    maxSpeed, sprintLevel, sprintable, sprintPress, sprintPick, sprintOn, sprintTick, bestChaser, cpuSprintWant, cleanThrough, ahead, gapAhead, offloadTarget, switchTarget, switchUseful, switchPlayer, computeTargets, commitPoint, COVER, drawPos, tag, isHuman, ctrlOf, levelOf,
    LONG, pickReceiver, pickLong, passAim, shownPass, passOrBlock, doPass, blockSpec, RUNON, PASS_FLIGHT, SUPPORT, openShoulder, shoulderPoint, holdShoulder, runOn, leadPass, runOnTarget, passPace, passSpeed, handleUser, userStep,
    MOVES, gestureStep, sideStep, dummyPass, pressure },
  kick:{ KICK, CAM, toFrame, toWorld, frameVec, makeGoal, goalOf, windNow, makeWind, kickWind, launchOf, posAt, velAt, crossOf, judgeCross, scores, curlOf, clearPower, aimFor, bandOf, strikeGoal, cpuKickInputs, gradeOf, verdictOf, layoutOf, kickCam, kickPose, ballAt, kickView, verdictLow, pr, cutTitle, goalLabels,
    dropZone, projectHold, holdSteps, holdLead, kickLabel, rushersOf, rushAt, blockedBy, startDropCut, applyDrop, stopSpot, stageDrop, cpuDrop, cpuDropStrike, cpuDropOffer, kickBall, kickScene },
  sidesOf:{ teamSide, sidesMeet, sideVersion, MIXED_THROUGH, WOMEN_NATIONS, womenClub, womenSix, pickSideSet, importSideOf, careerStageG, careerLook, CAREER_LOOK, careerNewOpen, careerLookSet, careerNewGo, renderCareerNew, draft:() => careerDraft, renderCareerEnd, teamList:() => teamList, quickPick:() => quickPick, artPreview, deleteTeam:() => $('bd-del').click(), saveBuilder:() => $('bd-save').click() },
  ratings:{ BUNDLED:RATINGS_BUNDLED, CLUB_RATED, CLUB_CAP, CLUB_OVER_CAP, starsOfOverall, starsOf, starsWords, starsHtml, teamStars, TEAM_LEVELS, teamLevelOf, teamBudget, abilitiesFor, sumOfOverall, rateNations, nationsRanked, nationsNearest, champOthers, clean:ratingsClean, sync:ratingsSync, fetch:ratingsFetch, boot:ratingsBoot, line:ratingsLine, now:() => ratingsNow, waiting:() => ratingsWaiting, reset:() => { ratingsNow = RATINGS_BUNDLED; ratingsWaiting = null; rateNations(RATINGS_BUNDLED.men); rateWomen(RATINGS_BUNDLED.women); } },
  yourTeam:{ of:myTeamOf, poolOf:poolOfTeam, render:renderYourTeam, leagueLine:yourTeamLeague, recordLine:yourTeamRecord, openPicker:() => openTeams('my'), teamList:() => teamList, POOL_TABS, IMPORT_POOL, poolTeams, tabTeams, tabRatingsLine, poolTabCue, careerClubs, careerDraft:() => careerDraft, finishBuilder:() => $('bd-save').click(), openBuilder, delTeam:() => $('bd-del').click(), commitImport:importCommit, importUi:() => importUi },
  teams:{ overallOf, NATIONS, MORE_NATIONS, allNations, CLUBS, FRANCE, AUSTRALIA, SOUTH_AFRICA, ENGLAND, IRELAND, WALES_SCOTLAND_ITALY, ENGLAND_TWO, COUNTIES, ALL_TEAMS, POOLS, BUDGET, KIT_COLOURS, EARLY, rateOf, outmatched, awayKit, colorDist, cleanTeam, cleanSide, cleanChamp, sidesMeet, codeFor, autoCode, showCol, shuffle, restore, newChamp, standings, honours, simMatch,
    recordChampResult, chaseLine, fixtureStake, chaseTitle, champNote, renderHub, renderHome, champ:() => champ, custom:() => custom, setChamp:c => { champ = c; }, load, save },
  arcade:{ ARCADE, heat, fireOut, onFire, fireTick, startGolden, goldenOn, periodLen, endHalf, scoreTry, dropGoal, maxSpeed },
  stamina:{ STAMINA, ABILITIES, BUDGET, staminaOf, abilityOf, staminaLasts, staminaFade, staminaPace, powerOf, staminaOn, cleanSide, startScrum, autoScrum, openBuilder, renderBuilder, builderLevel, levelChoosing:() => levelChoosing, levelNote:() => levelNote, draft:() => draft },
  career:{ create:careerCreate, start:careerStart, clean:cleanCareer, get:() => career, set:c => { career = c; }, newSeason:careerNewSeason, outcome:careerOutcome, advance:careerAdvance, sign:careerSign, end:careerEnd, trainDone:careerTrainDone, train:careerTrain, drills:careerDrills, play:careerPlay, arm:careerArm, record:careerRecordResult, natOf:careerNatOf, ability:careerAbility, natFor:careerNatFor, overall:careerOverall, skills:careerSkills, teamFor:careerTeamFor, opponents:careerOpponents, deedGains:careerDeedGains, fade:careerFade, sprintDrain:careerSprintDrain, open:careerOpen, newOpen:careerNewOpen, render:renderCareer, renderEnd:renderCareerEnd, restart:careerRestart, renderTrain:renderCareerTrain, renderTable:renderCareerTable, renderHome:renderCareerHome, last:() => careerLast, drillIds:() => PRACTICE_DRILLS.map(d => d.id), scoreGoal, mark:careerMark, STAGES:CAREER_STAGES, COUNTIES:CAREER_COUNTIES, TRAIN:CAREER_TRAIN, DRILL_SKILL:CAREER_DRILL_SKILL, DEED_CAP:CAREER_DEED_CAP, POS:CAREER_POS, SHADE:CAREER_SHADE, PUSH:CAREER_PUSH, SIGN:CAREER_SIGN, signable:careerSignable, rivals:careerRivals, DIFF, diffOf, CUT:CAREER_CUT },
  importer:{ levelFrom:importLevelFrom, level:importLevel, top:importTop, levelStep:importLevelStep, url:importUrl, parse:importParse, read:importRead, fetch:importFetch, doc:importDoc, fit:importFit, focusEl:importFocusEl, ABILITIES, name:importName, personal:importPersonal, short:importShort, same:importSame, sides:importSides, save:importSave, clean:cleanImportLeague, others:importOthers, teams:importTeams, card:importCard, open:importOpen, go:importGo, run:importRun, alt:importAlt, render:importRender, state:() => importUi, league:() => importLeague, setLeague:v => { importLeague = v; }, http:importHttp, gate:importGate, setGate:f => { importGateHook = f; }, POOL:IMPORT_POOL, MAX_REQUESTS:IMPORT_MAX_REQUESTS, MAX_SIDES:IMPORT_MAX_SIDES, UA:IMPORT_UA, SOURCES:IMPORT_SOURCES, MSG:IMPORT_MSG },
  drills:{ DV, DV_VIEW, dvOn, dvTurn, dvCovered, dvCamera, PACE:DRILL_PACE, rate:drillRate, DEMO, demoStart, demoSkip, demoStop, demoLast:() => demoLast, DRILL_IDS, DRILLS:PRACTICE_DRILLS, KIT:DRILL_KIT, start:practiceStart, state:() => practice, result:practiceResult, starsOf:drillStarsOf, RUN:DRILL_RUN, EGG:DRILL_EGG, CIRCLE:DRILL_CIRCLE, CONES:DRILL_CONES, TACKLE:DRILL_TACKLE, KICKS:DRILL_KICKS, DRIVE:DRILL_DRIVE, QUICK:DRILL_QUICK, TAG:DRILL_TAG, BACK:DRILL_BACK, COACH:PRACTICE_COACH, barred:practiceBarred, nextId:practiceNextId, groups:practiceGroups, tackleVerdict, tackleWhy:TACKLE_WHY, backVerdict, tagCanPull, drillName, drillMark, drillCanPull, practiceYoung, circleStartE, circleChestBox, driveGaugeBox, circleLap, circleRadius, circleRunAt, circleSpot, eggThrow, tackleMeterBox, labels:drillLabels, hudSync:drillHudSync, icons:DRILL_ICONS },
  kids:{ KIDS, KIDS_WORDS, KIDS_GATE, KIDS_ASKS, kidsLevel, segIndex:kidsSegIndex, segSet:kidsSegSet, parentGate, gate:() => kidsGate, type:kidsGateType, del:kidsGateDelete, close:kidsGateClose, rest:() => kidsGateRest, wake:kidsGateWake, strike:kidsStrike, diffOf, catchBall, steerAim, startScrum, startLineout, kidsSwitch, kidsChase },
  behind:{ menuDemo, BV_DEMO_AT, BV_DEMO_CAM, BV_DEMO_IN, frameDraw, renderIcons, CAM_WORDS, HALF_WORDS, BV, BV_CELL, ART, ART_STEP, artReady, artInstall, artOff, artLoad, artClear, artFree, artStepped, artPose, artSprite, artSlot, artClass, artLut, artHairOf, behindOn, stickTurn, keyFwd, dprMax, toS, lookOf, cleanLook, paintMan, dirKeyHeld, ringCol, C, LOOK_SKIN, LOOK_HAIR, LOOK_STYLES, LOOK_LONG, LOOK_FEMALE, paintState:() => ({ ctx, SKIN, HAIR }) },
  sound:{ SOUND, NAMES:SOUND_NAMES, SND, ac, sfx, play:soundPlay, frame:() => soundFrame(matchBedWanted()), wanted:matchBedWanted, bedSync, bedOn:() => !!BED, live:soundLive, voices:() => VOICES, hidden:soundHidden, shown:soundShown, unlock:soundUnlock, off:soundOff, quiet:soundQuiet, ctx:() => AC },
  clarity:{ MATCH_PACE, matchPace, paceKeep, renderPaced, PACE_KEEP, BALL_STATUS, STATUS_MATCHES, statusOf, statusWanted, statusSync, careerCaption, CAREER_CAP, careerCol, careerEdgeCol, bvStack, BV_CARRY, BV_TAG, BV_LOOSE, edgeTag, edgeTagAt, say, finishMatch },
  get M() { return M; } };

function start(data) {
  load();
  if (data && ('champ' in data || data.settings || data.custom || 'champHistory' in data || 'seasonSerial' in data || 'career' in data || 'importLeague' in data)) restore(data);
  resize(); setDesk();
  setTimeout(artLoad, 0);                                   // in every case: the demo behind the menu uses them, whatever camera is saved. In the background: an empty pitch or the code-drawn men until they are in, or if they never come
  window.addEventListener('resize', () => { resize(); if (input.stickId === null) restStick(); if (!$('s-teams').hidden) { fitNames(); poolTabShow(); } if (!$('s-home').hidden) yourTeamFit(); });
  window.addEventListener('orientationchange', () => { unzoom(); setTimeout(() => { resize(); if (input.stickId === null) restStick(); }, 300); });
  if (window.visualViewport) window.visualViewport.addEventListener('resize', unzoom);
  startDemo();
  goHome();
  offlineStart();
  ratingsBoot();
  restStick();
  requestAnimationFrame(frame);
}
try { window.claude?.hot?.snapshot?.(() => ({ champ, settings, custom, champHistory, seasonSerial, career, importLeague })); } catch (e) { /* not in a viewer */ }
if (window.claude?.hot?.ready) window.claude.hot.ready(start); else start(window.claude?.hot?.data ?? {});
})();
