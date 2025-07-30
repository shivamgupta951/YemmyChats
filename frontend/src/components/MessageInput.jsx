import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import {
  Image,
  Send,
  X,
  Loader2,
  Drama,
  Mic,
  Play,
  Pause,
  SquareX,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";
import { uploadToCloudinary } from "../lib/upload";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showRecorders, setShowRecorders] = useState(false);
  const [sending, setSending] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [recorderState, setRecorderState] = useState("idle"); // idle | recording | paused

  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview && !recordedAudio) return;

    setSending(true);
    try {
      let audioUrl = null;
      if (recordedAudio) {
        const cloudinaryResult = await uploadToCloudinary(
          recordedAudio,
          "chat-audios"
        );
        audioUrl = cloudinaryResult.url;
        console.log("🎤 Voice message uploaded:", audioUrl);
      }

      await sendMessage({
        text: text.trim(),
        image: imagePreview,
        audio: audioUrl,
      });

      toast.success("Message sent!");
      setText("");
      setImagePreview(null);
      setRecordedAudio(null);
      setAudioChunks([]);
      fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Message failed");
    } finally {
      setSending(false);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
    setShowEmojis(false);
  };

  // -----------------------------
  // 🎤 Voice Recorder Functions
  // -----------------------------

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setAudioChunks([]);
      setIsRecording(true);
      setRecorderState("recording");
      toast.success("Recording started");

      const chunks = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" });

        if (audioBlob.size === 0) {
          toast.error("Recording failed or was empty.");
          return;
        }

        const audioFile = new File([audioBlob], "voice-message.webm", {
          type: "audio/webm",
        });

        setRecordedAudio(audioFile);
        setIsRecording(false);
        setRecorderState("idle");
        toast.success("Recording finished");
      };

      recorder.start();
    } catch (err) {
      console.error("Microphone access denied:", err);
      toast.error("Microphone access denied");
    }
  };

  const pauseOrResumeRecording = () => {
    if (!mediaRecorder) return;

    if (mediaRecorder.state === "recording") {
      mediaRecorder.pause();
      setRecorderState("paused");
      toast("Recording paused");
    } else if (mediaRecorder.state === "paused") {
      mediaRecorder.resume();
      setRecorderState("recording");
      toast.success("Recording resumed");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
    }
  };

  const discardRecording = () => {
    setRecordedAudio(null);
    setAudioChunks([]);
    setIsRecording(false);
    setRecorderState("idle");
    setShowRecorders(false);
    toast("Recording discarded");
  };

  return (
    <div className="p-4 w-full relative">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
              disabled={sending}
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {recordedAudio && (
        <div className="mb-3 flex items-center justify-between bg-base-200 p-2 rounded-md">
          <audio controls src={URL.createObjectURL(recordedAudio)} />
          <button
            onClick={discardRecording}
            className="btn btn-sm btn-error ml-3"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {sending && (
        <div className="mb-2 text-sm text-base-content flex items-center gap-2">
          <Loader2 className="animate-spin size-4" />
          Sending...
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2 relative">
          {/* Emoji Picker */}
          <div
            className="flex justify-center items-center border px-3 rounded-xl relative cursor-pointer"
            onClick={() => {
              setShowEmojis((prev) => !prev);
              setShowRecorders(false);
            }}
            title="Emojis"
          >
            <Drama size={22} />
            {showEmojis && (
              <div className="absolute bottom-12 left-0 z-50">
                <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
              </div>
            )}
          </div>

          {/* 🎤 Recorder UI */}
          <div className="flex justify-center items-center relative">
            <button
              type="button"
              onClick={() => {
                setShowRecorders((prev) => !prev);
                setShowEmojis(false);
              }}
              className="border flex justify-center items-center rounded-xl p-3"
              title="VoiceMessage"
            >
              <Mic size={20} />
            </button>
            {showRecorders && !recordedAudio && (
              <div className="flex justify-center items-center absolute bottom-14 z-50 border p-2 rounded-lg bg-base-300 outline outline-accent gap-2">
                {!isRecording ? (
                  <button onClick={startRecording} type="button" title="Start">
                    <Play size={18} />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={pauseOrResumeRecording}
                      type="button"
                      title={recorderState === "paused" ? "Resume" : "Pause"}
                    >
                      {recorderState === "paused" ? (
                        <Play size={18} />
                      ) : (
                        <Pause size={18} />
                      )}
                    </button>
                    <button
                      onClick={stopRecording}
                      type="button"
                      title="Finish"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={discardRecording}
                      type="button"
                      title="Discard"
                    >
                      <SquareX size={18} />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Text Input */}
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={sending}
          />

          {/* File Image Picker */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
            disabled={sending}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`hidden sm:flex btn btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
            disabled={sending}
            title="Select"
          >
            <Image size={20}/>
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className={`btn btn-sm btn-circle ${sending ? "btn-disabled" : ""}`}
          disabled={
            (!text.trim() && !imagePreview && !recordedAudio) || sending
          }
          title="Send"
        >
          {sending ? (
            <Loader2 className="animate-spin size-4" />
          ) : (
            <Send size={22} />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
