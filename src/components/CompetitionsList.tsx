import { Link } from "react-router-dom";

const CompetitionList = ({ competitions }: any) => {
  return (
    <ul>
      {competitions.map((comp: any) => (
        <li key={comp.id}>
          <Link to={`/competition/${comp.code}`}>
            {comp.name}
          </Link>

        </li>
      ))}
    </ul>
  );
};

export default CompetitionList;

