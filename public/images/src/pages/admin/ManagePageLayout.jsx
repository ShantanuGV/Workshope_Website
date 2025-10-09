import './ManagePageLayout.css';

export function ManagePageLayout({ title, children }) {
  return (
    <div className="manage-page">
      <div className="manage-page-header">
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
