import Recorder from './Recorder';
import { useAudioTranscription, useRecordingState, useTranscribeUI, useRecordingActions } from "./hooks.ts";
import SaveModal from '../Save/SavePopup.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { addSession } from '../../store/sessionsSlice';
import { clearSelectedSession } from '../../store/transcribeViewSlice';

const Transcribe: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedSessionId = useSelector((state: RootState) => state.transcribeView.selectedSessionId);
  const sessions = useSelector((state: RootState) => state.sessions);
  const selectedSession = selectedSessionId ? sessions.find((s) => s.id === selectedSessionId) : null;

  const { postAudio, transcription } = useAudioTranscription();
  const { record, handleStartRecording, handleStopRecording } = useRecordingState();
  const {
    enableSave,
    enableDelete,
    recordingName,
    setRecordingName,
    openSaveModal,
    setOpenSaveModal,
    setIsEditing,
    enableSaveOrDelete,
    disableSaveOrDelete,
    onDelete,
    onSave,
  } = useTranscribeUI();
  const { onData, onStop } = useRecordingActions(postAudio);

  const handleSaveSession = (data: { title: string; description: string; date: string }) => {
    dispatch(addSession({
      title: data.title,
      description: data.description,
      date: data.date,
      transcribedText: transcription ?? '',
    }));
    setOpenSaveModal(false);
    disableSaveOrDelete();
    setRecordingName('untitled recording');
  };

  const handleRecordingStop = () => {
    handleStopRecording();
    enableSaveOrDelete();
  };

  const handleStartRecordingWithClear = () => {
    dispatch(clearSelectedSession());
    handleStartRecording();
  };

  const displayText = selectedSession ? selectedSession.transcribedText : (enableSave && enableDelete ? (transcription ?? 'loading...') : '');

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden min-w-[450px] max-w-[520px] h-[60vh]">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/80 px-4 py-3">
        <input
          placeholder={selectedSession ? undefined : 'Untitled recording'}
          value={selectedSession ? selectedSession.title : recordingName}
          readOnly={!!selectedSession}
          onChange={(e) => !selectedSession && setRecordingName(e.target.value)}
          onFocus={() => !selectedSession && setIsEditing(true)}
          className="flex-1 bg-transparent text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none"
        />
        {!selectedSession && (
          <button
            type="button"
            onClick={() => document.querySelector('input')?.focus()}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
            aria-label="Edit name"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11.3 4.3L13.7 6.7 5 15.3 1.5 15.5 1.7 12 11.3 4.3z" />
            </svg>
          </button>
        )}
      </div>

      {/* Phonetics content */}
      <div className="flex flex-1 flex-col p-4 min-h-[200px]">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">Phonetics</span>
        </div>
        <div className="min-h-[320px] rounded-lg border border-gray-100 bg-gray-50/50 p-3 text-sm text-gray-700 leading-relaxed">
          {(selectedSession || (enableSave && enableDelete)) ? (displayText || 'Processing…') : 'Record to see transcription here.'}
        </div>
        {selectedSession && (
          <button
            type="button"
            onClick={() => dispatch(clearSelectedSession())}
            className="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            ← New recording
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50/50 p-4">
        {enableSave && enableDelete && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onSave}
              className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              Save recording
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Discard
            </button>
          </div>
        )}
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-gray-500">Hold the button to record. Release when done.</p>
          <button
            type="button"
            onMouseDown={handleStartRecordingWithClear}
            onMouseUp={handleRecordingStop}
            className={`flex w-full max-w-[280px] items-center justify-center gap-2 rounded-xl py-3.5 font-medium transition-all ${
              record
                ? 'bg-red-500 text-white shadow-lg scale-[1.02]'
                : 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700'
            }`}
          >
            {record ? (
              <>Recording…</>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                </svg>
                Hold to record
              </>
            )}
          </button>
        </div>
      </div>

      <SaveModal
        isOpen={openSaveModal}
        onClose={() => setOpenSaveModal(false)}
        onSave={handleSaveSession}
        Name={recordingName}
      />
      <Recorder
        className="hidden"
        record={record}
        onStop={onStop}
        echoCancellation={true}
        noiseSuppression={true}
        onData={onData}
      />
    </div>
  );
};

export default Transcribe;
