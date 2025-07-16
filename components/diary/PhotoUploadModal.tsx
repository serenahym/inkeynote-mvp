"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { supabase } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Camera, X, Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface PhotoUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date;
  onSuccess: () => void;
}

const moods = [
  { value: "great", emoji: "😊", label: "아주 좋음" },
  { value: "good", emoji: "🙂", label: "좋음" },
  { value: "normal", emoji: "😐", label: "보통" },
  { value: "bad", emoji: "😟", label: "안 좋음" },
  { value: "terrible", emoji: "😢", label: "아주 안 좋음" },
];

const weather = [
  { value: "sunny", emoji: "☀️", label: "맑음" },
  { value: "cloudy", emoji: "☁️", label: "흐림" },
  { value: "rainy", emoji: "🌧️", label: "비" },
  { value: "snowy", emoji: "❄️", label: "눈" },
];

const skinConcerns = [
  { value: "acne", label: "여드름" },
  { value: "dryness", label: "건조함" },
  { value: "oiliness", label: "번들거림" },
  { value: "sensitivity", label: "민감함" },
  { value: "redness", label: "붉음증" },
  { value: "darkspots", label: "기미/잡티" },
  { value: "wrinkles", label: "주름" },
  { value: "pores", label: "모공" },
];

export default function PhotoUploadModal({
  open,
  onOpenChange,
  selectedDate,
  onSuccess,
}: PhotoUploadModalProps) {
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [skinCondition, setSkinCondition] = useState(3);
  const [selectedMood, setSelectedMood] = useState("normal");
  const [selectedWeather, setSelectedWeather] = useState("sunny");
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (photos.length + files.length > 3) {
      toast.error("최대 3장까지만 업로드 가능합니다.");
      return;
    }

    const newPhotos = [...photos, ...files.slice(0, 3 - photos.length)];
    setPhotos(newPhotos);

    // 미리보기 생성
    const newPreviews = [...previews];
    files.slice(0, 3 - photos.length).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        setPreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleConcernToggle = (concern: string) => {
    setSelectedConcerns(prev =>
      prev.includes(concern)
        ? prev.filter(c => c !== concern)
        : [...prev, concern]
    );
  };

  const handleSubmit = async () => {
    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("사용자 정보를 찾을 수 없습니다.");

      // 사진 업로드
      const uploadedPhotos = [];
      for (const photo of photos) {
        const fileName = `${user.id}/${Date.now()}-${photo.name}`;
        const { data, error } = await supabase.storage
          .from("skin-photos")
          .upload(fileName, photo);

        if (error) throw error;
        uploadedPhotos.push(data.path);
      }

      // 다이어리 엔트리 저장
      const { error: dbError } = await supabase
        .from("skin_diary")
        .insert({
          user_id: user.id,
          date: selectedDate.toISOString().split('T')[0],
          photos: uploadedPhotos,
          skin_condition: skinCondition,
          mood: selectedMood,
          weather: selectedWeather,
          concerns: selectedConcerns,
          notes: notes,
        });

      if (dbError) throw dbError;

      toast.success("피부 일기가 저장되었습니다!");
      onSuccess();
      onOpenChange(false);
      
      // 폼 초기화
      setPhotos([]);
      setPreviews([]);
      setSkinCondition(3);
      setSelectedMood("normal");
      setSelectedWeather("sunny");
      setSelectedConcerns([]);
      setNotes("");
    } catch (error) {
      console.error("Error saving diary:", error);
      toast.error("저장 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedDate.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} 피부 일기
          </DialogTitle>
          <DialogDescription>
            오늘의 피부 상태를 기록해보세요
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* 사진 업로드 */}
          <div>
            <Label>피부 사진 (최대 3장)</Label>
            <div className="mt-2 grid grid-cols-3 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={preview}
                    alt={`Photo ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              {photos.length < 3 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors"
                >
                  <Camera className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-500 mt-2">사진 추가</span>
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoSelect}
              className="hidden"
            />
          </div>

          {/* 피부 상태 평가 */}
          <div>
            <Label>오늘의 피부 상태</Label>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => setSkinCondition(value)}
                  className="transition-all"
                >
                  <Heart
                    className={`h-8 w-8 ${
                      value <= skinCondition
                        ? "fill-pink-500 text-pink-500"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 기분 선택 */}
          <div>
            <Label>오늘의 기분</Label>
            <RadioGroup value={selectedMood} onValueChange={setSelectedMood}>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {moods.map((mood) => (
                  <div key={mood.value} className="text-center">
                    <RadioGroupItem
                      value={mood.value}
                      id={mood.value}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={mood.value}
                      className="flex flex-col items-center gap-1 p-3 rounded-lg cursor-pointer border-2 border-transparent peer-checked:border-pink-500 hover:bg-gray-50"
                    >
                      <span className="text-2xl">{mood.emoji}</span>
                      <span className="text-xs">{mood.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* 날씨 선택 */}
          <div>
            <Label>오늘의 날씨</Label>
            <RadioGroup value={selectedWeather} onValueChange={setSelectedWeather}>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {weather.map((w) => (
                  <div key={w.value} className="text-center">
                    <RadioGroupItem
                      value={w.value}
                      id={`weather-${w.value}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`weather-${w.value}`}
                      className="flex flex-col items-center gap-1 p-3 rounded-lg cursor-pointer border-2 border-transparent peer-checked:border-pink-500 hover:bg-gray-50"
                    >
                      <span className="text-2xl">{w.emoji}</span>
                      <span className="text-xs">{w.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* 피부 고민 */}
          <div>
            <Label>피부 고민 (복수 선택 가능)</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {skinConcerns.map((concern) => (
                <button
                  key={concern.value}
                  onClick={() => handleConcernToggle(concern.value)}
                  className={`p-2 rounded-lg border-2 text-sm transition-colors ${
                    selectedConcerns.includes(concern.value)
                      ? "border-pink-500 bg-pink-50 text-pink-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {concern.label}
                </button>
              ))}
            </div>
          </div>

          {/* 메모 */}
          <div>
            <Label htmlFor="notes">메모</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="오늘의 피부 상태나 사용한 제품 등을 자유롭게 기록해보세요"
              className="mt-2"
              rows={4}
            />
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={uploading}
            >
              취소
            </Button>
            <Button onClick={handleSubmit} disabled={uploading}>
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  저장 중...
                </>
              ) : (
                "저장하기"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
