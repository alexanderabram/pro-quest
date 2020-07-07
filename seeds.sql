USE missions;

INSERT INTO missions (name, description, owners, status, due)
VALUES ('Our First Mission', 'A Test Mission', 'Alex ', false, 1/10/2021);
INSERT INTO missions (name, description, owners, status, due)
VALUES ('Our 2 Mission', 'A Mission22', 'Alex ', false, 1/10/2021);

INSERT INTO quests (name, misId)
VALUES ('First Quest', 1);
INSERT INTO quests (name, misId)
VALUES ('2 Quest', 1);
INSERT INTO quests (name, misId)
VALUES ('3 Quest', 2);