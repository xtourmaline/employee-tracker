INSERT INTO department (name)                      -- IDs
VALUES ("LOL Team"),                               -- 1
       ("Wild Rift Team"),                         -- 2
       ("TFT Team"),                               -- 3
       ("Valorant Team");                          -- 4

INSERT INTO role (title, salary, department_id)
VALUES ("LOL Team Lead",            120000, 1),    -- 1
       ("LOL Champion Balancing",   10,     1),    -- 2
       ("LOL Splash Art and Music", 75000,  1),    -- 3
       ("LOL Play Testers",         5,      1),    -- 4
       ("Wild Rift Team Lead",      50000,  2),    -- 5
       ("Wild Rift Game Design",    23000,  2),    -- 6
       ("Wild Rift Play Tester",    38000,  2),    -- 7
       ("TFT Team Lead",            70000,  3),    -- 8
       ("TFT Champie Design",       60000,  3),    -- 9
       ("TFT Emote Design",         50000,  3),    -- 10
       ("TFT Balancing",            46000,  3),    -- 11
       ("Valorant Team Lead",       100000, 4),    -- 12
       ("Valorant Agent Design",    70000,  4),    -- 13
       ("Valorant Art and Music",   80000,  4),    -- 14
       ("Valorant Balancing",       20,     4);    -- 15

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Irelia",       "Xan",          1,  NULL), -- 1
       ("Riot",         "Phreak",       2,  1),    -- 2
       ("Hwei",         "Lukai",        3,  1),    -- 3
       ("Viego",        "Santiarul",    4,  2),    -- 4
       ("Garen",        "Crownguard",   5,  NULL), -- 5
       ("Sylas",        "Dregbourne",   6,  5),    -- 6
       ("Lux",          "Crownguard",   7,  6),    -- 7
       ("Poro",         "Freljord",     8,  NULL), -- 8
       ("Duck",         "Bill",         9,  8),    -- 9
       ("Sau",          "Na",           10, 9),    -- 10
       ("Fuwa",         "Pig",          11, 8),    -- 11
       ("Ling Ying",    "Wei",          12, NULL), -- 12
       ("Zyanya",       "Mondragon",    13, 12),   -- 13
       ("Sabine",       "Callas",       14, 12),   -- 14
       ("Jamie",        "Adeyemi",      15, 12);   -- 15