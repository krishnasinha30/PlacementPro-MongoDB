# PlacementPro – Student Placement & Recruitment Database

## Overview
PlacementPro is a MongoDB mini-project that models college placement activity. It stores student profiles, recruiter details, job openings, applications, and interview records.

## Tech Stack
- MongoDB
- MongoDB Shell (`mongosh`)
- JetBrains DataGrip
- NoSQL / BSON

## Database
- Database name: `placementpro`
- Collections: `students`, `companies`, `jobs`, `applications`, `interviews`

## Collection Details
| Collection | Purpose |
|---|---|
| `students` | Student names, roll numbers, departments, CGPA, skills, graduation year, and placement status |
| `companies` | Company/recruiter details, industry, location, website, and hiring status |
| `jobs` | Role, salary, location, required skills, minimum CGPA, and job type |
| `applications` | Student-to-job application tracking and application status |
| `interviews` | Interview round, date, outcome, and feedback |

## Features Practiced
- Create and use a MongoDB database and collections
- CRUD operations (insert, read, update, delete)
- Filtering with comparison operators
- Array queries for student skills
- AND / OR filters
- Sorting and projection
- Aggregation using `$group`, `$sum`, `$avg`, `$max`, `$min`, and `$sort`
- Joining related collections using `$lookup`
- Creating indexes
- Counting documents using `countDocuments()`
- Viewing collections and documents in DataGrip

## Example Queries

### Find students with CGPA above 8
```javascript
db.students.find({ cgpa: { $gt: 8 } })
```

### Find students who have Java in their skills
```javascript
db.students.find({ skills: "Java" })
```

### Find shortlisted applications
```javascript
db.applications.find({ status: "Shortlisted" })
```

### Count applications by status
```javascript
db.applications.aggregate([
  { $group: { _id: "$status", totalApplications: { $sum: 1 } } },
  { $sort: { totalApplications: -1 } }
])
```

### Calculate CGPA statistics
```javascript
db.students.aggregate([
  {
    $group: {
      _id: null,
      averageCGPA: { $avg: "$cgpa" },
      highestCGPA: { $max: "$cgpa" },
      lowestCGPA: { $min: "$cgpa" }
    }
  }
])
```

### Applications grouped by company
```javascript
db.applications.aggregate([
  { $group: { _id: "$companyName", totalApplications: { $sum: 1 } } },
  { $sort: { totalApplications: -1 } }
])
```

### Join students with their applications
```javascript
db.students.aggregate([
  {
    $lookup: {
      from: "applications",
      localField: "rollNo",
      foreignField: "studentRollNo",
      as: "studentApplications"
    }
  }
])
```

## Screenshots
Add project screenshots to the `screenshots/` folder:
- `01_students_data.png`
- `02_database_collections.png`
- `03_aggregation_results.png` (optional)

## Learning Outcomes
- Understanding document-oriented NoSQL databases
- Managing MongoDB collections and documents
- Querying, filtering, and analyzing data
- Using aggregation pipelines for summaries
- Combining collections with `$lookup`
- Exploring MongoDB through DataGrip

## Disclaimer
This project uses fictional sample data for learning and demonstration purposes.
