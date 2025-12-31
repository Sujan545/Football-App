const AreaSelect = ({ areas, onSelect }: any) => {
  return (
    <select className="bg-red-500" onChange={e => onSelect(Number(e.target.value))}>
      <option value="">Select Area</option>

      {areas.map((area: any) => (
        <option key={area.id} value={area.id}>
          {area.name}
        </option>
      ))}
    </select>
  );
};

export default AreaSelect;
