import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProfileCard() {
  const sections = [
    { title: "My Details", href: "/edit/mydetails" },
    { title: "Skills", href: "/edit/skills" },
    { title: "Work Experience", href: "/edit/works" },
    { title: "Education", href: "/edit/education" },
    { title: "Projects", href: "/edit/projects" },
    { title: "Contact", href: "/edit/contact" },
  ]

  return (
    <Card className="w-full  max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Profile Overview</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {sections.map((section) => (
          <Link className='' key={section.href} href={section.href} passHref>
            <Button
              variant="outline"
              className="w-full justify transition-all duration-200 hover:bg-black/20 start text-left font-normal"
            >
              {section.title}
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

