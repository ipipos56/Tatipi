import java.awt.*;
import java.awt.geom.Line2D;
import java.awt.geom.Point2D;
import java.util.ArrayList;
import java.util.Locale;
import java.util.Scanner;
import java.util.TreeSet;

public class NTIColorObjects2 {
    public static void main(String[] args) {

        Bob bob=new Bob();
        MazeMap map=new MazeMap();
        {
            Scanner s = new Scanner(System.in);
            s.useLocale(Locale.US);
            int h = s.nextInt();
            int n = s.nextInt();
            double a = s.nextDouble();
            String d = s.next();
            int xs = s.nextInt();
            int ys = s.nextInt();
            double b = s.nextDouble();
            int[][] x = new int[n][2];
            int[][] y = new int[n][2];
            Color[] col = new Color[n];
            Line2D.Double[] lines = new Line2D.Double[n];

            Point2D.Double bobpos = new Point2D.Double(xs, ys);
            for (int i = 0; i < n; i++) {
                x[i][0] = s.nextInt();
                y[i][0] = s.nextInt();
                x[i][1] = s.nextInt();
                y[i][1] = s.nextInt();
                lines[i] = new Line2D.Double(x[i][0]-xs, y[i][0]-ys, x[i][1]-xs, y[i][1]-ys);
                col[i] = new Color(s.nextInt(16));
                map.walls.add(new Border(lines[i],bobpos,col[i]));
            }

            if(d.equals("R")) {
                bob.d = (float) (0 * Math.PI / 180.0);
            }
            if(d.equals("L")) {
                bob.d = (float) (180 * Math.PI / 180.0);
            }
            if(d.equals("U")) {
                bob.d = (float) (-90 * Math.PI / 180.0);
            }
            if(d.equals("D")) {
                bob.d = (float) (90 * Math.PI / 180.0);
            }
            bob.a=a;
            bob.b=-b;

        }
        BobCam cam=new BobCam();
        for (Border t: map.walls) {
            PolPoint l=toPol(t.line.x1,t.line.y1);
            PolPoint r=toPol(t.line.x2,t.line.y2);
            cam.pts.add(l);
            cam.pts.add(r);
            PolPoint min;
            PolPoint max;
            if(l.theta<r.theta){
                min=l;
                max=r;
            }else{
                min=r;
                max=l;
            }
            cam.walls.add(new RangeBorder(min,max,t.c));
        }
        PolPoint l=new PolPoint(bob.d-bob.a/2d,Double.MAX_VALUE);
        ArrayList<Color> res=new ArrayList<>();
        ArrayList<Double> size=new ArrayList<>();

        boolean invert=false;
        if(bob.b<0){
            invert=true;
            bob.b=Math.abs(bob.b);
            bob.d=bob.d-bob.b;
        }
        double rthet=0;
        double lthet=0;
        /*if(bob.b<0){
            rthet=bob.d-bob.d-bob.a/2d;
            lthet=bob.d+bob.a/2;
        }else*/{
            rthet=bob.d+bob.b+bob.a/2d;
            lthet=bob.d-bob.a/2d;
        }

        for (PolPoint r:cam.pts) {
            if(r.theta>rthet){
                r.theta=rthet;
            }
            if(l.theta<lthet){
                l.theta=lthet;
            }
            PolPoint area=new PolPoint((l.theta+r.theta)/2d,Integer.MAX_VALUE);
            Line2D.Double bisector=new Line2D.Double(new Point2D.Double(0,0),fromPol(-area.theta,area.d));
            Color mincolor=new Color(0,0,0);
            double minDist=Double.MAX_VALUE;
            //double minsize=Double.MAX_VALUE;
            for (Border t:map.walls) {
                if(doIntersect(t.line.getP1(),t.line.getP2(),bisector.getP1(),bisector.getP2())){
                    Point2D.Double intersection=intersection(t.line.getP1(),t.line.getP2(),bisector.getP1(),bisector.getP2());
                    PolPoint pp=toPol(intersection.x,intersection.y);
                    if(pp.d<minDist){
                        mincolor=t.c;
                        minDist=pp.d;
                        //minsize=Math.abs(l.theta-r.theta);
                    }
                }
            }
            if(!invert) {
                res.add(mincolor);
                size.add(Math.abs(r.theta - l.theta));
            }else {
                res.add(0,mincolor);
                size.add(0,Math.abs(r.theta - l.theta));
            }
            l=r;
        }
        Color pcol=new Color(0,0,0);
        for (int i = 0; i < res.size(); i++) {
            Color cur=res.get(i);
            double cdist=0;
            for (; i < res.size() && res.get(i).getRGB()==cur.getRGB(); i++) {
                cdist+=size.get(i);
            }
            i--;
            if(cdist>=bob.a/10d && pcol.getRGB()!=cur.getRGB()) {
                String ress = Integer.toHexString(cur.getRGB()).substring(2).toUpperCase();
                if (!ress.equals("000000")) {
                    System.out.print(ress + " ");
                    pcol=cur;
                }
            }
        }
        System.out.println();
    }

