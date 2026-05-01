import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function AchievementPopup({ isOpen, onClose, achievement }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Achievement Unlocked!">
      <div className="text-center p-4">
        <div className="text-6xl mb-4">🏆</div>
        <h3 className="text-2xl font-bold text-indigo-600 mb-2">{achievement?.name}</h3>
        <p className="text-gray-600 mb-6">{achievement?.description}</p>
        <Button onClick={onClose} className="w-full">Awesome!</Button>
      </div>
    </Modal>
  );
}
