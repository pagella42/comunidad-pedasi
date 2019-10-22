
let data = [
    {
        "name": "Margaret Richardson",
        "phone": "+1 (967) 440-2684",
        "address": "879 Gallatin Place, Mansfield, Tennessee, 4635"
    },
    {
        "name": "Anastasia Horne",
        "phone": "+1 (873) 580-2749",
        "address": "884 Irving Street, Loomis, North Carolina, 2671"
    },
    {
        "name": "Flossie Tanner",
        "phone": "+1 (946) 476-3437",
        "address": "141 Lyme Avenue, Foxworth, Delaware, 5930"
    },
    {
        "name": "Jacklyn Mcclain",
        "phone": "+1 (940) 577-2955",
        "address": "128 Stuyvesant Avenue, Gallina, Florida, 5182"
    },
    {
        "name": "Giles Hurst",
        "phone": "+1 (832) 546-2211",
        "address": "487 Miller Place, Sandston, New Jersey, 6740"
    },
    {
        "name": "Molina Mccoy",
        "phone": "+1 (923) 439-2096",
        "address": "648 Dahlgreen Place, Wadsworth, Virgin Islands, 2435"
    },
    {
        "name": "Therese Jenkins",
        "phone": "+1 (856) 581-3173",
        "address": "578 Brighton Court, Sedley, Oklahoma, 9419"
    },
    {
        "name": "Wyatt Sargent",
        "phone": "+1 (902) 564-3937",
        "address": "226 Graham Avenue, Bluetown, Wyoming, 205"
    },
    {
        "name": "Dominique Cunningham",
        "phone": "+1 (984) 519-3280",
        "address": "434 Dahill Road, Felt, New York, 5211"
    },
    {
        "name": "Mcclure Webster",
        "phone": "+1 (992) 550-2384",
        "address": "913 Schaefer Street, Coventry, Illinois, 2838"
    },
    {
        "name": "Nell Chandler",
        "phone": "+1 (803) 435-2337",
        "address": "547 Woodrow Court, Benson, Kansas, 3664"
    },
    {
        "name": "Viola Harvey",
        "phone": "+1 (892) 443-2773",
        "address": "458 Seigel Court, Morningside, North Dakota, 3911"
    },
    {
        "name": "Tyler Cleveland",
        "phone": "+1 (927) 476-2722",
        "address": "497 Brooklyn Avenue, Elizaville, Guam, 8386"
    },
    {
        "name": "Janine Baird",
        "phone": "+1 (821) 542-3215",
        "address": "999 Harrison Place, Hoehne, Puerto Rico, 7357"
    },
    {
        "name": "George Gibbs",
        "phone": "+1 (959) 587-3446",
        "address": "716 Rutland Road, Orovada, Alabama, 685"
    },
    {
        "name": "Corrine Mejia",
        "phone": "+1 (939) 506-2776",
        "address": "159 Maple Street, Monument, Texas, 894"
    },
    {
        "name": "Katie Caldwell",
        "phone": "+1 (890) 493-2175",
        "address": "574 Bleecker Street, Yogaville, Palau, 6686"
    },
    {
        "name": "Francisca Sanchez",
        "phone": "+1 (934) 520-2096",
        "address": "584 Amboy Street, Deputy, Maine, 7019"
    },
    {
        "name": "Holmes Wilkerson",
        "phone": "+1 (906) 526-3142",
        "address": "716 Gunnison Court, Worton, Missouri, 3136"
    },
    {
        "name": "Isabella Kennedy",
        "phone": "+1 (819) 558-3440",
        "address": "750 Kane Place, Whitestone, Utah, 4432"
    },
    {
        "name": "Franks Knowles",
        "phone": "+1 (865) 456-2822",
        "address": "819 Stewart Street, Summertown, Washington, 8556"
    },
    {
        "name": "Campbell Wallace",
        "phone": "+1 (920) 579-2093",
        "address": "528 Gold Street, Yukon, California, 4519"
    },
    {
        "name": "Odonnell Santos",
        "phone": "+1 (851) 535-2343",
        "address": "688 Bergen Street, Harold, Kentucky, 7203"
    },
    {
        "name": "Luella Peters",
        "phone": "+1 (808) 596-2058",
        "address": "536 Wyona Street, Ernstville, Hawaii, 5772"
    },
    {
        "name": "Estella Cash",
        "phone": "+1 (855) 486-2306",
        "address": "222 Bridge Street, Blende, Ohio, 882"
    },
    {
        "name": "Stanton Clarke",
        "phone": "+1 (931) 480-3230",
        "address": "372 Bogart Street, Dexter, Rhode Island, 5261"
    }
]



console.log(Array.from(new Set(data.map(d => d.phone))))