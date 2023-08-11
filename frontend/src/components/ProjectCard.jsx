import React from "react";
import { Card } from "react-bootstrap";

function ProjectCard(props) {
  return (
    <Card className="project-card mb-3">
      <div className="project-card-header">
        <h5 className="project-title">{props.name}</h5>
        <p className="project-author"><strong>Author:</strong> {props.author}</p>
      </div>
      <Card.Body>
        <p className="project-description">{props.description}</p>
        <p className="project-members">
          <strong>Members {'=>'}</strong> {props.members.join(", ")}
        </p>
        {/* <Button variant="primary">Open Project</Button> */}
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
