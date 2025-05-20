-- Tạo các bảng
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    code VARCHAR(50)
);

CREATE TABLE academic_ranks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    code VARCHAR(50)
);

CREATE TABLE positions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    code VARCHAR(50)
);

CREATE TABLE lecturers (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255),
    department_id INT REFERENCES departments (id),
    academic_rank_id INT REFERENCES academic_ranks (id),
    position_id INT REFERENCES positions (id),
    score REAL
);

-- Thêm dữ liệu mẫu cho departments
INSERT INTO
    departments (name, code)
VALUES ('Công nghệ thông tin', 'CNTT'),
    ('Kinh tế', 'KT'),
    ('Luật', 'L'),
    ('Y dược', 'YD');

-- Thêm dữ liệu mẫu cho academic_ranks
INSERT INTO
    academic_ranks (name, code)
VALUES ('Giáo sư', 'GS'),
    ('Phó giáo sư', 'PGS'),
    ('Tiến sĩ', 'TS');

-- Thêm dữ liệu mẫu cho positions
INSERT INTO
    positions (name, code)
VALUES ('Trưởng khoa', 'TK'),
    ('Phó khoa', 'PK'),
    ('Giảng viên', 'GV');

-- Thêm dữ liệu giảng viên
INSERT INTO
    lecturers (
        full_name,
        department_id,
        academic_rank_id,
        position_id,
        score
    )
VALUES ('Nguyễn Văn A', 1, 1, 1, 8.5),
    ('Trần Thị B', 1, 2, 3, 7.0),
    ('Lê Văn C', 2, 3, 3, 6.2),
    ('Phạm Thị D', 3, 1, 2, 9.1),
    ('Nguyễn Thị E', 4, 2, 1, 8.8);

-- Truy vấn: trung bình điểm theo khoa
SELECT
    d.name AS department_name,
    ROUND(AVG(l.score), 2) AS average_score
FROM lecturers l
    JOIN departments d ON l.department_id = d.id
GROUP BY
    d.name
ORDER BY average_score DESC;

-- Truy vấn: số giảng viên theo học hàm
SELECT ar.name AS rank, COUNT(*) AS lecturer_count
FROM
    lecturers l
    JOIN academic_ranks ar ON l.academic_rank_id = ar.id
GROUP BY
    ar.name;

-- Truy vấn: giảng viên có điểm cao nhất theo khoa
SELECT
    d.name AS department_name,
    l.full_name,
    MAX(l.score) AS max_score
FROM lecturers l
    JOIN departments d ON l.department_id = d.id
GROUP BY
    d.name,
    l.full_name
ORDER BY max_score DESC;