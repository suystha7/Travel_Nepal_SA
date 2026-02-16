interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string; // this will be HTML
}

const ViewModal = ({ isOpen, onClose, title, description }: ViewModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-wrapper">
      <div className="modal-header">
        <h2>{title}</h2>
        <button onClick={onClose}>Close</button>
      </div>

      {/* Render HTML safely */}
      <div className="modal-body" dangerouslySetInnerHTML={{ __html: description || '' }} />
    </div>
  );
};

export default ViewModal;
