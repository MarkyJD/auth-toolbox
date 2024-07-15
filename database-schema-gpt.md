To add the ability to delete a job, we should consider soft deletion instead of hard deletion to maintain data integrity and historical records. Soft deletion can be implemented by adding a `deleted_at` column to the `jobs` table. This column will store a timestamp when the job is deleted, and a NULL value will indicate that the job is active.

Here's the updated schema:

### Updated Schema with Soft Deletion

#### `users`

- `id` (Primary Key, UUID, auto-generated)
- `name` (String)
- `email` (String, unique)
- `password_hash` (String)
- `created_at` (Timestamp, default to current timestamp)
- `updated_at` (Timestamp, default to current timestamp)

#### `departments`

- `id` (Primary Key, UUID, auto-generated)
- `name` (String, unique)
- `created_at` (Timestamp, default to current timestamp)
- `updated_at` (Timestamp, default to current timestamp)

#### `locations`

- `id` (Primary Key, UUID, auto-generated)
- `name` (String, unique)
- `type` (Enum: 'site', 'unit', 'safari_tent', 'playroom', 'pool', 'camp_kitchen', etc.)
- `description` (Text)
- `created_at` (Timestamp, default to current timestamp)
- `updated_at` (Timestamp, default to current timestamp)

#### `jobs`

- `id` (Primary Key, UUID, auto-generated)
- `title` (String)
- `description` (Text)
- `priority` (Enum: 'high', 'medium', 'low')
- `status` (Enum: 'open', 'in_progress', 'closed')
- `created_by` (Foreign Key to `users.id`)
- `department_id` (Foreign Key to `departments.id`)
- `location_id` (Foreign Key to `locations.id`)
- `created_at` (Timestamp, default to current timestamp)
- `updated_at` (Timestamp, default to current timestamp)
- `deleted_at` (Timestamp, nullable)

#### `job_comments`

- `id` (Primary Key, UUID, auto-generated)
- `job_id` (Foreign Key to `jobs.id`)
- `comment` (Text)
- `created_by` (Foreign Key to `users.id`)
- `created_at` (Timestamp, default to current timestamp)

#### `job_attachments`

- `id` (Primary Key, UUID, auto-generated)
- `job_id` (Foreign Key to `jobs.id`)
- `file_path` (String)
- `created_at` (Timestamp, default to current timestamp)

### Schema

#### users

| Column        | Type      | Constraints                  |
| ------------- | --------- | ---------------------------- |
| id            | UUID      | Primary Key, auto-generated  |
| name          | String    | Not null                     |
| email         | String    | Unique, not null             |
| password_hash | String    | Not null                     |
| created_at    | Timestamp | Default to current timestamp |
| updated_at    | Timestamp | Default to current timestamp |

#### departments

| Column     | Type      | Constraints                  |
| ---------- | --------- | ---------------------------- |
| id         | UUID      | Primary Key, auto-generated  |
| name       | String    | Unique, not null             |
| created_at | Timestamp | Default to current timestamp |
| updated_at | Timestamp | Default to current timestamp |

#### locations

| Column      | Type      | Constraints                                                                       |
| ----------- | --------- | --------------------------------------------------------------------------------- |
| id          | UUID      | Primary Key, auto-generated                                                       |
| name        | String    | Unique, not null                                                                  |
| type        | Enum      | 'site', 'unit', 'safari_tent', 'playroom', 'pool', 'camp_kitchen', etc., not null |
| description | Text      |                                                                                   |
| created_at  | Timestamp | Default to current timestamp                                                      |
| updated_at  | Timestamp | Default to current timestamp                                                      |

#### jobs

| Column        | Type      | Constraints                               |
| ------------- | --------- | ----------------------------------------- |
| id            | UUID      | Primary Key, auto-generated               |
| title         | String    | Not null                                  |
| description   | Text      |                                           |
| priority      | Enum      | 'high', 'medium', 'low', not null         |
| status        | Enum      | 'open', 'in_progress', 'closed', not null |
| created_by    | UUID      | Foreign Key to users.id, not null         |
| department_id | UUID      | Foreign Key to departments.id, not null   |
| location_id   | UUID      | Foreign Key to locations.id, not null     |
| created_at    | Timestamp | Default to current timestamp              |
| updated_at    | Timestamp | Default to current timestamp              |
| deleted_at    | Timestamp | Nullable                                  |

#### job_comments

| Column     | Type      | Constraints                       |
| ---------- | --------- | --------------------------------- |
| id         | UUID      | Primary Key, auto-generated       |
| job_id     | UUID      | Foreign Key to jobs.id, not null  |
| comment    | Text      | Not null                          |
| created_by | UUID      | Foreign Key to users.id, not null |
| created_at | Timestamp | Default to current timestamp      |

#### job_attachments

| Column     | Type      | Constraints                      |
| ---------- | --------- | -------------------------------- |
| id         | UUID      | Primary Key, auto-generated      |
| job_id     | UUID      | Foreign Key to jobs.id, not null |
| file_path  | String    | Not null                         |
| created_at | Timestamp | Default to current timestamp     |

### Considerations

1. **Soft Deletion**: The `deleted_at` column in the `jobs` table allows you to mark jobs as deleted without removing them from the database. This preserves the job history and maintains data integrity.
2. **Queries**: When querying active jobs, ensure to filter out jobs where `deleted_at` is not NULL. For example, `SELECT * FROM jobs WHERE deleted_at IS NULL`.
3. **Auditing**: The `locations` table combined with the `location_id` foreign key in the `jobs` table allows for tracking job history by location. Soft deletion helps maintain a complete history for auditing purposes.
