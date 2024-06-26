const stops_df = {
  1 : { stop_name: 'Dilshad Garden', stop_lat: 28.675991, stop_lon: 77.321495 }, 
  2 : { stop_name: 'Jhilmil', stop_lat: 28.675648, stop_lon: 77.312393 }, 
  3 : { stop_name: 'Mansrover park', stop_lat: 28.675352, stop_lon: 77.301178 }, 
  4 : { stop_name: 'Shahdara', stop_lat: 28.673531, stop_lon: 77.28727 }, 
  5 : { stop_name: 'Welcome', stop_lat: 28.671986, stop_lon: 77.277931 }, 
  6 : { stop_name: 'Seelam Pur', stop_lat: 28.670324, stop_lon: 77.267311 }, 
  7 : { stop_name: 'Shastri Park', stop_lat: 28.668451, stop_lon: 77.250404 }, 
  8 : { stop_name: 'Kashmere Gate', stop_lat: 28.667879, stop_lon: 77.228012 }, 
  9 : { stop_name: 'Tis Hazari', stop_lat: 28.667137, stop_lon: 77.216721 }, 
  10 : { stop_name: 'Pul Bangash', stop_lat: 28.66571, stop_lon: 77.206329 }, 
  11 : { stop_name: 'Pratap Nagar', stop_lat: 28.666632, stop_lon: 77.196869 }, 
  12 : { stop_name: 'Shastri Nagar', stop_lat: 28.670135, stop_lon: 77.181679 }, 
  13 : { stop_name: 'Inderlok', stop_lat: 28.673452, stop_lon: 77.170235 }, 
  14 : { stop_name: 'Kanhaiya Nagar', stop_lat: 28.682386, stop_lon: 77.162552 }, 
  15 : { stop_name: 'Keshav Puram', stop_lat: 28.688944, stop_lon: 77.161774 }, 
  16 : { stop_name: 'Netaji Subash Place', stop_lat: 28.695637, stop_lon: 77.152428 }, 
  17 : { stop_name: 'Kohat Enclave', stop_lat: 28.697943, stop_lon: 77.140465 }, 
  18 : { stop_name: 'Pitampura', stop_lat: 28.70318, stop_lon: 77.132355 }, 
  19 : { stop_name: 'Rohini East', stop_lat: 28.707941, stop_lon: 77.125732 }, 
  20 : { stop_name: 'Rohini West', stop_lat: 28.715008, stop_lon: 77.115746 }, 
  21 : { stop_name: 'Rithala', stop_lat: 28.720821, stop_lon: 77.105042 }, 
  22 : { stop_name: 'Mundka', stop_lat: 28.682411, stop_lon: 77.028282 }, 
  23 : { stop_name: 'Rajdhani Park', stop_lat: 28.682217, stop_lon: 77.043869 }, 
  24 : { stop_name: 'Nangloi Railway Station', stop_lat: 28.682091, stop_lon: 77.05619 }, 
  25 : { stop_name: 'Nangloi', stop_lat: 28.682356, stop_lon: 77.064728 }, 
  26 : { stop_name: 'Maharaja Surajmal Stadium', stop_lat: 28.681833, stop_lon: 77.073891 }, 
  27 : { stop_name: 'Udyog Nagar', stop_lat: 28.681047, stop_lon: 77.078674 }, 
  28 : { stop_name: 'Peera Garhi', stop_lat: 28.67972, stop_lon: 77.092491 }, 
  29 : { stop_name: 'Paschim Vihar (West)', stop_lat: 28.678539, stop_lon: 77.102119 }, 
  30 : { stop_name: 'Paschim Vihar (East)', stop_lat: 28.677305, stop_lon: 77.112251 }, 
  31 : { stop_name: 'Madipur', stop_lat: 28.676418, stop_lon: 77.117294 }, 
  32 : { stop_name: 'Shivaji Park', stop_lat: 28.674965, stop_lon: 77.128258 }, 
  33 : { stop_name: 'Punjabi Bagh', stop_lat: 28.672943, stop_lon: 77.146011 }, 
  34 : { stop_name: 'Ashok Park Main', stop_lat: 28.671572, stop_lon: 77.155159 }, 
  35 : { stop_name: 'Satguru Ram Singh Marg', stop_lat: 28.662188, stop_lon: 77.157829 }, 
  36 : { stop_name: 'Samaypur Badli', stop_lat: 28.742872, stop_lon: 77.146545 }, 
  37 : { stop_name: 'Rohini Sector 18-19', stop_lat: 28.740192, stop_lon: 77.135574 }, 
  38 : { stop_name: 'Haiderpur Badli Mor', stop_lat: 28.718657, stop_lon: 77.149956 }, 
  39 : { stop_name: 'Jahangirpuri', stop_lat: 28.72818, stop_lon: 77.16124 }, 
  40 : { stop_name: 'Adarsh Nagar', stop_lat: 28.696377, stop_lon: 77.208809 }, 
  41 : { stop_name: 'Azadpur', stop_lat: 28.707287, stop_lon: 77.179863 }, 
  42 : { stop_name: 'Model Town', stop_lat: 28.702833, stop_lon: 77.193764 }, 
  43 : { stop_name: 'Guru Tegh Bahadur Nagar', stop_lat: 28.698195, stop_lon: 77.206985 }, 
  44 : { stop_name: 'Vishwavidyalaya', stop_lat: 28.694765, stop_lon: 77.212418 }, 
  45 : { stop_name: 'Vidhan Sabha', stop_lat: 28.687845, stop_lon: 77.221626 }, 
  46 : { stop_name: 'Civil Lines', stop_lat: 28.676945, stop_lon: 77.224953 }, 
  47 : { stop_name: 'Chandni Chowk', stop_lat: 28.656443, stop_lon: 77.229218 }, 
  48 : { stop_name: 'Chawri Bazar', stop_lat: 28.649635, stop_lon: 77.22628 }, 
  49 : { stop_name: 'New Delhi', stop_lat: 28.642944, stop_lon: 77.222351 }, 
  50 : { stop_name: 'Rajiv Chowk', stop_lat: 28.632896, stop_lon: 77.219574 }, 
  51 : { stop_name: 'Patel Chowk', stop_lat: 28.622967, stop_lon: 77.212288 }, 
  52 : { stop_name: 'Central Secretariat', stop_lat: 28.614973, stop_lon: 77.212029 }, 
  53 : { stop_name: 'Udyog Bhawan', stop_lat: 28.611525, stop_lon: 77.210052 }, 
  54 : { stop_name: 'Lok Kalyan Marg', stop_lat: 28.597519, stop_lon: 77.209122 }, 
  55 : { stop_name: 'Jorbagh', stop_lat: 28.587234, stop_lon: 77.212662 }, 
  56 : { stop_name: 'Dilli Haat - INA', stop_lat: 28.575195, stop_lon: 77.209473 }, 
  57 : { stop_name: 'AIIMS', stop_lat: 28.568199, stop_lon: 77.207947 }, 
  58 : { stop_name: 'Green Park', stop_lat: 28.559853, stop_lon: 77.206902 }, 
  59 : { stop_name: 'Hauz Khas', stop_lat: 28.543346, stop_lon: 77.206673 }, 
  60 : { stop_name: 'Malviya Nagar', stop_lat: 28.52817, stop_lon: 77.205612 }, 
  61 : { stop_name: 'Saket', stop_lat: 28.520638, stop_lon: 77.199379 }, 
  62 : { stop_name: 'Qutab Minar', stop_lat: 28.512714, stop_lon: 77.185791 }, 
  63 : { stop_name: 'Chhattarpur', stop_lat: 28.506584, stop_lon: 77.174866 }, 
  64 : { stop_name: 'Sultanpur', stop_lat: 28.499214, stop_lon: 77.161362 }, 
  65 : { stop_name: 'Ghitorni', stop_lat: 28.49383, stop_lon: 77.149071 }, 
  66 : { stop_name: 'Arjan Garh', stop_lat: 28.48082, stop_lon: 77.12587 }, 
  67 : { stop_name: 'Gurudronacharya', stop_lat: 28.482075, stop_lon: 77.102219 }, 
  68 : { stop_name: 'Sikanderpur', stop_lat: 28.481352, stop_lon: 77.092995 }, 
  69 : { stop_name: 'MG Road', stop_lat: 28.47967, stop_lon: 77.080444 }, 
  70 : { stop_name: 'IFFCO Chowk', stop_lat: 28.472137, stop_lon: 77.072502 }, 
  71 : { stop_name: 'Huda City Centre', stop_lat: 28.459118, stop_lon: 77.072586 }, 
  72 : { stop_name: 'Vaishali', stop_lat: 28.650059, stop_lon: 77.337608 }, 
  73 : { stop_name: 'Kaushambi', stop_lat: 28.645428, stop_lon: 77.322273 }, 
  74 : { stop_name: 'Anand Vihar', stop_lat: 28.647005, stop_lon: 77.316185 }, 
  75 : { stop_name: 'Karkarduma', stop_lat: 28.648653, stop_lon: 77.304581 }, 
  76 : { stop_name: 'Preet Vihar', stop_lat: 28.641352, stop_lon: 77.295158 }, 
  77 : { stop_name: 'Nirman Vihar', stop_lat: 28.637049, stop_lon: 77.287872 }, 
  78 : { stop_name: 'Laxmi Nagar', stop_lat: 28.629843, stop_lon: 77.276428 }, 
  79 : { stop_name: 'Noida City Centre', stop_lat: 28.574593, stop_lon: 77.356117 }, 
  80 : { stop_name: 'Golf Course', stop_lat: 28.566917, stop_lon: 77.345726 }, 
  81 : { stop_name: 'Botanical Garden', stop_lat: 28.564198, stop_lon: 77.334656 }, 
  82 : { stop_name: 'Noida Sec -18', stop_lat: 28.570843, stop_lon: 77.326088 }, 
  83 : { stop_name: 'Noida Sec -16', stop_lat: 28.577921, stop_lon: 77.318115 }, 
  84 : { stop_name: 'Noida Sec -15', stop_lat: 28.585018, stop_lon: 77.311584 }, 
  85 : { stop_name: 'New Ashok Nagar', stop_lat: 28.58847, stop_lon: 77.30146 }, 
  86 : { stop_name: 'Mayur Vihar Ext', stop_lat: 28.594124, stop_lon: 77.294495 }, 
  87 : { stop_name: 'Mayur Vihar-I', stop_lat: 28.604425, stop_lon: 77.289421 }, 
  88 : { stop_name: 'Akshardham', stop_lat: 28.618364, stop_lon: 77.279816 }, 
  89 : { stop_name: 'Yamuna Bank', stop_lat: 28.623178, stop_lon: 77.267937 }, 
  90 : { stop_name: 'Indraprastha', stop_lat: 28.620272, stop_lon: 77.250076 }, 
  91 : { stop_name: 'Supreme Court', stop_lat: 28.623438, stop_lon: 77.2425 }, 
  92 : { stop_name: 'Mandi House', stop_lat: 28.625816, stop_lon: 77.234726 }, 
  93 : { stop_name: 'Barakhamba', stop_lat: 28.629662, stop_lon: 77.224876 }, 
  94 : { stop_name: 'RK Ashram Marg', stop_lat: 28.639217, stop_lon: 77.206291 }, 
  95 : { stop_name: 'Jhandewalan', stop_lat: 28.644312, stop_lon: 77.199791 }, 
  96 : { stop_name: 'Karol Bagh', stop_lat: 28.643925, stop_lon: 77.188416 }, 
  97 : { stop_name: 'Rajendra Place', stop_lat: 28.64241, stop_lon: 77.191833 }, 
  98 : { stop_name: 'Patel Nagar', stop_lat: 28.645037, stop_lon: 77.167046 }, 
  99 : { stop_name: 'Shadipur', stop_lat: 28.65143, stop_lon: 77.156021 }, 
  100 : { stop_name: 'Kirti Nagar', stop_lat: 28.655773, stop_lon: 77.148499 }, 
  101 : { stop_name: 'Moti Nagar', stop_lat: 28.657803, stop_lon: 77.140488 }, 
  102 : { stop_name: 'Ramesh Nagar', stop_lat: 28.652809, stop_lon: 77.131462 }, 
  103 : { stop_name: 'Rajouri Garden', stop_lat: 28.649157, stop_lon: 77.122749 }, 
  104 : { stop_name: 'Tagore Garden', stop_lat: 28.643795, stop_lon: 77.112747 }, 
  105 : { stop_name: 'Subash Nagar', stop_lat: 28.640381, stop_lon: 77.10273 }, 
  106 : { stop_name: 'Tilak Nagar', stop_lat: 28.636568, stop_lon: 77.096336 }, 
  107 : { stop_name: 'Janak Puri East', stop_lat: 28.633121, stop_lon: 77.086578 }, 
  108 : { stop_name: 'Janak Puri West', stop_lat: 28.629637, stop_lon: 77.077866 }, 
  109 : { stop_name: 'Uttam Nagar East', stop_lat: 28.624643, stop_lon: 77.063126 }, 
  110 : { stop_name: 'Uttam Nagar West', stop_lat: 28.621672, stop_lon: 77.055664 }, 
  111 : { stop_name: 'Nawada', stop_lat: 28.620222, stop_lon: 77.044991 }, 
  112 : { stop_name: 'Dwarka Mor', stop_lat: 28.619366, stop_lon: 77.033188 }, 
  113 : { stop_name: 'Dwarka', stop_lat: 28.614899, stop_lon: 77.022629 }, 
  114 : { stop_name: 'Dwarka Sector - 14', stop_lat: 28.602232, stop_lon: 77.02594 }, 
  115 : { stop_name: 'Dwarka Sector - 13', stop_lat: 28.59705, stop_lon: 77.033043 }, 
  116 : { stop_name: 'Dwarka Sector - 12', stop_lat: 28.592234, stop_lon: 77.040558 }, 
  117 : { stop_name: 'Dwarka Sector - 11', stop_lat: 28.58642, stop_lon: 77.049255 }, 
  118 : { stop_name: 'Dwarka Sector - 10', stop_lat: 28.581108, stop_lon: 77.05719 }, 
  119 : { stop_name: 'Dwarka Sector - 9', stop_lat: 28.574284, stop_lon: 77.065086 }, 
  120 : { stop_name: 'Dwarka Sector - 8', stop_lat: 28.565706, stop_lon: 77.064896 }, 
  121 : { stop_name: 'Dwarka Sector - 21', stop_lat: 28.552322, stop_lon: 77.056198 }, 
  122 : { stop_name: 'ITO', stop_lat: 28.627205, stop_lon: 77.240952 }, 
  123 : { stop_name: 'Janpath', stop_lat: 28.627817, stop_lon: 77.218956 }, 
  124 : { stop_name: 'Khan Market', stop_lat: 28.602682, stop_lon: 77.228096 }, 
  125 : { stop_name: 'Jawahar Lal Nehru Stadium', stop_lat: 28.590475, stop_lon: 77.23307 }, 
  126 : { stop_name: 'Jangpura', stop_lat: 28.583231, stop_lon: 77.239662 }, 
  127 : { stop_name: 'Lajpat Nagar', stop_lat: 28.570705, stop_lon: 77.233124 }, 
  128 : { stop_name: 'Moolchand', stop_lat: 28.564629, stop_lon: 77.234222 }, 
  129 : { stop_name: 'Kailash Colony', stop_lat: 28.554617, stop_lon: 77.239738 }, 
  130 : { stop_name: 'Nehru Place', stop_lat: 28.551134, stop_lon: 77.251511 }, 
  131 : { stop_name: 'Kalkaji Mandir', stop_lat: 28.549532, stop_lon: 77.258789 }, 
  132 : { stop_name: 'Govind Puri', stop_lat: 28.544413, stop_lon: 77.264259 }, 
  133 : { stop_name: 'Harkesh Nagar Okhla', stop_lat: 28.543194, stop_lon: 77.275955 }, 
  134 : { stop_name: 'Jasola-Apollo', stop_lat: 28.538084, stop_lon: 77.285538 }, 
  135 : { stop_name: 'Sarita Vihar', stop_lat: 28.528622, stop_lon: 77.288345 }, 
  136 : { stop_name: 'Mohan Estate', stop_lat: 28.51959, stop_lon: 77.294518 }, 
  137 : { stop_name: 'Tughlakabad Station', stop_lat: 28.502232, stop_lon: 77.29866 }, 
  138 : { stop_name: 'Badarpur Border', stop_lat: 28.4932, stop_lon: 77.30085 }, 
  139 : { stop_name: 'Sarai', stop_lat: 28.47794, stop_lon: 77.304932 }, 
  140 : { stop_name: 'NHPC Chowk', stop_lat: 28.462435, stop_lon: 77.305252 }, 
  141 : { stop_name: 'Mewala Maharajpur', stop_lat: 28.4485, stop_lon: 77.308098 }, 
  142 : { stop_name: 'Sector-28', stop_lat: 28.440586, stop_lon: 77.305992 }, 
  143 : { stop_name: 'Badkal Mor', stop_lat: 28.422707, stop_lon: 77.310234 }, 
  144 : { stop_name: 'Old Faridabad', stop_lat: 28.412172, stop_lon: 77.311272 }, 
  145 : { stop_name: 'Neelam Chowk Ajronda', stop_lat: 28.400707, stop_lon: 77.309105 }, 
  146 : { stop_name: 'Bata Chowk', stop_lat: 28.386362, stop_lon: 77.298782 }, 
  147 : { stop_name: 'Escorts Mujesar', stop_lat: 28.370199, stop_lon: 77.315002 }, 
  148 : { stop_name: 'Sikanderpur (Rapid Metro)', stop_lat: 28.480833, stop_lon: 77.094246 }, 
  149 : { stop_name: 'Phase 2 (Rapid Metro)', stop_lat: 28.488371, stop_lon: 77.092865 }, 
  150 : { stop_name: 'Belvedere Towers (Rapid Metro)', stop_lat: 28.492065, stop_lon: 77.088142 }, 
  151 : { stop_name: 'Cyber City (Rapid Metro)', stop_lat: 28.498478, stop_lon: 77.089088 }, 
  152 : { stop_name: 'Moulsari Avenue (Rapid Metro)', stop_lat: 28.501572, stop_lon: 77.094536 }, 
  153 : { stop_name: 'Phase 3 (Rapid Metro)', stop_lat: 28.494329, stop_lon: 77.093552 }, 
  154 : { stop_name: 'IGI Airport', stop_lat: 28.554869, stop_lon: 77.087921 }, 
  155 : { stop_name: 'Delhi Aerocity', stop_lat: 28.548792, stop_lon: 77.120743 }, 
  156 : { stop_name: 'Dhaula Kuan', stop_lat: 28.591776, stop_lon: 77.161545 }, 
  157 : { stop_name: 'Shivaji Stadium', stop_lat: 28.629007, stop_lon: 77.209213 }, 
  158 : { stop_name: 'Delhi Gate', stop_lat: 28.640488, stop_lon: 77.240303 }, 
  159 : { stop_name: 'Jama Masjid', stop_lat: 28.650393, stop_lon: 77.237556 }, 
  160 : { stop_name: 'Lal Quila', stop_lat: 28.657576, stop_lon: 77.236595 }, 
  161 : { stop_name: 'Okhla Bird Sanctuary', stop_lat: 28.552816, stop_lon: 77.321564 }, 
  162 : { stop_name: 'Kalindi Kunj', stop_lat: 28.542835, stop_lon: 77.310173 }, 
  163 : { stop_name: 'Jasola Vihar Shaheen Bagh', stop_lat: 28.546005, stop_lon: 77.296715 }, 
  164 : { stop_name: 'Okhla Vihar', stop_lat: 28.561255, stop_lon: 77.291916 }, 
  165 : { stop_name: 'Jamia Millia Islamia', stop_lat: 28.562944, stop_lon: 77.286209 }, 
  166 : { stop_name: 'Sukhdev Vihar', stop_lat: 28.559887, stop_lon: 77.275116 }, 
  167 : { stop_name: 'Okhla NSIC', stop_lat: 28.554575, stop_lon: 77.26487 }, 
  168 : { stop_name: 'Phase-I (Rapid Metro)', stop_lat: 28.471981, stop_lon: 77.094009 }, 
  169 : { stop_name: 'Sector 42-43 (Rapid Metro)', stop_lat: 28.458475, stop_lon: 77.09684 }, 
  170 : { stop_name: 'Sector 53-54 (Rapid Metro)', stop_lat: 28.447533, stop_lon: 77.100487 }, 
  171 : { stop_name: 'Sector 54 Chowk (Rapid Metro)', stop_lat: 28.434212, stop_lon: 77.104782 }, 
  172 : { stop_name: 'Sector 55-56 (Rapid Metro)', stop_lat: 28.424587, stop_lon: 77.105042 }, 
  173 : { stop_name: 'Majlis Park', stop_lat: 28.724157, stop_lon: 77.182068 }, 
  174 : { stop_name: 'Shalimar Bagh', stop_lat: 28.70182, stop_lon: 77.165184 }, 
  175 : { stop_name: 'Shakurpur', stop_lat: 28.685781, stop_lon: 77.149651 }, 
  176 : { stop_name: 'Punjabi Bagh West', stop_lat: 28.672747, stop_lon: 77.139183 }, 
  177 : { stop_name: 'ESI Basai Darapur', stop_lat: 28.658159, stop_lon: 77.127319 }, 
  178 : { stop_name: 'Mayapuri', stop_lat: 28.637098, stop_lon: 77.129738 }, 
  179 : { stop_name: 'Naraina Vihar', stop_lat: 28.624121, stop_lon: 77.136482 }, 
  180 : { stop_name: 'Delhi Cantt.', stop_lat: 28.608641, stop_lon: 77.140373 }, 
  181 : { stop_name: 'Durgabai Deshmukh South Campus', stop_lat: 28.589376, stop_lon: 77.169518 }, 
  182 : { stop_name: 'Nehru Enclave', stop_lat: 28.545856, stop_lon: 77.25116 }, 
  183 : { stop_name: 'Greater Kailash', stop_lat: 28.541836, stop_lon: 77.238243 }, 
  184 : { stop_name: 'Chirag Delhi', stop_lat: 28.541229, stop_lon: 77.229385 }, 
  185 : { stop_name: 'Panchsheel Park', stop_lat: 28.542339, stop_lon: 77.220512 }, 
  186 : { stop_name: 'IIT', stop_lat: 28.547194, stop_lon: 77.193832 }, 
  187 : { stop_name: 'RK Puram', stop_lat: 28.550486, stop_lon: 77.184952 }, 
  188 : { stop_name: 'Munirka', stop_lat: 28.557821, stop_lon: 77.174026 }, 
  189 : { stop_name: 'Vasant Vihar', stop_lat: 28.558378, stop_lon: 77.160774 }, 
  190 : { stop_name: 'Shankar Vihar', stop_lat: 28.560787, stop_lon: 77.140442 }, 
  191 : { stop_name: 'Terminal 1- IGI Airport', stop_lat: 28.565275, stop_lon: 77.122391 }, 
  192 : { stop_name: 'Sadar Bazar Contonment', stop_lat: 28.577108, stop_lon: 77.111305 }, 
  193 : { stop_name: 'Palam', stop_lat: 28.589067, stop_lon: 77.082954 }, 
  194 : { stop_name: 'Dashrath Puri', stop_lat: 28.602333, stop_lon: 77.08255 }, 
  195 : { stop_name: 'Dabri Mor - Janakpuri South', stop_lat: 28.615904, stop_lon: 77.085258 }, 
  196 : { stop_name: 'Mundka Industrial Area (M.I.A)', stop_lat: 28.68396, stop_lon: 76.989822 }, 
  197 : { stop_name: 'Ghevra Metro station', stop_lat: 28.685289, stop_lon: 76.993584 }, 
  198 : { stop_name: 'Tikri Kalan', stop_lat: 28.686899, stop_lon: 76.977249 }, 
  199 : { stop_name: 'Tikri Border', stop_lat: 28.687876, stop_lon: 76.963783 }, 
  200 : { stop_name: 'Pandit Shree Ram Sharma', stop_lat: 28.689213, stop_lon: 76.951088 }, 
  201 : { stop_name: 'Bahadurgarh City', stop_lat: 28.690784, stop_lon: 76.935265 }, 
  202 : { stop_name: 'Brigadier Hoshiyar Singh', stop_lat: 28.697428, stop_lon: 76.919128 }, 
  203 : { stop_name: 'Sir Vishweshwaraiah Moti Bagh', stop_lat: 28.578529, stop_lon: 77.175713 }, 
  204 : { stop_name: 'Bhikaji Cama Place', stop_lat: 28.570208, stop_lon: 77.187866 }, 
  205 : { stop_name: 'Sarojini Nagar', stop_lat: 28.570208, stop_lon: 77.187866 }, 
  206 : { stop_name: 'South Extension', stop_lat: 28.5686, stop_lon: 77.219818 }, 
  207 : { stop_name: 'Trilokpuri Sanjay Lake', stop_lat: 28.613506, stop_lon: 77.308678 }, 
  208 : { stop_name: 'East Vinod Nagar - Mayur Vihar-II', stop_lat: 28.620052, stop_lon: 77.305588 }, 
  209 : { stop_name: 'Mandawali - West Vinod Nagar', stop_lat: 28.624861, stop_lon: 77.304146 }, 
  210 : { stop_name: 'IP Extension', stop_lat: 28.631599, stop_lon: 77.310898 }, 
  211 : { stop_name: 'Karkarduma Court', stop_lat: 28.649473, stop_lon: 77.295341 }, 
  212 : { stop_name: 'Krishna Nagar', stop_lat: 28.65782, stop_lon: 77.290306 }, 
  213 : { stop_name: 'East Azad Nagar', stop_lat: 28.665043, stop_lon: 77.284599 }, 
  214 : { stop_name: 'Jafrabad', stop_lat: 28.682943, stop_lon: 77.27507 }, 
  215 : { stop_name: 'Maujpur - Babarpur', stop_lat: 28.692057, stop_lon: 77.280922 }, 
  216 : { stop_name: 'Gokulpuri', stop_lat: 28.703009, stop_lon: 77.286301 }, 
  217 : { stop_name: 'Johri Enclave', stop_lat: 28.713297, stop_lon: 77.290154 }, 
  218 : { stop_name: 'Shiv Vihar', stop_lat: 28.721863, stop_lon: 77.289635 }, 
  219 : { stop_name: 'Sant Surdas (Sihi)', stop_lat: 28.354666, stop_lon: 77.316261 }, 
  220 : { stop_name: 'Raja Nahar Singh', stop_lat: 28.339899, stop_lon: 77.331657 }, 
  221 : { stop_name: 'Vinobapuri', stop_lat: 28.566179, stop_lon: 77.249367 }, 
  222 : { stop_name: 'Ashram', stop_lat: 28.576065, stop_lon: 77.25753 }, 
  223 : { stop_name: 'Sarai Kale Khan - Nizamuddin', stop_lat: 28.5889, stop_lon: 77.253189 }, 
  224 : { stop_name: 'Mayur Vihar Pocket 1', stop_lat: 28.606598, stop_lon: 77.296326 }, 
  225 : { stop_name: 'Shaheed Sthal (New Bus Adda)', stop_lat: 28.670177, stop_lon: 77.416031 }, 
  226 : { stop_name: 'Hindon River', stop_lat: 28.673508, stop_lon: 77.40654 }, 
  227 : { stop_name: 'Arthala', stop_lat: 28.6772, stop_lon: 77.391876 }, 
  228 : { stop_name: 'Mohan Nagar', stop_lat: 28.67856, stop_lon: 77.384209 }, 
  229 : { stop_name: 'Shyam Park', stop_lat: 28.678217, stop_lon: 77.370911 }, 
  230 : { stop_name: 'Major Mohit Sharma Rajender Nagar', stop_lat: 28.678095, stop_lon: 77.359528 }, 
  231 : { stop_name: 'Raj Bagh', stop_lat: 28.677122, stop_lon: 77.346466 }, 
  232 : { stop_name: 'Shaheed Nagar', stop_lat: 28.676615, stop_lon: 77.333809 }, 
  233 : { stop_name: 'Noida Sec-34', stop_lat: 28.580229, stop_lon: 77.363518 }, 
  234 : { stop_name: 'Noida Sec-52', stop_lat: 28.586849, stop_lon: 77.372749 }, 
  235 : { stop_name: 'Noida Sec-61', stop_lat: 28.597677, stop_lon: 77.372368 }, 
  236 : { stop_name: 'Noida Sec-59', stop_lat: 28.609089, stop_lon: 77.372955 }, 
  237 : { stop_name: 'Noida Sec-62', stop_lat: 28.616991, stop_lon: 77.373611 }, 
  238 : { stop_name: 'Noida Electronic City', stop_lat: 28.628685, stop_lon: 77.375229 }, 
  239 : { stop_name: 'Nangli', stop_lat: 28.61722, stop_lon: 77.010345 }, 
  240 : { stop_name: 'Najafgarh', stop_lat: 28.613316, stop_lon: 76.986259 }, 
  241 : { stop_name: 'Dhansa Bus Stand', stop_lat: 28.611858, stop_lon: 76.975426 }, 
  500 : { stop_name: 'Noida Sector 51', stop_lat: 28.585548, stop_lon: 77.375374 }, 
  501 : { stop_name: 'Noida Sector 50', stop_lat: 28.574547, stop_lon: 77.378357 }, 
  502 : { stop_name: 'Noida Sector 76', stop_lat: 28.565445, stop_lon: 77.37973 }, 
  503 : { stop_name: 'Noida Sector 101', stop_lat: 28.556065, stop_lon: 77.385056 }, 
  504 : { stop_name: 'Noida Sector 81', stop_lat: 28.549259, stop_lon: 77.390099 }, 
  505 : { stop_name: 'NSEZ', stop_lat: 28.532248, stop_lon: 77.394951 }, 
  506 : { stop_name: 'Noida Sector 83', stop_lat: 28.522284, stop_lon: 77.396477 }, 
  507 : { stop_name: 'Noida Sector 137', stop_lat: 28.510817, stop_lon: 77.403625 }, 
  508 : { stop_name: 'Noida Sector 142', stop_lat: 28.498999, stop_lon: 77.412567 }, 
  509 : { stop_name: 'Noida Sector 143', stop_lat: 28.494246, stop_lon: 77.422318 }, 
  510 : { stop_name: 'Noida Sector 144', stop_lat: 28.486376, stop_lon: 77.432968 }, 
  511 : { stop_name: 'Noida Sector 145', stop_lat: 28.47913, stop_lon: 77.442307 }, 
  512 : { stop_name: 'Noida Sector 146', stop_lat: 28.468822, stop_lon: 77.455101 }, 
  513 : { stop_name: 'Noida Sector 147', stop_lat: 28.4594, stop_lon: 77.465965 }, 
  514 : { stop_name: 'Noida Sector 148', stop_lat: 28.448021, stop_lon: 77.476692 }, 
  515 : { stop_name: 'Knowledge Park', stop_lat: 28.456865, stop_lon: 77.500298 }, 
  516 : { stop_name: 'Pari Chowk', stop_lat: 28.463331, stop_lon: 77.508308 }, 
  517 : { stop_name: 'Alpha 1', stop_lat: 28.470879, stop_lon: 77.512718 }, 
  518 : { stop_name: 'Delta 1', stop_lat: 28.478374, stop_lon: 77.525581 }, 
  519 : { stop_name: 'GNIDA Office', stop_lat: 28.484531, stop_lon: 77.536621 }, 
  520 : { stop_name: 'Depot Station', stop_lat: 28.488651, stop_lon: 77.544075 }, 
};

export default stops_df;
