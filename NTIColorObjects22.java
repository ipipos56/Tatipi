import java.awt.*;
import java.awt.geom.Line2D;
import java.awt.geom.Point2D;
import java.util.ArrayList;
import java.util.Locale;
import java.util.Scanner;
import java.util.TreeSet;

public class Main {

    public static void main(String[] args) {
        ArrayList<WallStd> walls=new ArrayList<>();
        Scanner s=new Scanner(System.in);
        s.useLocale(Locale.US);
        int h = s.nextInt();
        int n = s.nextInt();
        double a = s.nextDouble();
        String dir = s.next();
        double d=0;
        int xs = s.nextInt();
        int ys = s.nextInt();
        double b = -s.nextDouble();
        for (int i = 0; i < n; i++) {
            walls.add(new WallStd(
                    new Line2D.Double(
                            s.nextInt()-xs, s.nextInt()-ys, s.nextInt()-xs, s.nextInt()-ys),
                    new Color(s.nextInt(16))));
        }
        if(dir.equals("R")) {
            d = (float) (0 * Math.PI / 180.0);
        }
        if(dir.equals("L")) {
            d = (float) (-180 * Math.PI / 180.0);
        }
        if(dir.equals("U")) {
            d = (float) (-90 * Math.PI / 180.0);
        }
        if(dir.equals("D")) {
            d = (float) (90 * Math.PI / 180.0);
        }
        TreeSet<PolPoint> allPolPoints=new TreeSet<>();
        for(WallStd t: walls){
            PolPoint p1=toPol(t.line.x1,t.line.y1);
            PolPoint p2=toPol(t.line.x2,t.line.y2);
            allPolPoints.add(p1);
            allPolPoints.add(p2);
        }
        ArrayList<Color> res=new ArrayList<>();
        ArrayList<Double> size=new ArrayList<>();

        boolean invert=false;
        if(b<0){
            invert=true;
            b=Math.abs(b);
            d=d-b;
        }
        double rthet=d+b+a/2d;
        double lthet=d-a/2d;


        PolPoint l=new PolPoint(-Math.PI,Double.MAX_VALUE);
        for (PolPoint r:allPolPoints) {
            if(r.theta>rthet){
                r.theta=rthet;
            }
            if(l.theta>rthet){
                l.theta=rthet;
            }
            if(r.theta<lthet){
                r.theta=lthet;
            }
            if(l.theta<lthet){
                l.theta=lthet;
            }
            PolPoint area=new PolPoint((l.theta+r.theta)/2d,Integer.MAX_VALUE);
            Line2D.Double bisector=new Line2D.Double(new Point2D.Double(0,0),fromPol(-area.theta,area.d));
            Color mincolor=new Color(0,0,0);
            double minDist=Integer.MAX_VALUE;
            for (WallStd t:walls) {
                if(doIntersect(t.line.getP1(),t.line.getP2(),bisector.getP1(),bisector.getP2())){
                    Point2D.Double intersection=intersection(t.line.getP1(),t.line.getP2(),bisector.getP1(),bisector.getP2());
                    PolPoint pp=toPol(intersection.x,intersection.y);
                    if(pp.d<minDist){
                        mincolor=t.c;
                        minDist=pp.d;
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
            if(cdist>a/10d && pcol.getRGB()!=cur.getRGB()) {
                String ress = Integer.toHexString(cur.getRGB()).substring(2).toUpperCase();
                if (!ress.equals("000000")) {
                    System.out.print(ress + " ");
                    pcol=cur;
                }
            }
        }
        System.out.println();

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
        int rr= Double.compare(theta,polPoint.theta);
        if(rr==0)rr=1;
        return rr;
    }
}
class WallStd {
    Line2D.Double line;
    Color c;
    public WallStd(Line2D.Double linens, Color col) {
        c=col;
        line=linens;
        Point2D.Double td=new Point2D.Double((linens.x1+linens.x2)/2,(linens.y1+linens.y2)/2);
    }

}
