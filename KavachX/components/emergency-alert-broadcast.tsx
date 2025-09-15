"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface EmergencyAlertBroadcastProps {
  onClose: () => void
}

export function EmergencyAlertBroadcast({ onClose }: EmergencyAlertBroadcastProps) {
  const [alertType, setAlertType] = useState("")
  const [severity, setSeverity] = useState("")
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [recipients, setRecipients] = useState<string[]>([])
  const [isScheduled, setIsScheduled] = useState(false)
  const [scheduledTime, setScheduledTime] = useState("")
  const [isSending, setIsSending] = useState(false)

  const alertTypes = [
    { value: "weather", label: "Weather Alert" },
    { value: "drill", label: "Drill Notification" },
    { value: "emergency", label: "Emergency Alert" },
    { value: "maintenance", label: "Maintenance Notice" },
    { value: "general", label: "General Announcement" },
  ]

  const severityLevels = [
    { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
    { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
    { value: "high", label: "High", color: "bg-red-100 text-red-800" },
    { value: "critical", label: "Critical", color: "bg-red-200 text-red-900" },
  ]

  const recipientGroups = [
    { id: "all-students", label: "All Students", count: 1250 },
    { id: "grade-10", label: "Grade 10", count: 280 },
    { id: "grade-9", label: "Grade 9", count: 290 },
    { id: "staff", label: "Staff Members", count: 85 },
    { id: "parents", label: "Parents", count: 1100 },
  ]

  const handleRecipientChange = (groupId: string, checked: boolean) => {
    if (checked) {
      setRecipients([...recipients, groupId])
    } else {
      setRecipients(recipients.filter((id) => id !== groupId))
    }
  }

  const getTotalRecipients = () => {
    return recipientGroups
      .filter((group) => recipients.includes(group.id))
      .reduce((total, group) => total + group.count, 0)
  }

  const handleSendAlert = async () => {
    if (!alertType || !severity || !title || !message || recipients.length === 0) {
      alert("Please fill in all required fields and select recipients.")
      return
    }

    setIsSending(true)

    // Mock sending process
    setTimeout(() => {
      setIsSending(false)
      alert(`Alert sent successfully to ${getTotalRecipients()} recipients!`)
      onClose()
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <span className="text-destructive">⚠️</span>
            Emergency Alert Broadcast
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <span>✕</span>
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Alert Type and Severity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="alert-type">Alert Type *</Label>
              <Select value={alertType} onValueChange={setAlertType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select alert type" />
                </SelectTrigger>
                <SelectContent>
                  {alertTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="severity">Severity Level *</Label>
              <Select value={severity} onValueChange={setSeverity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  {severityLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${level.color.split(" ")[0]}`} />
                        {level.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Alert Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Alert Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter alert title"
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">{title.length}/100 characters</p>
          </div>

          {/* Alert Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Alert Message *</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter detailed alert message"
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">{message.length}/500 characters</p>
          </div>

          {/* Recipients */}
          <div className="space-y-3">
            <Label>Recipients *</Label>
            <div className="space-y-2">
              {recipientGroups.map((group) => (
                <div key={group.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={group.id}
                    checked={recipients.includes(group.id)}
                    onCheckedChange={(checked) => handleRecipientChange(group.id, checked as boolean)}
                  />
                  <Label htmlFor={group.id} className="flex-1 cursor-pointer">
                    {group.label}
                  </Label>
                  <Badge variant="outline" className="text-xs">
                    {group.count}
                  </Badge>
                </div>
              ))}
            </div>
            {recipients.length > 0 && (
              <Alert>
                <span>👥</span>
                <AlertDescription>
                  This alert will be sent to <strong>{getTotalRecipients()} recipients</strong>.
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Scheduling */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="schedule" checked={isScheduled} onCheckedChange={setIsScheduled} />
              <Label htmlFor="schedule" className="cursor-pointer">
                Schedule for later
              </Label>
            </div>
            {isScheduled && (
              <div className="space-y-2">
                <Label htmlFor="scheduled-time">Scheduled Time</Label>
                <Input
                  id="scheduled-time"
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Preview */}
          {title && message && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <Alert className={severity === "high" || severity === "critical" ? "border-destructive" : ""}>
                <span>⚠️</span>
                <AlertDescription>
                  <div className="space-y-1">
                    <div className="font-semibold">{title}</div>
                    <div className="text-sm">{message}</div>
                    <div className="flex items-center gap-2 mt-2">
                      {severity && (
                        <Badge
                          variant={severity === "high" || severity === "critical" ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {severityLevels.find((s) => s.value === severity)?.label}
                        </Badge>
                      )}
                      {isScheduled && scheduledTime && (
                        <Badge variant="outline" className="text-xs">
                          <span className="mr-1">🕒</span>
                          Scheduled
                        </Badge>
                      )}
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSendAlert} disabled={isSending} className="flex-1">
              {isSending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <span className="mr-2">📤</span>
                  {isScheduled ? "Schedule Alert" : "Send Alert"}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
