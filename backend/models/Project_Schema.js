import mongoose  from "mongoose";

const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  teamMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProjectMember',
    },
  ],
  allocated: { 
      type: Number,
      default: 0,
  },
  status: {
    type: String,
    enum: ['Planning', 'In Progress', 'Completed', 'On Hold','Cancelled'],
    default: 'Planning',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model('Project', ProjectSchema);

export default Project;
