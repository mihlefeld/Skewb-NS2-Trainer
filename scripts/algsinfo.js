const timesArrayKey = "skewbTimesArray";
const selectionArrayKey = "skewbSelection";

var preRotations = ['', 'y', 'y2', "y'", "x", "x y", "x y2", "x y'", "z'", "z' y", "z' y2", "z' y'", "z", "z y", "z y2", "z y'", "z2 y'", "z2", "x2", "z2 y"];

var selCases = [];

var algsGroups = { 
    "Pi + Swirl": [1, 2, 3, 4, 5, 6, 7, 8], 
    "Pi + Wat": [9, 10, 11, 12, 13, 14, 15, 16], 
    "Pi + X": [17, 18, 19, 20, 21, 22, 23, 24], 
    "Pi + HU": [25, 26, 27, 28, 29, 30, 31, 32], 
    "Pi + VU": [33, 34, 35, 36], 
    "Pi + O": [37, 38, 39, 40, 41, 42, 43, 44], 
    "Pi + Z Conj": [45, 46, 47, 48, 49, 50, 51, 52], 
    "Pi + Triple Sledge": [53, 54], 
    "Pi + H/Z": [55, 56, 57], 
    "Peanut + Swirl": [58, 59, 60, 61, 62, 63, 64, 65], 
    "Peanut + Wat": [66, 67, 68, 69, 70, 71, 72, 73], 
    "Peanut + X": [74, 75, 76, 77, 78, 79, 80, 81], 
    "Peanut + HU": [82, 83, 84, 85, 86, 87, 88, 89], 
    "Peanut + VU": [90, 91, 92, 93], 
    "Peanut + O": [94, 95, 96, 97, 98, 99, 100, 101], 
    "Peanut + Z Conj": [102, 103, 104, 105, 106, 107, 108, 109], 
    "Peanut + Triple Sledge": [110, 111, 112, 113], 
    "Peanut + H/Z/Pure": [114, 115, 116, 117],
     "L4C": [118, 119, 120, 121, 122, 123, 124, 125], 
     "L5C": [126, 127, 128, 129, 130, 131] 
    };

var optionalGroups = [];

var optionalAlgsCount = 0;

