import mongoose  from "mongoose";

const projectMemberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_no: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'team_member',
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }
})

const ProjectMember = mongoose.model('ProjectMember', projectMemberSchema);

export default ProjectMember;