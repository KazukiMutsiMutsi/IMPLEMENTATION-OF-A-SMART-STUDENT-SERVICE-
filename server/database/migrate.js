/**
 * database/migrate.js
 * Creates all tables and seeds initial data.
 * Run once: node database/migrate.js
 */

require("dotenv").config();
const mysql  = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const env    = require("../config/env");

async function migrate() {
  // Connect without specifying a database first so we can CREATE it
  const conn = await mysql.createConnection({
    host:     env.DB_HOST,
    port:     env.DB_PORT,
    user:     env.DB_USER,
    password: env.DB_PASSWORD,
    multipleStatements: true,
  });

  console.log("✅  Connected to MySQL");

  // ── Create database ──────────────────────────────────────────
  await conn.query(
    `CREATE DATABASE IF NOT EXISTS \`${env.DB_NAME}\`
     CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  await conn.query(`USE \`${env.DB_NAME}\``);
  console.log(`✅  Using database: ${env.DB_NAME}`);

  // ── Create tables ────────────────────────────────────────────
  await conn.query(`
    CREATE TABLE IF NOT EXISTS students (
      id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      student_id      VARCHAR(12)  NOT NULL UNIQUE,
      password        VARCHAR(255) NOT NULL,
      full_name       VARCHAR(100) NOT NULL,
      course          VARCHAR(50)  NOT NULL,
      year_level      TINYINT UNSIGNED NOT NULL DEFAULT 1,
      semester        VARCHAR(50)  NOT NULL,
      email           VARCHAR(100) NOT NULL,
      device_token    TEXT         NULL,
      failed_attempts TINYINT UNSIGNED NOT NULL DEFAULT 0,
      locked_until    DATETIME     NULL,
      created_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS teachers (
      id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      teacher_id  VARCHAR(20)  NOT NULL UNIQUE,
      password    VARCHAR(255) NOT NULL,
      full_name   VARCHAR(100) NOT NULL,
      department  VARCHAR(100) NOT NULL,
      email       VARCHAR(100) NOT NULL,
      created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      admin_id   VARCHAR(20)  NOT NULL UNIQUE,
      password   VARCHAR(255) NOT NULL,
      full_name  VARCHAR(100) NOT NULL,
      role       VARCHAR(20)  NOT NULL DEFAULT 'admin',
      email      VARCHAR(100) NOT NULL,
      created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS subjects (
      id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      code           VARCHAR(20)  NOT NULL UNIQUE,
      name           VARCHAR(100) NOT NULL,
      units          TINYINT UNSIGNED NOT NULL DEFAULT 3,
      teacher_id     INT UNSIGNED NOT NULL,
      max_capacity   SMALLINT UNSIGNED NOT NULL DEFAULT 40,
      enrolled_count SMALLINT UNSIGNED NOT NULL DEFAULT 0,
      created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (teacher_id) REFERENCES teachers(id)
    )
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS enrollments (
      id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      student_id       VARCHAR(12)  NOT NULL,
      semester         VARCHAR(50)  NOT NULL,
      status           ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
      rejection_reason TEXT         NULL,
      admin_id         VARCHAR(20)  NULL,
      admin_timestamp  DATETIME     NULL,
      created_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uq_student_semester (student_id, semester),
      FOREIGN KEY (student_id) REFERENCES students(student_id)
    )
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS enrollment_subjects (
      enrollment_id INT UNSIGNED NOT NULL,
      subject_id    INT UNSIGNED NOT NULL,
      PRIMARY KEY (enrollment_id, subject_id),
      FOREIGN KEY (enrollment_id) REFERENCES enrollments(id) ON DELETE CASCADE,
      FOREIGN KEY (subject_id)    REFERENCES subjects(id)
    )
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS grades (
      id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      student_id VARCHAR(12)  NOT NULL,
      subject_id INT UNSIGNED NOT NULL,
      teacher_id INT UNSIGNED NOT NULL,
      percentage DECIMAL(5,2) NOT NULL,
      semester   VARCHAR(50)  NOT NULL,
      created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uq_grade (student_id, subject_id, semester),
      FOREIGN KEY (student_id) REFERENCES students(student_id),
      FOREIGN KEY (subject_id) REFERENCES subjects(id),
      FOREIGN KEY (teacher_id) REFERENCES teachers(id)
    )
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS attendance (
      id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      student_id     VARCHAR(12)  NOT NULL,
      subject_id     INT UNSIGNED NOT NULL,
      total_meetings SMALLINT UNSIGNED NOT NULL DEFAULT 0,
      days_present   SMALLINT UNSIGNED NOT NULL DEFAULT 0,
      semester       VARCHAR(50)  NOT NULL,
      created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uq_attendance (student_id, subject_id, semester),
      FOREIGN KEY (student_id) REFERENCES students(student_id),
      FOREIGN KEY (subject_id) REFERENCES subjects(id)
    )
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS payments (
      id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      student_id      VARCHAR(12)   NOT NULL,
      fee_item        VARCHAR(100)  NOT NULL,
      amount          DECIMAL(12,2) NOT NULL,
      status          ENUM('pending','verified') NOT NULL DEFAULT 'pending',
      paid_at         DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
      admin_id        VARCHAR(20)   NULL,
      admin_timestamp DATETIME      NULL,
      FOREIGN KEY (student_id) REFERENCES students(student_id)
    )
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS documents (
      id                    INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      reference_number      VARCHAR(30)  NOT NULL UNIQUE,
      student_id            VARCHAR(12)  NOT NULL,
      document_type         VARCHAR(60)  NOT NULL,
      purpose               TEXT         NOT NULL,
      copies                TINYINT UNSIGNED NOT NULL DEFAULT 1,
      status                ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
      rejection_reason      TEXT         NULL,
      expected_release_date DATE         NULL,
      admin_id              VARCHAR(20)  NULL,
      admin_timestamp       DATETIME     NULL,
      created_at            DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES students(student_id)
    )
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS notifications (
      id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      student_id VARCHAR(12)  NOT NULL,
      message    TEXT         NOT NULL,
      type       ENUM('enrollment','payment','document','system') NOT NULL,
      is_read    TINYINT(1)   NOT NULL DEFAULT 0,
      created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES students(student_id)
    )
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS audit_log (
      id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      admin_id          VARCHAR(20)  NOT NULL,
      action            VARCHAR(50)  NOT NULL,
      target_request_id INT UNSIGNED NOT NULL,
      created_at        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS enrollment_config (
      id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      active_semester VARCHAR(50)  NOT NULL,
      deadline        DATETIME     NOT NULL
    )
  `);

  console.log("✅  All tables created");

  // ── Seed data ────────────────────────────────────────────────
  // Teachers
  const teachers = [
    ["T001", await bcrypt.hash("teacher001", 10), "Dr. Rosa Mendoza",  "Computer Science", "r.mendoza@inform.edu"],
    ["T002", await bcrypt.hash("teacher002", 10), "Prof. Ben Aquino",  "Mathematics",       "b.aquino@inform.edu"],
    ["T003", await bcrypt.hash("teacher003", 10), "Ms. Clara Tan",     "English",           "c.tan@inform.edu"],
  ];
  for (const t of teachers) {
    await conn.query(
      `INSERT IGNORE INTO teachers (teacher_id, password, full_name, department, email)
       VALUES (?, ?, ?, ?, ?)`, t
    );
  }

  // Admins
  const admins = [
    ["ADMIN001", await bcrypt.hash("admin2024",    10), "Registrar Office", "admin", "registrar@inform.edu"],
    ["ADMIN002", await bcrypt.hash("cashier2024",  10), "Cashier Office",   "admin", "cashier@inform.edu"],
  ];
  for (const a of admins) {
    await conn.query(
      `INSERT IGNORE INTO admins (admin_id, password, full_name, role, email)
       VALUES (?, ?, ?, ?, ?)`, a
    );
  }

  // Students
  const students = [
    ["202400001", await bcrypt.hash("jamie123", 10), "Jamie Santos",    "BSCS", 2, "2nd Semester SY 2025-2026", "jamie.santos@student.inform.edu"],
    ["202400002", await bcrypt.hash("maria456", 10), "Maria Reyes",     "BSED", 1, "2nd Semester SY 2025-2026", "maria.reyes@student.inform.edu"],
    ["202400003", await bcrypt.hash("carlo789", 10), "Carlo Dela Cruz", "BSBA", 3, "2nd Semester SY 2025-2026", "carlo.delacruz@student.inform.edu"],
    ["202400004", await bcrypt.hash("ana2024",  10), "Ana Villanueva",  "BSN",  2, "2nd Semester SY 2025-2026", "ana.villanueva@student.inform.edu"],
    ["202400005", await bcrypt.hash("luis2024", 10), "Luis Fernandez",  "BSCS", 4, "2nd Semester SY 2025-2026", "luis.fernandez@student.inform.edu"],
  ];
  for (const s of students) {
    await conn.query(
      `INSERT IGNORE INTO students
         (student_id, password, full_name, course, year_level, semester, email)
       VALUES (?, ?, ?, ?, ?, ?, ?)`, s
    );
  }

  // Subjects (teacher IDs 1-3 from auto-increment)
  const subjects = [
    ["CS401",   "Software Engineering",  3, 1, 40, 38],
    ["CS402",   "Database Systems",      3, 1, 40, 40],
    ["MATH301", "Discrete Mathematics",  3, 2, 35, 20],
    ["ENG201",  "Technical Writing",     3, 3, 30, 15],
    ["CS403",   "Operating Systems",     3, 1, 40, 10],
    ["CS404",   "Computer Networks",     3, 1, 40,  5],
  ];
  for (const s of subjects) {
    await conn.query(
      `INSERT IGNORE INTO subjects (code, name, units, teacher_id, max_capacity, enrolled_count)
       VALUES (?, ?, ?, ?, ?, ?)`, s
    );
  }

  // Enrollment for student 202400001 (approved)
  await conn.query(
    `INSERT IGNORE INTO enrollments
       (id, student_id, semester, status, admin_id, admin_timestamp, created_at)
     VALUES (1, '202400001', '2nd Semester SY 2025-2026', 'approved',
             'ADMIN001', '2026-01-10 08:00:00', '2026-01-05 10:00:00')`
  );
  await conn.query(`INSERT IGNORE INTO enrollment_subjects VALUES (1,1),(1,3),(1,4)`);

  // Enrollment for student 202400002 (pending)
  await conn.query(
    `INSERT IGNORE INTO enrollments
       (id, student_id, semester, status, created_at)
     VALUES (2, '202400002', '2nd Semester SY 2025-2026', 'pending', '2026-01-06 09:30:00')`
  );
  await conn.query(`INSERT IGNORE INTO enrollment_subjects VALUES (2,3),(2,4)`);

  // Grades
  const grades = [
    ["202400001", 1, 1, 92.00, "2nd Semester SY 2025-2026"],
    ["202400001", 3, 2, 85.00, "2nd Semester SY 2025-2026"],
    ["202400001", 4, 3, 78.00, "2nd Semester SY 2025-2026"],
    ["202400003", 1, 1, 70.00, "2nd Semester SY 2025-2026"],
    ["202400003", 5, 1, 95.00, "2nd Semester SY 2025-2026"],
  ];
  for (const g of grades) {
    await conn.query(
      `INSERT IGNORE INTO grades (student_id, subject_id, teacher_id, percentage, semester)
       VALUES (?, ?, ?, ?, ?)`, g
    );
  }

  // Attendance
  const attendance = [
    ["202400001", 1, 20, 18, "2nd Semester SY 2025-2026"],
    ["202400001", 3, 20, 14, "2nd Semester SY 2025-2026"],
    ["202400001", 4, 20, 20, "2nd Semester SY 2025-2026"],
    ["202400003", 1, 20, 10, "2nd Semester SY 2025-2026"],
    ["202400003", 5, 20, 19, "2nd Semester SY 2025-2026"],
  ];
  for (const a of attendance) {
    await conn.query(
      `INSERT IGNORE INTO attendance (student_id, subject_id, total_meetings, days_present, semester)
       VALUES (?, ?, ?, ?, ?)`, a
    );
  }

  // Payments
  const payments = [
    [1, "202400001", "Tuition Fee",       15000, "verified", "2026-01-08 10:00:00", "ADMIN002", "2026-01-09 08:00:00"],
    [2, "202400001", "Miscellaneous Fee",  2500, "verified", "2026-01-08 10:05:00", "ADMIN002", "2026-01-09 08:05:00"],
    [3, "202400001", "Laboratory Fee",     1500, "pending",  "2026-05-20 14:00:00", null, null],
    [4, "202400003", "Tuition Fee",       15000, "pending",  "2026-05-19 09:00:00", null, null],
  ];
  for (const p of payments) {
    await conn.query(
      `INSERT IGNORE INTO payments
         (id, student_id, fee_item, amount, status, paid_at, admin_id, admin_timestamp)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, p
    );
  }

  // Documents
  await conn.query(`
    INSERT IGNORE INTO documents
      (id, reference_number, student_id, document_type, purpose, copies,
       status, expected_release_date, admin_id, admin_timestamp, created_at)
    VALUES
      (1, 'DOC-20260101-0001', '202400001', 'Certificate of Enrollment',
       'For scholarship application', 2, 'approved', '2026-01-15',
       'ADMIN001', '2026-01-12 10:00:00', '2026-01-10 09:00:00'),
      (2, 'DOC-20260520-0002', '202400001', 'Transcript of Records',
       'For job application', 1, 'pending', NULL,
       NULL, NULL, '2026-05-20 11:00:00')
  `);

  // Notifications
  await conn.query(`
    INSERT IGNORE INTO notifications
      (id, student_id, message, type, is_read, created_at)
    VALUES
      (1, '202400001',
       'Your enrollment for 2nd Semester SY 2025-2026 has been approved.',
       'enrollment', 1, '2026-01-10 08:01:00'),
      (2, '202400001',
       'Your payment of ₱15,000 (Tuition Fee) has been verified.',
       'payment', 1, '2026-01-09 08:01:00'),
      (3, '202400001',
       'Your document request (Certificate of Enrollment) has been approved. Expected release: January 15, 2026.',
       'document', 0, '2026-01-12 10:01:00')
  `);

  // Audit log
  await conn.query(`
    INSERT IGNORE INTO audit_log (id, admin_id, action, target_request_id, created_at)
    VALUES
      (1, 'ADMIN001', 'APPROVE_ENROLLMENT', 1, '2026-01-10 08:00:00'),
      (2, 'ADMIN002', 'VERIFY_PAYMENT',     1, '2026-01-09 08:00:00')
  `);

  // Enrollment config
  await conn.query(`
    INSERT IGNORE INTO enrollment_config (id, active_semester, deadline)
    VALUES (1, '2nd Semester SY 2025-2026', '2026-06-15 23:59:59')
  `);

  console.log("✅  Seed data inserted");
  console.log("🎉  Migration complete — database is ready.");

  await conn.end();
}

migrate().catch((err) => {
  console.error("❌  Migration failed:", err.message);
  process.exit(1);
});