var algsInfo = {
    "1": {
        "name": "1a",
        "a": [
            "H y S y' H y H",
            "H y H y' S y H",
            "x r' R r' R' B' r' B' r B ",
            "y' x r' R r R' z' R r' R r z R r' R' r'",
            "y x R b' r' R' r z B' r B",
            "y x r' R r' R' r' R r R z R r R' b' ",
            "R r' z' r' z r' R r' R r"
        ],
        "s": "L' R' U R' B R U L'"
    },
    "2": {
        "name": "1b",
        "a": [
            "y' S y' H y S y' S ",
            "y' S y' S y S y' H ",
            "y2 x r' B R r R' B r' B'",
            "x r' R r R r' R' r z' r' R r R' B' ",
            "y x r' R r R z2 r' R r R' z' R r' R' r'",
            "y2 x R r R' r' R r R z' r' R' r B",
            "b' r l r l' r b' l'",
            "y2 x R r' R r R r' R' r' z' r' R' r B"
        ],
        "s": "R L U' L B' L' U' R"
    },
    "3": {
        "name": "2a",
        "a": [
            "y2 S y' S y H y' S ",
            "y2 H y' S y S y' S ",
            "y2 x r B R' B' r R r R' r' R r ",
            "y' x b' r' R r R' z' R r' R' r R r R'",
            "y2 x b' r' R r R r' R' r z r B r' B'",
            "y' x r' B' r z r' R r b R'",
            "z' r' R' r R' r b r R'",
            "z' r' R' r R' r z' r R f'"
        ],
        "s": "R B' U' B' R B' R B"
    },
    "4": {
        "name": "2b",
        "a": [
            "y H y' H y S y' H",
            "y S y' H y H y' H",
            "x R b R' z' R r' R' B' r",
            "x z R' r' R' r z R r R' r z' r' R r R'",
            "y2 x B' r' R r R z R r R' r' R' r R'",
            "y x B R r' R' r' R r R' r' B' r B"
        ],
        "s": "L' B U B L' B L' B'"
    },
    "5": {
        "name": "1c",
        "a": [
            "S y S y' S y H",
            "S y H y' S y H",
            "y' x R r' R' z' r' R' r B R/R2' B' R",
            "x y2 r' R r R b' r R' b'",
            "y x R r' R r R' B R' B' r' R' r R",
            "y' x r B' b' r' B' r B b"
        ],
        "s": "U' B' R' U R B' L B"
    },
    "6": {
        "name": "1d",
        "a": [
            "y' H y' H y H y' S ",
            "y' H y' S y H y' H ",
            "x r' R r z R r R' z' r' R' r R'",
            "y x R' r' R' r z R r' R' r' R r R'",
            "y x' R r' R' r' B R' r B"
        ],
        "s": "U B L U' L' B R' B'"
    },
    "7": {
        "name": "2c",
        "a": [
            "y2 S y' H y H y' H",
            "y2 H y' H y S y' H",
            "x r' R r' R' z' r' R r B R B'",
            "y2 x R' r' B' r B R r B'",
            "y2 b R r' b R' r' R' r"
        ],
        "s": "R L' U' B' L' U R U"
    },
    "8": {
        "name": "2d",
        "a": [
            "y H y S y' S y S",
            "y S y S y' H y S",
            "y' x R r' R r B R' B' r' R' r",
            "x b r B r' B' z' r' R' b",
            "y2 z B' b' R r' b r B r'",
            "x2 y B' r' R B' r R r R'"
        ],
        "s": "L R B' R L U' R' B'"
    },
    "9": {
        "name": "3a",
        "a": [
            "y' S y2 H y' S y' S",
            "x r2' R r B R r' R B",
            "y' x R B R' B' R' r' R r R r' R' r",
            "y x r' R r R' r' R' r R B R B' R'",
            "B' r' l r' l' B' r' b'"
        ],
        "s": "U R U L R B' R L"
    },
    "10": {
        "name": "3b",
        "a": [
            "y2 S y2 H y H y S",
            "x B' R' B' r' R' B R' r'",
            "y x R' r' R r R B R' B' R' B R B'",
            "y2 x R r R' r' R' z' r' R r z R r'",
            "y x B R' B' R B R B' R' r' R' r R",
            "y2 x R r' R r' R r R B R' B' r",
            "r' R' B' r' R' r z2 R' r'"
        ],
        "s": "U L R' U B R L R"
    },
    "11": {
        "name": "4a",
        "a": [
            "y S z S y2 S",
            "x r' R' r B R' B' R' r' R r R'",
            "y2 x r2'/r R' r B r' z r R' r' R' r"
        ],
        "s": "U L' U R' L U' L R B' R'"
    },
    "12": {
        "name": "4b",
        "a": [
            "y2 H z' S y2 S",
            "y x r' R r R B' r' R' r B R'",
            "y' x R2'/R B' r' R r B R' r' R' r",
            "x B R B' r' R r R B R' B' R",
            "y' x R r' R' r R r' R r B R' B' R'"
        ],
        "s": "U B L' R U' R L R' L' R'"
    },
    "13": {
        "name": "3c",
        "a": [
            "y S y2 H y' H y' S",
            "y S y S y H y2 S",
            "x r' R' r R' z' r2'/r R' r B r' R",
            "y' x R r' R' r R' r' R r z r R r' R'",
            "y x B R B' R' r' R' r R r' R r R'",
            "y' x R' r R r' R' r R' r' z R r' R'"
        ],
        "s": "L U L' B' U' L' B' R L'"
    },
    "14": {
        "name": "3d",
        "a": [
            "y2 S y2 H y S y S",
            "H y' H y' S y2 H",
            "x r' R r R' r R r' R' z' R' r' R r",
            "x r R' r' R r R' z' R B r' R r",
            "y' x r' R' r R z R r R' r' R r' R' r"
        ],
        "s": "R' U L' B' R' U' R' L R"
    },
    "15": {
        "name": "4c",
        "a": [
            "y H z S y2 S",
            "y' x R r' R r z R r' R' r R r R'",
            "y2 x r' R r R B R' B' R' r' R' r R",
            "x R r' R' r' R r R' z' r' R' r R'"
        ],
        "s": "U L' U L' B' L' R U' B'"
    },
    "16": {
        "name": "4d",
        "a": [
            "y2 S z' S y2 S",
            "y x R r' R ' r' z' r' R r R z R r R' r'",
            "y' x r' R r R r' R' r B R B' R",
            "y x R' B R' B' r' R r R' r' R' r"
        ],
        "s": "U' R U' R B R L' U B"
    },
    "17": {
        "name": "5a",
        "a": [
            "y2 S y S S S",
            "x' S y2 S z2 x' H",
            "x z' r' R z' r' R r z r R r' R",
            "x R' r' R r R z B R' B' R r'",
            "x z' r' R' r B r' R r z R r' R r"
        ],
        "s": "U L U R' L U B' U' L"
    },
    "18": {
        "name": "5b",
        "a": [
            "y H y' S S S",
            "z y' S y2 S x z2 S",
            "y x b' r' R r R' z2 r' R' r R' ",
            "y2 x R r' B R' B' R' r' R r'",
            "r R' r B x r' l r l' r"
        ],
        "s": "U B L U' L U R U' R'"
    },
    "19": {
        "name": "6a",
        "a": [
            "y H y2 x' S y2 S",
            "y x R r' R r z2 R r' R' r b ",
            "y x R r' R r z B R' B' R r/r2'",
            "x r2' R' r z r R r R' b r'"
        ],
        "s": "U B L' B' L' B R' U' R'"
    },
    "20": {
        "name": "6b",
        "a": [
            "y2 S z2 x' S y2 S",
            "y' x R' r R' r' z' r' R' r z R' r ",
            "y2 x r' R r' R' z2 r' R r R' B'"
        ],
        "s": "U L B' L' B R U B' R"
    },
    "21": {
        "name": "5c",
        "a": [
            "y2 H y S S S",
            "x' S y2 S z2 x' S",
            "y' x r' R r' R' r' R r R' z' R r' R r",
            "x r' R' r R' z2 r' R r R' b'",
            "y' x R r R' r R r' R' r z' r' R r",
            "x b' R r' R r R' b' R' r' R' r"
        ],
        "s": "U R' B' R' U' L B' R U'"
    },
    "22": {
        "name": "5d",
        "a": [
            "y S y' S S S",
            "z y' S y2 S y2 x' H",
            "x r' R' r R' r' R r R' B R' B' ",
            "x z R r R' z' R r z' r' R' r B",
            "x R r' R r R r' R' r z r' R r' R'",
            "y' x B r' R r' R' r B r R r R'"
        ],
        "s": "U R L' R' B R' B' U' B'"
    },
    "23": {
        "name": "6c",
        "a": [
            "y S y2 z' S y2 S",
            "y' x B' r' R r R' z2 r' R r' R'",
            "x r' R r R' z' R' r' R r R B R' B' ",
            "y2 x B R B' R r' R' r R r' R r"
        ],
        "s": "B R U' B R' B' L U B"
    },
    "24": {
        "name": "6d",
        "a": [
            "y2 H z2 x' S y2 S",
            "y x r B R' B' R r z' r' R r",
            "x z R r' R' r R B R' B' R' r' R r",
            "x z r R' B r z' r2' R r B' R'",
            "y2 r' R' r z r' R r R' r2/r' R r' R'"
        ],
        "s": "B L' U B' U L R B R'"
    },
    "25": {
        "name": "7a",
        "a": [
            "y S S z2 x' S y2 S",
            "y' x B r' R r' R' r B r'"
        ],
        "s": "U R U L' R B R L"
    },
    "26": {
        "name": "7b",
        "a": [
            "y S S z' S y2 S",
            "y2 x r' z R r' R r z r' B' r",
            "y x b' R r' R r R' b' R"
        ],
        "s": "U' B U R' U' L U' R"
    },
    "27": {
        "name": "7c",
        "a": [
            "y' S S y2 z' S y2 S",
            "y' x r B' r' R r R' r B'"
        ],
        "s": "U R' B' R' U' L' U' L'"
    },
    "28": {
        "name": "7d",
        "a": [
            "S S z S y2 S",
            "y2 x B' r z R r' R' r z' B' r",
            "y z' r' R r B' r' b B' l"
        ],
        "s": "U' L R' L U L' B' L"
    },
    "29": {
        "name": "8a",
        "a": [
            "S y' S y' S",
            "x R' r R' B b r' R r' ",
            "y2 x r' R r B R' B' R' r' R' r R'"
        ],
        "s": "L U' L U' R' L U' B"
    },
    "30": {
        "name": "8b",
        "a": [
            "S y' H y' S",
            "x R' r B R' B' r2' R' r",
            "y x r' B R B' z' r' R r B'",
            "y' x B R' B r' R' r B R'",
            "y' x r' R r R z' r' R' r B r' R r ."
        ],
        "s": "U R' L' U R B' R U'"
    },
    "31": {
        "name": "8c",
        "a": [
            "S y H y S",
            "H y H y H",
            "x r/r2' R' r b' B' R r' R",
            "y2 x R r' R' z' r' R r R z R r R' r"
        ],
        "s": "L' R U L' R L' B L'"
    },
    "32": {
        "name": "8d",
        "a": [
            "S y S y S",
            "H y S y H",
            "y x R/ R2' B' r' R r z R' r R'",
            "x B r' R' r z B R' B' r",
            "y2 x r' R r'/r2 B R B' r' R"
        ],
        "s": "B U' R L' U' B R L'"
    },
    "33": {
        "name": "9a",
        "a": [
            "y2 S S y' S y2 S",
            "y' S y2 S y S S",
            "y' x B' r' R r R B' R' r' R' r B' ",
            "y' x R r R' r B r' z' r' R r R' b",
            "y' r' R r B' R B r' R' r R'",
            "r' l r l' r' R' F r' R r",
            "y x R r' R r z r' R r R' z' R r' R' r R "
        ],
        "s": "U B' L B' R' B R' B' U R"
    },
    "34": {
        "name": "9b",
        "a": [
            "y S S y' S y2 S",
            "S y2 S y' S S",
            "y' x B r' R r z R r' R' r R' r'",
            "x z r B R' B' z' r' R' r B",
            "y2 x r' B R' B' r' R r R' r R",
            "y2 x B' r' R r z B R B' r'",
            "x z' r' R r z R' r B r' R B",
            "x R' r' R r' R' r x' r B r' R"
        ],
        "s": "L' R' B U B U L' B'"
    },
    "35": {
        "name": "10a",
        "a": [
            "S y2 H",
            "x z r B r B' r' B' ",
            "y' z' B R r R' B' R'"
        ],
        "s": "L B R B' L' B'"
    },
    "36": {
        "name": "10b",
        "a": [
            "y2 H y2 S",
            "x B' r' B' r B r",
            "x B' r' y' r' R r b"
        ],
        "s": "R' B' R' L U R"
    },
    "37": {
        "name": "11a",
        "a": [
            "y2 H y' S y2 S",
            "y' x R r' R' r' R r R' z' r' R r"
        ],
        "s": "U' B' U R' L' B' L R' L"
    },
    "38": {
        "name": "11b",
        "a": [
            "y S y S y2 S",
            "",
            "x r' R r R r' R' r z R r' R'"
        ],
        "s": "U B U' L R B R' L R'"
    },
    "39": {
        "name": "12a",
        "a": [
            "y2 S y2 S y S",
            "y S y' x' S y2 S",
            "y' x r' R' r z R r' R' r R r R'",
            "y' x r' R' r B' R z R r R' r' R",
            "y2 x R r' R' r b r' R r R' z' R r' R'"
        ],
        "s": "B U L' R' L R B L' U"
    },
    "40": {
        "name": "12b",
        "a": [
            "y S y2 S y' H",
            "y2 H y x S y2 S",
            "y x B R B' r' R r R' r' R' r",
            "y2 x R r' z r R r R' z2 r' R r"
        ],
        "s": "B R' L R' L' R' B L' B'"
    },
    "41": {
        "name": "11c",
        "a": [
            "y2 S y' S y2 S (Cancel)",
            "",
            "y x r/r2' R' r B r' R B"
        ],
        "s": "B' L' R U' R' L U'"
    },
    "42": {
        "name": "11d",
        "a": [
            "y H y S y2 S",
            "y H y H y2 H (Cancel)",
            "y2 x R' r R' z' r' B R' r'"
        ],
        "s": "B R L' U L R' U"
    },
    "43": {
        "name": "12c",
        "a": [
            "y2 S y2 S y H ",
            "y H z' y' S y2 S",
            "x B' R' r B' r' R r'"
        ],
        "s": "U L' U B U' L R"
    },
    "44": {
        "name": "12d",
        "a": [
            "y S y2 S y S",
            "y2 S x z' S y2 S",
            "x r R B' r B R' B"
        ],
        "s": "U' R U' B' U R' L'"
    },
    "45": {
        "name": "13a",
        "a": [
            "H x' z S y2 S",
            "y x r' R' r' R' z' r' R r R B' ",
            "y x r' R' r B' r' R r B "
        ],
        "s": "B' U' L' R U R' L U"
    },
    "46": {
        "name": "13b",
        "a": [
            "y' S x' z S y2 S",
            "y' x B R B' r B R' B' r' ",
            "y' r B r' R r B' r' R'"
        ],
        "s": "B U R L' U' L R' U'"
    },
    "47": {
        "name": "13c",
        "a": [
            "H x' z S y2 S",
            "x r B R B' r' B R' B'"
        ],
        "s": "U L U' R L B' U' L'"
    },
    "48": {
        "name": "13d",
        "a": [
            "y' S x' z S y2 S",
            "x B' r' R' r B r' R r"
        ],
        "s": "U' R' U L' R' B U R"
    },
    "49": {
        "name": "14a",
        "a": [
            "y' S y' S y H (Cancel)",
            "y' H y' S y S",
            "x R' r' R' r R r' R' r R r' R r ",
            "x z R' r' R r B' r' R' r B R",
            "y x r R r R' r' R r' R' r R r' R'",
            "y x r' R' z' r' R r z R r R r R' r",
            "y' z R r R' r' R r R r' R' r R' r'"
        ],
        "s": "L' U' R L' R U R B'"
    },
    "50": {
        "name": "14b",
        "a": [
            "y S y' H y H  (Cancel)",
            "y H y' H y S",
            "y x R' B' r' R r B r' R' r R",
            "y2 x B R' B' r' R r R' z' R r' R' r B"
        ],
        "s": "L U' R' U' B L' U B"
    },
    "51": {
        "name": "14c",
        "a": [
            "y' H y H y' S (Cancel)",
            "y' S y H y' H",
            "y2 x r R r R' r' R' r R r R' r' R r",
            "y2 x R' r' R r' R' r R r' R r R' r",
            "y z r' R' r R r' R' r' R r R' r R "
        ],
        "s": "R U L' U R' L' B' R"
    },
    "52": {
        "name": "14d",
        "a": [
            "y H y S y' S (Cancel)",
            "y S y S y' H",
            "y' x R r R' B R B' R r2' R r ",
            "x R r R' r R r' R' r R r' R' r'",
            "y2 x r z r R' B r' R' r' z' r",
            "y x R r' R r R r B R B' r' R'",
            "y' z R' r' R r' R' r R r R' r' R r"
        ],
        "s": "R' L B L U' B L' R'"
    },
    "53": {
        "name": "15a",
        "a": [
            "S S z S S S ",
            "x r' R r R r' z' r' R r z r R r'",
            "x R r' R' r' R B R' B' R' r' R",
            "y2 x R r R' B' R r' R' r R r R' B' "
        ],
        "s": "U B U R L U B' U B' L"
    },
    "54": {
        "name": "15b",
        "a": [
            "z' S S z' S S S",
            "x r R' r' z' r' R' r z r R' r' R' r",
            "x R' r' R r z r b r' R r R' z' R r' R",
            "y2 x b' r' R r R r' R' r b' r' R r",
            "y2 x r B r' B' r' R r R' r B r' B' "
        ],
        "s": "U B' U R' U' L R L B' L'"
    },
    "55": {
        "name": "16",
        "a": [
            "y' S y2 S y2 S",
            "y S y2 S y2 H",
            "x r B R B' r2' R r R",
            "y2 x R' r' R' r'/r2 B R' B' r'",
            "y x B' r' R' r B'/B2 R' B' R' ",
            "y' x R/R2' B R B/ B2' r' R r B"
        ],
        "s": "U L U R L' U R B"
    },
    "56": {
        "name": "17a",
        "a": [
            "y S y' H y H y' S y H",
            "y2 x r' R' r R B R' B' r' R r",
            "x r' R' r B R B' R' r' R r"
        ],
        "s": "U L U' R U' B' R L U' B'"
    },
    "57": {
        "name": "17b",
        "a": [
            "y S y H y' H y S y' H",
            "y2 x R r R' r' z' r' R r z R r' R'",
            "y x R r2' R' r B r' R r' R' r B",
            "x R r R' z' r' R' r R z R r' R'",
            "x r' R r R' z' r' R r' R' z' r' R r R",
            "y' x r R r R' z R r' R' r b r' R r R'",
            "y x R r' R' r b' r' R r R' z' R r' R' r'"
        ],
        "s": "U B' R B U' L' R' B L' R"
    },
    "58": {
        "name": "18a",
        "a": [
            "H y H y' H y H (Cancel)",
            "S y' H x z S y2 S",
            "y2 H y H x S y2 S (Cancel)",
            "y x b' r' R r R' z' R r' R' r'",
            "y' x R' r' R' r z' r' R r R' B'"
        ],
        "s": "U R B U' L U B' U R'"
    },
    "59": {
        "name": "18b",
        "a": [
            "y' S y' S y S y' S (Cancel)",
            "y' H y S x' z S y2 S",
            "y S y' S z' S y2 S (Cancel)",
            "x r/r2' R r R' z R r' R' r b",
            "y2 x B R r' R' r z r' R r R"
        ],
        "s": "U L' U L' U' R' U' L' R"
    },
    "60": {
        "name": "18c",
        "a": [
            "y2 S y' H y S y' H ",
            "S y' H x z S y2 S",
            "y2 H y H x S y2 S (Cancel)",
            "x R r' R r z R r' R' r'",
            "y2 x B' R r' R' r' z' r' R' r b",
            "y x B' r' R' r B r' R' r R'"
        ],
        "s": "B U L U' R' L' R B'"
    },
    "61": {
        "name": "18d",
        "a": [
            "y H y S y' H y S",
            "y' H y S z S y2 S",
            "y S y' S x' z S y2 S (Cancel)",
            "x z r' R r' R' z' r' R r R",
            "y x b r' R r z r R r R' B'"
        ],
        "s": "B' U' R' U L R L' B"
    },
    "62": {
        "name": "18e",
        "a": [
            "S y S y' S y S (Cancel)",
            "y2 S y S z S y2 S",
            "H y' S x z S y2 S",
            "y' x B r' R r R' z R r' R r",
            "y' x R r' R r R' z' R r' R' r B'"
        ],
        "s": "U R' L B R' U L' B'"
    },
    "63": {
        "name": "18f",
        "a": [
            "y' H y' H y H y' H (Cancel)",
            "y H y' H z' S y2 S",
            "y' S y H x' z S y2 S",
            "y2 x B r' R r R' z R r' R' r R'",
            "x r' R' r R' z' R r' R' r B'"
        ],
        "s": "U B R' U L' U' R B'"
    },
    "64": {
        "name": "18g",
        "a": [
            "y2 H y' S y H y' S",
            "H y' S z' S y2 S",
            "y2 S y' S x' z S y2 S",
            "x R' r' R' r z R r R' r",
            "y x r' R' r' R' z' r' R r B' R",
            "x B R r' R' r' z' r' R' r b'"
        ],
        "s": "B' L R' L' U' R U B"
    },
    "65": {
        "name": "18h",
        "a": [
            "y S y H y' S y H ",
            "y H y' H x' z S y2 S",
            "y' S y H z S y2 S",
            "x z r R r R' z' r' R' r R'",
            "y2 x R r' R r' R' z' r' R r R B'",
            "y' x b' r' R r z r R r R' B"
        ],
        "s": "B R' L R U L' U' B'"
    },
    "66": {
        "name": "19a",
        "a": [
            "y' H y S z' S y2 S",
            "y2 S y2 S y' H y' H",
            "S y S y S y2 S",
            "y' x r/r2' R r R' B R' B' R' r R' ",
            "x z' R r' z r2' R r R' z' R r' R' r'"
        ],
        "s": "U R L R U R' U R' L'"
    },
    "67": {
        "name": "19b",
        "a": [
            "S y' H z S y2 S",
            "y S y2 S y S y S",
            "y' H y' H y' S y2 S",
            "y2 x r' R r z R r R' z R r' R' r b",
            "y2 x b' r' R r R' z' R r' R' z' r' R' r",
            "x R' r' R' r z' r' R r z r R' r"
        ],
        "s": "U' L' R' L' U' L U' L R"
    },
    "68": {
        "name": "19c",
        "a": [
            "y S y' S z S y2 S",
            "y2 S y2 S y S y H",
            "S y' H y' S y2 S",
            "x r2' R r R' z' r' R r",
            "y' x r' R' r B R' B' R' ",
            "x r R r R' z y R' r R",
            "x R' r B R' B' r' R'"
        ],
        "s": "U' L' R U L' R' L'"
    },
    "69": {
        "name": "19d",
        "a": [
            "y2 H y' H z' S y2 S",
            "y S y2 S y' H y' S",
            "y' H y S y S y2 S",
            "x R r R' z' r' R r R",
            "y' x R' r' R' r B R' B'",
            "y x r' R' z' r' R' r B R' ",
            "y' r R' z' r' R r B R "
        ],
        "s": "U L' B' R B L U"
    },
    "70": {
        "name": "19e",
        "a": [
            "y' S y H z' S y2 S",
            "y2 S y2 S y' S y' S (Cancel)",
            "H y H y S y2 S",
            "y x B' R r R' r' R r R' B' r ",
            "y2 x b r' R' r z2 r' R r b'",
            "y2 B l' B' l r' y r R r'",
            "y r R' r' y' r l' B R r'",
            "y r R' r' y' r l' B l B'"
        ],
        "s": "U L' U' L R' B U B'"
    },
    "71": {
        "name": "19f",
        "a": [
            "H y' S z S y2 S",
            "y S y2 S y H y H (Cancel)",
            "S y' S y' S y2 S",
            "y r' R r b' B z' R' r' R",
            "x z' B' R r R' z2 R r' R' B",
            "y2 B' r B r' l y r' R' r"
        ],
        "s": "U' R U R' L B' U' B"
    },
    "72": {
        "name": "19g",
        "a": [
            "y H y' H z S y2 S",
            "y2 S y2 S y H y S",
            "H y S y' S y2 S",
            "x z R' r' R r z r R r R' r",
            "x r' R r' R' r' z' r' R' r R  "
        ],
        "s": "L' R' L U L R L U' L"
    },
    "73": {
        "name": "19h",
        "a": [
            "y2 S y S z' S y2 S",
            "y S y2 S y' S y' H ",
            "S y H y S y2 S",
            "x r R r' R' z' R' r' R' r R'",
            "y' x R r' R r R z R r R' r' "
        ],
        "s": "L B' U L U B L R' L'"
    },
    "74": {
        "name": "20a",
        "a": [
            "y S y' S (Cancel)",
            "x r' R r R' z' r' R r R'"
        ],
        "s": "B L' U' B L R' B U'"
    },
    "75": {
        "name": "20b",
        "a": [
            "S y S",
            "x r' R r R' z r' R r R'"
        ],
        "s": "U L' U' B' L' U' L"
    },
    "76": {
        "name": "20c",
        "a": [
            "y2 H y H (Cancel)",
            "x R r' R' r z R r' R' r"
        ],
        "s": "U R' B L' B' L B R'"
    },
    "77": {
        "name": "20d",
        "a": [
            "y' H y' H",
            "y x r' B r' R r R' r2 B"
        ],
        "s": "L' B L B' R' U R L'"
    },
    "78": {
        "name": "20e",
        "a": [
            "S y' H",
            "y2 x B' R r' R' r z r' R r"
        ],
        "s": "U' L' R B' R B R' L"
    },
    "79": {
        "name": "20f",
        "a": [
            "y S y H",
            "y' x r' R' r z' r' R r R' B "
        ],
        "s": "R' B U L' R B' L' U"
    },
    "80": {
        "name": "20g",
        "a": [
            "y' H y S",
            "y x b r' R r R' z' R r' R' ",
            "y x R' r' R r R' z' R r' R' r B"
        ],
        "s": "U B U' R L' R' U B'"
    },
    "81": {
        "name": "20h",
        "a": [
            "y2 H y' S",
            "x R r R' z R r' R' r b'",
            "x B' r' R r R' z R r' R' r R"
        ],
        "s": "L B' U' R L' B R U'"
    },
    "82": {
        "name": "21a",
        "a": [
            "y H y H y S (cancel)",
            "y x b' r' R r R z' r' B' r B r'",
            "y' x R r' R' z' r' R r z r R r' R' r' R r R'"
        ],
        "s": "R' L R L U' L' U L'"
    },
    "83": {
        "name": "21b",
        "a": [
            "y H y' S y' S (cancel)",
            "y' x R r R' z R r' R' r z' r2' R r R'",
            "x z R r R r' R' r' z' r' R r B' ",
            "y2 x B r' R r R z R r R' B R' B'"
        ],
        "s": "R B' L B R' L' R' L"
    },
    "84": {
        "name": "21c",
        "a": [
            "y2 S y' S y' H (cancel)",
            "x B' r R' r' B r R r'",
            "x B' r' B r B' z r' R' r z' r'",
            "x r' R z R r' z' r' R' r' R' r R' B"
        ],
        "s": "L R' L' R' U R U' R"
    },
    "85": {
        "name": "21d",
        "a": [
            "y2 S y H y H (cancel)",
            "x r' R' r' R r R B R' B' r",
            "x r' R' r z' r' R r R' z R' r' R' r",
            "y x b' R r' R' r' z' r' R' r z' r' R r",
            "y2 x r R' r' B' r R r' B"
        ],
        "s": "L' B R' B' L R L R'"
    },
    "86": {
        "name": "21e",
        "a": [
            "y' S y' H y' H",
            "y x R' r R' r' z' r' R' r z r R'",
            "y2 x R r R' B R B' r' R r R r'",
            "y2 x R r R' r' R' z' r' R' r B R"
        ],
        "s": "B R L U' R B' U' L R"
    },
    "87": {
        "name": "21f",
        "a": [
            "y' S y S y H",
            "y' x R r' z' r' R r z r R r' R",
            "x r' R' z' r' R r z R r R r' R'"
        ],
        "s": "U R L' B R U B' U' R"
    },
    "88": {
        "name": "21g",
        "a": [
            "H y S y S",
            "x R' B' R r' y' r' R' z' R r R'",
            "x R' r' R' r B R' B' R r' R' r",
            "y2 x r/r2' R' r z r R r R' r' z' r"
        ],
        "s": "B' L' R' U L' B U R' L'"
    },
    "89": {
        "name": "21h",
        "a": [
            "H y' H y' S",
            "x r' R B R' B' R' r' R r'",
            "y2 x r' R r R' r' R' z' r' R' r B R'"
        ],
        "s": "U' L' R B' L' U' B U L'"
    },
    "90": {
        "name": "22a",
        "a": [
            "x2 r R r' R' z R r' R' r",
            "x r R' r' R r R B R' B' r'",
            "x z2 r B R B' R' r' R' r R r'"
        ],
        "s": "U B U' B' R B' R' B"
    },
    "91": {
        "name": "22b",
        "a": [
            "y' R' r' R r z' r' R r R'",
            "x B' R B R' B' R' r' R r B ",
            "x z2 B' r' R' r R B R B' R' B"
        ],
        "s": "U B' R' L R' L' R B"
    },
    "92": {
        "name": "22c",
        "a": [
            "y' x R' r' z' r' R r z r R r'",
            "y r' R' r R z' R r' R' r",
            "y x r R' r' z r' R' r z r R"
        ],
        "s": "U' R' U B L B' U' R"
    },
    "93": {
        "name": "22d",
        "a": [
            "x r R z R r' R' z' R' r' R",
            "y r R r' R' x r' R r R'",
            "z2 R r R' r' z r' R r R'"
        ],
        "s": "U L U' B' R' B U L'"
    },
    "94": {
        "name": "23a",
        "a": [
            "y2 H y' H y2 S ",
            "x z r R r' R' z' R' r' R r"
        ],
        "s": "L' U' L B U L U' B'"
    },
    "95": {
        "name": "23b",
        "a": [
            "y S y S y2 H",
            "x R' r' R r z r R r' R'",
            "y2 x B r R' r' B' r R r'"
        ],
        "s": "R U R' B' U' R' U B"
    },
    "96": {
        "name": "23c",
        "a": [
            "y H y H y2 S (cancel)",
            "x r' R' r R z R r R' r'"
        ],
        "s": "B U L' U' B' L' U L"
    },
    "97": {
        "name": "23d",
        "a": [
            "y2 S y' S y2 H (cancel)",
            "x z R r R' r' z' r' R' r R"
        ],
        "s": "B' U' R U B R U' R'"
    },
    "98": {
        "name": "23e",
        "a": [
            "S y H y2 S",
            "y' R r R B R' B' R' r'",
            "x z2 r R r R' r' R' z' r' R' r B"
        ],
        "s": "U L R B U' R' L' B'"
    },
    "99": {
        "name": "23f",
        "a": [
            "y' H y' S y2 H",
            "y x B' r' R r R' z/z3' R' r' R r R",
            "y x R B' r' B' r B r B R' B'",
            "y r R B R B' R' r' R'",
            "x2 r' R' z' R' r' R r z r R"
        ],
        "s": "B L R U B' R' L' U'"
    },
    "100": {
        "name": "23g",
        "a": [
            "H y S y2 H",
            "y2 x b r' R r R' z' R r2'/r R' r ",
            "y' z' r' R' r l' r' R r R",
            "y x r B' r' R r R' r z r' R' r"
        ],
        "s": "U' R' U' L U L' U R"
    },
    "101": {
        "name": "23h",
        "a": [
            "y' S y' H y2 S",
            "y r' R' r' R r z' r' R r",
            "",
            "y x r' R r' R' z R r' R' r b'"
        ],
        "s": "U L U R' U' R U' L'"
    },
    "102": {
        "name": "24a",
        "a": [
            "y' S y' H y S",
            "x z R r R' r' R r R' r z' r' R r"
        ],
        "s": "R' U R' L U L U R' L"
    },
    "103": {
        "name": "24b",
        "a": [
            "H y S y' H",
            "x r' R' r R r' R' r R' z R r' R'",
            "x R B R' B' r' R' r R r' R' r R ",
            "y x B r' R r' R' r B z' r' R' r",
            "y' x R' r' R' r' z' r' R' r R r' R' r B'",
            "x z2 R r R' r' R r R' z' R r' R' r R'"
        ],
        "s": "L U' L R' U' R' U' L R'"
    },
    "104": {
        "name": "24c",
        "a": [
            "y' H y' S y H",
            "x r' R' r R' z R r' R' r R r' R'",
            "x r' B R' B' R B R' B' R' r' R' r'",
            "x z2 r/r2' R r z B r' B' z' r' R' r' z' r "
        ],
        "s": "L' R U' L' U' L' R U' R"
    },
    "105": {
        "name": "24d",
        "a": [
            "S y H y' S",
            "y' x R r' R r R' z R r' R' r R r' R'",
            "y x R r R' r z' r' R r R' r' R r",
            "x B r' R r R' r' R r z r R r.R"
        ],
        "s": "R L' U R U R L' U L'"
    },
    "106": {
        "name": "25a",
        "a": [
            "y2 S y' S y S",
            "y' x r' R' r' z' r' R' r R r' R' r B",
            "y2 x r R r R' r' R r R' z' R r' R' r R ",
            "x z' r B r' R' r B r' R r' B'"
        ],
        "s": "R' L U B U B R' U' B"
    },
    "107": {
        "name": "25b",
        "a": [
            "y' S y S y' S",
            "y2 x r B R' B' R B R' B' R' r' R' "
        ],
        "s": "U L' B' R L U L R L'"
    },
    "108": {
        "name": "25c",
        "a": [
            "y H y H y' H",
            "y' x b' R r R' r' R r R' r z' r' R r'"
        ],
        "s": "L R' U' B' U' B' L U B'"
    },
    "109": {
        "name": "25d",
        "a": [
            "H y' H y H",
            "y2 x B' r' R r R' r' R r z r R r",
            "x z r' R r R' z' b' r' R r R' z' R r' R' r'"
        ],
        "s": "U' R B L' R' L' B' R' L"
    },
    "110": {
        "name": "26a",
        "a": [
            "S y' S S (Cancel)",
            "S y H H",
            "x r' R r R' z R r' R' r R r' R' r"
        ],
        "s": "U' B' L U R U L U' L"
    },
    "111": {
        "name": "26b",
        "a": [
            "y2 S S y' S (Cancel)",
            "S y' H H ",
            "x r R r' R' r B R' B' R' r' R'",
            "x B r' R r R z R r R' r' R r R"
        ],
        "s": "U B L' R' L R B R' B"
    },
    "112": {
        "name": "26c",
        "a": [
            "y' H y H H (Cancel)",
            "y2 S S y H",
            "x R r' R' r z R r' R' r R r' R' r"
        ],
        "s": "U B' U' B' R' L B' U L'"
    },
    "113": {
        "name": "26d",
        "a": [
            "y2 H y S S ",
            "y H H y H (Cancel)",
            "x z' r' B R' B' R' r' R' r R r' R' r'"
        ],
        "s": "U B R' U' L' U' R' U R'"
    },
    "114": {
        "name": "27",
        "a": [
            "y' S S y' S S (cancel)",
            "y2 S S y S S",
            "y2 B r' R r R' B' z' R r' R' r",
            "y2 x r' R' z' r B r' R r y' r' R' r",
            "x z' B' r' R r R' B' z2 R r' R' r b'",
            "y' x r' R F' r' R r y2 z' r' R r R'",
            "y x B r' R' r B r' R r f' R B' R'",
            "x z r B R' B' R z2 B r' R r R' B"
        ],
        "s": "U B U' L U L' B' L U' L'"
    },
    "115": {
        "name": "28",
        "a": [
            "r' R' r z Sledge z' Hedge R",
            "S y' S S y' S y2 S (cancel)",
            "x z' r' R' r z r' R r R' r z' r' R' r R",
            "x z R' r' R r R' z R r' R' r z' r' R r",
            "x z r' R r x R r' R z R r' R' r",
            "x R r' R' x' r' R r z' r' R r R'",
            "x z r R' r' R r R' z' R r' R r B",
            "y2 x r B R B' R r' R r R' r' R"
        ],
        "s": "U B U' L U' B L' R B"
    },
    "116": {
        "name": "29a",
        "a": [
            "r' R' r Hedge z' Hedge B",
            "y' S y' S y' H ",
            "y x r' R' r R r' R' r' z' r' R' r B",
            "y x r R r' R' z' r' R' r z r' R r' R'",
            "x z' B' r' R r R z R r R' r' R r",
            "x z2 R r R' r' R r R z R r R' b'",
            "x r' R' r R' B R' B' r' R' r R",
            "x z R r R' r z' r' R r z R r R' r'",
            "x z2 R' r' R r B R B' R r' R r"
        ],
        "s": "U B' L B U L U' R' U' L'"
    },
    "117": {
        "name": "29b",
        "a": [
            "y S y' H y S y' H y H (Cancel)",
            "x R r' R r' R' z' r' R r B' R",
            "y' r' R r y' r l B r' l B'",
            "y z' r' R' r y z' r' R r b r' R' r"
        ],
        "s": "B U' B' L' R' U' L R' U"
    },
    "118": {
        "name": "30a",
        "a": [
            "Setup to triple sledge (Cancel)",
            "y2 x R r R' B' r' B' r B",
            "y2 x r B r' z' b' r' R' r b",
            "y2 x B' r' B r B R r' R'",
            "y' x R' r' R' r b z r B r' z' b' R",
            "y' x R' r' B' r B R r R' B' "
        ],
        "s": "U B L' B' R' B' L B"
    },
    "119": {
        "name": "30b",
        "a": [
            "Setup to triple sledge (Cancel)",
            "x z' r' R' r b z r B r' z' b' ",
            "x B' r B r' B' z' r' R' r b'",
            "y x B r' B' z' r' R' r b R",
            "y' x R r R' r' R r R' r2 R r R' r'",
            "x B r B' r' B' z' r' R r",
            "y2 x r R' B' r' B' r B R",
            "x z' r' B' r B R r R' B' "
        ],
        "s": "U' B' L' B R B L B'"
    },
    "120": {
        "name": "31",
        "a": [
            "S S S",
            "y2 x b' r' R' r b z r B r' ",
            "y2 x b z r B r' B' z' r' R' r",
            "x z2 B R r R' B' r' B' r",
            "x z2 B' r' B' r B R r R'",
            "y' x R' B' r' B' r B R r",
            "y x r B R r R' B' r' B' "
        ],
        "s": "U B R B U' B' L' B'"
    },
    "121": {
        "name": "U-Perm",
        "a": [
            "y' x S y2 S",
            "y x b' r' R r R' z2 r' R r ",
            "y x' r' R' r z2 R r' R' r b"
        ],
        "s": "U B' U' B L R' U' R"
    },
    "122": {
        "name": "32",
        "a": [
            "y R L' U' L U L R L' R   ",
            "y x r' B r' B' z' r' R' r z B r'",
            "y x r/r2' B' r B R r R' B' r",
            "y x R2' B' r' B' r B R r R",
            "x r' B' r' B' r B R r R r",
            "y r l' B' l B l r l' r   ",
            "z r2' R' r b z r B r' z' b' r"
        ],
        "s": "U B' L' B R B L B' U"
    },
    "123": {
        "name": "33",
        "a": [
            "S y2 H y2 S",
            "r2'/r R' r R' b' r2'/r B' r ",
            "r/r2' R' r R' x' B' R r' B",
            "r R' r R' y L' l L' l",
            "x r' R r R' B' r' B' r B r",
            "x R r' B' r B R r R' B' R'"
        ],
        "s": "U B' U B' L' R B' L"
    },
    "124": {
        "name": "34a",
        "a": [
            "Setup to U Perm",
            "x b r' R r R' z2 r' R r R"
        ],
        "s": "U' L U' L' R B U' B' U'"
    },
    "125": {
        "name": "34b",
        "a": [
            "Setup to U perm",
            "x B' r' R r R' z2 r' R r R' r ",
            "y x R' r' R' r z2 R r' R' r b'"
        ],
        "s": "U L' R B U' B' U L U"
    },
    "126": {
        "name": "35a",
        "a": [
            "y' S y2 S x z' S y2 S",
            "y' x r' R r R' r R y' r' R r B' r",
            "y' x b R r' b r R' b' r R' r' ",
            "y x r' R r R' b' R r' R r R' b' R"
        ],
        "s": "U' B U' B L B U' R U' R'"
    },
    "127": {
        "name": "35b",
        "a": [
            "S y2 S z' y' S y2 S",
            "y2 x R r' R' r B r' R r' R' r B r'",
            "x r B' r' R r R' r B' r' R r R'",
            "y x B' r' R r R' r R y' r' R r B' r'",
            "x z R r' b z' R B' r' R B' R' r "
        ],
        "s": "U B' U B' R' B' U L' U L"
    },
    "128": {
        "name": "36a",
        "a": [
            "S y2 S y S y2 S",
            "H y2 H y H y2 H (cancel)",
            "y' x r' R' r B r' R r' R' r B r' R",
            "y x R' r B r' R r' R' r B r' R r'",
            "y x r' R r R' r B' r' R r R' r B'"
        ],
        "s": "U' L U' R' B' R U' R B R"
    },
    "129": {
        "name": "36b",
        "a": [
            "y' S y2 S y' S y2 S (cancel)",
            "S y2 S x' z S y2 S",
            "y' x B r' R r' R' r B r' R r' R' r",
            "x B' r' R' r B r' R r z' r' R r R'",
            "y' x B r' R r R' r R y' r' R r B'",
            "y2 x r' R r R' r z2 r' R r' R' r B r'"
        ],
        "s": "U R' U L B L' U L' B' L'"
    },
    "130": {
        "name": "37a",
        "a": [
            "H y H y' S y S (Cancel)",
            "S y S y' H y H (Cancel)",
            "x B' r' R r R' r B' r' R r R' r",
            "y' x r' R' r B r' R r z' r' R r R' z' r' ",
            "y2 x R r' R r R' z' r2' R' r B r' R"
        ],
        "s": "U B' L' B' U B' U R U R'"
    },
    "131": {
        "name": "37b",
        "a": [
            "y' S y' H y H y' S (Cancel)",
            "y' H y' H y S y' S (Cancel)",
            "x r B r' R r' R' r B r' R r' R'",
            "y2 x r' R r' R' r B r' R r' R' r B ",
            "x r' R r z' r B' R r' R' B' r"
        ],
        "s": "U L' B' R L U' R B L' R'"
    }
};