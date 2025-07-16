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
"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { CalendarIcon, PlusCircle, Heart } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import { toast } from "sonner";
import PhotoUploadModal from "@/components/diary/PhotoUploadModal";

interface DiaryEntry {
  id: string;
  date: string;
  photos: string[];
  skin_condition: number;
  mood: string;
  weather: string;
  concerns: string[];
  notes: string;
  created_at: string;
}

export default function DiaryPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [diaryEntries, setDiaryEntries] = useState<{ [key: string]: DiaryEntry }>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // 다이어리 엔트리 불러오기
  const fetchDiaryEntries = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("skin_diary")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      if (error) throw error;

      // 날짜를 키로 하는 객체로 변환
      const entriesMap = data.reduce((acc, entry) => {
        acc[entry.date] = entry;
        return acc;
      }, {} as { [key: string]: DiaryEntry });

      setDiaryEntries(entriesMap);
    } catch (error) {
      console.error("Error fetching diary entries:", error);
      toast.error("다이어리를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiaryEntries();
  }, []);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const selectedDateKey = format(selectedDate, "yyyy-MM-dd");
  const selectedEntry = diaryEntries[selectedDateKey];

  const getPublicUrl = (path: string) => {
    const { data } = supabase.storage.from("skin-photos").getPublicUrl(path);
    return data.publicUrl;
  };

  const moodEmojis: { [key: string]: string } = {
    great: "😊",
    good: "🙂",
    normal: "😐",
    bad: "😟",
    terrible: "😢",
  };

  const weatherEmojis: { [key: string]: string } = {
    sunny: "☀️",
    cloudy: "☁️",
    rainy: "🌧️",
    snowy: "❄️",
  };

  const concernsLabels: { [key: string]: string } = {
    acne: "여드름",
    dryness: "건조함",
    oiliness: "번들거림",
    sensitivity: "민감함",
    redness: "붉음증",
    darkspots: "기미/잡티",
    wrinkles: "주름",
    pores: "모공",
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <CalendarIcon className="h-8 w-8 text-pink-500" />
          피부 일기
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 캘린더 섹션 */}
          <Card>
            <CardContent className="p-6">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                locale={ko}
                className="rounded-md"
                modifiers={{
                  hasEntry: Object.keys(diaryEntries).map(date => new Date(date)),
                }}
                modifiersStyles={{
                  hasEntry: { 
                    backgroundColor: "#fce7f3",
                    fontWeight: "bold",
                  }
                }}
              />
              
              <Button
                onClick={() => {
                  console.log("기록하기 버튼 클릭!");
                  setModalOpen(true);
                }}
                className="w-full mt-4"
                size="lg"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                기록하기
              </Button>
            </CardContent>
          </Card>

          {/* 선택된 날짜의 기록 표시 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {format(selectedDate, "M월 d일 EEEE", { locale: ko })}
              </h2>
              
              {selectedEntry ? (
                <div className="space-y-4">
                  {/* 사진 표시 */}
                  {selectedEntry.photos.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {selectedEntry.photos.map((photo, index) => (
                        <div key={index} className="relative aspect-square">
                          <Image
                            src={getPublicUrl(photo)}
                            alt={`피부 사진 ${index + 1}`}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 피부 상태 */}
                  <div>
                    <p className="text-sm text-gray-600 mb-1">피부 상태</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <Heart
                          key={value}
                          className={`h-5 w-5 ${
                            value <= selectedEntry.skin_condition
                              ? "fill-pink-500 text-pink-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* 기분과 날씨 */}
                  <div className="flex gap-4">
                    <div>
                      <p className="text-sm text-gray-600">기분</p>
                      <span className="text-2xl">{moodEmojis[selectedEntry.mood]}</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">날씨</p>
                      <span className="text-2xl">{weatherEmojis[selectedEntry.weather]}</span>
                    </div>
                  </div>

                  {/* 피부 고민 */}
                  {selectedEntry.concerns.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">피부 고민</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedEntry.concerns.map((concern) => (
                          <span
                            key={concern}
                            className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm"
                          >
                            {concernsLabels[concern]}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 메모 */}
                  {selectedEntry.notes && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">메모</p>
                      <p className="text-gray-800 whitespace-pre-wrap">{selectedEntry.notes}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>이 날의 기록이 없습니다.</p>
                  <Button
                    onClick={() => {
                      console.log("기록 추가하기 버튼 클릭!");
                      setModalOpen(true);
                    }}
                    variant="outline"
                    className="mt-4"
                  >
                    기록 추가하기
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 사진 업로드 모달 */}
      <PhotoUploadModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        selectedDate={selectedDate}
        onSuccess={fetchDiaryEntries}
      />
    </div>
  );
}