    private static Point2D fromPol(double theta, double d) {
        double x = d * Math.cos(theta);
        double y = d * Math.sin(theta);
        return new Point2D.Double(x,y);
    }


    public static PolPoint toPol(double x, double y){
        double r = Math.sqrt(x*x + y*y);
        double theta = -Math.atan2(y, x);
        return new PolPoint(theta,r);
    }

    static boolean onSegment(Point2D p, Point2D q, Point2D r)
    {
        if (q.getX() <= Math.max(p.getX(), r.getX()) && q.getX() >= Math.min(p.getX(), r.getX()) &&
                q.getY() <= Math.max(p.getY(), r.getY()) && q.getY() >= Math.min(p.getY(), r.getY()))
            return true;

        return false;
    }

    static int orientation(Point2D p, Point2D q, Point2D r)
    {
        double val = (q.getY() - p.getY()) * (r.getX() - q.getX()) -
                (q.getX() - p.getX()) * (r.getY() - q.getY());

        if (val == 0) return 0;

        return (val > 0)? 1: 2;
    }

    static boolean doIntersect(Point2D p1, Point2D q1, Point2D p2, Point2D q2)
    {
        int o1 = orientation(p1, q1, p2);
        int o2 = orientation(p1, q1, q2);
        int o3 = orientation(p2, q2, p1);
        int o4 = orientation(p2, q2, q1);
        if (o1 != o2 && o3 != o4)
            return true;
        if (o1 == 0 && onSegment(p1, p2, q1)) return true;

        if (o2 == 0 && onSegment(p1, q2, q1)) return true;

        if (o3 == 0 && onSegment(p2, p1, q2)) return true;

        if (o4 == 0 && onSegment(p2, q1, q2)) return true;

        return false;
    }
    static Point2D.Double intersection(Point2D A, Point2D B, Point2D C, Point2D D)
    {
        // Line AB represented as a1x + b1y = c1 
        double a1 = B.getY() - A.getY();
        double b1 = A.getX() - B.getX();
        double c1 = a1*(A.getX()) + b1*(A.getY());

        // Line CD represented as a2x + b2y = c2 
        double a2 = D.getY() - C.getY();
        double b2 = C.getX() - D.getX();
        double c2 = a2*(C.getX())+ b2*(C.getY());

        double determinant = a1*b2 - a2*b1;

        if (determinant == 0)
        {
            // The lines are parallel. This is simplified 
            // by returning a pair of FLT_MAX 
            return new Point2D.Double(Double.MAX_VALUE, Double.MAX_VALUE);
        }
        else
        {
            double x = (b2*c1 - b1*c2)/determinant;
            double y = (a1*c2 - a2*c1)/determinant;
            return new Point2D.Double(x, y);
        }
    }
}
class PolPoint implements Comparable<PolPoint>{
    double theta=0;
    double d=0;

    public PolPoint(double theta, double r) {
        this.theta=theta;
        this.d=r;
    }

    @Override
    public int compareTo(PolPoint polPoint) {
        return Double.compare(theta,polPoint.theta);
    }
}
class BobCam{
    TreeSet<RangeBorder> walls=new TreeSet<>();
    TreeSet<RangeBorder> view=new TreeSet<>();
    TreeSet<PolPoint> pts=new TreeSet<>();
}
class Bob{
    double d=0;
    double a=0;
    double b=0;
}
class MazeMap{
    ArrayList<Border> walls=new ArrayList<>();

}
class RangeBorder implements Comparable<RangeBorder>{
    Color c=new Color(0,0,0);
    PolPoint min;
    PolPoint max;
    public RangeBorder(PolPoint left, PolPoint right,Color col){
        c=col;
        this.min =left;
        this.max =right;
    }
    public boolean equals(Object or){
        RangeBorder r=(RangeBorder)or;
        if(r.c.getRGB()!=c.getRGB())return false;
        if(r.min.theta!=min.theta)return false;
        if(r.max.theta!=max.theta)return false;
        if(r.min.d!=min.d)return false;
        if(r.max.d!=max.d)return false;
        return true;
    }
    @Override
    public int compareTo(RangeBorder border) {
        int res=Double.compare(this.min.theta,border.min.theta);
        if(res==0)res = -Double.compare(this.max.d,border.max.d);
        if(res==0)res=1;
        return res;
    }
}
class Border {
    Double distance=0d;
    Line2D.Double line=new Line2D.Double();
    Color c=new Color(0,0,0);
    public Border(Line2D.Double linens, Point2D.Double bobpos,Color col) {
        c=col;
        line=linens;
        Point2D.Double td=new Point2D.Double((linens.x1+linens.x2)/2,(linens.y1+linens.y2)/2);
        distance=td.distance(new Point2D.Double(0,0));
    }

}
