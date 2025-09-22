INSERT INTO role(name) VALUES ('Standard user');
INSERT INTO day_status(name)
VALUES ('Workday'), ('Weekend'), ('Holiday'), ('Overtime'), ('Time off'), ('Sick day')
ON CONFLICT DO NOTHING;
