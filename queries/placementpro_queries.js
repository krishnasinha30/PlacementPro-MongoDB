// PlacementPro - MongoDB query reference
// Run in mongosh after switching to the placementpro database:
// use placementpro

// 1. List collections
show collections

// 2. CRUD / find examples
db.students.find()
db.students.find({ cgpa: { $gt: 8 } })
db.students.find({ skills: "Java" })
db.students.find({ skills: { $all: ["Java", "SQL"] } })
db.students.find({ skills: { $in: ["Java", "Python"] } })
db.students.find().sort({ cgpa: -1 })

// 3. Update example (Aarav CGPA)
db.students.updateOne({ rollNo: "STU101" }, { $set: { cgpa: 9.0 } })

// 4. Applications filters
db.applications.find({ status: "Shortlisted" })
db.applications.find({ status: "Selected" })
db.applications.find({
  $or: [
    { status: "Shortlisted" },
    { status: "Selected" }
  ]
})

// 5. Projection
db.students.aggregate([
  { $project: { _id: 0, name: 1, department: 1, cgpa: 1, placementStatus: 1 } }
])

// 6. Application count by status
db.applications.aggregate([
  { $group: { _id: "$status", totalApplications: { $sum: 1 } } },
  { $sort: { totalApplications: -1 } }
])

// 7. CGPA statistics
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

// 8. Company-wise application totals
db.applications.aggregate([
  { $group: { _id: "$companyName", totalApplications: { $sum: 1 } } },
  { $sort: { totalApplications: -1 } }
])

// 9. Join students to applications using roll number
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

// 10. Index on roll number
db.students.createIndex({ rollNo: 1 })
db.students.getIndexes()

// 11. Count documents in each collection
db.students.countDocuments()
db.companies.countDocuments()
db.jobs.countDocuments()
db.applications.countDocuments()
db.interviews.countDocuments()

// 12. Interview results summary
db.interviews.aggregate([
  { $group: { _id: "$result", totalInterviews: { $sum: 1 } } },
  { $sort: { totalInterviews: -1 } }
])
