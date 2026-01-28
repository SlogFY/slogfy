-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create table for career applications
CREATE TABLE public.career_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_type TEXT NOT NULL DEFAULT 'internship',
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  college TEXT NOT NULL,
  branch TEXT NOT NULL,
  year TEXT NOT NULL,
  about TEXT NOT NULL,
  linkedin_url TEXT,
  resume_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit applications
CREATE POLICY "Anyone can submit applications"
ON public.career_applications
FOR INSERT
WITH CHECK (true);

-- Only admins can view applications
CREATE POLICY "Admins can view applications"
ON public.career_applications
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update applications
CREATE POLICY "Admins can update applications"
ON public.career_applications
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete applications
CREATE POLICY "Admins can delete applications"
ON public.career_applications
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_career_applications_updated_at
BEFORE UPDATE ON public.career_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();