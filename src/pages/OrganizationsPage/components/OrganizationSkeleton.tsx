export function OrganizationSkeleton() {
  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-border-default border">
          <th className="border-border-default border-r px-4 py-3 font-medium">Organization Name</th>
          <th className="border-border-default border-r px-4 py-3 font-medium">Created Date</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 3 }, (_, index) => (
          <tr className="border-border-default border" key={index}>
            {Array.from({ length: 2 }, (_, index) => (
              <td className="px-4 py-3" key={index}>
                <div className="bg-text-secondary h-5 w-30 animate-pulse"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
